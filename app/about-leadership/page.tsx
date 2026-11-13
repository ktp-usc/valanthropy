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
  { name: "Francis W. Altman, Jr.", title: "Founder, Chief Executive Officer", image: "/about-leadership/francis-w-altman-valanthropy.png", bio: PLACEHOLDER_BIO },
  { name: "Thomas L. Lash", title: "Founder, President", image: "/about-leadership/thomas-lash-valanthropy.png", bio: PLACEHOLDER_BIO },
  { name: "Richard Creswell", title: "Director of Advancement", image: "/about-leadership/richard-caswell-valanthropy.png", bio: PLACEHOLDER_BIO },
  { name: "Lilly Ellen Williams", title: "Comunications Director", image: "/about-leadership/lilly-ellen-williams-valanthropy.png", bio: PLACEHOLDER_BIO },
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
            <p className={DIALOG_BIO}>{person.bio}</p>
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
