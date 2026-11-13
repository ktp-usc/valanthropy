import Link from "next/link";
import Header from "@/components/header";

const values = [
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
];
const section_fonts = "bg-slate-900 px-4 py-10 text-white sm:px-8 sm:py-12 md:px-16 md:py-16"
const division_fonts = "mx-auto max-w-5xl"
const navigation_fonts = "mb-4 text-[10px] uppercase tracking-wide text-red-500"
const h1_fonts = "mb-4 text-3xl font-bold leading-tight sm:text-4xl"
const description_fonts = "mb-4 text-2xl font-bold leading-tight sm:text-4xl"
const link_fonts = "inline-flex min-h-11 max-w-full items-center justify-center rounded bg-red-700 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-8 sm:text-xs"
const white_background = "bg-white px-4 py-10 sm:px-8 sm:py-12 md:px-16 md:py-14"

export default function About() {
    return (
        <div className="bg-white text-slate-900">
            <Header active="/about" />

            {/* Hero */}
            <section className={section_fonts}>
                <div className={division_fonts}>
                    <p className={navigation_fonts}>
                        About Us | South Carolina
                    </p>
                    <h1 className={h1_fonts}>About VAlanthropy</h1>
                    <p className={description_fonts}>
                        Building hope, one home at a time. We help veterans build stability,
                        independence, and a stronger future.
                    </p>
                    <Link
                        href="/about-leadership"
                        className={link_fonts}
                    >
                        Meet Our Leadership
                    </Link>
                </div>
            </section>

            {/* Mission */}
            <section className={white_background}>
                <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
                    <div>
                        <h2 className="mb-3 text-2xl font-bold">Our mission</h2>
                        <p className="text-sm text-slate-600 ">
                            Write your mission statement here. Explain who VAlanthropy is, why it
                            was founded, and who it serves.
                        </p>
                    </div>
                    <ul className="space-y-3 text-sm font-semibold">
                        {[
                            "Permanent affordable housing",
                            "Veteran-focused community",
                            "Support for long-term independence",
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-red-700" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Story */}
            <section className="px-4 py-10 sm:px-8 sm:py-12 md:px-16 md:py-14">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-2 text-2xl font-bold">Our story</h2>
                    <p className="max-w-md text-sm text-slate-600 ">
                        Write a short history of the organization here: how it started, what has
                        been accomplished, and where it is headed.
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="bg-blue-900 px-4 py-10 text-white sm:px-8 sm:py-12 md:px-16 md:py-14">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-6 text-2xl font-bold">What we believe</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {values.map((v) => (
                            <div key={v.title}>
                                <h3 className="mb-1 text-xs font-semibold text-red-400">
                                    {v.title}
                                </h3>
                                <p className="text-sm ">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-white px-4 py-10 text-center sm:px-8 sm:py-12 md:py-16">
                <h2 className="mb-2 text-2xl font-bold">Be part of what comes next.</h2>
                <p className="mb-6 text-sm text-slate-600 ">
                    Your donation, sponsorship, or shared connection helps move the village
                    forward.
                </p>
                <Link
                    href="/ways-to-help"
                    className="inline-flex min-h-11 max-w-full items-center justify-center rounded bg-red-700 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 sm:px-8 sm:text-xs"
                >
                    Help Build the Village
                </Link>
            </section>
        </div>
    );
}
