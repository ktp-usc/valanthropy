import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

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

export default function About() {
    return (
        <div className="bg-white text-slate-900">
            <Header active="/about" />

            {/* Hero */}
            <section className="bg-slate-900 px-8 py-16 text-white md:px-16">
                <div className="mx-auto max-w-5xl">
                    <p className="mb-4 text-[10px] uppercase tracking-wide text-red-500">
                        About Us | South Carolina
                    </p>
                    <h1 className="mb-4 text-4xl font-bold leading-tight">About VAlanthropy</h1>
                    <p className="mb-6 max-w-md text-sm">
                        Building hope, one home at a time. We help veterans build stability,
                        independence, and a stronger future.
                    </p>
                    <Link
                        href="/about-leadership"
                        className="inline-block rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white"
                    >
                        Meet Our Leadership
                    </Link>
                </div>
            </section>

            {/* Mission */}
            <section className="bg-white px-8 py-14 md:px-16">
                <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
                    <div>
                        <h2 className="mb-3 text-2xl font-bold">Our mission</h2>
                        <p className="text-xs text-slate-600">
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
            <section className="px-8 py-14 md:px-16">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-2 text-2xl font-bold">Our story</h2>
                    <p className="max-w-md text-xs text-slate-600">
                        Write a short history of the organization here: how it started, what has
                        been accomplished, and where it is headed.
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="bg-blue-900 px-8 py-14 text-white md:px-16">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-6 text-2xl font-bold">What we believe</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {values.map((v) => (
                            <div key={v.title}>
                                <h3 className="mb-1 text-xs font-semibold text-red-400">
                                    {v.title}
                                </h3>
                                <p className="text-xs">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-white px-8 py-16 text-center">
                <h2 className="mb-2 text-2xl font-bold">Be part of what comes next.</h2>
                <p className="mb-6 text-xs text-slate-600">
                    Your donation, sponsorship, or shared connection helps move the village
                    forward.
                </p>
                <Link
                    href="/ways-to-help"
                    className="inline-block rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white"
                >
                    Help Build the Village
                </Link>
            </section>
            <Footer />
        </div>
    );
}
