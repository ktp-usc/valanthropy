"use client";

import Image from "next/image";
import Link from "next/link";
import { Dialog } from "radix-ui";
import Header from "@/components/header";
import { slotText } from "@/lib/wp-text";

// Text wrapped in <T> can be edited in the WordPress page "financials-new".
const T = slotText("financials-new");

// Add an `href` (e.g. "/financials/form-990-2025.pdf" in /public) once a document is approved for release.
type Doc = { label: string; href?: string };

type DocGroup = { heading?: string; docs: Doc[]; asCards?: boolean };

type Section = {
    title: string;
    summary: string;
    // Optional semi-opaque image shown over the navy button, e.g. "/financials/valanthropy.jpg"
    image?: string;
    groups?: DocGroup[];
};

const BUTTON_IMAGE = "/financials/village.png";

// Four reporting years of documents, newest first. To publish one, add the PDF to /public/financials/,
// then fill in the year and its path, e.g. { year: "2025", form990: "/financials/2025-form-990.pdf" }.
// Post only the public copy of Form 990 (no Schedule B donor names or addresses).
type ReportingYear = {
    year?: string;
    financialStatements?: string;
    form990?: string;
    annualBudget?: string;
};

const reportingYears: ReportingYear[] = [{}, {}, {}, {}];

const sections: Section[] = [
    {
        title: "VAlanthropy Statements",
        summary: "Financial statements, Form 990, and annual budgets.",
        groups: reportingYears.map((y, i) => ({
            heading: y.year ? `${y.year} reporting year` : `Reporting year ${i + 1} (year coming soon)`,
            asCards: true,
            docs: [
                { label: "Financial Statements", href: y.financialStatements },
                { label: "Form 990", href: y.form990 },
                { label: "Annual Budget", href: y.annualBudget },
            ],
        })),
    },
    {
        title: "Donor & Giving Policies",
        summary: "How we handle donor privacy, giving, and gifts.",
        groups: [
            {
                docs: [
                    { label: "Donor Privacy Policy" },
                    { label: "Monthly Giving Policy" },
                    { label: "Gift, Gift Acceptance & Donor Transaction Policy" },
                    { label: "Legacy Brick Policy" },
                ],
            },
        ],
    },
    {
        title: "Transparency & Public Accountability",
        summary: "Public documents and website policies.",
        groups: [
            {
                docs: [
                    { label: "Financial Transparency & Public Documents" },
                    { label: "Non-Discrimination" },
                    { label: "Website Privacy Policy" },
                    { label: "Website Terms of Use" },
                ],
            },
        ],
    },
    {
        title: "Governance Policies",
        summary: "The policies that guide how VAlanthropy is governed.",
        groups: [
            {
                docs: [
                    { label: "Conflict of Interest Policy" },
                    { label: "Whistleblower Policy" },
                    { label: "Document Retention & Destruction Policy" },
                    { label: "Financial Control Policy" },
                    { label: "Restricted Funds Policy" },
                ],
            },
        ],
    },
    {
        title: "IRS Status",
        summary: "Our 501(c)(3) tax-exempt status.",
    },
];

function DocLink({ doc, children }: { doc: Doc; children: React.ReactNode }) {
    if (!doc.href) {
        return (
            <span title="Document coming soon" className="cursor-not-allowed opacity-60"><T>
                {children}
            </T></span>
        );
    }
    return (
        <a href={doc.href} target="_blank" rel="noopener noreferrer" className="hover:underline"><T>
            {children}
        </T></a>
    );
}

function IrsContent() {
    return (
        <div className="space-y-4 text-sm text-slate-600">
            <p><T>
                VAlanthropy is recognized as a tax-exempt nonprofit organization under Section
                501(c)(3) of the Internal Revenue Code.
            </T></p>
            <p><T>
                Contributions may be tax-deductible to the extent permitted by law. Donors should
                consult their own tax or financial adviser regarding their individual
                circumstances.
            </T></p>
            <div className="rounded border border-slate-200 p-4">
                <p className="mb-1 text-xs uppercase tracking-wide text-slate-500"><T>EIN</T></p>
                <p className="mb-3 text-xl font-bold text-slate-900">88-0840494</p>
                <DocLink doc={{ label: "IRS Determination Letter" }}>
                    <span className="font-semibold text-red-700"><T>
                        IRS Determination Letter [ View/Download ]
                    </T></span>
                </DocLink>
            </div>
        </div>
    );
}

function GroupContent({ group }: { group: DocGroup }) {
    return (
        <div>
            {group.heading && <h3 className="mb-3 text-sm font-bold"><T>{group.heading}</T></h3>}
            {group.asCards ? (
                <ul className="grid gap-3 sm:grid-cols-2">
                    {group.docs.map((doc, i) => (
                        <li
                            key={i}
                            className="flex flex-col justify-between gap-2 rounded border border-slate-200 p-3"
                        >
                            <span className="text-sm font-semibold"><T>{doc.label}</T></span>
                            <DocLink doc={doc}>
                                <span className="text-xs font-semibold text-red-700"><T>
                                    [ View/Download PDF ]
                                </T></span>
                            </DocLink>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul className="space-y-2 text-sm">
                    {group.docs.map((doc) => (
                        <li key={doc.label} className="border-b border-slate-100 pb-2">
                            <DocLink doc={doc}>{doc.label}</DocLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function SectionDialog({ section, children }: { section: Section; children: React.ReactNode }) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>{children}</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60" />
                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg bg-white p-6 text-slate-900 shadow-xl">
                    <Dialog.Title className="mb-1 text-xl font-bold">{section.title}</Dialog.Title>
                    <Dialog.Description className="mb-5 text-xs text-red-700">
                        {section.summary}
                    </Dialog.Description>
                    {section.groups ? (
                        <div className="space-y-6">
                            {section.groups.map((g, i) => (
                                <GroupContent key={i} group={g} />
                            ))}
                        </div>
                    ) : (
                        <IrsContent />
                    )}
                    <Dialog.Close className="mt-6 w-full cursor-pointer rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white">
                        Close
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

const internalTitles = ["VAlanthropy Statements", "IRS Status"];
const internalSections = sections.filter((s) => internalTitles.includes(s.title));
const policySections = sections.filter((s) => !internalTitles.includes(s.title));

// Three-across grid; a row of two is centered
function SectionButtons({ items }: { items: Section[] }) {
    return (
        <ul className="grid gap-4 md:grid-cols-6 md:gap-6">
            {items.map((s, i) => (
                <li
                    key={s.title}
                    className={`md:col-span-2 ${items.length === 2 && i === 0 ? "md:col-start-2" : ""}`}
                >
                    <SectionDialog section={s}>
                        <button
                            type="button"
                            className="group relative flex h-full min-h-56 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-blue-900 p-8 text-center transition hover:shadow-lg"
                        >
                            <Image
                                src={s.image ?? BUTTON_IMAGE}
                                alt=""
                                fill
                                sizes="(min-width: 768px) 33vw, 100vw"
                                className="object-cover opacity-40 grayscale transition group-hover:opacity-50"
                            />
                            <h3 className="relative text-xl font-bold text-white"><T>{s.title}</T></h3>
                        </button>
                    </SectionDialog>
                </li>
            ))}
        </ul>
    );
}

export default function Financials() {
    return (
        <div className="bg-white text-slate-900">
            <Header active="/about" />

            {/* Hero */}
            <section className="bg-slate-900 px-8 py-16 text-white md:px-16">
                <div className="mx-auto max-w-5xl">
                    <p className="mb-4 text-[16px] uppercase tracking-wide text-red-500"><T>About Us</T></p>
                    <h1 className="mb-4 text-4xl font-bold leading-tight"><T>Financial & Transparency</T></h1>
                    <p className="mb-4 max-w-2xl text-sm"><T>
                        VAlanthropy is committed to responsible stewardship, transparency, and
                        accountability. We believe donors, partners, grantmakers, and the communities
                        we serve should be able to understand how our organization is governed, how
                        charitable resources are managed, and how our work supports the development
                        of permanent affordable housing for veterans.
                    </T></p>
                    <p className="max-w-2xl text-sm text-slate-300"><T>
                        This page provides access to selected financial, governance, and public
                        documents as they become available and are approved for public release.
                    </T></p>
                </div>
            </section>

            {/* Stewardship */}
            <section className="bg-white px-8 py-14 md:px-16">
                <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
                    <div>
                        <h2 className="mb-3 text-2xl font-bold"><T>Financial Stewardship</T></h2>
                        <p className="mb-3 text-sm text-slate-600"><T>
                            VAlanthropy works to manage charitable resources carefully and
                            responsibly. Financial decisions are made to advance our mission, support
                            the development of Hidden Wounds Village Alpha, maintain organizational
                            sustainability, and honor any donor restrictions formally accepted by the
                            organization.
                        </T></p>
                        <p className="text-sm text-slate-600"><T>
                            Financial figures related to construction, project commitments,
                            fundraising needs, and organizational operations are updated as verified
                            information becomes available.
                        </T></p>
                    </div>
                    <aside className="self-start rounded border-l-4 border-red-700 bg-slate-100 p-5">
                        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-red-700"><T>
                            Note:
                        </T></h3>
                        <p className="text-sm text-slate-700"><T>
                            Project budgets and funding figures may change as plans, permits,
                            construction costs, grants, pledges, and project requirements are
                            finalized. VAlanthropy publishes only figures that have been verified
                            through current organizational or board-approved records.
                        </T></p>
                    </aside>
                </div>
            </section>

            {/* Section buttons */}
            <section className="bg-white px-8 pb-14 md:px-16">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-6 text-2xl font-bold text-red-700"><T>Internal Statements</T></h2>
                    <SectionButtons items={internalSections} />

                    <h2 className="mb-6 mt-14 text-2xl font-bold text-red-700"><T>
                        Governance and Corporate Policies
                    </T></h2>
                    <SectionButtons items={policySections} />
                </div>
            </section>

            {/* Request documents */}
            <section className="bg-slate-900 px-8 py-14 text-center text-white md:px-16">
                <div className="mx-auto max-w-2xl">
                    <p className="mb-2 text-sm"><T>
                        If you are looking for a VAlanthropy financial or organizational document
                        that is not currently posted, please contact us.
                    </T></p>
                    <p className="mb-6 text-sm text-slate-300"><T>
                        We will respond to reasonable requests for documents required to be publicly
                        available or approved for public release.
                    </T></p>
                    <Link
                        href="/contact"
                        className="inline-block rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white"
                    ><T>
                        Contact Us
                    </T></Link>
                </div>
            </section>

            {/* Notice */}
            <section className="bg-white px-8 py-10 md:px-16">
                <p className="mx-auto max-w-5xl text-xs text-slate-500"><T>
                    <span className="font-semibold text-slate-700">
                        Financial Information Notice:
                    </span>{" "}
                    VAlanthropy periodically reviews and updates its financial information, policies,
                    budgets, and public documents. Figures related to active development projects may
                    change as plans, permits, construction costs, funding commitments, and project
                    requirements evolve. The information posted on VAlanthropy.org represents the
                    most current public information approved for release. For questions regarding
                    financial information or public documents, contact{" "}
                    <a href="mailto:Tom@VAlanthropy.org" className="text-red-700 hover:underline">
                        Tom@VAlanthropy.org
                    </a>{" "}
                    or{" "}
                    <a href="tel:+18337258388" className="text-red-700 hover:underline">
                        1-833 SALUTEU [725-8388]
                    </a>
                    .
                </T></p>
            </section>
        </div>
    );
}
