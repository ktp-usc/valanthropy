import Link from "next/link";
import Header from "@/components/header";
import ConversationForm from "./conversation-form";

const steps = [
    {
        label: "STEP 1",
        title: "We review your inquiry",
        desc: "Our team reviews your interests, ideas, and preferred way to connect.",
    },
    {
        label: "STEP 2",
        title: "We will explore the fit.",
        desc: "We discuss your goals and identify an appropriate partnership, sponsorship, or campaign structure.",
    },
    {
        label: "STEP 3",
        title: "We define the opportunity",
        desc: "Before anything launches, we clearly document responsibilities, timing, financial terms, messaging, and recognition.",
    },
];

export default async function StartAConversation({
    searchParams,
}: {
    searchParams: Promise<{ interest?: string | string[] }>;
}) {
    const { interest: raw } = await searchParams;
    const interest = (Array.isArray(raw) ? raw[0] : raw)?.slice(0, 80);

    return (
        <div className="bg-white text-slate-900">
            <Header active="/about" />

            {/* Hero */}
            <section className="bg-slate-900 px-8 py-16 text-white md:px-16">
                <div className="mx-auto max-w-5xl">
                    <p className="mb-4 text-[16px] uppercase tracking-wide text-red-500">
                        Partners & Sponsors
                    </p>
                    <h1 className="text-4xl font-bold leading-tight">Start a Conversation</h1>
                </div>
            </section>

            {/* Intro */}
            <section className="bg-white px-8 py-14 md:px-16">
                <div className="mx-auto max-w-5xl">
                    {interest && (
                        <div className="mb-8 max-w-md rounded border-l-4 border-red-700 bg-slate-100 p-4">
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                                You&rsquo;re interested in
                            </p>
                            <p className="text-lg font-bold">{interest}</p>
                        </div>
                    )}
                    <h2 className="mb-3 text-2xl font-bold text-red-700">
                        Start a Conversation with VAlanthropy
                    </h2>
                    <p className="max-w-2xl text-sm text-slate-600">
                        Tell us how you or your organization would like to get involved. We’ll
                        follow up to explore an opportunity that supports your goals and
                        VAlanthropy’s mission.
                    </p>
                </div>
            </section>

            {/* Form, then what happens next */}
            <section className="bg-white px-8 py-14 md:px-16">
                <div className="mx-auto max-w-2xl">
                    <p className="mb-8 rounded bg-slate-100 p-4 text-xs text-slate-600">
                        VAlanthropy respects your privacy. Information submitted through this form
                        will be used to respond to your inquiry and evaluate potential
                        opportunities
                    </p>
                    <h2 className="mb-6 text-2xl font-bold">Leave a Comment</h2>
                    <ConversationForm interest={interest} />
                </div>

                <div className="mx-auto mt-14 max-w-5xl border-t border-slate-200 pt-10">
                    <h2 className="mb-6 text-2xl font-bold text-red-700">What Happens Next</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {steps.map((s) => (
                            <div key={s.label}>
                                <p className="mb-1 text-xs font-semibold text-red-700">{s.label}</p>
                                <h3 className="mb-1 text-sm font-bold">{s.title}</h3>
                                <p className="text-xs text-slate-600">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-slate-900 px-8 py-10 text-center text-white">
                <Link href="/partners-and-sponsors" className="text-xs font-semibold hover:underline">
                    &larr; Back to Partners & Sponsors
                </Link>
            </section>
        </div>
    );
}
