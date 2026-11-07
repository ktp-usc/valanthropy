export default function Footer() {
    return (
        <footer className="border-t-4 border-[#c8202c] bg-[#0b2133] font-sans text-white">
            <div className="mx-auto max-w-6xl px-6 py-12 md:px-16">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Organization information */}
                    <div>
                        <h2 className="text-2xl font-bold">VAlanthropy</h2>

                        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#ff939b]">
                            Building hope. One home at a time.
                        </p>

                        <p className="mt-5 text-sm leading-relaxed text-slate-300">
                            Developing permanent, affordable veteran housing communities
                            that promote healing, stability, independence, and long-term
                            success.
                        </p>

                        <p className="mt-4 text-sm text-slate-300">
                            Registered 501(c)(3) nonprofit
                        </p>

                        <p className="mt-2 text-sm font-semibold">
                            EIN: 88-0840494
                        </p>
                    </div>

                    {/* Navigation placeholders */}
                    <nav aria-labelledby="footer-explore">
                        <h2
                            id="footer-explore"
                            className="text-lg font-bold"
                        >
                            Quick Links
                        </h2>

                        {/* Enable these buttons when destinations are available. */}
                        <ul className="mt-5 space-y-3 text-sm text-slate-300">
                            <li>
                                <button type="button" disabled>
                                    Home
                                </button>
                            </li>

                            <li>
                                <button type="button" disabled>
                                    About
                                </button>
                            </li>

                            <li>
                                <button type="button" disabled>
                                    Projects
                                </button>
                            </li>

                            <li>
                                <button type="button" disabled>
                                    Progress
                                </button>
                            </li>

                            <li>
                                <button type="button" disabled>
                                    Ways to Help
                                </button>
                            </li>

                            <li>
                                <button type="button" disabled>
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </nav>

                    {/* Resource placeholders */}
                    <div>
                        <h2 className="text-lg font-bold">
                            Veteran Resources
                        </h2>

                        {/* Add confirmed resource links before enabling these. */}
                        <ul className="mt-5 space-y-3 text-sm text-slate-300">
                            <li>
                                <button type="button" disabled>
                                    Resource Center
                                </button>
                            </li>

                            <li>
                                <button type="button" disabled>
                                    Policies
                                </button>
                            </li>

                            <li>
                                <button
                                    type="button"
                                    disabled
                                    className="text-left"
                                >
                                    Leadership &amp; Current Board
                                </button>
                            </li>

                            <li>
                                <button type="button" disabled>
                                    Veterans Crisis Line
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact information */}
                    <div>
                        <h2 className="text-lg font-bold">
                            Get in Touch
                        </h2>

                        <address className="mt-5 space-y-5 text-sm not-italic leading-relaxed text-slate-300">
                            <div>
                                <p className="font-semibold text-white">
                                    Mailing Address
                                </p>

                                <p>VAlanthropy</p>
                                <p>P.O. Box 5230</p>
                                <p>Columbia, SC 29250</p>
                            </div>

                            <div>
                                <p className="font-semibold text-white">
                                    Project Location
                                </p>

                                <p>Hidden Wounds Village – Alpha</p>
                                <p>22 S. Washington St.</p>
                                <p>Sumter, SC 29150</p>
                            </div>

                            <div className="space-y-2">
                                <a
                                    href="mailto:info@valanthropy.org"
                                    className="block break-words hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                                >
                                    info@valanthropy.org
                                </a>

                                <a
                                    href="tel:+18337258338"
                                    className="block hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                                >
                                    1-833-725-8338
                                </a>
                            </div>
                        </address>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-10 border-t border-white/20 pt-6">
                    <p className="text-sm text-slate-300">
                        © {new Date().getFullYear()} VAlanthropy. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}