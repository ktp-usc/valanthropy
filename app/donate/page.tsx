import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  HeartHandshake,
  House,
  MapPin,
} from "lucide-react";
import DonationInterestForm from "./donation-interest-form";
import valanthropyLogo from "./valanthropy-logo.png";
import villageImage from "./Hidden_Wounds_Village.png";
import villageHouseImage from "./Hidden_Wounds_Village_house.png";

const donationLinks = {
  general:
    "https://valanthropy.networkforgood.com/projects/266901-walls-are-being-built-now-lets-make-it-a-home",
  legacyBrick:
    "https://valanthropy.networkforgood.com/projects/297702-legacy-brick-campaign",
  sponsorship:
    "https://valanthropy.dm.networkforgood.com/forms/become-a-sponsor",
  ncf: "https://www.ncfgiving.com/advisor-solutions",
};

export const metadata: Metadata = {
  title: "Donate | VAlanthropy",
  description:
    "Support permanent, affordable veteran housing at Hidden Wounds Village Alpha in Sumter, South Carolina.",
};

const givingOptions = [
  {
    number: "01",
    title: "Donor-advised giving through NCF",
    description:
      "Explore donor-advised funds and giving options through the National Christian Foundation.",
    href: donationLinks.ncf,
    label: "Explore NCF giving",
    icon: HeartHandshake,
  },
  {
    number: "02",
    title: "Legacy brick campaign",
    description:
      "Honor a veteran, loved one, family, business, or organization with a personalized brick that helps support the project.",
    href: donationLinks.legacyBrick,
    label: "Explore legacy bricks",
    icon: House,
  },
  {
    number: "03",
    title: "Become a sponsor",
    description:
      "Businesses, churches, civic groups, families, and organizations can discuss sponsoring a room, apartment, furnishing need, event, or project area.",
    href: donationLinks.sponsorship,
    label: "Explore sponsorship",
    icon: Building2,
  },
  {
    number: "04",
    title: "Major gifts",
    description:
      "Talk with the team about a significant contribution and the giving approach that works for you.",
    href: "#major-gifts",
    label: "Discuss a major gift",
    icon: HeartHandshake,
  },
  {
    number: "05",
    title: "Stock transfers",
    description:
      "Ask the team whether a stock contribution is an option and request verified transfer instructions.",
    href: "#stock-transfers",
    label: "Ask about stock giving",
    icon: ArrowUpRight,
  },
  {
    number: "06",
    title: "Other ways to help",
    description:
      "Reach out about one-time or monthly giving, legacy giving, corporate support, partnerships, or another way to get involved.",
    href: "#other-giving",
    label: "Find your giving path",
    icon: ArrowRight,
  },
];

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4 focus:text-[#16345c]"
        href="#main-content"
      >
        Skip to content
      </a>

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            aria-label="VAlanthropy home"
            className="flex min-w-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16345c]"
            href="/"
          >
            <Image
              alt="VAlanthropy"
              className="h-auto w-44 max-w-full sm:w-56"
              priority
              src={valanthropyLogo}
            />
          </Link>

          <nav aria-label="Donation page navigation" className="flex items-center gap-5">
            <Link
              className="hidden text-sm font-semibold text-[#16345c] hover:underline sm:inline"
              href="/"
            >
              Home
            </Link>
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#b52c38] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#92232e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16345c] sm:px-5"
              href="#donation-form"
            >
              Donate today
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="relative overflow-hidden bg-[#16345c] text-white">
          <div
            aria-hidden="true"
            className="absolute -right-32 -top-32 size-96 rounded-full bg-[#b52c38]/30 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-100">
                <HeartHandshake aria-hidden="true" size={16} />
                Give with purpose
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Help build a place where veterans can rebuild.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
                VAlanthropy is developing permanent, affordable veteran housing
                at Hidden Wounds Village Alpha in Sumter, South Carolina.
                Stable housing can be a foundation for healing, independence,
                and long-term stability.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#b52c38] px-6 py-3 font-bold text-white transition hover:bg-[#92232e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  href={donationLinks.general}
                  rel="noreferrer"
                  target="_blank"
                >
                  Donate today
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  href="#ways-to-give"
                >
                  Explore giving options
                  <ArrowDown aria-hidden="true" size={18} />
                </a>
              </div>
              <p className="mt-5 text-sm text-blue-100">
                Your support can help move construction, furnishing, and
                move-in readiness forward.
              </p>
            </div>

            <figure className="overflow-hidden rounded-3xl border border-white/25 bg-[#102844] shadow-2xl">
              <Image
                alt="Rendering of the planned Hidden Wounds Village Alpha homes"
                className="h-auto w-full"
                priority
                sizes="(max-width: 1023px) 100vw, 45vw"
                src={villageHouseImage}
              />
              <figcaption className="p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-100">
                  <MapPin aria-hidden="true" size={15} />
                  Sumter, South Carolina
                </div>
                <p className="mt-2 text-xl font-bold text-white">
                  Hidden Wounds Village Alpha
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          aria-labelledby="donation-form-heading"
          className="scroll-mt-6 bg-slate-50 px-5 py-16 sm:px-8 sm:py-20"
          id="donation-form"
        >
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:pt-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b52c38]">
                Start a conversation
              </p>
              <h2
                className="mt-3 text-3xl font-bold tracking-tight text-[#16345c] sm:text-4xl"
                id="donation-form-heading"
              >
                Let’s find the right way to give.
              </h2>
              <p className="mt-5 max-w-xl leading-7 text-slate-700">
                Whether you are considering a one-time gift, monthly giving, a
                donor-advised fund, legacy giving, corporate support, or another
                option, VAlanthropy’s team can help you explore the next step.
              </p>
              <div className="mt-7 rounded-xl border-l-4 border-[#b52c38] bg-white p-5 shadow-sm">
                <p className="text-sm leading-6 text-slate-700">
                  Contact us by email to discuss making a donation:{" "}
                  <a
                    className="font-semibold text-[#16345c] underline decoration-[#b52c38] decoration-2 underline-offset-4 hover:text-[#b52c38]"
                    href="mailto:lilly@valanthropy.org"
                  >
                    lilly@valanthropy.org
                  </a>
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
              <DonationInterestForm />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="impact-heading"
          className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b52c38]">
                Why your support matters
              </p>
              <h2
                className="mt-3 text-3xl font-bold tracking-tight text-[#16345c] sm:text-4xl"
                id="impact-heading"
              >
                Housing is the foundation for stability.
              </h2>
              <p className="mt-5 leading-7 text-slate-700">
                Hidden Wounds Village Alpha is being developed as a permanent,
                affordable housing community for veterans. VAlanthropy’s work
                includes housing development, infrastructure, construction,
                furnishing, and long-term project sustainability.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                The community is designed to connect stable housing with
                trauma-informed support, employment transition resources, and
                community reintegration.
              </p>
              <Link
                className="mt-6 inline-flex items-center gap-2 font-semibold text-[#16345c] underline decoration-[#b52c38] decoration-2 underline-offset-4 hover:text-[#b52c38]"
                href={donationLinks.general}
                rel="noreferrer"
                target="_blank"
              >
                Donate to Hidden Wounds Village Alpha
                <ArrowUpRight aria-hidden="true" size={17} />
              </Link>
            </div>

            <div className="rounded-2xl bg-[#16345c] p-6 text-white sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-200">
                What support helps advance
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  "Construction and infrastructure",
                  "Furnishing homes for move-in readiness",
                  "Long-term housing stability",
                ].map((item) => (
                  <li className="flex gap-3 leading-7" key={item}>
                    <span
                      aria-hidden="true"
                      className="mt-2 size-2 shrink-0 rounded-full bg-[#e77a82]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-[#f4f7fb] px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b52c38]">
                Moving forward
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#16345c] sm:text-4xl">
                Progress is already underway.
              </h2>
              <p className="mt-5 leading-7 text-slate-700">
                At Hidden Wounds Village Alpha, curbs are installed, the
                retention pond is finished, and infrastructure and grading
                work are complete. The current focus is finalizing building
                plans as the project prepares for construction.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["01", "Curbs installed"],
                ["02", "Retention pond finished"],
                ["03", "Infrastructure and grading complete"],
              ].map(([number, milestone]) => (
                <div
                  className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6"
                  key={number}
                >
                  <span className="text-sm font-bold text-[#b52c38]">
                    {number}
                  </span>
                  <p className="mt-3 font-bold text-[#16345c]">{milestone}</p>
                </div>
              ))}
            </div>
            <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Image
                alt="Community event at Hidden Wounds Village Alpha"
                className="h-auto w-full"
                sizes="(max-width: 1279px) 100vw, 1280px"
                src={villageImage}
              />
              <figcaption className="px-5 py-3 text-sm text-slate-600">
                Hidden Wounds Village Alpha
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          aria-labelledby="ways-heading"
          className="scroll-mt-6 px-5 py-16 sm:px-8 sm:py-20"
          id="ways-to-give"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b52c38]">
                  Choose your path
                </p>
                <h2
                  className="mt-3 text-3xl font-bold tracking-tight text-[#16345c] sm:text-4xl"
                  id="ways-heading"
                >
                  Ways to support the work.
                </h2>
              </div>
              <p className="max-w-xl leading-7 text-slate-700">
                Have a question about an option? Use the form above to contact
                the team for current details and instructions.
              </p>
            </div>

            <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {givingOptions.map((option) => {
                const Icon = option.icon;

                return (
                  <article
                    className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-7"
                    key={option.number}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#b52c38]">
                        {option.number}
                      </span>
                      <span className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-[#16345c]">
                        <Icon aria-hidden="true" size={22} />
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-[#16345c]">
                      {option.title}
                    </h3>
                    <p className="mt-3 flex-1 leading-7 text-slate-700">
                      {option.description}
                    </p>
                    <a
                      className="mt-6 inline-flex items-center gap-2 self-start font-semibold text-[#16345c] underline decoration-[#b52c38] decoration-2 underline-offset-4 hover:text-[#b52c38]"
                      href={option.href}
                      rel={option.href.startsWith("https://") ? "noreferrer" : undefined}
                      target={option.href.startsWith("https://") ? "_blank" : undefined}
                    >
                      {option.label}
                      <ArrowRight aria-hidden="true" size={17} />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50 px-5 py-14 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-[#16345c]">
              Giving details and questions
            </h2>
            <div className="mt-6 divide-y divide-slate-200">
              <details className="scroll-mt-6 py-5" id="ncf">
                <summary className="cursor-pointer text-lg font-semibold text-[#16345c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16345c]">
                  Donor-advised giving through NCF
                </summary>
                <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                  VAlanthropy’s website invites donors to explore donor-advised
                  funds and giving options through the National Christian
                  Foundation. Contact the team for the current giving link and
                  instructions, or{" "}
                  <a
                    className="font-semibold text-[#16345c] underline underline-offset-4 hover:text-[#b52c38]"
                    href={donationLinks.ncf}
                    rel="noreferrer"
                    target="_blank"
                  >
                    explore NCF advisor solutions
                  </a>
                  .
                </p>
              </details>
              <details className="scroll-mt-6 py-5" id="legacy-brick">
                <summary className="cursor-pointer text-lg font-semibold text-[#16345c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16345c]">
                  Legacy brick campaign
                </summary>
                <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                  The legacy brick campaign offers a way to honor a veteran,
                  loved one, family, business, or organization.{" "}
                  <a
                    className="font-semibold text-[#16345c] underline underline-offset-4 hover:text-[#b52c38]"
                    href={donationLinks.legacyBrick}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Visit the legacy brick campaign
                  </a>
                  .
                </p>
              </details>
              <details className="scroll-mt-6 py-5" id="sponsorship">
                <summary className="cursor-pointer text-lg font-semibold text-[#16345c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16345c]">
                  Sponsorship
                </summary>
                <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                  Sponsorship opportunities may include a room, apartment,
                  furnishing need, event, or project area. Contact the team to
                  explore what is currently available, or{" "}
                  <a
                    className="font-semibold text-[#16345c] underline underline-offset-4 hover:text-[#b52c38]"
                    href={donationLinks.sponsorship}
                    rel="noreferrer"
                    target="_blank"
                  >
                    view the sponsor form
                  </a>
                  .
                </p>
              </details>
              <details className="scroll-mt-6 py-5" id="major-gifts">
                <summary className="cursor-pointer text-lg font-semibold text-[#16345c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16345c]">
                  Major gifts
                </summary>
                <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                  Contact VAlanthropy to discuss a major gift and the giving
                  approach that best fits your goals.
                </p>
              </details>
              <details className="scroll-mt-6 py-5" id="stock-transfers">
                <summary className="cursor-pointer text-lg font-semibold text-[#16345c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16345c]">
                  Stock transfers
                </summary>
                <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                  Stock transfer instructions have not been confirmed on the
                  information available for this page. Contact the team before
                  initiating a transfer.
                </p>
              </details>
              <details className="scroll-mt-6 py-5" id="other-giving">
                <summary className="cursor-pointer text-lg font-semibold text-[#16345c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#16345c]">
                  Other ways to give or get involved
                </summary>
                <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                  The website also welcomes questions about one-time or monthly
                  gifts, legacy giving, corporate support, partnerships,
                  volunteer support, and other ways to help move the project
                  forward.
                </p>
              </details>
            </div>
            <p className="mt-7 text-sm leading-6 text-slate-600">
              Need personalized assistance?{" "}
              <a
                className="font-semibold text-[#16345c] underline underline-offset-4"
                href="mailto:lilly@valanthropy.org?subject=Donor%20Giving%20Assistance"
              >
                Email the VAlanthropy team
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-[#102844] px-5 py-9 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold">
              VAlanthropy<span className="text-[#e77a82]">.</span>
            </p>
            <p className="mt-1 max-w-xl text-sm leading-6 text-blue-100">
              Developing permanent, affordable veteran housing designed to
              support healing, stability, and independence.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            <Link className="text-white underline-offset-4 hover:underline" href="/">
              Home
            </Link>
            <a
              className="text-white underline-offset-4 hover:underline"
              href="mailto:lilly@valanthropy.org"
            >
              Contact
            </a>
            <a
              className="text-white underline-offset-4 hover:underline"
              href="#main-content"
            >
              Back to top
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
