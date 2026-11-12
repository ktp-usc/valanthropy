// Creates / refreshes the WordPress "-new" pages that hold each site page's editable TEXT.
//
// How it works: every piece of editable text in the code is wrapped in <T> (see lib/wp-text.tsx), which
// marks it in the rendered page. This script reads the page from your local dev server, finds those marks,
// and writes one WordPress block per piece of text (Heading or Paragraph). Editors change the words in
// WordPress; the site shows them in its own design. Text a developer adds in code appears as a new block
// the next time this script runs.
//
//   npm run dev                                   (the site must be running on http://localhost:3000)
//   npm run wp:text:preview                       dry run: shows what would be written
//   npm run wp:text                               writes to WordPress
//   npm run wp:text -- contact home               only these pages (names: see PAGES below)
//
// Safe to re-run: the page is read through the site, which already shows the WordPress edits, so edits
// that editors made are carried over. A backup of the existing WordPress page goes to backups/ first.
// Only the slugs in PAGES can be written; live pages are never touched. New pages are created PRIVATE.

import { mkdir, writeFile } from "node:fs/promises";
import { parse, HTMLElement, TextNode } from "node-html-parser";

const SITE = "https://valanthropy.org";
const LOCAL = process.env.LOCAL_URL ?? "http://localhost:3000";

const PAGES = {
    home: { route: "/", slug: "home-new", title: "Home-New" },
    contact: { route: "/contact", slug: "contact-new", title: "Contact-New" },
    projects: { route: "/projects", slug: "projects-new", title: "Projects-New" },
    ways: { route: "/ways-to-help", slug: "ways-to-help-new", title: "Ways to Help-New" },
    partners: { route: "/become-a-partner", slug: "partners-and-sponsors-new", title: "Partners and Sponsors-New" },
    financials: { route: "/financials", slug: "financials-new", title: "Financials-New" },
    donate: { route: "/donate", slug: "donate-new", title: "Donate-New" },
    news: { route: "/news", slug: "news-new", title: "News-New" },
    conversation: { route: "/start-a-conversation", slug: "start-a-conversation-new", title: "Start a Conversation-New" },
};
const LIVE_SLUGS = ["home", "about", "leadership", "contact", "projects", "ways-to-help", "partners-and-sponsors", "financials", "donate", "news", "start-a-conversation"];

const apply = !process.argv.includes("--preview");
const requested = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const names = requested.length ? requested : Object.keys(PAGES);
for (const n of names) {
    if (!PAGES[n]) {
        console.error(`Unknown page "${n}". Choose from: ${Object.keys(PAGES).join(", ")}`);
        process.exit(1);
    }
    if (LIVE_SLUGS.includes(PAGES[n].slug)) throw new Error("Refusing to touch a live page.");
}

const { WP_USER, WP_APP_PASSWORD } = process.env;
if (apply && (!WP_USER || !WP_APP_PASSWORD)) {
    console.error("Set WP_USER and WP_APP_PASSWORD in .env.local first.");
    process.exit(1);
}
const auth = { Authorization: "Basic " + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString("base64") };

async function api(path, options = {}) {
    const res = await fetch(`${SITE}/wp-json/wp/v2${path}`, {
        ...options,
        headers: { ...auth, ...(options.body ? { "Content-Type": "application/json" } : {}) },
    });
    const body = await res.json().catch(() => null);
    if (!res.ok) throw new Error(`${res.status} ${body?.code ?? ""} ${String(body?.message ?? res.statusText).replace(/<[^>]+>/g, "")}`.trim());
    return body;
}

/* ---------- rendered page -> WordPress blocks ---------- */

const KEEP = new Set(["strong", "b", "em", "i", "u", "sup", "sub"]);

// Inner HTML reduced to plain text plus bold/italic/links/line breaks (no classes, no styling).
function cleanHtml(node) {
    if (node instanceof TextNode) return node.toString();
    if (!(node instanceof HTMLElement)) return "";
    const tag = node.tagName?.toLowerCase();
    const inner = node.childNodes.map(cleanHtml).join("");
    if (tag === "br") return "<br>";
    if (tag === "a") {
        const href = node.getAttribute("href");
        return href ? `<a href="${href.replace(/"/g, "&quot;")}">${inner}</a>` : inner;
    }
    if (KEEP.has(tag)) return `<${tag}>${inner}</${tag}>`;
    return inner;
}

const block = (name, attrs, html) => `<!-- wp:${name}${attrs ? " " + JSON.stringify(attrs) : ""} -->\n${html}\n<!-- /wp:${name} -->`;

function buildBlocks(html) {
    const root = parse(html);
    const seen = new Set();
    const blocks = [];
    for (const el of root.querySelectorAll("[data-wp-slot]")) {
        const id = el.getAttribute("data-wp-slot");
        if (!id || seen.has(id)) continue;
        const text = el.childNodes.map(cleanHtml).join("").trim();
        if (!text) continue;
        seen.add(id);
        const parentTag = el.parentNode?.tagName?.toLowerCase() ?? "";
        const level = /^h([1-6])$/.exec(parentTag)?.[1];
        blocks.push(
            level
                ? block("heading", Number(level) === 2 ? null : { level: Number(level) }, `<h${level} class="wp-block-heading" id="${id}">${text}</h${level}>`)
                : block("paragraph", null, `<p id="${id}">${text}</p>`),
        );
    }
    const note = block(
        "paragraph",
        null,
        "<p><em>Edit the wording in the blocks below (they follow the order of the page). Layout, colours and images are controlled by the website. Please don't delete a block unless you want its default wording back.</em></p>",
    );
    return { count: blocks.length, content: [note, ...blocks].join("\n\n") };
}

/* ---------- run ---------- */

console.log(apply ? "WRITING to WordPress\n" : "PREVIEW (nothing is written)\n");
let failed = false;
for (const name of names) {
    const { route, slug, title } = PAGES[name];
    try {
        const res = await fetch(LOCAL + route);
        if (!res.ok) throw new Error(`${LOCAL}${route} returned ${res.status}. Is "npm run dev" running?`);
        const { count, content } = buildBlocks(await res.text());
        if (count === 0) throw new Error("no editable text found on the page");

        if (!apply) {
            console.log(`${name}: ${route} -> ${slug}: ${count} editable blocks (preview)\n`);
            continue;
        }

        const found = (await api(`/pages?slug=${slug}&status=publish,draft,private&context=edit`))?.[0];
        if (found && found.slug !== slug) throw new Error(`unexpected page returned for slug "${slug}"`);

        if (found) {
            await mkdir("backups", { recursive: true });
            await writeFile(`backups/${slug}-${new Date().toISOString().replace(/[:.]/g, "-")}.html`, found.content?.raw ?? "", "utf8");
            await api(`/pages/${found.id}?context=edit`, { method: "POST", body: JSON.stringify({ content }) });
            console.log(`${name}: ${route} -> ${slug}: updated id ${found.id} (${found.status}), ${count} editable blocks`);
        } else {
            const page = await api(`/pages?context=edit`, { method: "POST", body: JSON.stringify({ title, slug, status: "private", content }) });
            console.log(`${name}: ${route} -> ${slug}: CREATED private page id ${page.id}, ${count} editable blocks`);
        }
    } catch (error) {
        failed = true;
        console.error(`${name}: FAILED - ${error.message}`);
    }
}
process.exit(failed ? 1 : 0);
