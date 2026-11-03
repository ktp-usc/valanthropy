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
    { href: "/progress", label: "Progress" },
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
        <footer className="border-t border-slate-200 bg-white px-8 py-12 text-slate-900 md:px-16">
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.3fr_1.2fr_0.8fr_1.2fr]">
                {/* About */}
                <div>
                    <Image
                        src="/about-leadership/valanthropy-lgo.png"
                        alt="VAlanthropy"
                        width={707}
                        height={194}
                        className="mb-6 h-14 w-auto"
                    />
                    <p className="max-w-xs text-sm text-slate-600">
                        VAlanthropy is a registered 501(c)(3) nonprofit developing permanent
                        affordable veteran housing communities that promote healing, stability,
                        independence, and long-term success.
                    </p>
                    <p className="mt-2 text-sm font-bold text-slate-700">EIN: 88-0840494</p>
                    <p className="text-sm text-slate-600">
                        Donations are tax-deductible to the fullest extent allowed by law.
                    </p>
                    <div className="mt-4 flex gap-3">
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-8 w-8 items-center justify-center rounded bg-blue-900 text-white transition hover:bg-red-700"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Veteran Services */}
                <div>
                    <h3 className="mb-3 text-lg font-bold text-blue-900">Veteran Services</h3>
                    <ul className="space-y-2 text-sm font-medium text-blue-900">
                        {veteranServices.map((l) => (
                            <li key={l.label}>
                                <Link href={l.href}>{l.label}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 space-y-2 text-sm text-slate-700">
                        <p>Veterans Crisis Line Call 988, then press 1.</p>
                        <p>Text 838255.</p>
                        <p>Online chat is available through VeteransCrisisLine.net</p>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="mb-3 text-lg font-bold text-blue-900">Quick Links</h3>
                    <ul className="space-y-3 text-sm font-medium text-blue-900">
                        {quickLinks.map((l) => (
                            <li key={l.label}>
                                <Link href={l.href}>{l.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Get In Touch */}
                <div className="text-sm text-slate-700">
                    <h3 className="mb-3 text-lg font-bold text-blue-900">Get In Touch</h3>
                    <p className="font-bold text-slate-900">Mailing Address:</p>
                    <p>VAlanthropy</p>
                    <p>P.O. Box 5230</p>
                    <p className="mb-4">Columbia, SC 29250</p>
                    <p className="font-bold text-slate-900">Current Progress Address:</p>
                    <p>Hidden Wounds Village – Alpha</p>
                    <p>22 S. Washington St.</p>
                    <p>Sumter, SC 29150</p>
                    <p>
                        <a href="mailto:info@valanthropy.org">info@valanthropy.org</a>
                    </p>
                    <p>
                        <a href="tel:+18337258388">1-833 SALUTEU [725-8388]</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
