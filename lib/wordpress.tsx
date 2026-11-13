import type { ReactNode } from "react";
import { parse, HTMLElement, TextNode, type Node } from "node-html-parser";

/**
 * Shared helpers for pages whose content is edited in WordPress.
 * Content is read through the WordPress REST API and rendered
 * with this app's styling.
 */

export const WP_ORIGIN = "https://valanthropy.org";
export const REVALIDATE_SECONDS = 300;

// WordPress links to these pages become in-app links.
const APP_ROUTES = [
    "about",
    "leadership",
    "contact",
    "financials",
    "news",
    "become-a-partner",
    "projects",
    "start-a-conversation",
    "ways-to-help",
];

/** Collapse whitespace and non-breaking spaces. */
export const clean = (s: string) =>
    s.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();

/** Fetch one WordPress page by slug; return null if unavailable. */
export async function fetchWpPage(
    slug: string,
): Promise<{ title: string; html: string } | null> {
    try {
        // Server-side credentials allow access to private content pages.
        const { WP_USER, WP_APP_PASSWORD } = process.env;
        const authed = Boolean(WP_USER && WP_APP_PASSWORD);

        const res = await fetch(
            `${WP_ORIGIN}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}${
                authed ? "&status=publish,private" : ""
            }`,
            {
                next: { revalidate: REVALIDATE_SECONDS },
                ...(authed
                    ? {
                          headers: {
                              Authorization:
                                  "Basic " +
                                  Buffer.from(
                                      `${WP_USER}:${WP_APP_PASSWORD}`,
                                  ).toString("base64"),
                          },
                      }
                    : {}),
            },
        );

        if (!res.ok) {
            const detail = await res.json().catch(() => null);

            console.error("WordPress request failed:", {
                slug,
                status: res.status,
                code: detail?.code,
                message: detail?.message,
            });

            throw new Error(`WordPress responded ${res.status}`);
        }

        const pages = await res.json();
        const html: string | undefined = pages?.[0]?.content?.rendered;

        if (!html) {
            throw new Error(`No content returned for "${slug}"`);
        }

        return {
            title: clean(parse(pages[0].title?.rendered ?? "").text),
            html,
        };
    } catch (error) {
        console.error(
            `WordPress page "${slug}" unavailable; using static content.`,
            error,
        );
        return null;
    }
}

export function toHref(url: string): string {
    try {
        const u = new URL(url, WP_ORIGIN);

        if (u.origin === WP_ORIGIN) {
            const first = u.pathname.split("/").filter(Boolean)[0] ?? "";

            if (APP_ROUTES.includes(first)) {
                return u.pathname.replace(/\/$/, "") || "/";
            }
        }

        // Allow only web, email, and telephone links.
        return ["http:", "https:", "mailto:", "tel:"].includes(u.protocol)
            ? u.href
            : "#";
    } catch {
        return "#";
    }
}

/** Render inline WordPress text, formatting, line breaks, and links. */
export function renderInline(
    nodes: Node[],
    linkClass = "underline",
): ReactNode[] {
    return nodes.map((node, i) => {
        if (node instanceof TextNode) {
            return node.text;
        }

        if (!(node instanceof HTMLElement)) {
            return null;
        }

        const tag = node.tagName.toLowerCase();
        const kids = renderInline(node.childNodes, linkClass);

        if (tag === "b" || tag === "strong") {
            return <strong key={i}>{kids}</strong>;
        }

        if (tag === "i" || tag === "em") {
            return <em key={i}>{kids}</em>;
        }

        if (tag === "br") {
            return <br key={i} />;
        }

        if (tag === "a") {
            const newTab = node.getAttribute("target") === "_blank";

            return (
                <a
                    key={i}
                    href={toHref(node.getAttribute("href") ?? "")}
                    className={linkClass}
                    {...(newTab
                        ? {
                              target: "_blank",
                              rel: "noopener noreferrer",
                          }
                        : {})}
                >
                    {kids}
                </a>
            );
        }

        return <span key={i}>{kids}</span>;
    });
}

export type FlatSection = {
    title: string;
    nodes: Node[];
};

/**
 * Split flat WordPress content into sections at each h2.
 * Headings and content must share one parent.
 */
export function splitSections(html: string): FlatSection[] {
    const firstH2 = parse(html).querySelector("h2");

    if (!firstH2?.parentNode) {
        return [];
    }

    const sections: FlatSection[] = [];
    let current: FlatSection | null = null;

    for (const node of firstH2.parentNode.childNodes) {
        if (
            node instanceof HTMLElement &&
            node.tagName.toLowerCase() === "h2"
        ) {
            current = {
                title: clean(node.text),
                nodes: [],
            };
            sections.push(current);
        } else if (current) {
            current.nodes.push(node);
        }
    }

    return sections;
}

/**
 * Split sentences that have been run together without a space.
 * Text with existing spaces is left alone.
 */
export function splitRunTogether(text: string): string[] {
    return clean(text)
        .split(/(?<=[.!?])(?=[A-Z])|(?<=\d)(?=[A-Z][a-z])/)
        .map((s) => s.trim())
        .filter(Boolean);
}