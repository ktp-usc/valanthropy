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
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 text-slate-900 shadow-xl">
          {person.image && (
            <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded bg-slate-200">
              <Image src={person.image} alt={person.name} fill sizes="128px" className="object-cover" />
            </div>
          )}
          <Dialog.Title className="text-center text-xl font-bold">{person.name}</Dialog.Title>
          <Dialog.Description className="mb-4 text-center text-xs text-red-700">
            {person.title}
          </Dialog.Description>
          <p className="text-sm text-slate-600">{person.bio}</p>
          <Dialog.Close className="mt-6 w-full cursor-pointer rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white">
            Close
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function Leadership() {
  return (
    <div className="bg-white text-slate-900">
      <Header active="/about" />

      {/* Hero */}
      <section className="bg-slate-900 px-8 py-16 text-white md:px-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-[16px] uppercase tracking-wide text-red-500">About Us</p>
          <h1 className="text-4xl font-bold">Leadership</h1>
        </div>
      </section>

      {/* Leadership team */}
      <section className="bg-white px-8 py-14 md:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold">Our team</h2>
          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {leaders.map((leader) => (
              <li key={leader.name}>
                <BioDialog person={leader}>
                  <button type="button" className="h-full w-full cursor-pointer rounded border border-slate-200 bg-white p-4 text-center transition hover:shadow-lg">
                    <div className="relative mb-3 aspect-square overflow-hidden rounded bg-slate-200">
                      <Image
                        src={leader.image!} alt={leader.name} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover"/>
                    </div>
                    <h3 className="font-bold">{leader.name}</h3>
                    <p className="text-[16px] text-red-700">{leader.title}</p>
                  </button>
                </BioDialog>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Board */}
      <section className="bg-blue-900 px-8 py-14 text-white md:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold">Board of Directors</h2>
          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {directors.map((d) => (
              <li key={d.name}>
                <BioDialog person={d}>
                  <button
                    type="button"
                    className="w-full cursor-pointer rounded border border-white/30 p-4 text-center transition hover:bg-white/10"
                  >
                    <h3 className="text-sm font-semibold">{d.name}</h3>
                    <p className="text-[16px] text-red-400">{d.title}</p>
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
