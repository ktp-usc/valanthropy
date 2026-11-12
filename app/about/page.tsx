import Link from "next/link";
import type { ReactNode } from "react";
import { parse, HTMLElement, type Node } from "node-html-parser";
import Header from "@/components/header";
import { renderInline, toHref } from "@/lib/wordpress";
import { readContent } from "@/lib/content";

/*
 * About page. The text lives in content/about.html (edit it there, in VS Code). It is parsed into
 * sections (split on <h2>) and shown with this site's styling. Say "UPDATE WORDPRESS PAGES" to copy
 * the finished design to the About-New page in WordPress.
 * If the file is missing or unreadable, FALLBACK is shown.
 */

type LinkItem = { href: string; label: string };
type Block =
    | { type: "heading"; content: ReactNode }
    | { type: "paragraph"; content: ReactNode }
    | { type: "list"; items: ReactNode[] }
    | { type: "image"; src: string; alt: string }
    | { type: "links"; links: LinkItem[] };
type Section = { title: string; blocks: Block[] };

const FALLBACK: Section[] = [
    {
        title: "About VAlanthropy",
        blocks: [
            {
                type: "paragraph",
                content:
                    "VAlanthropy is a registered 501(c)(3) nonprofit organization dedicated to developing affordable veteran housing communities that promote healing, stability, independence, and long-term success.",
            },
        ],
    },
];

/* ---------- Fetch + parse ---------- */

async function getSections(): Promise<{ sections: Section[]; fromWordPress: boolean }> {
    try {
        const sections = parseSections(await readContent("about.html"));
        if (sections.length === 0) throw new Error("No sections found in content");
        return { sections, fromWordPress: true };
    } catch (error) {
        console.error("About page: falling back to static content.", error);
        return { sections: FALLBACK, fromWordPress: false };
    }
}

const NBSP = /\u00a0/g;

function parseSections(html: string): Section[] {
    const root = parse(html);
    const firstH2 = root.querySelector("h2");
    if (!firstH2?.parentNode) return [];

    const sections: Section[] = [];
    let current: Section | null = null;
    let run: Node[] = []; // loose inline content (text, links, bold) awaiting a block

    const flushRun = () => {
        const nodes = run;
        run = [];
        if (!current) return;
        const text = nodes.map((n) => n.text).join("").replace(NBSP, " ").trim();
        if (text === "") return;
        const meaningful = nodes.filter((n) => n.text.replace(NBSP, " ").trim() !== "");
        const onlyLinks = meaningful.every(
            (n) => n instanceof HTMLElement && n.tagName.toLowerCase() === "a",
        );
        if (onlyLinks) {
            // Only links -> buttons
            current.blocks.push({
                type: "links",
                links: (meaningful as HTMLElement[]).map((a) => ({
                    href: toHref(a.getAttribute("href") ?? ""),
                    label: a.text.trim(),
                })),
            });
        } else {
            current.blocks.push({ type: "paragraph", content: renderInline(nodes) });
        }
    };

    const pushImage = (img: HTMLElement) => {
        if (!current) return;
        current.blocks.push({
            type: "image",
            src: img.getAttribute("src") ?? "",
            alt: img.getAttribute("alt") ?? "",
        });
    };

    for (const el of firstH2.parentNode.childNodes) {
        const tag = el instanceof HTMLElement ? el.tagName.toLowerCase() : "";

        // Loose text, links and bold/italic text are gathered into one paragraph/link row.
        if (!(el instanceof HTMLElement) || ["a", "b", "strong", "i", "em", "span", "br"].includes(tag)) {
            run.push(el);
            continue;
        }

        flushRun();

        if (tag === "h2") {
            current = { title: el.text.replace(/\s+/g, " ").trim(), blocks: [] };
            sections.push(current);
        } else if (!current) {
            continue;
        } else if (/^h[3-6]$/.test(tag)) {
            current.blocks.push({ type: "heading", content: renderInline(el.childNodes) });
        } else if (tag === "ul" || tag === "ol") {
            current.blocks.push({
                type: "list",
                items: el.querySelectorAll("li").map((li) => renderInline(li.childNodes)),
            });
        } else if (tag === "img") {
            pushImage(el);
        } else if (tag === "figure") {
            const img = el.querySelector("img");
            if (img) pushImage(img);
        } else if (tag === "p") {
            const img = el.querySelector("img");
            if (img) pushImage(img);
            else {
                run = el.childNodes.slice();
                flushRun();
            }
        }
    }
    flushRun();
    return sections;
}

/* ---------- Rendering ---------- */

function BlockView({ block, dark, icon = false }: { block: Block; dark: boolean; icon?: boolean }) {
    const muted = dark ? "text-slate-200" : "text-slate-600";
    switch (block.type) {
        case "heading":
            return <h3 className="mt-6 mb-1 text-lg font-semibold">{block.content}</h3>;
        case "paragraph":
            return <p className={`mb-4 text-sm leading-relaxed ${muted}`}>{block.content}</p>;
        case "list":
            return (
                <ul className="mb-4 space-y-2 text-sm font-semibold">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <span className="h-2 w-2 shrink-0 rounded-full bg-red-700" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );
        case "image":
            return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={block.src}
                    alt={block.alt}
                    className={
                        icon
                            ? "mb-2 h-14 w-14 object-contain"
                            : "my-4 max-h-96 w-full max-w-3xl rounded object-cover"
                    }
                />
            );
        case "links":
            return (
                <div className={`mt-4 flex flex-wrap gap-3 ${dark ? "justify-center" : ""}`}>
                    {block.links.map((l) => (
                        <LinkButton key={l.label} {...l} />
                    ))}
                </div>
            );
    }
}

function LinkButton({ href, label }: LinkItem) {
    const className =
        "inline-block rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white";
    return href.startsWith("/") ? (
        <Link href={href} className={className}>
            {label}
        </Link>
    ) : (
        <a href={href} className={className}>
            {label}
        </a>
    );
}

// An image directly followed by a heading starts a card (e.g. the icons in "What We Value").
// Blocks before the first card and after the last card are shown normally around the grid.
function splitCards(blocks: Block[]): { before: Block[]; cards: Block[][]; after: Block[] } | null {
    const before: Block[] = [];
    const cards: Block[][] = [];
    const after: Block[] = [];
    let inCards = false;

    blocks.forEach((b, i) => {
        const startsCard = b.type === "image" && blocks[i + 1]?.type === "heading";
        if (startsCard) {
            cards.push([b]);
            inCards = true;
        } else if (inCards && b.type === "image") {
            inCards = false; // a loose picture ends the grid
            after.push(b);
        } else if (inCards) {
            cards[cards.length - 1].push(b);
        } else if (cards.length === 0) {
            before.push(b);
        } else {
            after.push(b);
        }
    });

    return cards.length >= 2 ? { before, cards, after } : null;
}

function CardGrid({ cards, dark }: { cards: Block[][]; dark: boolean }) {
    return (
        <div className={`grid gap-6 sm:grid-cols-2 ${cards.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
            {cards.map((card, i) => (
                <div key={i}>
                    {card.map((b, j) => (
                        <BlockView key={j} block={b} dark={dark} icon />
                    ))}
                </div>
            ))}
        </div>
    );
}

function SectionView({ section, index, isLast }: { section: Section; index: number; isLast: boolean }) {
    const isHero = index === 0;
    const isCta = isLast && index > 0 && section.blocks.some((b) => b.type === "links");
    const dark = isHero || isCta;
    const bg = isHero
        ? "bg-slate-900 text-white"
        : isCta
          ? "bg-blue-900 text-white"
          : index % 2 === 0
            ? "bg-slate-50 text-slate-900"
            : "bg-white text-slate-900";
    const grid = splitCards(section.blocks);

    return (
        <section className={`${bg} px-8 py-14 md:px-16`}>
            <div className={`mx-auto max-w-5xl ${isCta ? "text-center" : ""}`}>
                {isHero ? (
                    <>
                        <p className="mb-4 text-[10px] uppercase tracking-wide text-red-500">
                            About Us | South Carolina
                        </p>
                        <h1 className="mb-4 text-4xl font-bold leading-tight">{section.title}</h1>
                    </>
                ) : (
                    <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
                )}
                {grid ? (
                    <>
                        {grid.before.map((b, i) => (
                            <BlockView key={`b${i}`} block={b} dark={dark} />
                        ))}
                        <CardGrid cards={grid.cards} dark={dark} />
                        {grid.after.map((b, i) => (
                            <BlockView key={`a${i}`} block={b} dark={dark} />
                        ))}
                    </>
                ) : (
                    section.blocks.map((b, i) => <BlockView key={i} block={b} dark={dark} />)
                )}
                {isHero && (
                    <Link
                        href="/leadership"
                        className="mt-2 inline-block rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white"
                    >
                        Meet Our Leadership
                    </Link>
                )}
            </div>
        </section>
    );
}

export default async function About() {
    const { sections } = await getSections();

    return (
        <div className="bg-white text-slate-900">
            <Header active="/about" />
            {sections.map((section, i) => (
                <SectionView
                    key={`${section.title}-${i}`}
                    section={section}
                    index={i}
                    isLast={i === sections.length - 1}
                />
            ))}
        </div>
    );
}
