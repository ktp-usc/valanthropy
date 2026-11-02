import Link from "next/link";
import Header from "@/components/header";

const PAGE = "bg-white text-slate-900";
const HERO = "bg-slate-900 px-8 py-16 text-white md:px-16";
const CONTAINER = "mx-auto max-w-5xl";
const EYEBROW = "mb-4 text-[16px] uppercase tracking-wide text-red-500";
const TITLE = "max-w-3xl text-4xl font-bold";
const DESCRIPTION = "mt-6 max-w-2xl text-sm leading-7 text-white/85";
const ACTIONS = "mt-8 flex flex-wrap gap-4";
const PRIMARY_BUTTON =
    "inline-block rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white transition hover:bg-red-800";
const SECONDARY_BUTTON =
    "inline-block rounded border border-white/30 px-8 py-3 text-xs font-semibold text-white transition hover:bg-white/10";

export default function Home() {
    return (
        <div className={PAGE}>
            <Header />

            <main>
                {/* Hero */}
                <section className={HERO}>
                    <div className={CONTAINER}>
                        <p className={EYEBROW}>Building hope, together</p>

                        <h1 className={TITLE}>
                            Turning compassion into lasting change.
                        </h1>

                        <p className={DESCRIPTION}>
                            VAlanthropy connects people, resources, and purpose
                            to create real opportunities for healing, growth,
                            and hope.
                        </p>

                        <div className={ACTIONS}>
                            <Link
                                href="/ways-to-help"
                                className={PRIMARY_BUTTON}
                            >
                                Donate Now
                            </Link>

                            <Link
                                href="/ways-to-help"
                                className={SECONDARY_BUTTON}
                            >
                                Explore Ways to Help
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}