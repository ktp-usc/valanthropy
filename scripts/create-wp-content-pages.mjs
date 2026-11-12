// Creates the WordPress page that holds a site page's TEXT, as normal visual blocks
// (Heading, Paragraph, Image, List, Buttons) so a non-coder can edit it in the usual editor.
// The Next.js site reads this page and shows the text in its own design.
//
//   node --env-file=.env.local scripts/create-wp-content-pages.mjs            # dry run (writes nothing)
//   node --env-file=.env.local scripts/create-wp-content-pages.mjs --apply    # create the page(s)
//
// Safety:
//   - It only ever touches the slugs listed in CONTENT_PAGES below (never a live page).
//   - Pages are created PRIVATE. The Next.js site reads them with WP_USER / WP_APP_PASSWORD.
//   - If a page with that slug already exists it is NOT overwritten (an editor may have changed it).
//     Pass --overwrite to replace it; a backup is saved to backups/ first.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { parse, HTMLElement } from "node-html-parser";

const SITE = "https://valanthropy.org";
// Existing "-new" pages (title left as it is). Add more here as each site page is wired up.
const CONTENT_PAGES = [
    { file: "content/about.html", slug: "about-new", title: "About-New" },
    { file: "content/leadership.html", slug: "leadership-new", title: "Leadership-New" },
];
const LIVE_SLUGS = ["about", "leadership", "contact", "projects", "ways-to-help", "home", "donate", "news"];

const apply = process.argv.includes("--apply");
const overwrite = process.argv.includes("--overwrite");
for (const p of CONTENT_PAGES) if (LIVE_SLUGS.includes(p.slug)) throw new Error("Refusing to touch a live page.");

/* ---------- plain HTML -> WordPress block markup ---------- */

const block = (name, attrs, html) => `<!-- wp:${name}${attrs ? " " + JSON.stringify(attrs) : ""} -->\n${html}\n<!-- /wp:${name} -->`;

const buttons = (links) =>
    block(
        "buttons",
        null,
        `<div class="wp-block-buttons">${links
            .map(
                (a) =>
                    `<!-- wp:button -->\n<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="${a.getAttribute("href") ?? "#"}">${a.text.trim()}</a></div>\n<!-- /wp:button -->`,
            )
            .join("\n")}</div>`,
    );

const isLink = (n) => n instanceof HTMLElement && n.tagName.toLowerCase() === "a";

function toBlocks(html) {
    const out = [];
    let loose = [];
    const flush = () => {
        const nodes = loose;
        loose = [];
        if (!nodes.map((n) => n.text).join("").replace(/ /g, " ").trim()) return;
        const meaningful = nodes.filter((n) => n.text.trim() !== "");
        out.push(meaningful.every(isLink) ? buttons(meaningful) : block("paragraph", null, `<p>${nodes.map((n) => n.toString()).join("")}</p>`));
    };

    const inline = ["a", "b", "strong", "i", "em", "span", "br"];
    for (const el of parse(html).childNodes) {
        const tag = el instanceof HTMLElement ? el.tagName.toLowerCase() : "";
        if (!(el instanceof HTMLElement) || inline.includes(tag)) {
            loose.push(el);
            continue;
        }
        flush();
        if (/^h[2-6]$/.test(tag)) {
            const level = Number(tag[1]);
            out.push(block("heading", level === 2 ? null : { level }, `<${tag} class="wp-block-heading">${el.innerHTML}</${tag}>`));
        } else if (tag === "p") {
            const links = el.childNodes.filter((n) => n.text.trim() !== "");
            out.push(links.length > 1 && links.every(isLink) ? buttons(links) : block("paragraph", null, `<p>${el.innerHTML}</p>`));
        } else if (tag === "ul" || tag === "ol") {
            const items = el.querySelectorAll("li").map((li) => block("list-item", null, `<li>${li.innerHTML.trim()}</li>`));
            out.push(block("list", tag === "ol" ? { ordered: true } : null, `<${tag} class="wp-block-list">${items.join("\n")}</${tag}>`));
        } else if (tag === "figure" || tag === "img") {
            const img = tag === "img" ? el : el.querySelector("img");
            if (!img) continue;
            const caption = tag === "figure" ? el.querySelector("figcaption")?.innerHTML : "";
            out.push(
                block(
                    "image",
                    { sizeSlug: "large" },
                    `<figure class="wp-block-image size-large"><img src="${img.getAttribute("src") ?? ""}" alt="${img.getAttribute("alt") ?? ""}"/>${caption ? `<figcaption class="wp-element-caption">${caption}</figcaption>` : ""}</figure>`,
                ),
            );
        } else {
            out.push(block("html", null, el.toString())); // anything unusual is kept as-is
        }
    }
    flush();
    return out.join("\n\n");
}

/* ---------- WordPress ---------- */

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

console.log(apply ? "APPLYING changes to WordPress\n" : "DRY RUN (nothing is written; add --apply)\n");
let failed = false;
for (const { file, slug, title } of CONTENT_PAGES) {
    try {
        const content = toBlocks(await readFile(file, "utf8"));
        const count = (content.match(/<!-- wp:(heading|paragraph|image|list|buttons|html)[ -]/g) ?? []).length;
        console.log(`${file} -> ${slug}: ${count} editable blocks`);
        if (!apply) continue;

        const found = (await api(`/pages?slug=${slug}&status=publish,draft,private&context=edit`))?.[0];
        if (found && found.slug !== slug) throw new Error(`unexpected page returned for slug "${slug}"`);
        if (found && !overwrite) {
            console.log(`  already exists (id ${found.id}, ${found.status}); left alone. Use --overwrite to replace it.\n`);
            continue;
        }
        if (found) {
            await mkdir("backups", { recursive: true });
            await writeFile(`backups/${slug}-${new Date().toISOString().replace(/[:.]/g, "-")}.html`, found.content?.raw ?? "", "utf8");
            await api(`/pages/${found.id}?context=edit`, { method: "POST", body: JSON.stringify({ content }) });
            console.log(`  updated id ${found.id}.\n`);
        } else {
            const page = await api(`/pages?context=edit`, { method: "POST", body: JSON.stringify({ title, slug, status: "private", content }) });
            console.log(`  created private page id ${page.id}. Edit it at ${page.link}\n`);
        }
    } catch (error) {
        failed = true;
        console.error(`${slug}: FAILED - ${error.message}\n`);
    }
}
process.exit(failed ? 1 : 0);
