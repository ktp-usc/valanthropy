import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects | VAlanthropy",
    description:
        "Learn about Hidden Wounds Village Alpha, VAlanthropy's flagship veteran housing initiative.",
};

export default function ProjectsPage() {
    return (
        <main className="mx-auto max-w-6xl bg-white font-sans text-[#0b2133]">
            {/* Flagship project */}
            <section
                aria-labelledby="project-title"
                className="bg-[#0b2133] px-6 py-14 text-white md:px-16 md:py-16"
            >
                <div className="grid items-center gap-10 md:grid-cols-2">
                    <div>
                        <p className="mb-4 text-xs font-semibold uppercase text-[#ef626b]">
                            Flagship project | Sumter, South Carolina
                        </p>

                        <h1
                            id="project-title"
                            className="text-4xl font-bold leading-tight md:text-5xl"
                        >
                            Hidden Wounds
                            <br />
                            Village Alpha
                        </h1>

                        <p className="mt-5 max-w-md text-base leading-relaxed">
                            Permanent, affordable housing designed to help veterans build
                            stability, independence, and a stronger future.
                        </p>

                        <a
                            href="#support"
                            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-[#c8202c] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a91924] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                            Help Build the Village
                        </a>
                    </div>

                    {/* Decorative illustration matching the Figma placeholder */}
                    <div
                        aria-hidden="true"
                        className="relative aspect-[1.63] overflow-hidden rounded-2xl bg-[#195581]"
                    >
                        <p className="absolute left-6 top-6 text-xs uppercase">
                            Village Alpha project rendering
                        </p>

                        <div className="absolute right-[12%] top-[13%] h-20 w-20 rounded-full bg-[#c8202c]" />

                        <div className="absolute bottom-0 h-8 w-full bg-[#0b2133]/50" />

                        <div className="absolute bottom-4 left-[6%] h-8 w-[85%] bg-[#0b2133]/70" />

                        <div className="absolute bottom-8 left-[12%] h-8 w-[69%] bg-[#0b2133]/70" />

                        <div className="absolute bottom-12 left-[18%] h-8 w-[50%] bg-[#0b2133]/70" />
                    </div>
                </div>
            </section>

            {/* Project overview */}
            <section
                aria-labelledby="foundation-title"
                className="bg-[#f7f5eb] px-6 py-14 md:px-16"
            >
                <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                    <div>
                        <h2
                            id="foundation-title"
                            className="text-3xl font-bold leading-tight"
                        >
                            A foundation for long-term stability
                        </h2>

                        <p className="mt-5 leading-relaxed text-[#5c6f80]">
                            Hidden Wounds Village Alpha is VAlanthropy’s flagship veteran
                            housing initiative. It is designed to connect permanent housing
                            with trauma-informed support, employment transition resources,
                            community reintegration, and outcome tracking.
                        </p>
                    </div>

                    <ul className="space-y-4 font-semibold">
                        <li className="flex items-start gap-3">
              <span
                  aria-hidden="true"
                  className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-[#c8202c]"
              />
                            Permanent affordable housing
                        </li>

                        <li className="flex items-start gap-3">
              <span
                  aria-hidden="true"
                  className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-[#c8202c]"
              />
                            Veteran-focused community
                        </li>

                        <li className="flex items-start gap-3">
              <span
                  aria-hidden="true"
                  className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-[#c8202c]"
              />
                            Support for long-term independence
                        </li>
                    </ul>
                </div>
            </section>

            {/* Project progress */}
            <section
                aria-labelledby="progress-title"
                className="px-6 py-14 md:px-16"
            >
                <h2 id="progress-title" className="text-3xl font-bold">
                    Progress is already underway
                </h2>

                <p className="mt-5 max-w-3xl leading-relaxed text-[#5c6f80]">
                    Important groundwork is complete. The current focus is finalizing the
                    building plans that will guide the next phase of construction.
                </p>

                <ol className="mt-6 grid gap-4 md:grid-cols-3">
                    <li className="rounded-xl bg-[#f7f5eb] p-6">
                        <p className="text-xs font-semibold text-[#c8202c]">01</p>
                        <h3 className="mt-2 text-lg font-bold">Infrastructure</h3>
                        <p className="mt-2 text-sm text-[#5c6f80]">
                            Curbs, retention pond, grading
                        </p>
                    </li>

                    <li className="rounded-xl bg-[#f7f5eb] p-6">
                        <p className="text-xs font-semibold text-[#c8202c]">02</p>
                        <h3 className="mt-2 text-lg font-bold">Planning</h3>
                        <p className="mt-2 text-sm text-[#5c6f80]">
                            Finalizing building plans
                        </p>
                    </li>

                    <li className="rounded-xl bg-[#f7f5eb] p-6">
                        <p className="text-xs font-semibold text-[#c8202c]">03</p>
                        <h3 className="mt-2 text-lg font-bold">Construction</h3>
                        <p className="mt-2 text-sm text-[#5c6f80]">
                            Preparing for the next phase
                        </p>
                    </li>
                </ol>
            </section>

            {/* Why the project matters */}
            <section
                aria-labelledby="impact-title"
                className="bg-[#195581] px-6 py-14 text-white md:px-16"
            >
                <h2 id="impact-title" className="text-3xl font-bold">
                    Veterans deserve more than temporary solutions.
                </h2>

                <div className="mt-6 grid gap-8 md:grid-cols-3">
                    <div>
                        <h3 className="text-lg font-bold text-[#ff939b]">
                            Stable housing
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            A secure place to focus on health, employment, and connection.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-[#ff939b]">
                            Community support
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Resources designed around healing and successful reintegration.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-[#ff939b]">
                            Lasting independence
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            A path toward long-term stability, not short-term relief.
                        </p>
                    </div>
                </div>
            </section>

            {/* Support invitation */}
            <section
                id="support"
                aria-labelledby="support-title"
                className="scroll-mt-6 bg-[#f7f5eb] px-6 py-14 md:px-16"
            >
                <h2
                    id="support-title"
                    className="text-center text-3xl font-bold"
                >
                    Be part of what comes next.
                </h2>

                <p className="mt-5 text-center leading-relaxed text-[#5c6f80]">
                    Your donation, sponsorship, or shared connection helps move the
                    village forward.
                </p>
            </section>
        </main>
    );
}