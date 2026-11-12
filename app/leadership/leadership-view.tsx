"use client";

import Image from "next/image";
import { Dialog } from "radix-ui";
import Header from "@/components/header";

export type Person = {
  name: string;
  title: string;
  bio: string;
  image?: string;
};

export type PeopleSection = { title: string; people: Person[] };

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

export default function LeadershipView({ title, sections }: { title: string; sections: PeopleSection[] }) {
  return (
    <div className={PAGE}>
      <Header active="/about" />

      {/* Hero */}
      <section className={SECTION_HERO}>
        <div className={CONTAINER}>
          <p className={EYEBROW}>About Us</p>
          <h1 className={PAGE_TITLE}>{title}</h1>
        </div>
      </section>

      {sections.map((section) => {
        // Sections where people have photos show as photo cards; the rest as a simple list.
        const hasPhotos = section.people.some((p) => p.image);
        return (
          <section key={section.title} className={hasPhotos ? SECTION_LIGHT : SECTION_DARK}>
            <div className={CONTAINER}>
              <h2 className={SECTION_TITLE}>{section.title}</h2>
              <ul className={hasPhotos ? GRID_TEAM : GRID_BOARD}>
                {section.people.map((person, i) => (
                  <li key={`${person.name}-${i}`}>
                    <BioDialog person={person}>
                      <button type="button" className={hasPhotos ? CARD_LIGHT : CARD_DARK}>
                        {hasPhotos && (
                          <div className={CARD_IMAGE_WRAPPER}>
                            {person.image && (
                              <Image
                                src={person.image}
                                alt={person.name}
                                fill
                                sizes={CARD_IMAGE_SIZES}
                                className={IMAGE_COVER}
                              />
                            )}
                          </div>
                        )}
                        <h3 className={hasPhotos ? CARD_NAME_LIGHT : CARD_NAME_DARK}>{person.name}</h3>
                        <p className={hasPhotos ? CARD_TITLE_LIGHT : CARD_TITLE_DARK}>{person.title}</p>
                      </button>
                    </BioDialog>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
