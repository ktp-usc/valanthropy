import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Give Through NCF | VAlanthropy",
  description:
    "Learn how to recommend a grant to VAlanthropy from an existing NCF Giving Fund.",
};

const PAGE = "min-h-screen bg-white font-sans text-slate-900";
const SECTION_HERO = "bg-slate-900 px-8 py-16 text-white md:px-16";
const SECTION_LIGHT = "bg-white px-8 py-14 md:px-16";
const CONTAINER = "mx-auto max-w-5xl";
const EYEBROW = "mb-4 text-[16px] uppercase tracking-wide text-red-400";
const PAGE_TITLE = "text-4xl font-bold";
const SECTION_TITLE = "mb-6 text-2xl font-bold";
const BODY = "text-sm leading-6 text-slate-600";
const LINK =
  "font-semibold text-red-700 underline underline-offset-4 hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700";
const BUTTON_PRIMARY =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900";
const CARD =
  "rounded border border-slate-200 bg-white p-5 transition hover:shadow-lg sm:p-6";

const instructions = [
  "Log in to your NCF Giving Fund.",
  "Find VAlanthropy in the charity directory. If it is not listed, recommend it to NCF for review.",
  "Enter the grant amount and any applicable grant details.",
  "Review your recommendation and submit it to NCF for review and approval.",
];

export default function NcfGivingPage() {
  return (
    <div className={PAGE}>
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4 focus:text-slate-900"
        href="#main-content"
      >
        Skip to content
      </a>

      <Header active="/ways-to-help" />

      <main id="main-content">
        {/* Hero */}
        <section className={SECTION_HERO}>
          <div className={CONTAINER}>
            <p className={EYEBROW}>Donor-advised giving</p>
            <h1 className={PAGE_TITLE}>Give Through NCF</h1>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-white">
              An NCF Giving Fund is a donor-advised fund. If you have an
              account, you can recommend grants from it to eligible charities.
              Search for VAlanthropy in NCF’s charity directory, or recommend it
              to NCF for review if it is not listed.
            </p>
            <a
              className={`${BUTTON_PRIMARY} mt-7`}
              href="https://secure.ncfgiving.com/"
              rel="noreferrer"
              target="_blank"
            >
              Log in to your NCF Giving Fund
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>
        </section>

        {/* Instructions */}
        <section
          aria-labelledby="instructions-heading"
          className={SECTION_LIGHT}
        >
          <div className={CONTAINER}>
            <h2 className={SECTION_TITLE} id="instructions-heading">
              Recommend a grant from your NCF fund
            </h2>
            <ol className="grid gap-4 sm:grid-cols-2">
              {instructions.map((instruction, index) => (
                <li className={CARD} key={instruction}>
                  <span
                    aria-hidden="true"
                    className="mb-3 block text-sm font-semibold text-red-700"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className={BODY}>{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Recipient information */}
        <section
          aria-labelledby="recipient-heading"
          className="bg-blue-900 px-8 py-14 text-white md:px-16"
        >
          <div className={CONTAINER}>
            <h2 className={SECTION_TITLE} id="recipient-heading">
              VAlanthropy recipient information
            </h2>
            <dl className="grid gap-4 sm:grid-cols-3">
              <div className="rounded border border-white/30 p-4">
                <dt className="text-sm text-red-400">Organization</dt>
                <dd className="mt-1 font-semibold">VAlanthropy</dd>
              </div>
              <div className="rounded border border-white/30 p-4">
                <dt className="text-sm text-red-400">EIN</dt>
                <dd className="mt-1 font-semibold">88-0840494</dd>
              </div>
              <div className="rounded border border-white/30 p-4 sm:col-span-3">
                <dt className="text-sm text-red-400">Mailing address</dt>
                <dd className="mt-1 font-semibold">
                  P.O. Box 5230, Columbia, SC 29250
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* More information and assistance */}
        <section className={SECTION_LIGHT}>
          <div className={`${CONTAINER} grid gap-8 md:grid-cols-2`}>
            <div>
              <h2 className={SECTION_TITLE}>New to NCF?</h2>
              <p className={BODY}>
                Learn more about NCF Giving Funds and how to open a fund on
                NCF’s website.
              </p>
              <a
                className={`mt-4 inline-flex items-center gap-2 ${LINK}`}
                href="https://www.ncfgiving.com/giving-fund"
                rel="noreferrer"
                target="_blank"
              >
                Learn about NCF Giving Funds
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>
            <div>
              <h2 className={SECTION_TITLE}>Need assistance?</h2>
              <p className={BODY}>
                Contact Richard at{" "}
                <a className={LINK} href="mailto:Richard@valanthropy.org">
                  Richard@valanthropy.org
                </a>{" "}
                if you have questions about recommending a grant to VAlanthropy.
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Grant recommendations are subject to NCF review and approval.
              </p>
            </div>
          </div>
          <div className={`${CONTAINER} mt-8 border-t border-slate-200 pt-6`}>
            <Link
              className={`inline-flex items-center gap-2 ${LINK}`}
              href="/donate"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              Back to Donation Options
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
