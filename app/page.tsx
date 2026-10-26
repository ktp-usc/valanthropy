import Link from "next/link";

export default function Home() {
    return (
        <main>
            <section className="bg-[#123d31] px-6 py-24 text-white">
                <div className="mx-auto max-w-7xl">
                    <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-[#e8c982]">
                        BUILDING HOPE, TOGETHER
                    </p>

                    <h1 className="max-w-3xl text-5xl font-semibold leading-tight md:text-7xl">
                        Turning compassion into lasting change.
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
                        VAlanthropy connects people, resources, and purpose to
                        create real opportunities for healing, growth, and hope.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="/ways-to-help"
                            className="rounded-full bg-[#c25d46] px-6 py-3 font-semibold text-white"
                        >
                            Donate Now
                        </Link>

                        <Link
                            href="/ways-to-help"
                            className="rounded-full bg-[#cfe2d2] px-6 py-3 font-semibold text-[#123d31]"
                        >
                            Explore Ways to Help
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}