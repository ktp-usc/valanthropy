import Link from "next/link";
import type { ReactNode } from "react";
import { HTMLElement, type Node } from "node-html-parser";
import Header from "@/components/header";
import {
    clean,
    fetchWpPage,
    renderInline,
    splitRunTogether,
    splitSections,
    toHref,
    type FlatSection,
} from "@/lib/wordpress";
import { slotText } from "@/lib/wp-text";

// Text wrapped in <T> can be edited in the WordPress page "contact-new".
const T = slotText("contact-new");

/*
 * Contact page. Text is edited in WordPress on a page with the slug below (a separate
 * page for this site, not the live site's own Contact page) and shown here in this
 * site's design. Each block below falls back to DEFAULTS if WordPress is unreachable
 * or that part of the page can't be found.
 *
 * Connected to WordPress: contact options, contact information, nonprofit information,
 * veteran support partner, privacy notice.
 * Kept in code on purpose: the hero, and the "Veteran in Crisis" section (safety-critical).
 */

const EMAIL = "info@valanthropy.org";
const mailto = (subject: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

// Slug of the WordPress page that holds this page's content.
const WP_SLUG = "contact-new";

const LINK_CLASS = "font-semibold text-blue-900 hover:underline";
const optionButtonClass =
    "inline-block rounded bg-red-700 px-14 py-5 text-base font-semibold text-white";

type Option = { title: string; desc: string; cta: string; href: string };
type InfoItem = { label: string; value: ReactNode };
type ContactContent = {
    optionsIntro: string;
    options: Option[];
    info: InfoItem[];
    nonprofit: string[];
    partner: { name: string; desc: string; items: InfoItem[] };
    privacy: string[];
};

const DEFAULTS: ContactContent = {
    optionsIntro: "Choose the option that best fits your needs.",
    options: [
        {
            title: "General Contact",
            desc: "Have questions about VAlanthropy, Hidden Wounds Village Alpha, donations, sponsorships, partnerships, events, or our mission?",
            cta: "General Contact Form",
            href: "/start-a-conversation",
        },
        {
            title: "Stay in Touch",
            desc: "Receive project updates, newsletters, event announcements, volunteer opportunities, and ways to support Hidden Wounds Village Alpha.",
            cta: "Stay in Touch",
            href: mailto("Stay in touch"),
        },
        {
            title: "Request a Speaker",
            desc: "Invite VAlanthropy to speak at your church, business, civic organization, veteran group, school, or community event.",
            cta: "Request a Speaker",
            href: mailto("Speaker request"),
        },
    ],
    info: [
        {
            label: "Mailing Address",
            value: (
                <>
                    VAlanthropy
                    <br />
                    P.O. Box 5230
                    <br />
                    Columbia, SC 29250
                </>
            ),
        },
        {
            label: "Project Address",
            value: (
                <>
                    VAlanthropy&rsquo;s Hidden Wounds Village Alpha
                    <br />
                    22 S. Washington St.
                    <br />
                    Sumter, SC 29150
                </>
            ),
        },
        {
            label: "Phone",
            value: (
                <a href="tel:+18337258388" className={LINK_CLASS}><T>
                    1-833 SALUTEU [725-8388]
                </T></a>
            ),
        },
        {
            label: "Email",
            value: (
                <a href={`mailto:${EMAIL}`} className={LINK_CLASS}><T>
                    {EMAIL}
                </T></a>
            ),
        },
    ],
    nonprofit: [
        "VAlanthropy is a registered 501(c)(3) nonprofit organization.",
        "EIN: 88-0840494",
        "Donations are tax-deductible to the fullest extent allowed by law.",
    ],
    partner: {
        name: "Hidden Wounds Resource Center",
        desc: "Hidden Wounds Resource Center serves as VAlanthropy’s veteran support partner for Hidden Wounds Village Alpha, providing veteran intake, care coordination, referrals, service connections, and ongoing resident support.",
        items: [
            {
                label: "Address",
                value: (
                    <>
                        Hidden Wounds Resource Center
                        <br />
                        21 S. Washington St.
                        <br />
                        Sumter, SC 29150
                    </>
                ),
            },
            {
                label: "Phone",
                value: (
                    <a href="tel:+18036604357" className={LINK_CLASS}><T>
                        (803) 660-HELP
                    </T></a>
                ),
            },
            {
                label: "Email",
                value: (
                    <a href="mailto:info@hiddenwounds.com" className={LINK_CLASS}><T>
                        info@hiddenwounds.com
                    </T></a>
                ),
            },
        ],
    },
    privacy: [
        "Please do not submit medical records, emergency details, or highly sensitive personal information through this website form.",
        "For veteran support, intake, or service-related questions, please contact Hidden Wounds Resource Center directly.",
    ],
};

/* ---------- Read the WordPress page ---------- */

const elementsOf = (nodes: Node[]) => nodes.filter((n): n is HTMLElement => n instanceof HTMLElement);
const tagOf = (el: HTMLElement) => el.tagName.toLowerCase();
const findSection = (sections: FlatSection[], re: RegExp) =>
    sections.find((s) => re.test(s.title.toLowerCase()));

// Plain paragraphs of a section, with run-together sentences split apart.
function paragraphsOf(section: FlatSection): string[] {
    return elementsOf(section.nodes)
        .filter((el) => tagOf(el) === "p")
        .flatMap((p) => splitRunTogether(p.text));
}

// A list of cards: <ul><li><h3>Label</h3><p>Value</p></li>...</ul>
function itemsOf(nodes: Node[]): InfoItem[] {
    const ul = elementsOf(nodes).find((el) => tagOf(el) === "ul");
    if (!ul) return [];
    return ul.querySelectorAll("li").flatMap((li) => {
        const label = clean(li.querySelector("h3")?.text ?? "");
        const ps = li.querySelectorAll("p");
        if (!label || ps.length === 0) return [];
        const value = (
            <>
                {ps.map((p, i) => (
                    <span key={i}>
                        {i > 0 && <br />}
                        {renderInline(p.childNodes, LINK_CLASS)}
                    </span>
                ))}
            </>
        );
        return [{ label, value }];
    });
}

function optionsOf(section: FlatSection): { intro?: string; options: Option[] } {
    let intro: string | undefined;
    const options: Option[] = [];
    let current: Option | undefined;

    for (const el of elementsOf(section.nodes)) {
        const tag = tagOf(el);
        if (tag === "h3") {
            current = { title: clean(el.text), desc: "", cta: "", href: "" };
            options.push(current);
        } else if (tag === "p") {
            const text = clean(el.text);
            if (!current) intro = intro ?? (text || undefined);
            else if (text) current.desc = text;
        } else if (tag === "a" && current) {
            current.cta = clean(el.text);
            current.href = toHref(el.getAttribute("href") ?? "");
        }
    }
    return { intro, options: options.filter((o) => o.title && o.cta && o.href) };
}

// The text for this page lives in this file (DEFAULTS). The WordPress page "contact-new" is a
// mirror of the finished design (written by scripts/push-design-to-wordpress.mjs), so it must
// NOT be read back as content. Set to true to edit the text in WordPress instead.
const READ_FROM_WORDPRESS = false;

async function getContent(): Promise<ContactContent> {
    if (!READ_FROM_WORDPRESS) return DEFAULTS;
    const page = await fetchWpPage(WP_SLUG);
    if (!page) return DEFAULTS;

    const sections = splitSections(page.html);
    const content: ContactContent = { ...DEFAULTS };

    const opts = findSection(sections, /contact options/);
    if (opts) {
        const { intro, options } = optionsOf(opts);
        if (options.length > 0) content.options = options;
        if (intro) content.optionsIntro = intro;
    }

    const info = findSection(sections, /contact information/);
    if (info) {
        const items = itemsOf(info.nodes);
        if (items.length > 0) content.info = items;
    }

    const nonprofit = findSection(sections, /nonprofit/);
    if (nonprofit) {
        const lines = paragraphsOf(nonprofit);
        if (lines.length > 0) content.nonprofit = lines;
    }

    const partner = findSection(sections, /veteran support partner/);
    if (partner) {
        const els = elementsOf(partner.nodes);
        const name = clean(els.find((el) => tagOf(el) === "h3")?.text ?? "");
        const desc = clean(els.find((el) => tagOf(el) === "p")?.text ?? "");
        const items = itemsOf(partner.nodes);
        content.partner = {
            name: name || DEFAULTS.partner.name,
            desc: desc || DEFAULTS.partner.desc,
            items: items.length > 0 ? items : DEFAULTS.partner.items,
        };
    }

    const privacy = findSection(sections, /privacy/);
    if (privacy) {
        const lines = paragraphsOf(privacy);
        if (lines.length > 0) content.privacy = lines;
    }

    return content;
}

/* ---------- Page ---------- */

export default async function Contact() {
    const content = await getContent();

    return (
        <div className="bg-white text-slate-900">
            <Header active="/contact" />

            {/* Hero */}
            <section className="bg-slate-900 px-8 py-16 text-white md:px-16">
                <div className="mx-auto max-w-5xl">
                    <p className="mb-4 text-[16px] uppercase tracking-wide text-red-500"><T>Contact</T></p>
                    <h1 className="mb-4 text-4xl font-bold leading-tight"><T>
                        Contact VAlanthropy Today
                    </T></h1>
                    <p className="max-w-md text-sm"><T>
                        Have questions, want to support our mission, or need help finding the right
                        next step? We&rsquo;re here to help.
                    </T></p>
                </div>
            </section>

            {/* Contact options */}
            <section className="bg-white px-4 py-14 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-2 text-2xl font-bold text-red-700"><T>Contact Options</T></h2>
                    <p className="mb-6 text-sm text-slate-600"><T>{content.optionsIntro}</T></p>
                    <ul className="space-y-4">
                        {content.options.map((o) => (
                            <li
                                key={o.title}
                                className="flex flex-col gap-4 rounded border border-slate-200 p-6 md:flex-row md:items-center md:justify-between md:gap-8"
                            >
                                <div className="max-w-2xl">
                                    <h3 className="mb-2 text-lg font-bold"><T>{o.title}</T></h3>
                                    <p className="text-sm text-slate-600"><T>{o.desc}</T></p>
                                </div>
                                {o.href.startsWith("/") ? (
                                    <Link
                                        href={o.href}
                                        className={`${optionButtonClass} shrink-0 self-start text-center md:self-auto`}
                                    ><T>
                                        {o.cta}
                                    </T></Link>
                                ) : (
                                    <a
                                        href={o.href}
                                        className={`${optionButtonClass} shrink-0 self-start text-center md:self-auto`}
                                    ><T>
                                        {o.cta}
                                    </T></a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Contact information */}
            <section className="bg-slate-100 px-8 py-14 md:px-16">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-700"><T>
                        VAlanthropy
                    </T></h2>
                    <h3 className="mb-6 text-2xl font-bold"><T>Contact Information</T></h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {content.info.map((item) => (
                            <div
                                key={item.label}
                                className="rounded border border-slate-200 bg-white p-5 text-sm"
                            >
                                <h4 className="mb-2 font-bold"><T>{item.label}</T></h4>
                                <div>{item.value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-sm text-slate-600">
                        <h4 className="mb-2 font-bold text-slate-900"><T>Nonprofit Information</T></h4>
                        {content.nonprofit.map((line, i) => (
                            <p
                                key={i}
                                className={
                                    /^EIN/i.test(line) ? "mb-1 font-semibold text-slate-900" : "mb-1"
                                }
                            ><T>
                                {line}
                            </T></p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Veteran support partner */}
            <section className="bg-white px-8 py-14 md:px-16">
                <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
                    <div>
                        <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-700"><T>
                            Veteran Support Partner
                        </T></h2>
                        <h3 className="mb-3 text-2xl font-bold"><T>{content.partner.name}</T></h3>
                        <p className="text-sm text-slate-600"><T>{content.partner.desc}</T></p>
                    </div>
                    <div className="space-y-4 self-start rounded border border-slate-200 p-6 text-sm">
                        {content.partner.items.map((item) => (
                            <div key={item.label}>
                                <p className="text-xs uppercase tracking-wide text-slate-500"><T>
                                    {item.label}
                                </T></p>
                                <div>{item.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Crisis line (kept in code: safety-critical) */}
            <section className="bg-blue-900 px-8 py-14 text-white md:px-16">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-4 text-2xl font-bold"><T>If You Are a Veteran in Crisis</T></h2>
                    <p className="mb-3 max-w-2xl text-sm font-bold text-red-400"><T>
                        If you or someone you know is in immediate danger, call 911 immediately.
                    </T></p>
                    <p className="mb-4 max-w-2xl text-sm"><T>
                        Veterans, service members, and their loved ones can reach the Veterans
                        Crisis Line 24 hours a day, 7 days a week.
                    </T></p>
                    <ul className="mb-4 space-y-1 text-sm font-semibold">
                        <li><T>Call: 988, then press 1</T></li>
                        <li><T>Text: 838255</T></li>
                        <li><T>
                            Online Chat:{" "}
                            <a
                                href="https://www.veteranscrisisline.net"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                Veterans Crisis Line
                            </a>
                        </T></li>
                    </ul>
                    <p className="mb-4 max-w-2xl text-sm"><T>
                        The previous number, 1-800-273-8255 and press 1, may also connect callers
                        to the Veterans Crisis Line.
                    </T></p>
                    <p className="max-w-2xl text-sm text-slate-300"><T>
                        VAlanthropy and Hidden Wounds Resource Center are not emergency response
                        providers. Website forms, emails, and phone messages are not monitored in
                        real time. If this is an emergency or immediate safety concern, call 911 or
                        contact the Veterans Crisis Line right away.
                    </T></p>
                </div>
            </section>

            {/* Privacy & response notice */}
            <section className="bg-slate-100 px-8 py-14 md:px-16">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-4 text-2xl font-bold text-red-700"><T>
                        Privacy &amp; Response Notice
                    </T></h2>
                    <div className="max-w-2xl space-y-3 text-sm text-slate-600">
                        {content.privacy.map((line, i) => (
                            <p key={i}><T>{line}</T></p>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
