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
import villageImage from "./Hidden_Wounds_Village.png";
import villageHouseImage from "./Hidden_Wounds_Village_house.png";
import { slotText } from "@/lib/wp-text";

// Text wrapped in <T> can be edited in the WordPress page "donate-new".
const T = slotText("donate-new");

const donationLinks = {
  general:
    "https://valanthropy.networkforgood.com/projects/266901-walls-are-being-built-now-lets-make-it-a-home",
  legacyBrick:
    "https://valanthropy.networkforgood.com/projects/297702-legacy-brick-campaign",
  sponsorship:
    "https://valanthropy.dm.networkforgood.com/forms/become-a-sponsor",
  villageBuilder:
    "https://valanthropy.networkforgood.com/projects/304047-village-builder-challenge",
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
    title: "Village Builder Challenge",
    description:
      "Help build Hidden Wounds Village Alpha through the Village Builder Challenge.",
    href: donationLinks.villageBuilder,
    label: "Support the Village Builder Challenge",
    icon: HeartHandshake,
  },
  {
    number: "05",
    title: "Stock transfers",
    description:
      "Ask the team whether a stock contribution is an option and request verified transfer instructions.",
    href: "mailto:lilly@valanthropy.org?subject=Stock%20Transfer%20Giving",
    label: "Email about stock giving",
    icon: ArrowUpRight,
  },
  {
    number: "06",
    title: "Other ways to help",
    description:
      "Reach out about one-time or monthly giving, legacy giving, corporate support, partnerships, or another way to get involved.",
    href: "mailto:lilly@valanthropy.org?subject=Other%20Ways%20to%20Help",
    label: "Email about other ways to help",
    icon: ArrowRight,
  },
];

const PAGE = "min-h-screen bg-white font-sans text-slate-900";
const SECTION_HERO =
  "bg-slate-900 px-4 py-10 text-white sm:px-8 sm:py-12 md:px-16 md:py-16";
const SECTION_LIGHT =
  "bg-white px-4 py-10 sm:px-8 sm:py-12 md:px-16 md:py-14";
const SECTION_DARK =
  "bg-blue-900 px-4 py-10 text-white sm:px-8 sm:py-12 md:px-16 md:py-14";
const CONTAINER = "mx-auto max-w-5xl";
const EYEBROW_LIGHT = "mb-4 text-[16px] uppercase tracking-wide text-red-700";
const EYEBROW_DARK = "mb-4 text-[16px] uppercase tracking-wide text-red-400";
const PAGE_TITLE = "text-3xl leading-tight font-bold sm:text-4xl";
const SECTION_TITLE = "mb-5 text-xl leading-snug font-bold sm:mb-6 sm:text-2xl";
const BODY_LIGHT = "text-sm leading-6 text-slate-600";
const BODY_DARK = "text-sm leading-6 text-white";
const BUTTON_PRIMARY =
  "inline-flex min-h-11 w-full max-w-full items-center justify-center gap-2 rounded bg-red-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 sm:w-auto sm:px-8 sm:text-xs";
const BUTTON_ON_DARK =
  "inline-flex min-h-11 w-full max-w-full items-center justify-center gap-2 rounded bg-red-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:px-8 sm:text-xs";
const BUTTON_SECONDARY =
  "inline-flex min-h-11 w-full max-w-full items-center justify-center gap-2 rounded border border-white/30 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:px-8 sm:text-xs";
const LINK_DARK =
  "break-words font-semibold text-red-400 underline underline-offset-4 hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const IMAGE_WRAPPER =
  "relative aspect-video overflow-hidden rounded bg-slate-200";
const IMAGE = "object-cover";

export default function DonatePage() {
  return (
    <div className={PAGE}>
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4 focus:text-slate-900"
        href="#main-content"
      ><T>
        Skip to content
      </T></a>

      <Header active="/ways-to-help" donateHref={donationLinks.general} />

      <main id="main-content">
        {/* Hero */}
        <section className={SECTION_HERO}>
          <div
            className={`${CONTAINER} grid min-w-0 items-center gap-8 lg:grid-cols-2`}
          >
            <div className="min-w-0">
              <p className={EYEBROW_DARK}><T>Give with purpose</T></p>
              <h1 className={PAGE_TITLE}><T>
                Help build a place where veterans can rebuild.
              </T></h1>
              <p className={`mt-6 ${BODY_DARK}`}><T>
                VAlanthropy is developing permanent, affordable veteran housing
                at Hidden Wounds Village Alpha in Sumter, South Carolina.
                Stable housing can be a foundation for healing, independence,
                and long-term stability.
              </T></p>
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
              <p className={`mt-5 ${BODY_DARK}`}><T>
                Your support can help move construction, furnishing, and
                move-in readiness forward.
              </T></p>
            </div>

            <figure className="min-w-0 overflow-hidden rounded border border-white/30">
              <div className={IMAGE_WRAPPER}>
                <Image
                  alt="Rendering of the planned Hidden Wounds Village Alpha homes"
                  className={IMAGE}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2rem)"
                  src={villageHouseImage}
                />
              </div>
              <figcaption className="p-4">
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <MapPin aria-hidden="true" size={16} />
                  Sumter, South Carolina
                </div>
                <p className="mt-2 font-bold text-white"><T>
                  Hidden Wounds Village Alpha
                </T></p>
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
            className={`${CONTAINER} grid min-w-0 items-center gap-6 md:grid-cols-[1fr_auto] md:gap-8`}
          >
            <div>
              <p className={EYEBROW_LIGHT}><T>Start a conversation</T></p>
              <h2 className={SECTION_TITLE} id="donation-contact-heading"><T>
                Let’s find the right way to give.
              </T></h2>
              <p className={BODY_LIGHT}><T>
                Whether you are considering a one-time gift, monthly giving, a
                donor-advised fund, legacy giving, corporate support, or another
                option, VAlanthropy’s team can help you explore the next step.
              </T></p>
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
          <div className={`${CONTAINER} grid min-w-0 gap-8 md:grid-cols-2`}>
            <div className="min-w-0">
              <p className={EYEBROW_DARK}><T>Why your support matters</T></p>
              <h2 className={SECTION_TITLE} id="impact-heading"><T>
                Housing is the foundation for stability.
              </T></h2>
              <p className={BODY_DARK}><T>
                Hidden Wounds Village Alpha is being developed as a permanent,
                affordable housing community for veterans. VAlanthropy’s work
                includes housing development, infrastructure, construction,
                furnishing, and long-term project sustainability.
              </T></p>
              <p className={`mt-4 ${BODY_DARK}`}><T>
                The community is designed to connect stable housing with
                trauma-informed support, employment transition resources, and
                community reintegration.
              </T></p>
              <a
                className={`mt-6 inline-flex max-w-full flex-wrap items-center gap-2 ${LINK_DARK}`}
                href={donationLinks.general}
                rel="noreferrer"
                target="_blank"
              >
                Donate to Hidden Wounds Village Alpha
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>

            <div className="min-w-0 rounded border border-white/30 p-4">
              <h3 className="text-sm font-semibold"><T>What support helps advance</T></h3>
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
                    <span className="break-words"><T>{item}</T></span>
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
              <p className={EYEBROW_LIGHT}><T>Moving forward</T></p>
              <h2 className={SECTION_TITLE}><T>
                Progress is already underway.
              </T></h2>
              <p className={BODY_LIGHT}><T>
                At Hidden Wounds Village Alpha, curbs are installed, the
                retention pond is finished, and infrastructure and grading
                work are complete. The current focus is finalizing building
                plans as the project prepares for construction.
              </T></p>
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
                  <span className="text-sm font-semibold text-red-700"><T>
                    {number}
                  </T></span>
                  <p className="mt-3 font-bold"><T>{milestone}</T></p>
                </li>
              ))}
            </ul>
            <figure className="mt-8 min-w-0 overflow-hidden rounded border border-slate-200">
              <div className={IMAGE_WRAPPER}>
                <Image
                  alt="Community event at Hidden Wounds Village Alpha"
                  className={IMAGE}
                  fill
                  sizes="(min-width: 1024px) 1024px, calc(100vw - 2rem)"
                  src={villageImage}
                />
              </div>
              <figcaption className="px-4 py-3 text-sm text-slate-600"><T>
                Hidden Wounds Village Alpha
              </T></figcaption>
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
                <p className={EYEBROW_DARK}><T>Choose your path</T></p>
                <h2 className={SECTION_TITLE} id="ways-heading"><T>
                  Ways to support the work.
                </T></h2>
              </div>
              <p className={`max-w-xl ${BODY_DARK}`}><T>
                Have a question about an option? Email the team for current
                details and instructions.
              </T></p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {GIVING_OPTIONS.map((option) => {
                const Icon = option.icon;

                return (
                  <li
                    className="flex min-w-0 flex-col rounded border border-white/30 p-4 transition hover:bg-white/10"
                    key={option.number}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-red-400"><T>
                        {option.number}
                      </T></span>
                      <Icon aria-hidden="true" className="text-red-400" size={20} />
                    </div>
                    <h3 className="mt-4 break-words text-sm font-semibold"><T>
                      {option.title}
                    </T></h3>
                    <p className="mt-3 flex-1 break-words text-sm leading-6 text-white"><T>
                      {option.description}
                    </T></p>
                    {option.href === "/donate/ncf" ? (
                      <Link
                        className={`mt-5 inline-flex max-w-full min-w-0 flex-wrap items-center gap-2 self-start ${LINK_DARK}`}
                        href={option.href}
                      >
                        {option.label}
                        <ArrowRight aria-hidden="true" size={16} />
                      </Link>
                    ) : (
                      <a
                        className={`mt-5 inline-flex max-w-full min-w-0 flex-wrap items-center gap-2 self-start ${LINK_DARK}`}
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

      </main>
    </div>
  );
}
