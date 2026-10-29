"use client";

import type { FormEvent } from "react";

const givingInterests = [
  "One-time donation",
  "Monthly giving",
  "Donor-advised fund / NCF",
  "Legacy giving or a legacy brick",
  "Sponsorship",
  "Major gift",
  "Stock transfer or another giving option",
];

export default function DonationInterestForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const subject = "Giving assistance";
    const body = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Giving interest: ${formData.get("interest")}`,
      "",
      "Message:",
      formData.get("message"),
    ].join("\n");
    const params = new URLSearchParams({ subject, body });

    window.location.href = `mailto:lilly@valanthropy.org?${params.toString()}`;
  }

  return (
    <form
      aria-describedby="donation-form-note"
      className="space-y-5"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          className="mb-2 block text-sm font-semibold text-slate-800"
          htmlFor="donor-name"
        >
          Name
        </label>
        <input
          autoComplete="name"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-[#16345c] focus:ring-2 focus:ring-[#16345c]/20"
          id="donor-name"
          name="name"
          required
        />
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-semibold text-slate-800"
          htmlFor="donor-email"
        >
          Email address
        </label>
        <input
          autoComplete="email"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-[#16345c] focus:ring-2 focus:ring-[#16345c]/20"
          id="donor-email"
          name="email"
          required
          type="email"
        />
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-semibold text-slate-800"
          htmlFor="giving-interest"
        >
          What giving option would you like to discuss?
        </label>
        <select
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-[#16345c] focus:ring-2 focus:ring-[#16345c]/20"
          defaultValue=""
          id="giving-interest"
          name="interest"
          required
        >
          <option disabled value="">
            Select an option
          </option>
          {givingInterests.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-semibold text-slate-800"
          htmlFor="donor-message"
        >
          Message <span className="font-normal text-slate-600">(optional)</span>
        </label>
        <textarea
          className="min-h-28 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-[#16345c] focus:ring-2 focus:ring-[#16345c]/20"
          id="donor-message"
          name="message"
          rows={4}
        />
      </div>

      <button
        className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#b52c38] px-6 py-3 font-semibold text-white transition hover:bg-[#92232e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16345c] sm:w-auto"
        type="submit"
      >
        Continue by email
      </button>
      <p className="text-sm leading-6 text-slate-600" id="donation-form-note">
        This opens an email to VAlanthropy’s team. It does not process a
        donation; your email application must be configured to send the message.
      </p>
    </form>
  );
}
