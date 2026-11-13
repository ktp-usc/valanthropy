import Link from "next/link";
import { parse, HTMLElement } from "node-html-parser";
import Header from "@/components/header";
import { clean } from "@/lib/wordpress";
import { contentSources } from "@/lib/content";

type Value = {
    title: string;
    desc: string;
};

type AboutContent = {
    title: string;
    mission: string[];
    story: string[];
    values: Value[];
};

// Layout
const CONTAINER =
    "mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12";
const SECTION = "py-12 md:py-16";
const TWO_COLUMNS =
    "grid items-start gap-8 md:grid-cols-2 md:gap-14";

// Typography
const EYEBROW =
    "mb-4 text-xs font-semibold uppercase tracking-widest text-red-700";
const PAGE_TITLE =
    "mb-5 max-w-4xl font-heading text-4xl font-normal leading-tight tracking-tight text-white md:text-5xl";
const SECTION_TITLE =
    "font-heading text-3xl font-normal leading-tight tracking-tight text-slate-900 md:text-4xl";
const BODY =
    "text-base font-normal leading-7 text-slate-700 md:text-lg md:leading-8";

const BUTTON =
    "inline-flex min-h-14 max-w-full items-center justify-center rounded bg-red-700 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none";

const FALLBACK: AboutContent = {
    title: "About VAlanthropy",
    mission: [
        "VAlanthropy develops affordable veteran housing communities that create pathways to stability, independence, and long-term success.",
    ],
    story: [
        "VAlanthropy is a South Carolina nonprofit built around the belief that stable housing gives veterans a foundation for rebuilding their lives. Its flagship project, Hidden Wounds Village Alpha in Sumter, aims to provide permanent, affordable housing alongside connections to community support. Beyond this first development, VAlanthropy hopes to create a housing model that other communities can adopt to help veterans achieve lasting independence.",
    ],
    values: [
        {
            title: "Stability first",
            desc: "A secure place to live is the foundation for health, work, and connection.",
        },
        {
            title: "Community support",
            desc: "Resources designed around healing and successful reintegration.",
        },
        {
            title: "Lasting independence",
            desc: "A path toward long-term stability, not short-term relief.",
        },
    ],
};

const highlights = [
    "Permanent affordable housing",
    "Veteran-focused community",
    "Support for long-term independence",
];

function normalize(text: string): string {
    return clean(text).toLowerCase();
}

function paragraphsAfter(heading?: HTMLElement): string[] {
    if (!heading?.parentNode) return [];

    const siblings = heading.parentNode.childNodes;
    const start = siblings.indexOf(heading);
    const paragraphs: string[] = [];

    for (let i = start + 1; i < siblings.length; i++) {
        const node = siblings[i];
        if (!(node instanceof HTMLElement)) continue;

        const tag = node.tagName.toLowerCase();
        if (/^h[1-6]$/.test(tag)) break;

        if (tag === "p" && !node.querySelector("img")) {
            const text = clean(node.text);
            if (text) paragraphs.push(text);
        }
    }

    return paragraphs;
}

function parseAbout(html: string): AboutContent | null {
    const root = parse(html);
    const headings = root.querySelectorAll("h2, h3");

    if (headings.length === 0) return null;

    const findHeading = (...names: string[]) =>
        headings.find((heading) =>
            names.includes(normalize(heading.text)),
        );

    const overviewHeading = findHeading("about valanthropy");
    const missionHeading = findHeading("our mission", "mission");
    const storyHeading = findHeading("our story", "our history");
    const valuesHeading = findHeading(
        "what we value",
        "what we believe",
        "our values",
    );

    if (
        !overviewHeading &&
        !missionHeading &&
        !storyHeading &&
        !valuesHeading
    ) {
        return null;
    }

    const mission = paragraphsAfter(missionHeading);

    // Use the overview when WordPress has no separate Story section.
    const story = paragraphsAfter(storyHeading ?? overviewHeading);
    const values: Value[] = [];

    if (valuesHeading) {
        const start = headings.indexOf(valuesHeading);

        for (let i = start + 1; i < headings.length; i++) {
            const heading = headings[i];

            if (heading.tagName.toLowerCase() === "h2") break;

            const description = paragraphsAfter(heading).join(" ");

            if (description) {
                values.push({
                    title: clean(heading.text),
                    desc: description,
                });
            }
        }
    }

    return {
        title: overviewHeading
            ? clean(overviewHeading.text)
            : FALLBACK.title,
        mission: mission.length ? mission : FALLBACK.mission,
        story: story.length ? story : FALLBACK.story,
        values: values.length ? values : FALLBACK.values,
    };
}

async function getAboutContent(): Promise<AboutContent> {
    try {
        const sources = await contentSources(
            "about-new",
            "about.html",
        );

        for (const html of sources) {
            const content = parseAbout(html);
            if (content) return content;
        }
    } catch (error) {
        console.error("About page: using fallback content.", error);
    }

    return FALLBACK;
}

export default async function About() {
    const content = await getAboutContent();

    return (
        <div className="bg-white font-sans text-slate-900">
            <Header active="/about" />

            <main>
                {/* Hero */}
                <section className="bg-slate-900 py-12 md:py-16">
                    <div className={CONTAINER}>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-red-300">
                            About Us | South Carolina
                        </p>

                        <h1 className={PAGE_TITLE}>
                            {content.title}
                        </h1>

                        <p className="max-w-prose text-base leading-7 text-slate-200 md:text-lg md:leading-8">
                            Building hope, one home at a time. We help
                            veterans build stability, independence, and
                            a stronger future.
                        </p>

                        <Link
                            href="/leadership"
                            className={`${BUTTON} mt-8 focus-visible:outline-white`}
                        >
                            Meet Our Leadership
                        </Link>
                    </div>
                </section>

                {/* Mission */}
                <section className={`bg-white ${SECTION}`}>
                    <div className={`${CONTAINER} ${TWO_COLUMNS}`}>
                        <div>
                            <h2 className={`mb-6 ${SECTION_TITLE}`}>
                                Our Mission
                            </h2>

                            <div className="space-y-4">
                                {content.mission.map((paragraph, i) => (
                                    <p key={i} className={BODY}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <ul className="space-y-5 border-l-4 border-red-700 pl-6 text-base font-semibold leading-7 text-slate-900 md:text-lg">
                            {highlights.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-3"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-red-700"
                                    />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Story */}
                <section className={`bg-slate-50 ${SECTION}`}>
                    <div className={CONTAINER}>
                        <p className={EYEBROW}>Our purpose</p>

                        <h2 className={`mb-6 ${SECTION_TITLE}`}>
                            Our Story
                        </h2>

                        <div className="max-w-3xl space-y-4">
                            {content.story.map((paragraph, i) => (
                                <p key={i} className={BODY}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className={`bg-slate-900 text-white ${SECTION}`}>
                    <div className={CONTAINER}>
                        <h2 className="mb-8 font-heading text-3xl font-normal leading-tight tracking-tight md:text-4xl">
                            What we believe
                        </h2>

                        <ul className="grid gap-8 md:grid-cols-3 md:gap-10">
                            {content.values.map((value) => (
                                <li
                                    key={value.title}
                                    className="border-t border-white/25 pt-6"
                                >
                                    <h3 className="mb-3 font-sans text-xl font-semibold leading-snug text-red-300">
                                        {value.title}
                                    </h3>

                                    <p className="text-base leading-7 text-slate-200 md:text-lg md:leading-8">
                                        {value.desc}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* CTA */}
                <section className={`bg-white text-center ${SECTION}`}>
                    <div className={CONTAINER}>
                        <h2 className={`mb-6 ${SECTION_TITLE}`}>
                            Be part of what comes next.
                        </h2>

                        <p className={`mx-auto max-w-prose ${BODY}`}>
                            Your donation, sponsorship, or shared
                            connection helps move the village forward.
                        </p>

                        <Link
                            href="/ways-to-help"
                            className={`${BUTTON} mt-8 focus-visible:outline-red-700`}
                        >
                            Help Build the Village
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}