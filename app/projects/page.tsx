import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import ProjectProgress from "@/components/project-progress";

export const metadata: Metadata = {
    title: "Projects | VAlanthropy",
    description:
        "Learn about Hidden Wounds Village Alpha, VAlanthropy's flagship veteran housing initiative.",
};

// Layout
const PAGE = "bg-white font-sans text-slate-900";
const CONTAINER =
    "mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12";
const SECTION = "py-12 md:py-16";
const TWO_COLUMNS =
    "grid items-start gap-8 md:grid-cols-2 md:gap-14";
const HERO_COLUMNS =
    "grid items-center gap-10 md:grid-cols-2 md:gap-14";
const THREE_COLUMNS =
    "grid gap-8 md:grid-cols-3 md:gap-10";

// Typography
const EYEBROW =
    "mb-4 text-xs font-semibold uppercase tracking-widest text-red-300";
const PAGE_TITLE =
    "max-w-4xl font-heading text-4xl font-normal leading-tight tracking-tight text-white md:text-5xl";
const SECTION_HEADING =
    "mb-6 font-heading text-3xl font-normal leading-tight tracking-tight text-slate-900 md:text-4xl";
const DARK_HEADING =
    "mb-6 font-heading text-3xl font-normal leading-tight tracking-tight text-white md:text-4xl";
const BODY =
    "text-base font-normal leading-7 text-slate-700 md:text-lg md:leading-8";
const HERO_BODY =
    "mt-6 max-w-prose text-base leading-7 text-slate-200 md:text-lg md:leading-8";
const DARK_BODY =
    "mx-auto max-w-prose text-base leading-7 text-slate-200 md:text-lg md:leading-8";
const CARD_TITLE =
    "mb-3 font-sans text-xl font-semibold leading-snug text-slate-900";

// Buttons
const DONATE_BUTTON =
    "mt-8 inline-flex min-h-14 w-full items-center justify-center rounded bg-red-700 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none sm:w-auto";

// Overview
const BENEFIT_LIST =
    "space-y-5 border-l-4 border-red-700 pl-6 text-base font-semibold leading-7 text-slate-900 md:text-lg";
const BENEFIT_ITEM = "flex items-start gap-3";
const BENEFIT_DOT =
    "mt-2.5 h-2 w-2 shrink-0 rounded-full bg-red-700";

// Image
const PROJECT_IMAGE =
    "relative aspect-[1.4] w-full overflow-hidden rounded bg-slate-200 sm:aspect-[1.63]";

type Benefit = {
    id: string;
    text: string;
};

type Impact = {
    id: string;
    title: string;
    description: string;
};

const BENEFITS: Benefit[] = [
    {
        id: "housing",
        text: "Permanent affordable housing",
    },
    {
        id: "community",
        text: "Veteran-focused community",
    },
    {
        id: "independence",
        text: "Support for long-term independence",
    },
];

const IMPACTS: Impact[] = [
    {
        id: "stable-housing",
        title: "Stable housing",
        description:
            "A secure place to focus on health, employment, and connection.",
    },
    {
        id: "community-support",
        title: "Community support",
        description:
            "Resources designed around healing and successful reintegration.",
    },
    {
        id: "lasting-independence",
        title: "Lasting independence",
        description:
            "A path toward long-term stability, not short-term relief.",
    },
];

export default function ProjectsPage() {
    return (
        <div className={PAGE}>
            <Header active="/projects" />

            <main>
                {/* Hero */}
                <section
                    aria-labelledby="project-title"
                    className={`bg-slate-900 text-white ${SECTION}`}
                >
                    <div className={CONTAINER}>
                        <div className={HERO_COLUMNS}>
                            <div>
                                <p className={EYEBROW}>Projects</p>

                                <h1
                                    id="project-title"
                                    className={PAGE_TITLE}
                                >
                                    Hidden Wounds Village Alpha
                                </h1>

                                <p className="mt-5 text-sm font-semibold leading-6 text-red-300">
                                    Flagship project | Sumter, South Carolina
                                </p>

                                <p className={HERO_BODY}>
                                    Permanent, affordable housing designed to
                                    help veterans build stability,
                                    independence, and a stronger future.
                                </p>

                                <Link
                                    href="/donate"
                                    className={DONATE_BUTTON}
                                >
                                    Help Build the Village
                                </Link>
                            </div>

                            {/* Project rendering */}
                            <div className={PROJECT_IMAGE}>
                                <Image
                                    src="/projects/hidden-wounds-village-alpha-valanthropy.png"
                                    alt="Architectural rendering of Hidden Wounds Village Alpha showing homes and a landscaped entrance"
                                    fill
                                    sizes="(min-width: 1152px) 500px, (min-width: 1024px) calc((100vw - 152px) / 2), (min-width: 768px) calc((100vw - 120px) / 2), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Project overview */}
                <section
                    aria-labelledby="foundation-title"
                    className={`bg-white ${SECTION}`}
                >
                    <div className={CONTAINER}>
                        <div className={TWO_COLUMNS}>
                            <div>
                                <h2
                                    id="foundation-title"
                                    className={SECTION_HEADING}
                                >
                                    A foundation for long-term stability
                                </h2>

                                <p className={BODY}>
                                    Hidden Wounds Village Alpha is
                                    VAlanthropy’s flagship veteran housing
                                    initiative. It is designed to connect
                                    permanent housing with trauma-informed
                                    support, employment transition resources,
                                    community reintegration, and outcome
                                    tracking.
                                </p>
                            </div>

                            <ul className={BENEFIT_LIST}>
                                {BENEFITS.map((benefit) => (
                                    <li
                                        key={benefit.id}
                                        className={BENEFIT_ITEM}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={BENEFIT_DOT}
                                        />
                                        <span>{benefit.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Project progress */}
                <ProjectProgress />

                {/* Project impact */}
                <section
                    aria-labelledby="impact-title"
                    className={`bg-slate-50 ${SECTION}`}
                >
                    <div className={CONTAINER}>
                        <h2
                            id="impact-title"
                            className={`${SECTION_HEADING} max-w-3xl`}
                        >
                            Veterans deserve more than temporary solutions.
                        </h2>

                        <ul className={THREE_COLUMNS}>
                            {IMPACTS.map((impact) => (
                                <li
                                    key={impact.id}
                                    className="border-t border-slate-300 pt-6"
                                >
                                    <h3 className={CARD_TITLE}>
                                        {impact.title}
                                    </h3>

                                    <p className={BODY}>
                                        {impact.description}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Support invitation */}
                <section
                    aria-labelledby="support-title"
                    className={`bg-slate-900 text-center text-white ${SECTION}`}
                >
                    <div className={CONTAINER}>
                        <h2
                            id="support-title"
                            className={DARK_HEADING}
                        >
                            Be part of what comes next.
                        </h2>

                        <p className={DARK_BODY}>
                            Your donation, sponsorship, or shared connection
                            helps move the village forward.
                        </p>

                        <Link
                            href="/donate"
                            className={DONATE_BUTTON}
                        >
                            Help Build the Village
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}