import Header from "@/components/header";

const EMAIL = "info@valanthropy.org";

const NEWSLETTER_SIGNUP_URL =
    "https://valanthropy.dm.networkforgood.com/forms/subscibe-for-updates";

const mailto = (subject: string) =>
    `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

const options = [
    {
        title: "General Contact",
        desc: "Have questions about VAlanthropy, Hidden Wounds Village Alpha, donations, sponsorships, partnerships, events, or our mission?",
        cta: "General Contact Form",
        href: "https://valanthropy.dm.networkforgood.com/forms/general-contact-form",
    },
    {
        title: "Stay in Touch",
        desc: "Receive project updates, newsletters, event announcements, volunteer opportunities, and ways to support Hidden Wounds Village Alpha.",
        cta: "Stay in Touch",
        href: NEWSLETTER_SIGNUP_URL,
    },
    {
        title: "Request a Speaker",
        desc: "Invite VAlanthropy to speak at your church, business, civic organization, veteran group, school, or community event.",
        cta: "Request a Speaker",
        href: mailto("Speaker request"),
    },
];

// Layout
const CONTAINER =
    "mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12";

const SECTION = "py-12 md:py-16";

const TWO_COLUMNS =
    "grid items-start gap-8 md:grid-cols-2 md:gap-14";

// Typography
const EYEBROW =
    "mb-4 text-xs font-semibold uppercase tracking-widest text-red-700";

const SECTION_TITLE =
    "font-heading text-3xl font-normal leading-tight tracking-tight text-slate-900 md:text-4xl";

const CARD_TITLE =
    "font-sans text-xl font-semibold leading-snug text-slate-900";

const BODY =
    "text-base font-normal leading-7 text-slate-700 md:text-lg md:leading-8";

const INFO_TEXT =
    "text-base leading-7 text-slate-700";

const DETAIL_LABEL =
    "mb-2 text-xs font-semibold uppercase tracking-widest text-slate-600";

// Contact options
const CONTACT_ROW =
    "flex min-w-0 flex-col gap-6 rounded border border-slate-200 bg-white p-5 sm:p-6 md:flex-row md:items-center md:justify-between md:gap-10";

const CONTACT_BUTTON =
    "inline-flex min-h-14 w-full max-w-full items-center justify-center rounded bg-red-700 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700 motion-reduce:transition-none md:w-60 md:shrink-0";

    // Information cards and links
const INFO_CARD =
    "min-w-0 rounded border border-slate-200 bg-white p-5 sm:p-6";

const INFO_HEADING =
    "mb-3 text-base font-semibold text-slate-900";

const TEXT_LINK =
    "break-words text-base font-semibold leading-7 text-red-700 underline underline-offset-4 hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700";

export default function Contact() {
    return (
        <div className="bg-white font-sans text-slate-900">
            <Header active="/contact" />

            <main>
                {/* Hero */}
                <section className="bg-slate-900 py-12 md:py-16">
                    <div className={CONTAINER}>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-red-300">
                            Contact
                        </p>

                        <h1 className="mb-5 max-w-4xl font-heading text-4xl font-normal leading-tight tracking-tight text-white md:text-5xl">
                            Contact VAlanthropy Today
                        </h1>

                        <p className="max-w-prose text-base leading-7 text-slate-200 md:text-lg md:leading-8">
                            Have questions, want to support our mission, or need
                            help finding the right next step? We&rsquo;re here
                            to help.
                        </p>
                    </div>
                </section>

                {/* Contact options */}
                <section className={`bg-white ${SECTION}`}>
                    <div className={CONTAINER}>
                        <h2 className={`mb-4 ${SECTION_TITLE}`}>
                            Contact Options
                        </h2>

                        <p className={`mb-8 ${BODY}`}>
                            Choose the option that best fits your needs.
                        </p>

                        <ul className="space-y-4">
                            {options.map((option) => (
                                <li
                                    key={option.title}
                                    className={CONTACT_ROW}
                                >
                                    <div className="min-w-0 max-w-prose">
                                        <h3 className={`mb-3 ${CARD_TITLE}`}>
                                            {option.title}
                                        </h3>

                                        <p className={BODY}>
                                            {option.desc}
                                        </p>
                                    </div>

                                    <a
                                        href={option.href}
                                        className={CONTACT_BUTTON}
                                    >
                                        {option.cta}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Contact information */}
                <section className={`bg-slate-50 ${SECTION}`}>
                    <div className={CONTAINER}>
                        <p className={EYEBROW}>
                            VAlanthropy
                        </p>

                        <h2 className={`mb-8 ${SECTION_TITLE}`}>
                            Contact Information
                        </h2>

                        <div className="grid min-w-0 gap-4 md:grid-cols-2">
                            <div className={INFO_CARD}>
                                <h3 className={INFO_HEADING}>
                                    Mailing Address
                                </h3>

                                <div className={INFO_TEXT}>
                                    <p>VAlanthropy</p>
                                    <p>P.O. Box 5230</p>
                                    <p>Columbia, SC 29250</p>
                                </div>
                            </div>

                            <div className={INFO_CARD}>
                                <h3 className={INFO_HEADING}>
                                    Project Address
                                </h3>

                                <div className={INFO_TEXT}>
                                    <p>
                                        VAlanthropy&rsquo;s Hidden Wounds
                                        Village Alpha
                                    </p>
                                    <p>22 S. Washington St.</p>
                                    <p>Sumter, SC 29150</p>
                                </div>
                            </div>

                            <div className={INFO_CARD}>
                                <h3 className={INFO_HEADING}>
                                    Phone
                                </h3>

                                <a
                                    href="tel:+18337258388"
                                    className={TEXT_LINK}
                                >
                                    1-833 SALUTEU [725-8388]
                                </a>
                            </div>

                            <div className={INFO_CARD}>
                                <h3 className={INFO_HEADING}>
                                    Email
                                </h3>

                                <a
                                    href={`mailto:${EMAIL}`}
                                    className={TEXT_LINK}
                                >
                                    {EMAIL}
                                </a>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-slate-200 pt-8">
                            <h3 className={INFO_HEADING}>
                                Nonprofit Information
                            </h3>

                            <div className={INFO_TEXT}>
                                <p className="mb-2">
                                    VAlanthropy is a registered 501(c)(3)
                                    nonprofit organization.
                                </p>

                                <p className="mb-2 font-semibold text-slate-900">
                                    EIN: 88-0840494
                                </p>

                                <p>
                                    Donations are tax-deductible to the fullest
                                    extent allowed by law.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Veteran support partner */}
                <section className={`bg-white ${SECTION}`}>
                    <div className={`${CONTAINER} ${TWO_COLUMNS}`}>
                        <div>
                            <p className={EYEBROW}>
                                Veteran Support Partner
                            </p>

                            <h2 className={`mb-6 ${SECTION_TITLE}`}>
                                Hidden Wounds Resource Center
                            </h2>

                            <p className={BODY}>
                                Hidden Wounds Resource Center serves as
                                VAlanthropy&rsquo;s veteran support partner for
                                Hidden Wounds Village Alpha, providing veteran
                                intake, care coordination, referrals, service
                                connections, and ongoing resident support.
                            </p>
                        </div>

                        <div className="min-w-0 space-y-6 rounded border border-slate-200 p-5 sm:p-8">
                            <div>
                                <h3 className={DETAIL_LABEL}>
                                    Address
                                </h3>

                                <div className={INFO_TEXT}>
                                    <p>Hidden Wounds Resource Center</p>
                                    <p>21 S. Washington St.</p>
                                    <p>Sumter, SC 29150</p>
                                </div>
                            </div>

                            <div>
                                <h3 className={DETAIL_LABEL}>
                                    Phone
                                </h3>

                                <a
                                    href="tel:+18036604357"
                                    className={TEXT_LINK}
                                >
                                    (803) 660-HELP
                                </a>
                            </div>

                            <div>
                                <h3 className={DETAIL_LABEL}>
                                    Email
                                </h3>

                                <a
                                    href="mailto:info@hiddenwounds.com"
                                    className={TEXT_LINK}
                                >
                                    info@hiddenwounds.com
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Crisis line */}
                <section className={`bg-slate-900 text-white ${SECTION}`}>
                    <div className={CONTAINER}>
                        <h2 className="mb-6 font-heading text-3xl font-normal leading-tight tracking-tight md:text-4xl">
                            If You Are a Veteran in Crisis
                        </h2>

                        <div className="max-w-prose space-y-5 text-base leading-7 md:text-lg md:leading-8">
                            <p className="font-semibold">
                                If you or someone you know is in immediate
                                danger, call 911 immediately.
                            </p>

                            <p>
                                Veterans, service members, and their loved ones
                                can reach the Veterans Crisis Line 24 hours a
                                day, 7 days a week.
                            </p>

                            <ul className="space-y-2 font-semibold">
                                <li>Call: 988, then press 1</li>
                                <li>Text: 838255</li>
                                <li>
                                    Online Chat:{" "}
                                    <a
                                        href="https://www.veteranscrisisline.net"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline underline-offset-4 hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                                    >
                                        Veterans Crisis Line
                                    </a>
                                </li>
                            </ul>

                            <p>
                                The previous number, 1-800-273-8255 and press 1,
                                may also connect callers to the Veterans
                                Crisis Line.
                            </p>

                            <p className="text-slate-300">
                                VAlanthropy and Hidden Wounds Resource Center
                                are not emergency response providers. Website
                                forms, emails, and phone messages are not
                                monitored in real time. If this is an emergency
                                or immediate safety concern, call 911 or contact
                                the Veterans Crisis Line right away.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Privacy and response notice */}
                <section className={`bg-slate-50 ${SECTION}`}>
                    <div className={CONTAINER}>
                        <h2 className={`mb-6 ${SECTION_TITLE}`}>
                            Privacy &amp; Response Notice
                        </h2>

                        <div className={`max-w-prose space-y-4 ${BODY}`}>
                            <p>
                                Please do not submit medical records, emergency
                                details, or highly sensitive personal
                                information through this website form.
                            </p>

                            <p>
                                For veteran support, intake, or service-related
                                questions, please contact Hidden Wounds
                                Resource Center directly.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}