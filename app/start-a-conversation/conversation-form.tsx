"use client";

const EMAIL = "Lilly@valanthropy.org";

const contactMethods = ["Email", "Phone"];

const partnershipTypes = [
    "Customer Campaign",
    "Employee Challenge",
    "Event or Class",
    "Sponsorship",
    "In-Kind Contribution",
    "Legacy Brick",
    "Customized Partnership",
    "Other",
];

const inputClass =
    "w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-900 focus:outline-none";

export default function ConversationForm({ interest }: { interest?: string }) {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = String(data.get("name") ?? "");
        const organization = String(data.get("organization") ?? "");
        const email = String(data.get("email") ?? "");
        const website = String(data.get("website") ?? "");
        const phone = String(data.get("phone") ?? "");
        const method = String(data.get("method") ?? "");
        const interests = data.getAll("interest").map(String);
        const comment = String(data.get("comment") ?? "");

        const subject = interest ? `Partnership inquiry: ${interest}` : "Partnership inquiry";
        const body = [
            interest && `Interested in: ${interest}`,
            `Point of contact: ${name}`,
            `Business or organization: ${organization}`,
            `Email: ${email}`,
            phone && `Phone: ${phone}`,
            website && `Website or social media: ${website}`,
            `Preferred method of contact: ${method}`,
            interests.length > 0 && `Partnership interest: ${interests.join(", ")}`,
            "",
            comment,
        ]
            .filter((line): line is string => typeof line === "string")
            .join("\n");

        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor="comment" className="mb-1 block text-sm font-semibold">
                    Comment
                </label>
                <textarea
                    id="comment"
                    name="comment"
                    rows={6}
                    maxLength={1000}
                    className={inputClass}
                />
            </div>

            <div>
                <label htmlFor="name" className="mb-1 block text-sm font-semibold">
                    Point of Contact Name <span className="text-red-700">(required)</span>
                </label>
                <input id="name" name="name" type="text" required className={inputClass} />
            </div>

            <div>
                <label htmlFor="organization" className="mb-1 block text-sm font-semibold">
                    Business or Organization Name <span className="text-red-700">(required)</span>
                </label>
                <input
                    id="organization"
                    name="organization"
                    type="text"
                    required
                    className={inputClass}
                />
            </div>

            <div>
                <label htmlFor="email" className="mb-1 block text-sm font-semibold">
                    Email <span className="text-red-700">(required)</span>
                </label>
                <input id="email" name="email" type="email" required className={inputClass} />
            </div>

            <div>
                <label htmlFor="website" className="mb-1 block text-sm font-semibold">
                    Website or Social Media Page Link
                </label>
                <input id="website" name="website" type="text" placeholder="https://" className={inputClass} />
            </div>

            <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-semibold">
                    Phone Number
                </label>
                <input id="phone" name="phone" type="tel" className={inputClass} />
            </div>

            <fieldset>
                <legend className="mb-2 text-sm font-semibold">
                    Preferred Method of Contact <span className="text-red-700">(required)</span>
                </legend>
                <div className="flex gap-6 text-sm">
                    {contactMethods.map((m, i) => (
                        <label key={m} className="flex items-center gap-2">
                            <input type="radio" name="method" value={m} required={i === 0} />
                            {m}
                        </label>
                    ))}
                </div>
            </fieldset>

            <fieldset>
                <legend className="mb-2 text-sm font-semibold">Type of Partnership Interest</legend>
                <div className="grid gap-2 text-sm sm:grid-cols-2">
                    {partnershipTypes.map((t) => (
                        <label key={t} className="flex items-center gap-2">
                            <input type="checkbox" name="interest" value={t} />
                            {t}
                        </label>
                    ))}
                </div>
            </fieldset>

            <label className="flex items-start gap-2 text-xs text-slate-600">
                <input name="acknowledge" type="checkbox" required className="mt-0.5" />
                <span>
                    I understand that submitting this form begins a conversation and does not
                    create a formal partnership or sponsorship agreement.{" "}
                    <span className="text-red-700">(required)</span>
                </span>
            </label>

            <button
                type="submit"
                className="cursor-pointer rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white"
            >
                Start the Conversation
            </button>
        </form>
    );
}
