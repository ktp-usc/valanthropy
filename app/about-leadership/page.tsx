"use client";

import Image from "next/image";
import { Dialog } from "radix-ui";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
const SECTION_HERO = "bg-slate-900 px-8 py-16 text-white md:px-16";
const SECTION_LIGHT = "bg-white px-8 py-14 md:px-16";
const SECTION_DARK = "bg-blue-900 px-8 py-14 text-white md:px-16";
const CONTAINER = "mx-auto max-w-5xl";

// Typography
const EYEBROW = "mb-4 text-[16px] uppercase tracking-wide text-red-500";
const PAGE_TITLE = "text-4xl font-bold";
const SECTION_TITLE = "mb-6 text-2xl font-bold";

// Grids
const GRID_TEAM = "grid gap-4 sm:grid-cols-2 md:grid-cols-4";
const GRID_BOARD = "grid gap-4 sm:grid-cols-2 md:grid-cols-3";

// Cards
const CARD_LIGHT = "h-full w-full cursor-pointer rounded border border-slate-200 bg-white p-4 text-center transition hover:shadow-lg";
const CARD_DARK = "w-full cursor-pointer rounded border border-white/30 p-4 text-center transition hover:bg-white/10";
const CARD_NAME_LIGHT = "font-bold";
const CARD_NAME_DARK = "text-sm font-semibold";
const CARD_TITLE_LIGHT = "text-[16px] text-red-700";
const CARD_TITLE_DARK = "text-[16px] text-red-400";

// Images
const IMAGE_COVER = "object-cover";
const CARD_IMAGE_WRAPPER = "relative mb-3 aspect-square overflow-hidden rounded bg-slate-200";
const CARD_IMAGE_SIZES = "(min-width: 768px) 25vw, 50vw";

// Dialog
const DIALOG_OVERLAY = "fixed inset-0 z-40 bg-black/60";
const DIALOG_CONTENT = "fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 text-slate-900 shadow-xl";
const DIALOG_IMAGE_WRAPPER = "relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded bg-slate-200";
const DIALOG_TITLE = "text-center text-xl font-bold";
const DIALOG_DESCRIPTION = "mb-4 text-center text-xs text-red-700";
const DIALOG_BIO = "text-sm text-slate-600";
const BUTTON_PRIMARY = "cursor-pointer rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white";
const DIALOG_CLOSE = `mt-6 w-full ${BUTTON_PRIMARY}`;

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
          {person.image && (
            <div className={DIALOG_IMAGE_WRAPPER}>
              <Image src={person.image} alt={person.name} fill sizes="128px" className={IMAGE_COVER} />
            </div>
          )}
          <Dialog.Title className={DIALOG_TITLE}>{person.name}</Dialog.Title>
          <Dialog.Description className={DIALOG_DESCRIPTION}>
            {person.title}
          </Dialog.Description>
          <p className={DIALOG_BIO}>{person.bio}</p>
          <Dialog.Close className={DIALOG_CLOSE}>
            Close
          </Dialog.Close>
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
                        src={leader.image!} alt={leader.name} fill sizes={CARD_IMAGE_SIZES} className={IMAGE_COVER}/>
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
      <Footer />
    </div>
  );
}
