import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

const EMAIL = "info@valanthropy.org";

const mailto = (subject: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

// Stay in Touch and Request a Speaker open a pre-addressed email until they get their own pages/forms.
const options = [
    {
        title: "General Contact",
        desc: "Have questions about VAlanthropy, Hidden Wounds Village Alpha, donations, sponsorships, partnerships, events, or our mission?",
        cta: "General Contact Form",
        href: "/start-a-conversation",
    },
    {
        title: "Stay in Touch",
        desc: "Receive project updates, newsletters, event announcements, volunteer opportunities, and ways to support Hidden Wounds Village Alpha.",
        cta: "Stay in Touch",
        href: mailto("Stay in touch"),
    },
    {
        title: "Request a Speaker",
        desc: "Invite VAlanthropy to speak at your church, business, civic organization, veteran group, school, or community event.",
        cta: "Request a Speaker",
        href: mailto("Speaker request"),
    },
];

const optionButtonClass =
    "inline-flex min-h-11 w-full max-w-full items-center justify-center rounded bg-red-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 sm:px-8 md:w-auto md:px-14 md:py-5 md:text-base";

export default function Contact() {
    return (
        <div className="bg-white text-slate-900">
            <Header active="/contact" />

            {/* Hero */}
            <section className="bg-slate-900 px-4 py-10 text-white sm:px-8 sm:py-12 md:px-16 md:py-16">
                <div className="mx-auto max-w-5xl">
                    <p className="mb-4 text-[16px] uppercase tracking-wide text-red-500">Contact</p>
                    <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl">
                        Contact VAlanthropy Today
                    </h1>
                    <p className="max-w-md text-sm">
                        Have questions, want to support our mission, or need help finding the right
                        next step? We&rsquo;re here to help.
                    </p>
                </div>
            </section>

            {/* Contact options */}
            <section className="bg-white px-4 py-10 sm:px-8 sm:py-12 md:py-14">
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-2 text-2xl font-bold text-red-700">Contact Options</h2>
                    <p className="mb-6 text-sm text-slate-600">
                        Choose the option that best fits your needs.
                    </p>
                    <ul className="space-y-4">
                        {options.map((o) => (
                            <li
                                key={o.title}
                                className="flex min-w-0 flex-col gap-4 rounded border border-slate-200 p-4 sm:p-6 md:flex-row md:items-center md:justify-between md:gap-8"
                            >
                                <div className="min-w-0 max-w-2xl">
                                    <h3 className="mb-2 text-lg font-bold">{o.title}</h3>
                                    <p className="text-sm text-slate-600">{o.desc}</p>
                                </div>
                                {o.href.startsWith("/") ? (
                                    <Link
                                        href={o.href}
                                        className={`${optionButtonClass} self-start md:shrink-0 md:self-auto`}
                                    >
                                        {o.cta}
                                    </Link>
                                ) : (
                                    <a
                                        href={o.href}
                                        className={`${optionButtonClass} self-start md:shrink-0 md:self-auto`}
                                    >
                                        {o.cta}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Contact information */}
            <section className="bg-slate-100 px-4 py-10 sm:px-8 sm:py-12 md:px-16 md:py-14">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-700">
                        VAlanthropy
                    </h2>
                    <h3 className="mb-6 text-2xl font-bold">Contact Information</h3>
                    <div className="grid min-w-0 gap-4 md:grid-cols-2">
                        <div className="min-w-0 rounded border border-slate-200 bg-white p-4 text-sm sm:p-5">
                            <h4 className="mb-2 font-bold">Mailing Address</h4>
                            <p>VAlanthropy</p>
                            <p>P.O. Box 5230</p>
                            <p>Columbia, SC 29250</p>
                        </div>
                        <div className="min-w-0 rounded border border-slate-200 bg-white p-4 text-sm sm:p-5">
                            <h4 className="mb-2 font-bold">Project Address</h4>
                            <p>VAlanthropy&rsquo;s Hidden Wounds Village Alpha</p>
                            <p>22 S. Washington St.</p>
                            <p>Sumter, SC 29150</p>
                        </div>
                        <div className="min-w-0 rounded border border-slate-200 bg-white p-4 text-sm sm:p-5">
                            <h4 className="mb-2 font-bold">Phone</h4>
                            <a
                                href="tel:+18337258388"
                                className="font-semibold text-blue-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                            >
                                1-833 SALUTEU [725-8388]
                            </a>
                        </div>
                        <div className="min-w-0 rounded border border-slate-200 bg-white p-4 text-sm sm:p-5">
                            <h4 className="mb-2 font-bold">Email</h4>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="break-all font-semibold text-blue-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                            >
                                {EMAIL}
                            </a>
                        </div>
                    </div>

                    <div className="mt-8 text-sm text-slate-600">
                        <h4 className="mb-2 font-bold text-slate-900">Nonprofit Information</h4>
                        <p className="mb-1">
                            VAlanthropy is a registered 501(c)(3) nonprofit organization.
                        </p>
                        <p className="mb-1 font-semibold text-slate-900">EIN: 88-0840494</p>
                        <p>Donations are tax-deductible to the fullest extent allowed by law.</p>
                    </div>
                </div>
            </section>

            {/* Veteran support partner */}
            <section className="bg-white px-4 py-10 sm:px-8 sm:py-12 md:px-16 md:py-14">
                <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-10">
                    <div>
                        <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-700">
                            Veteran Support Partner
                        </h2>
                        <h3 className="mb-3 text-2xl font-bold">Hidden Wounds Resource Center</h3>
                        <p className="text-sm text-slate-600">
                            Hidden Wounds Resource Center serves as VAlanthropy&rsquo;s veteran
                            support partner for Hidden Wounds Village Alpha, providing veteran
                            intake, care coordination, referrals, service connections, and ongoing
                            resident support.
                        </p>
                    </div>
                    <div className="min-w-0 space-y-4 self-start rounded border border-slate-200 p-4 text-sm sm:p-6">
                        <div>
                            <p className="text-xs uppercase tracking-wide text-slate-500">Address</p>
                            <p>Hidden Wounds Resource Center</p>
                            <p>21 S. Washington St.</p>
                            <p>Sumter, SC 29150</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-slate-500">Phone</p>
                            <a
                                href="tel:+18036604357"
                                className="break-all font-semibold text-blue-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                            >
                                (803) 660-HELP
                            </a>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
                            <a
                                href="mailto:info@hiddenwounds.com"
                                className="font-semibold text-blue-900 hover:underline"
                            >
                                info@hiddenwounds.com
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Crisis line */}
            <section className="bg-blue-900 px-4 py-10 text-white sm:px-8 sm:py-12 md:px-16 md:py-14">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-4 text-2xl font-bold">If You Are a Veteran in Crisis</h2>
                    <p className="mb-3 max-w-2xl text-sm font-bold text-red-400">
                        If you or someone you know is in immediate danger, call 911 immediately.
                    </p>
                    <p className="mb-4 max-w-2xl text-sm">
                        Veterans, service members, and their loved ones can reach the Veterans
                        Crisis Line 24 hours a day, 7 days a week.
                    </p>
                    <ul className="mb-4 space-y-1 text-sm font-semibold">
                        <li>Call: 988, then press 1</li>
                        <li>Text: 838255</li>
                        <li>
                            Online Chat:{" "}
                            <a
                                href="https://www.veteranscrisisline.net"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="break-words underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Veterans Crisis Line
                            </a>
                        </li>
                    </ul>
                    <p className="mb-4 max-w-2xl text-sm">
                        The previous number, 1-800-273-8255 and press 1, may also connect callers
                        to the Veterans Crisis Line.
                    </p>
                    <p className="max-w-2xl text-sm text-slate-300">
                        VAlanthropy and Hidden Wounds Resource Center are not emergency response
                        providers. Website forms, emails, and phone messages are not monitored in
                        real time. If this is an emergency or immediate safety concern, call 911 or
                        contact the Veterans Crisis Line right away.
                    </p>
                </div>
            </section>

            {/* Privacy & response notice */}
            <section className="bg-slate-100 px-4 py-10 sm:px-8 sm:py-12 md:px-16 md:py-14">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-4 text-2xl font-bold text-red-700">
                        Privacy & Response Notice
                    </h2>
                    <div className="max-w-2xl space-y-3 text-sm text-slate-600">
                        <p>
                            Please do not submit medical records, emergency details, or highly
                            sensitive personal information through this website form.
                        </p>
                        <p>
                            For veteran support, intake, or service-related questions, please
                            contact Hidden Wounds Resource Center directly.
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
