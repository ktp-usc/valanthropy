import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Layout
const PAGE = "bg-white text-slate-900";
const CONTAINER = "mx-auto max-w-5xl";
const HERO = "bg-slate-900 px-8 py-16 text-white md:px-16";
const LIGHT_SECTION = "bg-white px-8 py-14 md:px-16";
const DARK_SECTION = "bg-blue-900 px-8 py-14 text-white md:px-16";
const TWO_COLUMNS = "grid items-start gap-8 md:grid-cols-2 md:gap-16";

// Typography
const HERO_LABEL =
    "mb-4 text-[16px] uppercase tracking-wide text-red-400";
const LABEL =
    "mb-4 text-[16px] uppercase tracking-wide text-red-700";
const HERO_TITLE = "max-w-3xl text-4xl font-bold leading-tight";
const HERO_BODY = "mt-6 max-w-xl text-sm leading-7 text-white/85";
const SECTION_TITLE = "mb-6 text-2xl font-bold";
const BODY = "text-sm leading-7 text-slate-600";
const DARK_BODY = "text-sm leading-7 text-white/85";
const HERO_GRID = "grid items-center gap-10 md:grid-cols-2";
const BANNER_PLACEHOLDER = "aspect-[4/3] w-full rounded border border-white/30 bg-slate-200";

// Links and buttons
const ACTIONS = "mt-8 flex flex-wrap items-center gap-6";
const PRIMARY_BUTTON =
    "inline-flex items-center justify-center gap-3 rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-400";
const LIGHT_LINK =
    "inline-flex items-center gap-2 py-2 text-sm font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
const RED_LINK =
    "mt-6 inline-flex items-center gap-2 py-2 text-sm font-semibold text-red-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700";
const SCROLL_LINK =
    "mt-12 inline-flex items-center gap-3 border-t border-white/30 pt-6 text-sm text-white/85 transition hover:text-white";
// Ways to help
type HelpOption = {
    title: string;
    description: string;
    href: string;
};

const HELP_OPTIONS: HelpOption[] = [
    {
        title: "Give",
        description:
            "Support housing development, furnishings, and move-in readiness.",
        href: "/ways-to-help",
    },
    {
        title: "Sponsor or partner",
        description:
            "Explore how your business, church, or organization can support the work.",
        href: "/contact",
    },
    {
        title: "Get involved",
        description:
            "Ask about volunteering, hosting an event, or inviting VAlanthropy to speak.",
        href: "/contact",
    },
];

const HELP_LIST = "grid gap-8 sm:grid-cols-2 md:grid-cols-3";
const HELP_ITEM = "border-t border-slate-200 pt-6";
const HELP_TITLE = "mb-3 font-bold";
const HELP_LINK =
    "mt-5 inline-flex items-center gap-2 py-2 text-sm font-semibold text-red-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700";

// Project image
const PROJECT_IMAGE =
    "relative aspect-[4/3] overflow-hidden rounded bg-slate-200";
const IMAGE_COVER = "object-cover";
const CAPTION = "mt-3 text-sm leading-6 text-slate-600";

export default function Home() {
    return (
        <div className={PAGE}>
            <Header active="/" />

            <main>
            {/* Opening */}
            <section className={HERO} aria-labelledby="home-title">
                <div className={CONTAINER}>
                    <div className={HERO_GRID}>
                        <div>
                            <p className={HERO_LABEL}>
                                VAlanthropy · South Carolina
                            </p>

                            <h1 id="home-title" className={HERO_TITLE}>
                                Permanent housing.
                                <br />
                                A stronger foundation for veterans.
                            </h1>

                            <p className={HERO_BODY}>
                                VAlanthropy develops affordable veteran housing
                                communities that create pathways to stability,
                                independence, and long-term success.
                            </p>

                            <div className={ACTIONS}>
                                <Link
                                    href="/ways-to-help"
                                    className={PRIMARY_BUTTON}
                                >
                                    Explore ways to help
                                    <ArrowUpRight
                                        size={16}
                                        aria-hidden="true"
                                    />
                                </Link>

                                <Link href="/about" className={LIGHT_LINK}>
                                    About VAlanthropy
                                    <ArrowUpRight
                                        size={16}
                                        aria-hidden="true"
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* Reserved for the banner image/carousel ticket */}
                        <div
                            className={BANNER_PLACEHOLDER}
                            aria-hidden="true"
                        />
                    </div>

                    <a href="#what-we-do" className={SCROLL_LINK}>
                        <ArrowDown size={16} aria-hidden="true" />
                        Get to know our work
                    </a>
                </div>
            </section>

                {/* What we do */}
                <section
                    id="what-we-do"
                    className={LIGHT_SECTION}
                    aria-labelledby="work-title"
                >
                    <div className={CONTAINER}>
                        <div className={TWO_COLUMNS}>
                            <div>
                                <p className={LABEL}>What we do</p>

                                <h2 id="work-title" className={SECTION_TITLE}>
                                    Building places to call home.
                                </h2>
                            </div>

                            <div>
                                <p className={BODY}>
                                    Our work focuses on developing permanent,
                                    affordable housing for veterans in South
                                    Carolina. That includes the infrastructure,
                                    construction, furnishings, and long-term
                                    sustainability behind each housing community.
                                </p>

                                <Link href="/about" className={RED_LINK}>
                                    Learn about our mission
                                    <ArrowUpRight
                                        size={16}
                                        aria-hidden="true"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Who we serve */}
                <section
                    className={DARK_SECTION}
                    aria-labelledby="veterans-title"
                >
                    <div className={CONTAINER}>
                        <div className={TWO_COLUMNS}>
                            <div>
                                <p className={HERO_LABEL}>Who it’s for</p>

                                <h2
                                    id="veterans-title"
                                    className={SECTION_TITLE}
                                >
                                    Veterans who need a stable place to rebuild.
                                </h2>
                            </div>

                            <p className={DARK_BODY}>
                                A secure home provides a foundation for health,
                                employment, and connection. We focus on veterans
                                who need permanent, affordable housing and a
                                supportive community as they work toward
                                long-term independence.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Ways to help */}
                <section
                    className={LIGHT_SECTION}
                    aria-labelledby="help-title"
                >
                    <div className={CONTAINER}>
                        <p className={LABEL}>How to help</p>

                        <h2 id="help-title" className={SECTION_TITLE}>
                            Find your way to be part of the work.
                        </h2>

                        <ul className={HELP_LIST}>
                            {HELP_OPTIONS.map((option) => (
                                <li
                                    key={option.title}
                                    className={HELP_ITEM}
                                >
                                    <h3 className={HELP_TITLE}>
                                        {option.title}
                                    </h3>

                                    <p className={BODY}>
                                        {option.description}
                                    </p>

                                    <Link
                                        href={option.href}
                                        className={HELP_LINK}
                                    >
                                        {option.title === "Give"
                                            ? "Explore giving options"
                                            : "Connect with our team"}
                                        <ArrowUpRight
                                            size={16}
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Current project */}
                <section
                    className={LIGHT_SECTION}
                    aria-labelledby="project-title"
                >
                    <div className={CONTAINER}>
                        <div className={TWO_COLUMNS}>
                            <figure>
                                <div className={PROJECT_IMAGE}>
                                    <Image
                                        src="/home/hidden-wounds-village-site.png"
                                        alt="Hidden Wounds Village Alpha development site"
                                        fill
                                        sizes="(min-width: 1152px) 480px, (min-width: 768px) 44vw, 100vw"
                                        className={IMAGE_COVER}
                                    />
                                </div>

                                <figcaption className={CAPTION}>
                                    Hidden Wounds Village Alpha · Sumter,
                                    South Carolina
                                </figcaption>
                            </figure>

                            <div>
                                <p className={LABEL}>Our work in action</p>

                                <h2
                                    id="project-title"
                                    className={SECTION_TITLE}
                                >
                                    Hidden Wounds Village Alpha
                                </h2>

                                <p className={BODY}>
                                    Our flagship housing initiative in Sumter
                                    puts this mission into practice: permanent,
                                    affordable housing and a supportive community
                                    for veterans.
                                </p>

                                <Link
                                    href="/projects"
                                    className={RED_LINK}
                                >
                                    Explore the project
                                    <ArrowUpRight
                                        size={16}
                                        aria-hidden="true"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}