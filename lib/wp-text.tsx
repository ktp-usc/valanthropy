import { cache, type ReactNode } from "react";
import { parse } from "node-html-parser";
import { fetchWpPage, renderInline } from "@/lib/wordpress";
import { slotId, textOf } from "@/lib/wp-slot-id";

export { slotId };

/*
 * Editable text. Wrap any text in a page like this:
 *
 *     const T = slotText("contact-new");        // once per page file: the WordPress page slug
 *     <h2><T>Contact Options</T></h2>
 *
 * - If the WordPress page has a block for this text, the WordPress version is shown.
 * - Otherwise (no WordPress page, WordPress down, block deleted) the text written in the code is
 *   shown, so the site never breaks.
 *
 * Each piece of text is matched to its WordPress block by an id made from the text in the code
 * (see slotId). Editors only ever change the words; the design stays in code. If a developer
 * changes the wording in the code, that text gets a new id and shows the new wording until the
 * WordPress page is regenerated with `npm run wp:text`.
 */

/** id -> inner HTML of every editable block on the WordPress page (cached for the request). */
const loadSlots = cache(async (page: string): Promise<Map<string, string>> => {
    const slots = new Map<string, string>();
    const wp = await fetchWpPage(page); // null (and logged) if WordPress is unreachable
    // The old push script stored a frozen design copy here; it holds no editable blocks.
    if (!wp || wp.html.includes("shadowrootmode")) return slots;
    for (const el of parse(wp.html).querySelectorAll("[id^='t-']")) {
        slots.set(el.getAttribute("id") ?? "", el.innerHTML);
    }
    return slots;
});

export function slotText(page: string) {
    return async function T({ children }: { children?: ReactNode }) {
        const id = slotId(textOf(children));
        if (!id) return <>{children}</>;
        const html = (await loadSlots(page)).get(id);
        // data-wp-slot lets scripts/sync-wp-text.mjs find every editable piece of text on the page.
        return (
            <span data-wp-slot={id} className="contents">
                {html !== undefined ? renderInline(parse(html).childNodes) : children}
            </span>
        );
    };
}

/** For client pages: every editable block on the WordPress page, already turned into React nodes. */
export async function loadSlotNodes(page: string): Promise<Record<string, ReactNode>> {
    const out: Record<string, ReactNode> = {};
    for (const [id, html] of await loadSlots(page)) out[id] = renderInline(parse(html).childNodes);
    return out;
}
