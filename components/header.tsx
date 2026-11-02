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

export default function Header({ active }: { active?: string }) {
    return (
        <header className="relative z-30 flex items-center justify-between bg-white px-8 py-3">
            <Link href="/" className="flex items-center">
                <Image
                    src="/about-leadership/valanthropy-lgo.png"
                    alt="VAlanthropy"
                    width={707}
                    height={194}
                    priority
                    className="h-12 w-auto"
                />
            </Link>
            <nav className="flex items-center gap-10 text-sm font-bold">
                {links.map((l) => (
                    <div key={l.label} className="group relative">
                        <Link
                            href={l.href}
                            className={`block py-3 ${
                                l.href === active ? "text-blue-800" : "text-slate-900"
                            } hover:text-blue-800`}
                        >
                            {l.label}
                        </Link>
                        <div className="invisible absolute left-1/2 top-full min-w-48 -translate-x-1/2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                            <ul className="rounded border border-slate-200 bg-white py-2 shadow-lg">
                                {l.children.map((c) => (
                                    <li key={c.label}>
                                        <Link
                                            href={c.href}
                                            className="block whitespace-nowrap px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-100 hover:text-blue-800"
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
                href="/donate"
                className="rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white"
            >
                Donate Today
            </Link>
        </header>
    );
}
