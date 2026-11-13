// Copies the FINISHED DESIGN of local pages into their matching "-New" WordPress pages.
//
// What it does for each page:
//   1. Reads the page as rendered by your local dev server (so start `npm run dev` first).
//   2. Drops the site header/footer (the WordPress theme has its own) and compiles the site's CSS.
//   3. Packs the page + CSS inside a "shadow root" so the WordPress theme's styles can't clash with it.
//   4. Saves a backup of the WordPress page, writes the new content, then checks what WordPress stored.
//   5. If the WordPress page doesn't exist yet and is marked `create`, it is created (as private).
//
// Usage (project root):
//   node --env-file=.env.local scripts/push-design-to-wordpress.mjs contact           # dry run
//   node --env-file=.env.local scripts/push-design-to-wordpress.mjs contact --apply    # write
//   (page names: about, leadership, contact, projects, ways, partners, financials; leave out to do all of them)
//
// Safety: it can ONLY write to the slugs below, never to the live about / leadership / contact pages.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { parse } from "node-html-parser";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { transform } from "lightningcss";

const SITE = "https://valanthropy.org";
const LOCAL = process.env.LOCAL_URL ?? "http://localhost:3000";

// status: if set, the WordPress page is switched to that status when written.
// create: if the WordPress page doesn't exist yet, create it with this title.
const PAGES = {
    about: { route: "/about", slug: "about-new", status: "private" },
    leadership: { route: "/leadership", slug: "leadership-new" },
    contact: { route: "/contact", slug: "contact-new", status: "private" },
    projects: { route: "/projects", slug: "projects-new", status: "private", create: "Projects-New" },
    ways: { route: "/ways-to-help", slug: "ways-to-help-new", status: "private", create: "Ways to Help-New" },
    partners: { route: "/become-a-partner", slug: "partners-and-sponsors-new", status: "private", create: "Partners and Sponsors-New" },
    financials: { route: "/financials", slug: "financials-new", status: "private", create: "Financials-New" },
};
const LIVE_SLUGS = ["about", "leadership", "contact", "projects", "ways-to-help", "partners-and-sponsors", "financials"]; // never touched

const apply = process.argv.includes("--apply");
const requested = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const names = requested.length ? requested : Object.keys(PAGES);

const { WP_USER, WP_APP_PASSWORD } = process.env;
if (!WP_USER || !WP_APP_PASSWORD) {
    console.error("Set WP_USER and WP_APP_PASSWORD in .env.local first.");
    process.exit(1);
}
for (const n of names) {
    if (!PAGES[n]) {
        console.error(`Unknown page "${n}". Choose from: ${Object.keys(PAGES).join(", ")}`);
        process.exit(1);
    }
    if (LIVE_SLUGS.includes(PAGES[n].slug)) throw new Error("Refusing to touch a live page.");
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

// ---- CSS: compile the site's Tailwind CSS once, minified ----
async function buildCss() {
    const src = await readFile("app/globals.css", "utf8");
    const out = await postcss([tailwind()]).process(src, { from: "app/globals.css" });
    const { code } = transform({ filename: "site.css", code: Buffer.from(out.css), minify: true });
    return code.toString();
}

const MIME = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", gif: "image/gif", svg: "image/svg+xml" };
const inlineCache = new Map();
async function inlineImage(src) {
    const file = "public" + decodeURIComponent(src.split("?")[0]);
    if (inlineCache.has(file)) return inlineCache.get(file);
    let uri = null;
    try {
        const mime = MIME[file.split(".").pop().toLowerCase()];
        if (mime) uri = `data:${mime};base64,${(await readFile(file)).toString("base64")}`;
    } catch {}
    inlineCache.set(file, uri);
    return uri;
}

// ---- HTML: the page's sections from the local server, cleaned for WordPress ----
async function buildHtml(route) {
    const res = await fetch(LOCAL + route);
    if (!res.ok) throw new Error(`Local page ${LOCAL}${route} returned ${res.status}. Is "npm run dev" running?`);
    const doc = parse(await res.text());
    const root =
        doc.querySelectorAll("body > div").find((d) => /bg-white text-slate-900/.test(d.getAttribute("class") ?? "")) ??
        doc.querySelector("body > main");
    if (!root) throw new Error("Could not find the page root in the rendered HTML.");

    root.querySelectorAll("header, footer, script, noscript").forEach((n) => n.remove());

    const warnings = [];
    for (const img of root.querySelectorAll("img")) {
        let src = img.getAttribute("src") ?? "";
        const m = src.match(/^\/_next\/image\?url=([^&]+)/);
        if (m) src = decodeURIComponent(m[1]); // un-wrap Next's image optimizer URL
        if (src.startsWith("/")) {
            // Image only exists in this project's /public folder: embed it in the page as a data: URI.
            const data = await inlineImage(src);
            if (data) src = data;
            else warnings.push(`image not found in /public (will be broken in WordPress): ${src}`);
        }
        img.setAttribute("src", src);
        for (const a of ["srcset", "srcSet", "sizes", "data-nimg", "decoding", "loading"]) img.removeAttribute(a);
    }
    const internal = [...new Set(root.querySelectorAll("a").map((a) => a.getAttribute("href") ?? "").filter((h) => h.startsWith("/")))];
    if (internal.length) warnings.push(`links to pages of the new site (they will point at ${SITE} until the new site is live): ${internal.join(", ")}`);

    const inlined = root.querySelectorAll("img").filter((i) => (i.getAttribute("src") ?? "").startsWith("data:")).length;
    if (inlined) warnings.push(`${inlined} local image(s) embedded in the page (they are not in the WordPress media library)`);

    return { html: root.outerHTML, warnings };
}

function wrap(css, html) {
    // Gutenberg "Custom HTML" block (stops WordPress from re-formatting the markup).
    // The template + shadowrootmode creates an isolated shadow root, so theme CSS can't clash.
    return `<!-- wp:html -->\n<div class="vw-design"><template shadowrootmode="open"><style>:host{display:block}${css}</style>${html}</template></div>\n<!-- /wp:html -->`;
}

console.log(apply ? "APPLYING changes to WordPress\n" : "DRY RUN (nothing is written; add --apply)\n");
const css = await buildCss();
console.log(`compiled CSS: ${(css.length / 1024).toFixed(0)} KB\n`);

let failed = false;
for (const name of names) {
    const { route, slug, status, create } = PAGES[name];
    try {
        const { html, warnings } = await buildHtml(route);
        const content = wrap(css, html);

        const found = await api(`/pages?slug=${slug}&status=publish,draft,private&context=edit`);
        let page = found?.[0];
        if (page && page.slug !== slug) throw new Error(`unexpected page returned for slug "${slug}"`);
        if (!page && !create) throw new Error(`no page with slug "${slug}" found`);

        const action = page
            ? `update id ${page.id} (${page.status}${status && page.status !== status ? ` -> ${status}` : ""})`
            : `CREATE new ${status ?? "draft"} page "${create}"`;
        console.log(`${name}: ${route} -> ${slug}: ${action}; ${(content.length / 1024).toFixed(0)} KB of content`);
        warnings.forEach((w) => console.log(`  note: ${w}`));

        if (!apply) {
            console.log("  dry run: not written\n");
            continue;
        }

        if (page) {
            await mkdir("backups", { recursive: true });
            const stamp = new Date().toISOString().replace(/[:.]/g, "-");
            await writeFile(`backups/${slug}-${stamp}.html`, page.content?.raw ?? "", "utf8");
            page = await api(`/pages/${page.id}?context=edit`, { method: "POST", body: JSON.stringify({ content, ...(status ? { status } : {}) }) });
        } else {
            page = await api(`/pages?context=edit`, { method: "POST", body: JSON.stringify({ title: create, slug, status: status ?? "draft", content }) });
        }

        // Check what WordPress stored (works for private pages too).
        const stored = await api(`/pages/${page.id}?context=edit`);
        const raw = stored.content?.raw ?? "";
        const ok = raw.includes("shadowrootmode") && raw.includes("vw-design") && stored.slug === slug;
        let msg = ok
            ? `  written (id ${page.id}, ${stored.status}, slug ${stored.slug}).`
            : `  written, BUT the stored content doesn't look right (WordPress may have filtered it).`;
        if (stored.status === "publish") {
            const live = await fetch(`${SITE}/${slug}/?cb=${Date.now()}`).then((r) => r.text());
            msg += live.includes("shadowrootmode") ? " Front end shows the design." : " Front end does NOT show the design.";
        } else {
            msg += ` Not public (${stored.status}); view it while logged in at ${stored.link}`;
        }
        console.log(msg + "\n");
        if (!ok) failed = true;
    } catch (error) {
        failed = true;
        console.error(`${name}: FAILED - ${error.message}\n`);
    }
}
process.exit(failed ? 1 : 0);
