import Image from "next/image";
import Link from "next/link";

const veteranServices = [
    { href: "https://www.veteranscrisisline.net", label: "Veteran Crisis Line" },
    { href: "#", label: "Resource Center" },
    { href: "#", label: "Policies" },
    { href: "/about-leadership", label: "Leadership & Current Board" },
];

const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/news", label: "News" },
    { href: "/ways-to-help", label: "Ways to Help" },
    { href: "/contact", label: "Contact" },
];

const iconProps = {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: "h-4 w-4",
    "aria-hidden": true,
} as const;

const socials = [
    {
        href: "https://www.facebook.com/valanthropy",
        label: "VAlanthropy on Facebook",
        icon: (
            <svg {...iconProps}>
                <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V13h2.8v8h3.2z" />
            </svg>
        ),
    },
    {
        href: "https://www.instagram.com/valanthropy",
        label: "VAlanthropy on Instagram",
        icon: (
            <svg {...iconProps}>
                <path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM17.1 6.1a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" />
                <path d="M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5zm3.3 13a3.3 3.3 0 0 1-3.3 3.3H8A3.3 3.3 0 0 1 4.7 16V8A3.3 3.3 0 0 1 8 4.7h8A3.3 3.3 0 0 1 19.3 8v8z" />
            </svg>
        ),
    },
    {
        href: "https://www.linkedin.com/lillywvalanthropy",
        label: "VAlanthropy on LinkedIn",
        icon: (
            <svg {...iconProps}>
                <path d="M4.5 9h3.6v11H4.5V9zm1.8-5.5a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2zM10 9h3.4v1.5h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5V20h-3.6v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H10V9z" />
            </svg>
        ),
    },
];

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
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
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
                                <Link
                                    href="/about-leadership"
                                    className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                                >
                                    Leadership &amp; Current Board
                                </Link>
                            </li>
                            <li>
                                <a
                                    href={veteranServices[0].href}
                                    className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                                >
                                    Veterans Crisis Line
                                </a>
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
                                    href="tel:+18337258388"
                                    className="block hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                                >
                                    1-833 SALUTEU [725-8388]
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
