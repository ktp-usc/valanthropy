"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

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
            {
                href: "/leadership",
                label: "Leadership & Current Board",
            },
            {
                href: "/become-a-partner",
                label: "Partners & Sponsors",
            },
            {
                href: "/financials",
                label: "Financial & Transparency",
            },
        ],
    },
    {
        href: "/projects",
        label: "Projects",
        children: [
            {
                href: "/projects",
                label: "Hidden Wounds Village Alpha",
            },
            { href: "/progress", label: "Progress" },
        ],
    },
    {
        href: "/ways-to-help",
        label: "Ways to Help",
        children: [
            { href: "/donate", label: "Donate" },
            { href: "/ways-to-help", label: "Become a Partner" },
            { href: "/ways-to-help", label: "Volunteer" },
        ],
    },
    {
        href: "/news",
        label: "News",
        children: [],
    },
    {
        href: "/contact",
        label: "Contact",
        children: [],
    },
];

// Layout
const HEADER =
    "relative z-30 flex flex-wrap items-center justify-between gap-2 bg-white px-4 py-3 lg:flex-nowrap lg:gap-4 lg:px-8";

const LOGO_LINK = "flex min-w-0 shrink-0 items-center";
const LOGO = "h-8 w-auto sm:h-10 lg:h-12";

// Keyboard focus
const FOCUS =
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700";

// Desktop navigation
const DESKTOP_NAV =
    "hidden items-center justify-center gap-6 text-sm font-bold lg:flex";

const DESKTOP_LINK =
    "block py-3 hover:text-red-700";

const DROPDOWN =
    "invisible absolute left-1/2 top-full min-w-48 -translate-x-1/2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100";

const DROPDOWN_LIST =
    "rounded border border-slate-200 bg-white py-2 shadow-lg";

const DROPDOWN_LINK =
    "block whitespace-nowrap px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-100 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-red-700";

// Actions
const DONATE_BUTTON =
    "ml-auto inline-flex min-h-11 shrink-0 items-center justify-center rounded bg-red-700 px-3 py-3 text-xs font-semibold text-white transition hover:bg-red-800 lg:ml-0 lg:px-8";

const MENU_BUTTON =
    "inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded border border-slate-200 text-slate-900 transition hover:bg-slate-100 lg:hidden";

// Mobile navigation
const MOBILE_NAV =
    "w-full border-t border-slate-200 pt-3 lg:hidden";

const MOBILE_ITEM = "border-b border-slate-100";
const MOBILE_ROW = "flex items-center justify-between gap-2";

const MOBILE_LINK =
    "flex min-h-11 min-w-0 flex-1 items-center rounded px-3 py-3 text-sm font-bold hover:bg-slate-100 hover:text-red-700";

const SUBMENU_BUTTON =
    "inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded text-slate-900 transition hover:bg-slate-100";

const SUBMENU_LIST =
    "mb-3 ml-3 space-y-1 border-l-2 border-slate-200 pl-3";

const SUBMENU_LINK =
    "flex min-h-11 items-center break-words rounded px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-red-700";

export default function Header({
    active,
    donateHref = "/donate",
}: {
    active?: string;
    donateHref?: string;
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openSection, setOpenSection] = useState<string | null>(null);

    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const navigationId = useId();

    function closeMenu() {
        setMenuOpen(false);
        setOpenSection(null);
    }

    function toggleMenu() {
        setMenuOpen(!menuOpen);
        setOpenSection(null);
    }

    return (
        <header
            className={HEADER}
            onKeyDown={(event) => {
                if (event.key === "Escape" && menuOpen) {
                    event.preventDefault();
                    closeMenu();
                    menuButtonRef.current?.focus();
                }
            }}
        >
            <Link
                href="/"
                className={`${LOGO_LINK} ${FOCUS}`}
                onClick={closeMenu}
            >
                <Image
                    src="/about-leadership/valanthropy-lgo.png"
                    alt="VAlanthropy"
                    width={707}
                    height={194}
                    priority
                    className={LOGO}
                />
            </Link>

            {/* Desktop navigation */}
            <nav
                aria-label="Main navigation"
                className={DESKTOP_NAV}
            >
                {links.map((item) => (
                    <div key={item.label} className="group relative">
                        <Link
                            href={item.href}
                            className={`${DESKTOP_LINK} ${FOCUS} ${
                                item.href === active
                                    ? "text-red-700"
                                    : "text-slate-900"
                            }`}
                        >
                            {item.label}
                        </Link>

                        {item.children.length > 0 && (
                            <div className={DROPDOWN}>
                                <ul className={DROPDOWN_LIST}>
                                    {item.children.map((child) => (
                                        <li key={child.label}>
                                            <Link
                                                href={child.href}
                                                className={DROPDOWN_LINK}
                                            >
                                                {child.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* Donation button stays visible on mobile */}
            <Link
                href={donateHref}
                className={`${DONATE_BUTTON} ${FOCUS}`}
                onClick={closeMenu}
            >
                Donate Today
            </Link>

            {/* Mobile menu toggle */}
            <button
                ref={menuButtonRef}
                type="button"
                className={`${MENU_BUTTON} ${FOCUS}`}
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={menuOpen}
                aria-controls={navigationId}
                onClick={toggleMenu}
            >
                {menuOpen ? (
                    <X size={22} aria-hidden="true" />
                ) : (
                    <Menu size={22} aria-hidden="true" />
                )}
            </button>

            {/* Mobile navigation */}
            <nav
                id={navigationId}
                aria-label="Mobile navigation"
                className={MOBILE_NAV}
                hidden={!menuOpen}
            >
                <ul>
                    {links.map((item, index) => {
                        const expanded = openSection === item.href;
                        const submenuId = `${navigationId}-section-${index}`;

                        return (
                            <li key={item.label} className={MOBILE_ITEM}>
                                <div className={MOBILE_ROW}>
                                    <Link
                                        href={item.href}
                                        className={`${MOBILE_LINK} ${FOCUS} ${
                                            item.href === active
                                                ? "text-red-700"
                                                : "text-slate-900"
                                        }`}
                                        onClick={closeMenu}
                                    >
                                        {item.label}
                                    </Link>

                                    {item.children.length > 0 && (
                                        <button
                                            type="button"
                                            className={`${SUBMENU_BUTTON} ${FOCUS}`}
                                            aria-label={`${
                                                expanded ? "Collapse" : "Expand"
                                            } ${item.label} links`}
                                            aria-expanded={expanded}
                                            aria-controls={submenuId}
                                            onClick={() => {
                                                setOpenSection(
                                                    expanded ? null : item.href
                                                );
                                            }}
                                        >
                                            <ChevronDown
                                                size={20}
                                                aria-hidden="true"
                                                className={
                                                    expanded
                                                        ? "rotate-180"
                                                        : ""
                                                }
                                            />
                                        </button>
                                    )}
                                </div>

                                {item.children.length > 0 && (
                                    <ul
                                        id={submenuId}
                                        className={SUBMENU_LIST}
                                        hidden={!expanded}
                                    >
                                        {item.children.map((child) => (
                                            <li key={child.label}>
                                                <Link
                                                    href={child.href}
                                                    className={`${SUBMENU_LINK} ${FOCUS}`}
                                                    onClick={closeMenu}
                                                >
                                                    {child.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
}