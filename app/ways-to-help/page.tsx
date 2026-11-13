"use client";

import { Dialog } from "radix-ui";
import Header from "@/components/header";

// Layout
const PAGE = "min-h-screen bg-white text-slate-900";
const CONTAINER = "mx-auto max-w-5xl";
const SECTION_HERO = "bg-slate-900 px-8 py-16 text-white md:px-16";
const SECTION_LIGHT = "bg-white px-8 py-14 md:px-16";
const SECTION_DARK = "bg-blue-900 px-8 py-14 text-white md:px-16";

// Typography
const EYEBROW = "mb-4 text-[16px] uppercase tracking-wide text-red-500";
const PAGE_TITLE = "text-4xl font-bold";
const SECTION_TITLE = "mb-6 text-2xl font-bold";
const HERO_TEXT = "mt-4 max-w-2xl text-sm text-slate-300";
const BODY = "text-sm text-slate-600";
const INTRO = "mb-6 text-sm text-slate-600";
const INLINE_LINK_DARK = "font-semibold text-red-400 hover:underline";
const BODY_DARK = "text-sm text-white/80";
const CARD_NAME = "font-bold";
const CARD_SUBTITLE = "mt-1 text-[16px] text-red-700";
const CARD_NAME_DARK = "text-sm font-semibold";
const CARD_SUBTITLE_DARK = "mt-1 text-sm text-red-400";

// Grids & cards
const GRID = "grid gap-4 sm:grid-cols-2 md:grid-cols-3";
const GRID_FOUR = "grid gap-4 sm:grid-cols-2 md:grid-cols-4";
const CARD_LIGHT =
    "h-full w-full cursor-pointer rounded border border-slate-200 bg-white p-4 text-center transition hover:shadow-lg";
const CARD_DARK =
    "h-full w-full cursor-pointer rounded border border-white/30 p-4 text-center transition hover:bg-white/10";
const STEP = "rounded border border-white/30 p-4";
const STEP_NUMBER = "mb-2 text-sm font-semibold text-red-400";

// Buttons
const BUTTON = "inline-block cursor-pointer rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white";
const BUTTON_OUTLINE =
    "inline-block cursor-pointer rounded border border-white/30 px-8 py-3 text-xs font-semibold text-white transition hover:bg-white/10";
const BUTTON_ROW = "mt-8 flex flex-wrap gap-4";

// Dialog
const OVERLAY = "fixed inset-0 z-40 bg-black/60";
const DIALOG =
    "fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 text-slate-900 shadow-xl";
const DIALOG_TITLE = "text-center text-xl font-bold";
const DIALOG_DESCRIPTION = "mb-4 text-center text-xs text-red-700";
const DIALOG_LINKS = "mt-4 space-y-2 text-sm";
const DIALOG_LINK = "font-semibold text-red-700 hover:underline";
const DIALOG_CLOSE = "mt-6 w-full cursor-pointer rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white";

// Links
const DONATE_URL = "https://valanthropy.networkforgood.com/projects/266901-complete-the-mission";
const MONTHLY_URL = "https://valanthropy.networkforgood.com/projects/304047-village-builder-challenge";
const BRICK_URL = "https://valanthropy.networkforgood.com/projects/297702-valanthropy-s-legacy-brick-program";
const SPEAKER_URL = "https://valanthropy.dm.networkforgood.com/forms/speaking-opportunity";
const SPONSOR_URL = "https://valanthropy.dm.networkforgood.com/forms/become-a-sponsor";
const NCF_URL = "https://www.ncfgiving.com/";
const ADVANCEMENT_EMAIL = "mailto:Richard@valanthropy.org?subject=VAlanthropy%20Giving%20Inquiry";
const EIN = "88-0840494";

type Action = { label: string; href: string };

type Option = {
    name: string;
    subtitle: string;
    details: string;
    actions: Action[];
};

const givingOptions: Option[] = [
    {
        name: "One-time gift",
        subtitle: "Give online in minutes",
        details:
            "Support construction, furnishing and move-in readiness at Hidden Wounds Village Alpha. Gifts of $1,000 or more may qualify for an engraved Legacy Brick.",
        actions: [{ label: "Give now", href: DONATE_URL }],
    },
    {
        name: "$20 monthly challenge",
        subtitle: "Become a Village Builder",
        details:
            "Give $20 a month to provide steady, predictable funding that keeps the project moving forward.",
        actions: [{ label: "Join the challenge", href: MONTHLY_URL }],
    },
    {
        name: "Legacy Brick",
        subtitle: "Honor someone you love",
        details:
            "Engraved bricks line the village's gardens and pathways. Honor a veteran, loved one, family, business or organization. Military logos are added at no charge.",
        actions: [{ label: "Create your brick", href: BRICK_URL }],
    },
    {
        name: "Major gifts",
        subtitle: "Make a lasting impact",
        details:
            "Larger gifts can fund an apartment, a community space or a phase of construction. Our Director of Advancement will work with you on how your gift is used and recognized.",
        actions: [{ label: "Talk with our team", href: ADVANCEMENT_EMAIL }],
    },
    {
        name: "Stock transfers",
        subtitle: "Give appreciated assets",
        details:
            "Gifts of stock or other appreciated securities may offer tax advantages. Contact our Director of Advancement for transfer instructions before you start the transfer.",
        actions: [{ label: "Request transfer instructions", href: ADVANCEMENT_EMAIL }],
    },
    {
        name: "Donor-advised funds",
        subtitle: "NCF and other DAF sponsors",
        details: `We accept grants from the National Christian Foundation and other donor-advised fund sponsors. Search for "VAlanthropy" or EIN ${EIN}.`,
        actions: [
            { label: "See NCF steps below", href: "#ncf" },
            { label: "Go to NCF", href: NCF_URL },
        ],
    },
    {
        name: "Corporate & matching gifts",
        subtitle: "Double your impact",
        details:
            "Many employers match gifts or offer payroll and volunteer grant programs. Check with your HR team, then let us know so we can help.",
        actions: [{ label: "Ask about matching", href: ADVANCEMENT_EMAIL }],
    },
    {
        name: "Give by check",
        subtitle: "Mail your gift",
        details:
            "Make checks payable to VAlanthropy and mail to P.O. Box 5230, Columbia, SC 29250. Note any specific purpose in the memo line.",
        actions: [{ label: "Questions? Email Tom", href: "mailto:tom@valanthropy.org" }],
    },
    {
        name: "Goods & services",
        subtitle: "In-kind gifts",
        details:
            "Furniture, household goods, construction materials and professional services are welcome when they match current needs. Please contact us before buying or delivering anything.",
        actions: [{ label: "Ask about an in-kind gift", href: ADVANCEMENT_EMAIL }],
    },
];

const ncfSteps: string[] = [
    "Sign in to your Giving Fund at ncfgiving.com. New to NCF? You can open a Giving Fund there.",
    `Recommend a grant and search for "VAlanthropy" or our EIN, ${EIN}.`,
    "Enter your amount and, if you like, note a purpose such as Hidden Wounds Village Alpha.",
    "Submit your recommendation. NCF reviews it and sends the grant to VAlanthropy.",
];

const involvementOptions: Option[] = [
    {
        name: "Sponsor or partner",
        subtitle: "Businesses, churches and groups",
        details:
            "Sponsor an apartment, furnishings, a community space, an event or a construction phase. Recognition benefits are subject to VAlanthropy approval.",
        actions: [{ label: "Become a sponsor", href: SPONSOR_URL }],
    },
    {
        name: "Host a fundraiser",
        subtitle: "Rally your community",
        details:
            "Workplace campaigns, $20 challenge teams, benefit or golf events and peer-to-peer campaigns all help. We'll help you plan.",
        actions: [
            {
                label: "Plan with us",
                href: "mailto:Richard@valanthropy.org?subject=Fundraiser%20for%20VAlanthropy",
            },
        ],
    },
    {
        name: "Invite us to speak",
        subtitle: "For your group or event",
        details: "We share our mission, the Hidden Wounds Village Alpha project, veteran housing needs and ways to help.",
        actions: [{ label: "Request a speaker", href: SPEAKER_URL }],
    },
    {
        name: "Volunteer",
        subtitle: "Lend your time and skills",
        details: "Tell us how you'd like to help and we'll connect you with current needs.",
        actions: [
            {
                label: "Email us",
                href: "mailto:info@valanthropy.org?subject=Volunteering%20with%20VAlanthropy",
            },
        ],
    },
];

function isExternal(href: string) {
    return href.startsWith("http");
}

function OptionDialog({ option, dark }: { option: Option; dark?: boolean }) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button type="button" className={dark ? CARD_DARK : CARD_LIGHT}>
                    <h3 className={dark ? CARD_NAME_DARK : CARD_NAME}>{option.name}</h3>
                    <p className={dark ? CARD_SUBTITLE_DARK : CARD_SUBTITLE}>{option.subtitle}</p>
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={OVERLAY} />
                <Dialog.Content className={DIALOG}>
                    <Dialog.Title className={DIALOG_TITLE}>{option.name}</Dialog.Title>
                    <Dialog.Description className={DIALOG_DESCRIPTION}>{option.subtitle}</Dialog.Description>
                    <p className={BODY}>{option.details}</p>
                    <ul className={DIALOG_LINKS}>
                        {option.actions.map((action) => (
                            <li key={action.label}>
                                {action.href.startsWith("#") ? (
                                    <Dialog.Close asChild>
                                        <a href={action.href} className={DIALOG_LINK}>
                                            {action.label} →
                                        </a>
                                    </Dialog.Close>
                                ) : (
                                    <a
                                        href={action.href}
                                        className={DIALOG_LINK}
                                        {...(isExternal(action.href)
                                            ? { target: "_blank", rel: "noopener noreferrer" }
                                            : {})}
                                    >
                                        {action.label} →
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                    <Dialog.Close asChild>
                        <button type="button" className={DIALOG_CLOSE}>
                            Close
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default function WaysToHelp() {
    return (
        <div className={PAGE}>
            <Header active="/ways-to-help" />

            {/* Hero */}
            <section className={SECTION_HERO}>
                <div className={CONTAINER}>
                    <p className={EYEBROW}>Ways to Help</p>
                    <h1 className={PAGE_TITLE}>Help build a place where veterans can rebuild</h1>
                    <p className={HERO_TEXT}>
                        Every gift, sponsorship and hour of support moves Hidden Wounds Village Alpha closer to
                        move-in day. Choose the way that works best for you.
                    </p>
                    <div className={BUTTON_ROW}>
                        <a href={DONATE_URL} target="_blank" rel="noopener noreferrer" className={BUTTON}>
                            Give now
                        </a>
                        <a href={MONTHLY_URL} target="_blank" rel="noopener noreferrer" className={BUTTON_OUTLINE}>
                            Give $20 a month
                        </a>
                    </div>
                </div>
            </section>

            {/* Ways to give */}
            <section id="donate" className={SECTION_LIGHT}>
                <div className={CONTAINER}>
                    <h2 className={SECTION_TITLE}>Ways to give</h2>
                    <p className={INTRO}>Select an option to learn more.</p>
                    <ul className={GRID}>
                        {givingOptions.map((option) => (
                            <li key={option.name}>
                                <OptionDialog option={option} />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* NCF instructions */}
            <section id="ncf" className={SECTION_DARK}>
                <div className={CONTAINER}>
                    <p className={EYEBROW}>National Christian Foundation</p>
                    <h2 className={SECTION_TITLE}>How to give through NCF</h2>
                    <ol className={GRID_FOUR}>
                        {ncfSteps.map((step, i) => (
                            <li key={step} className={STEP}>
                                <p className={STEP_NUMBER}>Step {i + 1}</p>
                                <p className={BODY_DARK}>{step}</p>
                            </li>
                        ))}
                    </ol>
                    <div className={BUTTON_ROW}>
                        <a href={NCF_URL} target="_blank" rel="noopener noreferrer" className={BUTTON}>
                            Go to NCF
                        </a>
                        <a href={ADVANCEMENT_EMAIL} className={BUTTON_OUTLINE}>
                            Need help? Contact us
                        </a>
                    </div>
                </div>
            </section>

            {/* Get involved */}
            <section id="get-involved" className={SECTION_LIGHT}>
                <div className={CONTAINER}>
                    <h2 className={SECTION_TITLE}>Get involved</h2>
                    <ul className={GRID_FOUR}>
                        {involvementOptions.map((option) => (
                            <li key={option.name}>
                                <OptionDialog option={option} />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Contact */}
            <section className={SECTION_DARK}>
                <div className={CONTAINER}>
                    <h2 className={SECTION_TITLE}>Questions about giving?</h2>
                    <p className={BODY_DARK}>
                        Contact Richard Creswell, Director of Advancement, at{" "}
                        <a href={ADVANCEMENT_EMAIL} className={INLINE_LINK_DARK}>
                            Richard@valanthropy.org
                        </a>
                        . VAlanthropy is a registered 501(c)(3) nonprofit, EIN {EIN}. Donations are
                        tax-deductible to the fullest extent allowed by law.
                    </p>
                </div>
            </section>
        </div>
    );
}
