import Link from "next/link";
import Header from "@/components/header";

const PAGE = "bg-white text-slate-900";
const HERO = "bg-slate-900 px-8 py-16 text-white md:px-16";
const CONTAINER = "mx-auto max-w-5xl";
const HERO_GRID = "grid items-center gap-10 md:grid-cols-2";

const EYEBROW =
    "mb-4 text-[16px] uppercase tracking-wide text-red-400";
const TITLE = "text-4xl font-bold leading-tight";
const DESCRIPTION = "mt-6 text-sm leading-7 text-white/85";

const ACTIONS = "mt-8 flex flex-wrap gap-4";
const PRIMARY_BUTTON =
    "inline-block rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white transition hover:bg-red-800";
const SECONDARY_BUTTON =
    "inline-block rounded border border-white/30 px-8 py-3 text-xs font-semibold text-white transition hover:bg-white/10";

const BANNER_PLACEHOLDER =
    "aspect-[4/3] w-full rounded border border-white/30 bg-slate-200";

export default function Home() {
    return (
        <div className={PAGE}>
            <Header active="/" />

            <main>
                {/* Hero */}
                <section className={HERO} aria-labelledby="home-title">
                    <div className={CONTAINER}>
                        <div className={HERO_GRID}>
                            <div>
                                <p className={EYEBROW}>
                                    VAlanthropy · South Carolina
                                </p>

                                <h1 id="home-title" className={TITLE}>
                                    Building permanent veteran housing
                                    in South Carolina.
                                </h1>

                                <p className={DESCRIPTION}>
                                    VAlanthropy develops affordable veteran
                                    housing communities that create pathways
                                    to stability, independence, and long-term
                                    success.
                                </p>

                                <div className={ACTIONS}>
                                    <Link
                                        href="/ways-to-help"
                                        className={PRIMARY_BUTTON}
                                    >
                                        Explore ways to help
                                    </Link>

                                    <Link
                                        href="/about"
                                        className={SECONDARY_BUTTON}
                                    >
                                        About VAlanthropy
                                    </Link>
                                </div>
                            </div>

                            {/* Reserved for the future image carousel */}
                            <div
                                className={BANNER_PLACEHOLDER}
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}