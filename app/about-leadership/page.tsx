"use client";

import Image from "next/image";
import { Dialog } from "radix-ui";
import Header from "@/components/header";

type Person = {
  name: string;
  title: string;
  bio: string;
  image?: string;
};

const PLACEHOLDER_BIO = "Bio coming soon.";

// Page
const PAGE = "bg-white text-slate-900";

// Sections
const SECTION_HERO =
  "bg-slate-900 px-4 py-10 text-white sm:px-8 sm:py-12 md:px-16 md:py-16";
const SECTION_LIGHT =
  "bg-white px-4 py-10 sm:px-8 sm:py-12 md:px-16 md:py-14";
const SECTION_DARK =
  "bg-blue-900 px-4 py-10 text-white sm:px-8 sm:py-12 md:px-16 md:py-14";
const CONTAINER = "mx-auto max-w-5xl";

// Typography
const EYEBROW = "mb-4 text-[16px] uppercase tracking-wide text-red-500";
const PAGE_TITLE = "text-3xl leading-tight font-bold sm:text-4xl";
const SECTION_TITLE = "mb-5 text-xl leading-snug font-bold sm:mb-6 sm:text-2xl";

// Grids
const GRID_TEAM = "grid gap-4 sm:grid-cols-2 md:grid-cols-4";
const GRID_BOARD = "grid gap-4 sm:grid-cols-2 md:grid-cols-3";

// Cards
const CARD_LIGHT = "h-full min-h-11 w-full cursor-pointer rounded border border-slate-200 bg-white p-4 text-center transition hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700";
const CARD_DARK = "min-h-11 w-full cursor-pointer rounded border border-white/30 p-4 text-center transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const CARD_NAME_LIGHT = "font-bold";
const CARD_NAME_DARK = "text-sm font-semibold";
const CARD_TITLE_LIGHT = "text-[16px] text-red-700";
const CARD_TITLE_DARK = "text-[16px] text-red-400";

// Images
const IMAGE_COVER = "object-cover";
const CARD_IMAGE_WRAPPER = "relative mb-3 aspect-square overflow-hidden rounded bg-slate-200";
const CARD_IMAGE_SIZES =
  "(min-width: 1024px) 220px, (min-width: 640px) 45vw, calc(100vw - 4rem)";

// Dialog
const DIALOG_OVERLAY = "fixed inset-0 z-40 bg-black/60";
const DIALOG_CONTENT =
  "fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg bg-white text-slate-900 shadow-xl";
const DIALOG_IMAGE_WRAPPER =
  "relative mx-auto mb-4 h-28 w-28 overflow-hidden rounded bg-slate-200 sm:h-32 sm:w-32";
const DIALOG_TITLE = "break-words text-center text-xl font-bold";
const DIALOG_DESCRIPTION = "mb-4 break-words text-center text-sm text-red-700";
const DIALOG_BIO = "break-words text-sm leading-6 text-slate-600";
const DIALOG_CLOSE =
  "min-h-11 w-full cursor-pointer rounded bg-red-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700";

const leaders: Person[] = [
  {
    name: "Francis “Fred” Altman",
    title: "Co-founder",
    image: "/about-leadership/francis-w-altman-valanthropy.png",
    bio: "Francis “Fred” Altman is a co-founder of VAlanthropy, a South Carolina nonprofit dedicated to developing permanent, affordable housing for veterans experiencing housing instability. His commitment begins with a belief that those who have served deserve a secure home and the opportunity to live with dignity and independence.\n\nFred helps guide the organization’s mission, development, and strategic partnerships, with a focus on housing solutions that meet veterans’ long-term needs. He is helping advance Hidden Wounds Village Alpha, VAlanthropy’s inaugural development in Sumter, South Carolina, planned to provide 12 permanent homes with access to supportive services through community partners.\n\nLooking beyond the first development, Fred envisions a sustainable model that other South Carolina communities can adopt. His work reflects a lasting dedication to honoring military service through practical action and helping veterans build stable futures.",
  },
  {
    name: "Thomas “Tom” Lash",
    title: "Co-founder",
    image: "/about-leadership/thomas-lash-valanthropy.png",
    bio: "Thomas “Tom” Lash is a co-founder of VAlanthropy, where he helps build the community relationships that support permanent, affordable housing for veterans. He believes that honoring military service includes a lasting commitment to veterans’ well-being and their sense of belonging after service.\n\nTom engages community leaders, businesses, and nonprofit partners to connect VAlanthropy’s mission with people and resources that can help bring it to life. He is actively involved in advancing Hidden Wounds Village Alpha, the organization’s planned 12-home veteran housing community in Sumter, South Carolina.\n\nFor Tom, a secure home is a foundation for independence and meaningful connections. Through advocacy and continued community engagement, he works to strengthen the partnerships that make sustainable housing possible. His dedication centers on bringing people together around a shared responsibility to help veterans find lasting stability and a supportive community.",
  },
  {
    name: "Richard Creswell",
    title: "Director of Advancement",
    image: "/about-leadership/richard-caswell-valanthropy.png",
    bio: "Richard Creswell serves as Director of Advancement for VAlanthropy, leading its funding strategy and advancement efforts. With more than two decades of experience strengthening nonprofit organizations, he brings expertise in donor development, board engagement, strategic planning, and sustainable funding.\n\nRichard helps organizations build lasting donor relationships and connect their missions with partners who share their goals. At VAlanthropy, he applies that experience to advancing Hidden Wounds Village Alpha and developing support for permanent, affordable veteran housing. His approach brings nonprofit and business communities together around partnerships that serve the mission and create shared value.\n\nRichard’s commitment to service also shapes his life with his wife and their four children. Grounded in their Christian faith, they seek to live with intention, humility, and grace. He brings those values to his work, helping strengthen the relationships and resources that support VAlanthropy’s long-term mission.",
  },
  {
    name: "Lilly Williams",
    title: "Marketing and Community Outreach Director",
    image: "/about-leadership/lilly-ellen-williams-valanthropy.png",
    bio: "Lilly Williams serves as Marketing and Community Outreach Director for VAlanthropy, bringing more than 15 years of experience in graphic design, branding, marketing, and business communications. As the founder of Lilly Ellen LLC, a creative design and print studio, she helps organizations communicate clearly and connect with their communities.\n\nHer dedication to veterans is personal. As the wife of a retired United States Air Force service member who served more than 20 years, including multiple deployments, Lilly understands the sacrifices military service asks of veterans and their families.\n\nAt VAlanthropy, she leads marketing, outreach, and digital engagement while supporting fundraising campaigns and sponsorship materials. Her work helps donors, businesses, and community partners understand the mission and find ways to contribute. Through Hidden Wounds Village Alpha, Lilly is committed to helping veterans gain permanent housing and feel valued long after their service ends.",
  },
];

const directors: Person[] = [
  { name: "Robin Rawl", title: "Advising Director", bio: PLACEHOLDER_BIO },
  { name: "Tyler Priester", title: "Advising Director", bio: PLACEHOLDER_BIO },
  { name: "Hammond Edwards III", title: "Advising Director", bio: PLACEHOLDER_BIO },
  { name: "Mike Genova", title: "Advising Director", bio: PLACEHOLDER_BIO },
  { name: "William Allen", title: "Advising Director", bio: PLACEHOLDER_BIO },
  { name: "Barbara Rakes", title: "Advising Director", bio: PLACEHOLDER_BIO },
];

function BioDialog({ person, children }: { person: Person; children: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={DIALOG_OVERLAY} />
        <Dialog.Content className={DIALOG_CONTENT}>
          <div
            tabIndex={0}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-red-700"
          >
            {person.image && (
              <div className={DIALOG_IMAGE_WRAPPER}>
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  sizes="128px"
                  className={IMAGE_COVER}
                />
              </div>
            )}
            <Dialog.Title className={DIALOG_TITLE}>{person.name}</Dialog.Title>
            <Dialog.Description className={DIALOG_DESCRIPTION}>
              {person.title}
            </Dialog.Description>
            <div className={DIALOG_BIO}>
              {person.bio.split("\n\n").map((paragraph, index) => (
                <p key={index} className={index > 0 ? "mt-3" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="shrink-0 border-t border-slate-200 px-5 py-3 sm:px-6">
            <Dialog.Close className={DIALOG_CLOSE}>Close</Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function Leadership() {
  return (
    <div className={PAGE}>
      <Header active="/about" />

      {/* Hero */}
      <section className={SECTION_HERO}>
        <div className={CONTAINER}>
          <p className={EYEBROW}>About Us</p>
          <h1 className={PAGE_TITLE}>Leadership</h1>
        </div>
      </section>

      {/* Leadership team */}
      <section className={SECTION_LIGHT}>
        <div className={CONTAINER}>
          <h2 className={SECTION_TITLE}>Our team</h2>
          <ul className={GRID_TEAM}>
            {leaders.map((leader) => (
              <li key={leader.name}>
                <BioDialog person={leader}>
                  <button type="button" className={CARD_LIGHT}>
                    <div className={CARD_IMAGE_WRAPPER}>
                      <Image
                        src={leader.image!}
                        alt={leader.name}
                        fill
                        sizes={CARD_IMAGE_SIZES}
                        className={IMAGE_COVER}
                      />
                    </div>
                    <h3 className={CARD_NAME_LIGHT}>{leader.name}</h3>
                    <p className={CARD_TITLE_LIGHT}>{leader.title}</p>
                  </button>
                </BioDialog>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Board */}
      <section className={SECTION_DARK}>
        <div className={CONTAINER}>
          <h2 className={SECTION_TITLE}>Board of Directors</h2>
          <ul className={GRID_BOARD}>
            {directors.map((d) => (
              <li key={d.name}>
                <BioDialog person={d}>
                  <button type="button" className={CARD_DARK}>
                    <h3 className={CARD_NAME_DARK}>{d.name}</h3>
                    <p className={CARD_TITLE_DARK}>{d.title}</p>
                  </button>
                </BioDialog>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
