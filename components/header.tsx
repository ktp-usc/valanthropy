import Image from "next/image";
import Link from "next/link";

type NavItem = {
    href: string;
    label: string;
    children: { href: string; label: string }[];
};

const links: NavItem[] = [
    {
        href: "/about",
        label: "About",
        children: [
            { href: "/about", label: "About Us" },
            { href: "/about-leadership", label: "Leadership & Current Board" },
            { href: "/partners-and-sponsors", label: "Partners & Sponsors" },
            { href: "/financials", label: "Financial & Transparency" },
        ],
    },
    {
        href: "/projects",
        label: "Projects",
        children: [
            { href: "/projects", label: "Hidden Wounds Village Alpha" },
            { href: "/progress", label: "Progress" },
        ],
    },
    {
        href: "/ways-to-help",
        label: "Ways to Help",
        children: [
            { href: "/donate", label: "Donate" },
            { href: "/ways-to-help", label: "Sponsor or Partner" },
            { href: "/ways-to-help", label: "Volunteer" },
        ],
    },
    {
        href: "/contact",
        label: "Contact",
        children: [
            { href: "/contact", label: "Contact Us" },
            { href: "mailto:info@valanthropy.org", label: "info@valanthropy.org" },
        ],
    },
];

export default function Header({
    active,
    donateHref = "/donate",
}: {
    active?: string;
    donateHref?: string;
}) {
    return (
        <header className="relative z-30 flex flex-wrap items-center justify-between gap-2 bg-white px-4 py-3 md:flex-nowrap md:gap-4 md:px-8">
            <Link href="/" className="flex items-center">
                <Image
                    src="/about-leadership/valanthropy-lgo.png"
                    alt="VAlanthropy"
                    width={707}
                    height={194}
                    priority
                    className="h-8 w-auto md:h-12"
                />
            </Link>
            <nav aria-label="Main navigation" className="order-3 flex w-full items-center justify-center gap-3 text-xs font-bold sm:gap-5 sm:text-sm md:order-none md:w-auto md:gap-6">
                {links.map((l) => (
                    <div key={l.label} className="group relative">
                        <Link
                            href={l.href}
                            className={`block py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 ${
                                l.href === active ? "text-red-700" : "text-slate-900"
                            } hover:text-red-700`}
                        >
                            {l.label}
                        </Link>
                        <div className="invisible absolute left-1/2 top-full min-w-48 -translate-x-1/2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                            <ul className="rounded border border-slate-200 bg-white py-2 shadow-lg">
                                {l.children.map((c) => (
                                    <li key={c.label}>
                                        <Link
                                            href={c.href}
                                            className="block whitespace-nowrap px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-100 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-red-700"
                                        >
                                            {c.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </nav>
            <Link
                href={donateHref}
                className="ml-auto rounded bg-red-700 px-4 py-3 text-xs font-semibold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 md:ml-0 md:px-8"
            >
                Donate Today
            </Link>
        </header>
    );
}
