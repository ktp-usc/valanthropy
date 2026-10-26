import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About", hasDropdown: true },
    { href: "/news", label: "News & Stories" },
    { href: "/projects", label: "Projects", hasDropdown: true },
    { href: "/ways-to-help", label: "Ways to Help", hasDropdown: true },
    { href: "/contact", label: "Contact" }
];

export default function Header() {
    return (
        <header>
            <div className="bg-white">
                <div className="mx-auto flex min-h-36 max-w-7xl items-center justify-between px-6">
                    <Link href="/" aria-label="Go to the VAlanthropy homepage">
                        <Image
                            src="/valanthropy-logo.png"
                            alt="VAlanthropy"
                            width={420}
                            height={120}
                            priority
                            className="h-auto w-64 md:w-80"
                        />
                    </Link>

                    <Link
                        href="/ways-to-help"
                        className="rounded-xl bg-[#1d4172] px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#142f55]"
                    >
                        <span className="mr-2 text-[#ed1c24]">›</span>
                        Donate Today
                    </Link>
                </div>
            </div>

            <div className="bg-[#172f68]">
                <nav
                    aria-label="Main navigation"
                    className="mx-auto flex max-w-7xl items-center overflow-x-auto px-6"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-2 whitespace-nowrap border-b-4 border-transparent px-5 py-4 text-lg font-bold text-white transition hover:border-[#ed1c24] hover:bg-[#102554]"
                        >
                            {link.label}

                            {link.hasDropdown && (
                                <ChevronDown size={18} strokeWidth={3} />
                            )}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}