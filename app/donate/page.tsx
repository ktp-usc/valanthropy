import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  HeartHandshake,
  House,
  Mail,
  MapPin,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
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

type GivingOption = {
  number: string;
  title: string;
  description: string;
  href: string;
  label: string;
  icon: typeof HeartHandshake;
};

const GIVING_OPTIONS: GivingOption[] = [
  {
    number: "01",
    title: "Donor-advised giving through NCF",
    description:
      "Explore donor-advised funds and giving options through the National Christian Foundation.",
    href: "/donate/ncf",
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

const PAGE = "min-h-screen bg-white font-sans text-slate-900";
const SECTION_HERO = "bg-slate-900 px-8 py-16 text-white md:px-16";
const SECTION_LIGHT = "bg-white px-8 py-14 md:px-16";
const SECTION_DARK = "bg-blue-900 px-8 py-14 text-white md:px-16";
const CONTAINER = "mx-auto max-w-5xl";
const EYEBROW_LIGHT = "mb-4 text-[16px] uppercase tracking-wide text-red-700";
const EYEBROW_DARK = "mb-4 text-[16px] uppercase tracking-wide text-red-400";
const PAGE_TITLE = "text-4xl font-bold";
const SECTION_TITLE = "mb-6 text-2xl font-bold";
const BODY_LIGHT = "text-sm leading-6 text-slate-600";
const BODY_DARK = "text-sm leading-6 text-white";
const BUTTON_PRIMARY =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900";
const BUTTON_ON_DARK =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const BUTTON_SECONDARY =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded border border-white/30 px-8 py-3 text-xs font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const LINK_LIGHT =
  "font-semibold text-red-700 underline underline-offset-4 hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700";
const LINK_DARK =
  "font-semibold text-red-400 underline underline-offset-4 hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const IMAGE_WRAPPER =
  "relative aspect-video overflow-hidden rounded bg-slate-200";
const IMAGE = "object-cover";
const DETAILS_SUMMARY =
  "cursor-pointer py-5 font-semibold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700";

export default function DonatePage() {
  return (
    <div className={PAGE}>
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4 focus:text-slate-900"
        href="#main-content"
      >
        Skip to content
      </a>

      <Header active="/ways-to-help" donateHref={donationLinks.general} />

      <main id="main-content">
        {/* Hero */}
        <section className={SECTION_HERO}>
          <div
            className={`${CONTAINER} grid items-center gap-8 lg:grid-cols-2`}
          >
            <div>
              <p className={EYEBROW_DARK}>Give with purpose</p>
              <h1 className={PAGE_TITLE}>
                Help build a place where veterans can rebuild.
              </h1>
              <p className={`mt-6 ${BODY_DARK}`}>
                VAlanthropy is developing permanent, affordable veteran housing
                at Hidden Wounds Village Alpha in Sumter, South Carolina.
                Stable housing can be a foundation for healing, independence,
                and long-term stability.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className={BUTTON_ON_DARK}
                  href={donationLinks.general}
                  rel="noreferrer"
                  target="_blank"
                >
                  Donate today
                  <ArrowRight aria-hidden="true" size={16} />
                </a>
                <a className={BUTTON_SECONDARY} href="#ways-to-give">
                  Explore giving options
                  <ArrowDown aria-hidden="true" size={16} />
                </a>
              </div>
              <p className={`mt-5 ${BODY_DARK}`}>
                Your support can help move construction, furnishing, and
                move-in readiness forward.
              </p>
            </div>

            <figure className="overflow-hidden rounded border border-white/30">
              <div className={IMAGE_WRAPPER}>
                <Image
                  alt="Rendering of the planned Hidden Wounds Village Alpha homes"
                  className={IMAGE}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, calc(100vw - 4rem)"
                  src={villageHouseImage}
                />
              </div>
              <figcaption className="p-4">
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <MapPin aria-hidden="true" size={16} />
                  Sumter, South Carolina
                </div>
                <p className="mt-2 font-bold text-white">
                  Hidden Wounds Village Alpha
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Donation contact */}
        <section
          aria-labelledby="donation-contact-heading"
          className={SECTION_LIGHT}
          id="donation-contact"
        >
          <div
            className={`${CONTAINER} grid items-center gap-8 md:grid-cols-[1fr_auto]`}
          >
            <div>
              <p className={EYEBROW_LIGHT}>Start a conversation</p>
              <h2 className={SECTION_TITLE} id="donation-contact-heading">
                Let’s find the right way to give.
              </h2>
              <p className={BODY_LIGHT}>
                Whether you are considering a one-time gift, monthly giving, a
                donor-advised fund, legacy giving, corporate support, or another
                option, VAlanthropy’s team can help you explore the next step.
              </p>
            </div>
            <a
              className={BUTTON_PRIMARY}
              href="mailto:lilly@valanthropy.org?subject=Donor%20Giving%20Assistance"
            >
              <Mail aria-hidden="true" size={16} />
              Email lilly@valanthropy.org
            </a>
          </div>
        </section>

        {/* Impact */}
        <section aria-labelledby="impact-heading" className={SECTION_DARK}>
          <div className={`${CONTAINER} grid gap-8 md:grid-cols-2`}>
            <div>
              <p className={EYEBROW_DARK}>Why your support matters</p>
              <h2 className={SECTION_TITLE} id="impact-heading">
                Housing is the foundation for stability.
              </h2>
              <p className={BODY_DARK}>
                Hidden Wounds Village Alpha is being developed as a permanent,
                affordable housing community for veterans. VAlanthropy’s work
                includes housing development, infrastructure, construction,
                furnishing, and long-term project sustainability.
              </p>
              <p className={`mt-4 ${BODY_DARK}`}>
                The community is designed to connect stable housing with
                trauma-informed support, employment transition resources, and
                community reintegration.
              </p>
              <a
                className={`mt-6 inline-flex items-center gap-2 ${LINK_DARK}`}
                href={donationLinks.general}
                rel="noreferrer"
                target="_blank"
              >
                Donate to Hidden Wounds Village Alpha
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>

            <div className="rounded border border-white/30 p-4">
              <h3 className="text-sm font-semibold">What support helps advance</h3>
              <ul className="mt-5 space-y-4">
                {[
                  "Construction and infrastructure",
                  "Furnishing homes for move-in readiness",
                  "Long-term housing stability",
                ].map((item) => (
                  <li className="flex gap-3 text-sm leading-6" key={item}>
                    <span
                      aria-hidden="true"
                      className="mt-2 size-2 shrink-0 rounded-full bg-red-400"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Progress */}
        <section className={SECTION_LIGHT}>
          <div className={CONTAINER}>
            <div className="max-w-3xl">
              <p className={EYEBROW_LIGHT}>Moving forward</p>
              <h2 className={SECTION_TITLE}>
                Progress is already underway.
              </h2>
              <p className={BODY_LIGHT}>
                At Hidden Wounds Village Alpha, curbs are installed, the
                retention pond is finished, and infrastructure and grading
                work are complete. The current focus is finalizing building
                plans as the project prepares for construction.
              </p>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["01", "Curbs installed"],
                ["02", "Retention pond finished"],
                ["03", "Infrastructure and grading complete"],
              ].map(([number, milestone]) => (
                <li
                  className="rounded border border-slate-200 bg-white p-4 transition hover:shadow-lg"
                  key={number}
                >
                  <span className="text-sm font-semibold text-red-700">
                    {number}
                  </span>
                  <p className="mt-3 font-bold">{milestone}</p>
                </li>
              ))}
            </ul>
            <figure className="mt-8 overflow-hidden rounded border border-slate-200">
              <div className={IMAGE_WRAPPER}>
                <Image
                  alt="Community event at Hidden Wounds Village Alpha"
                  className={IMAGE}
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  src={villageImage}
                />
              </div>
              <figcaption className="px-4 py-3 text-sm text-slate-600">
                Hidden Wounds Village Alpha
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Ways to give */}
        <section
          aria-labelledby="ways-heading"
          className={SECTION_DARK}
          id="ways-to-give"
        >
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className={EYEBROW_DARK}>Choose your path</p>
                <h2 className={SECTION_TITLE} id="ways-heading">
                  Ways to support the work.
                </h2>
              </div>
              <p className={`max-w-xl ${BODY_DARK}`}>
                Have a question about an option? Email the team for current
                details and instructions.
              </p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {GIVING_OPTIONS.map((option) => {
                const Icon = option.icon;

                return (
                  <li
                    className="flex flex-col rounded border border-white/30 p-4 transition hover:bg-white/10"
                    key={option.number}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-red-400">
                        {option.number}
                      </span>
                      <Icon aria-hidden="true" className="text-red-400" size={20} />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold">
                      {option.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-white">
                      {option.description}
                    </p>
                    {option.href === "/donate/ncf" ? (
                      <Link
                        className={`mt-5 inline-flex items-center gap-2 self-start ${LINK_DARK}`}
                        href={option.href}
                      >
                        {option.label}
                        <ArrowRight aria-hidden="true" size={16} />
                      </Link>
                    ) : (
                      <a
                        className={`mt-5 inline-flex items-center gap-2 self-start ${LINK_DARK}`}
                        href={option.href}
                        rel={option.href.startsWith("https://") ? "noreferrer" : undefined}
                        target={option.href.startsWith("https://") ? "_blank" : undefined}
                      >
                        {option.label}
                        <ArrowRight aria-hidden="true" size={16} />
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Giving details */}
        <section className={SECTION_LIGHT}>
          <div className={CONTAINER}>
            <h2 className={SECTION_TITLE}>Giving details and questions</h2>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              <details className="scroll-mt-6" id="ncf">
                <summary className={DETAILS_SUMMARY}>
                  Donor-advised giving through NCF
                </summary>
                <p className={`max-w-3xl pb-5 ${BODY_LIGHT}`}>
                  VAlanthropy’s website invites donors to explore donor-advised
                  funds and giving options through the National Christian
                  Foundation.{" "}
                  <Link className={LINK_LIGHT} href="/donate/ncf">
                    Read the NCF giving instructions
                  </Link>
                  , or{" "}
                  <a
                    className={LINK_LIGHT}
                    href={donationLinks.ncf}
                    rel="noreferrer"
                    target="_blank"
                  >
                    explore NCF advisor solutions
                  </a>
                  .
                </p>
              </details>
              <details className="scroll-mt-6" id="legacy-brick">
                <summary className={DETAILS_SUMMARY}>
                  Legacy brick campaign
                </summary>
                <p className={`max-w-3xl pb-5 ${BODY_LIGHT}`}>
                  The legacy brick campaign offers a way to honor a veteran,
                  loved one, family, business, or organization.{" "}
                  <a
                    className={LINK_LIGHT}
                    href={donationLinks.legacyBrick}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Visit the legacy brick campaign
                  </a>
                  .
                </p>
              </details>
              <details className="scroll-mt-6" id="sponsorship">
                <summary className={DETAILS_SUMMARY}>Sponsorship</summary>
                <p className={`max-w-3xl pb-5 ${BODY_LIGHT}`}>
                  Sponsorship opportunities may include a room, apartment,
                  furnishing need, event, or project area. Contact the team to
                  explore what is currently available, or{" "}
                  <a
                    className={LINK_LIGHT}
                    href={donationLinks.sponsorship}
                    rel="noreferrer"
                    target="_blank"
                  >
                    view the sponsor form
                  </a>
                  .
                </p>
              </details>
              <details className="scroll-mt-6" id="major-gifts">
                <summary className={DETAILS_SUMMARY}>Major gifts</summary>
                <p className={`max-w-3xl pb-5 ${BODY_LIGHT}`}>
                  Contact VAlanthropy to discuss a major gift and the giving
                  approach that best fits your goals.
                </p>
              </details>
              <details className="scroll-mt-6" id="stock-transfers">
                <summary className={DETAILS_SUMMARY}>Stock transfers</summary>
                <p className={`max-w-3xl pb-5 ${BODY_LIGHT}`}>
                  Stock transfer instructions have not been confirmed on the
                  information available for this page. Contact the team before
                  initiating a transfer.
                </p>
              </details>
              <details className="scroll-mt-6" id="other-giving">
                <summary className={DETAILS_SUMMARY}>
                  Other ways to give or get involved
                </summary>
                <p className={`max-w-3xl pb-5 ${BODY_LIGHT}`}>
                  The website also welcomes questions about one-time or monthly
                  gifts, legacy giving, corporate support, partnerships,
                  volunteer support, and other ways to help move the project
                  forward.
                </p>
              </details>
            </div>
            <p className={`mt-6 ${BODY_LIGHT}`}>
              Need personalized assistance?{" "}
              <a
                className={LINK_LIGHT}
                href="mailto:lilly@valanthropy.org?subject=Donor%20Giving%20Assistance"
              >
                Email the VAlanthropy team
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
