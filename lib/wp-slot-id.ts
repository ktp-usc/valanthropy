import { Children, isValidElement, type ReactNode } from "react";

/* Pure helpers shared by the server <T> (lib/wp-text.tsx) and the client <T> (lib/wp-text-client.tsx). */

/** Plain text of a React node (used to build the id). */
export function textOf(node: ReactNode): string {
    if (node === null || node === undefined || typeof node === "boolean") return "";
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(textOf).join("");
    if (isValidElement(node)) {
        const el = node as { type: unknown; props: { children?: ReactNode } };
        if (el.type === "br") return " ";
        return Children.toArray(el.props.children).map(textOf).join("");
    }
    return "";
}

const clean = (s: string) =>
    s
        .replace(/\u00a0/g, " ")
        .replace(/\s+/g, " ")
        .trim();

/** Short stable hash (FNV-1a) so two texts with the same first words get different ids. */
function hash(s: string): string {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(36).slice(0, 5);
}

/** id for a piece of text: "t-" + first words + short hash of the whole text. Null if it isn't real text. */
export function slotId(text: string): string | null {
    const t = clean(text);
    if ((t.match(/[A-Za-z]/g) ?? []).length < 2) return null; // symbols, arrows, numbers only
    const words = t
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 5)
        .join("-");
    return `t-${words || "text"}-${hash(t)}`;
}
