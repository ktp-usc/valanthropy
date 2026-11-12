import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
export const metadata: Metadata = {
    title: "projects | VAlanthropy",
    description:
        "Learn about Hidden Wounds Village Alpha, VAlanthropy's flagship veteran housing initiative.",
};

// Layout
const PAGE = "bg-white font-sans text-slate-900";
const CONTAINER = "mx-auto max-w-5xl";
const HERO = "bg-slate-900 px-8 py-16 text-white md:px-16";
const LIGHT_SECTION = "bg-white px-8 py-14 md:px-16";
const DARK_SECTION = "bg-blue-900 px-8 py-14 text-white md:px-16";
const TWO_COLUMNS = "grid items-start gap-4 md:grid-cols-2";
const HERO_COLUMNS = "grid items-center gap-4 md:grid-cols-2";
const THREE_COLUMNS = "grid gap-4 sm:grid-cols-2 md:grid-cols-3";

// Typography
const EYEBROW =
    "mb-4 text-[16px] uppercase tracking-wide text-red-500";
const PAGE_TITLE = "text-4xl font-bold";
const SECTION_HEADING = "mb-6 text-2xl font-bold";
const BODY = "text-sm leading-relaxed text-slate-600";
const HERO_BODY = "mt-5 max-w-md text-sm leading-relaxed text-white";
const DARK_BODY = "text-sm leading-relaxed text-white";
const LIGHT_CARD_TITLE = "mb-2 font-bold";

// Buttons
const DONATE_BUTTON =
    "mt-6 inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded bg-red-700 px-8 py-3 text-center text-xs font-semibold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-400 sm:w-auto";

// Overview
const BENEFIT_LIST = "space-y-4 text-sm font-semibold";
const BENEFIT_ITEM = "flex items-start gap-3";
const BENEFIT_DOT =
    "mt-1 h-3 w-3 shrink-0 rounded-full bg-red-700";

// Progress
const PROGRESS_INTRO = "mb-6 max-w-3xl text-sm leading-relaxed";
const PROGRESS_CARD = "h-full rounded border border-white/30 p-4 text-center";
const MILESTONE_NUMBER = "mb-2 text-xs font-semibold text-red-300";
const DARK_CARD_TITLE = "mb-2 text-sm font-semibold";

// Illustration
const ILLUSTRATION =
    "relative aspect-[1.4] w-full overflow-hidden rounded bg-slate-200 sm:aspect-[1.63]";
const ILLUSTRATION_LABEL =
    "absolute inset-x-4 top-4 text-[10px] uppercase text-slate-900 sm:inset-x-6 sm:top-6 sm:text-xs";
const ILLUSTRATION_CIRCLE =
    "absolute right-[12%] top-[22%] aspect-square w-[17%] rounded-full bg-red-700 sm:top-[18%]";
const ILLUSTRATION_GROUND =
    "absolute bottom-0 h-8 w-full bg-slate-900/50";
const ILLUSTRATION_BASE =
    "absolute bottom-4 left-[6%] h-8 w-[85%] bg-slate-900/70";
const ILLUSTRATION_MIDDLE =
    "absolute bottom-8 left-[12%] h-8 w-[69%] bg-slate-900/70";
const ILLUSTRATION_TOP =
    "absolute bottom-12 left-[18%] h-8 w-[50%] bg-slate-900/70";

// Support
const SUPPORT_CONTENT = "mx-auto max-w-5xl text-center";

type Benefit = {
    id: string;
    text: string;
};

type Milestone = {
    id: string;
    number: string;
    title: string;
    description: string;
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

const MILESTONES: Milestone[] = [
    {
        id: "infrastructure",
        number: "01",
        title: "Infrastructure",
        description: "Curbs, retention pond, grading",
    },
    {
        id: "planning",
        number: "02",
        title: "Planning",
        description: "Finalizing building plans",
    },
    {
        id: "construction",
        number: "03",
        title: "Construction",
        description: "Preparing for the next phase",
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
            {/* Shared navigation */}
            <Header/>

            <main>
                {/* Hero */}
                <section
                    aria-labelledby="project-title"
                    className={HERO}
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

                                <p className={HERO_BODY}>
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

                            {/* Decorative project illustration */}
                            <div
                                aria-hidden="true"
                                className={ILLUSTRATION}
                            >
                                <p className={ILLUSTRATION_LABEL}>
                                    Village Alpha project rendering
                                </p>

                                <div className={ILLUSTRATION_CIRCLE} />
                                <div className={ILLUSTRATION_GROUND} />
                                <div className={ILLUSTRATION_BASE} />
                                <div className={ILLUSTRATION_MIDDLE} />
                                <div className={ILLUSTRATION_TOP} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Project overview */}
                <section
                    aria-labelledby="foundation-title"
                    className={LIGHT_SECTION}
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
                                        {benefit.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Project progress */}
                <section
                    aria-labelledby="progress-title"
                    className={DARK_SECTION}
                >
                    <div className={CONTAINER}>
                        <h2
                            id="progress-title"
                            className={SECTION_HEADING}
                        >
                            Progress is already underway
                        </h2>

                        <p className={PROGRESS_INTRO}>
                            Important groundwork is complete. The current
                            focus is finalizing the building plans that will
                            guide the next phase of construction.
                        </p>

                        <ol className={THREE_COLUMNS}>
                            {MILESTONES.map((milestone) => (
                                <li
                                    key={milestone.id}
                                    className={PROGRESS_CARD}
                                >
                                    <p className={MILESTONE_NUMBER}>
                                        {milestone.number}
                                    </p>

                                    <h3 className={DARK_CARD_TITLE}>
                                        {milestone.title}
                                    </h3>

                                    <p className={DARK_BODY}>
                                        {milestone.description}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* Project impact */}
                <section
                    aria-labelledby="impact-title"
                    className={LIGHT_SECTION}
                >
                    <div className={CONTAINER}>
                        <h2
                            id="impact-title"
                            className={SECTION_HEADING}
                        >
                            Veterans deserve more than temporary solutions.
                        </h2>

                        <ul className={THREE_COLUMNS}>
                            {IMPACTS.map((impact) => (
                                <li key={impact.id}>
                                    <h3 className={LIGHT_CARD_TITLE}>
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
                    className={DARK_SECTION}
                >
                    <div className={SUPPORT_CONTENT}>
                        <h2
                            id="support-title"
                            className={SECTION_HEADING}
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