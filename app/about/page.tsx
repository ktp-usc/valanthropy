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

const CONTAINER = "mx-auto max-w-5xl";
const HERO =
    "bg-slate-900 px-4 py-10 text-white sm:px-8 sm:py-12 md:px-16 md:py-16";
const LIGHT_SECTION =
    "bg-white px-4 py-10 sm:px-8 sm:py-12 md:px-16 md:py-14";
const DARK_SECTION =
    "bg-blue-900 px-4 py-10 text-white sm:px-8 sm:py-12 md:px-16 md:py-14";
const BODY = "text-sm leading-7 text-slate-600";
const BUTTON =
    "inline-flex min-h-11 max-w-full items-center justify-center rounded bg-red-700 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-800 sm:px-8 sm:text-xs";

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

/**
 * Read paragraphs immediately following a heading.
 * Images are skipped; the next heading ends the text group.
 */
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

    const mission = paragraphsAfter(missionHeading);

    // The existing WordPress page has an overview rather than
    // a separate Story section. Use that until a Story heading exists.
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
        console.error(
            "About page: using fallback content.",
            error,
        );
    }

    return FALLBACK;
}

export default async function About() {
    const content = await getAboutContent();

    return (
        <div className="bg-white text-slate-900">
            <Header active="/about" />

            <main>
                {/* Hero */}
                <section className={HERO}>
                    <div className={CONTAINER}>
                        <p className="mb-4 text-[10px] uppercase tracking-wide text-red-500">
                            About Us | South Carolina
                        </p>

                        <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl">
                            {content.title}
                        </h1>

                        <p className="mb-4 text-2xl font-bold leading-tight sm:text-4xl">
                            Building hope, one home at a time. We help
                            veterans build stability, independence,
                            and a stronger future.
                        </p>

                        <Link
                            href="/leadership"
                            className={`${BUTTON} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
                        >
                            Meet Our Leadership
                        </Link>
                    </div>
                </section>

                {/* Mission */}
                <section className={LIGHT_SECTION}>
                    <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
                        <div>
                            <h2 className="mb-3 text-2xl font-bold">
                                Our mission
                            </h2>

                            <div className="space-y-4">
                                {content.mission.map((paragraph, i) => (
                                    <p key={i} className={BODY}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <ul className="space-y-3 text-sm font-semibold">
                            {highlights.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="h-2 w-2 shrink-0 rounded-full bg-red-700"
                                    />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Story */}
                <section className={LIGHT_SECTION}>
                    <div className={CONTAINER}>
                        <h2 className="mb-2 text-2xl font-bold">
                            Our story
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
                <section className={DARK_SECTION}>
                    <div className={CONTAINER}>
                        <h2 className="mb-6 text-2xl font-bold">
                            What we believe
                        </h2>

                        <div className="grid gap-6 md:grid-cols-3">
                            {content.values.map((value) => (
                                <div key={value.title}>
                                    <h3 className="mb-1 text-sm font-semibold text-red-400">
                                        {value.title}
                                    </h3>

                                    <p className="text-sm leading-7">
                                        {value.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-white px-4 py-10 text-center sm:px-8 sm:py-12 md:py-16">
                    <h2 className="mb-2 text-2xl font-bold">
                        Be part of what comes next.
                    </h2>

                    <p className="mb-6 text-sm leading-7 text-slate-600">
                        Your donation, sponsorship, or shared
                        connection helps move the village forward.
                    </p>

                    <Link
                        href="/ways-to-help"
                        className={`${BUTTON} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700`}
                    >
                        Help Build the Village
                    </Link>
                </section>
            </main>
        </div>
    );
}