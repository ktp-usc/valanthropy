import { HTMLElement } from "node-html-parser";
import { clean, splitSections } from "@/lib/wordpress";
import { readContent } from "@/lib/content";
import LeadershipView, { type PeopleSection, type Person } from "./leadership-view";

/*
 * Leadership page. The text lives in content/leadership.html (edit it there, in VS Code). Layout it expects,
 * per section (a heading 2):
 *   - a photo with a caption (the name), followed by one paragraph per title line; or
 *   - a paragraph with a name followed by a paragraph with the title (no photo).
 * Bios are not in the file yet, so every person shows PLACEHOLDER_BIO.
 * Say "UPDATE WORDPRESS PAGES" to copy the finished design to the Leadership-New page in WordPress.
 * If the file is missing or can't be read, FALLBACK is shown.
 */

const PLACEHOLDER_BIO = "Bio coming soon.";

const FALLBACK: PeopleSection[] = [
  {
    title: "Our team",
    people: [
      { name: "Francis W. Altman, Jr.", title: "Founder, Chief Executive Officer", image: "/about-leadership/francis-w-altman-valanthropy.png", bio: PLACEHOLDER_BIO },
      { name: "Thomas L. Lash", title: "Founder, President", image: "/about-leadership/thomas-lash-valanthropy.png", bio: PLACEHOLDER_BIO },
      { name: "Richard Creswell", title: "Director of Advancement", image: "/about-leadership/richard-caswell-valanthropy.png", bio: PLACEHOLDER_BIO },
      { name: "Lilly Ellen Williams", title: "Communications Director", image: "/about-leadership/lilly-ellen-williams-valanthropy.png", bio: PLACEHOLDER_BIO },
    ],
  },
  {
    title: "Board of Directors",
    people: [
      "Robin Rawl",
      "Tyler Priester",
      "Hammond Edwards III",
      "Mike Genova",
      "William Allen",
      "Barbara Rakes",
    ].map((name) => ({ name, title: "Advising Director", bio: PLACEHOLDER_BIO })),
  },
];

// A paragraph that looks like a job title (used to tell names and titles apart when there is no photo).
const TITLE_WORDS = /director|officer|president|founder|chair|advis|treasurer|secretary|member|manager|lead/i;

function parsePeople(nodes: import("node-html-parser").Node[]): Person[] {
  const people: (Person & { fromPhoto: boolean })[] = [];
  const titleLines: string[][] = [];

  for (const node of nodes) {
    if (!(node instanceof HTMLElement)) continue;
    const tag = node.tagName.toLowerCase();
    const last = people[people.length - 1];

    if (tag === "figure") {
      const img = node.querySelector("img");
      const name = clean(node.querySelector("figcaption")?.text ?? img?.getAttribute("alt") ?? "");
      if (!name) continue;
      people.push({ name, title: "", bio: PLACEHOLDER_BIO, image: img?.getAttribute("src") ?? undefined, fromPhoto: true });
      titleLines.push([]);
    } else if (tag === "p") {
      const text = clean(node.text);
      if (!text) continue;
      // Lines after a photo are always titles; without a photo, a title-like line follows a name.
      if (last && (last.fromPhoto || (TITLE_WORDS.test(text) && titleLines[titleLines.length - 1].length === 0))) {
        titleLines[titleLines.length - 1].push(text);
      } else {
        people.push({ name: text, title: "", bio: PLACEHOLDER_BIO, fromPhoto: false });
        titleLines.push([]);
      }
    }
  }

  return people.map((p, i) => ({
    name: p.name,
    title: titleLines[i].join(", "),
    bio: p.bio,
    image: p.image,
  }));
}

export default async function Leadership() {
  const html = await readContent("leadership.html").catch((error) => {
    console.error("Leadership page: could not read content/leadership.html; using static content.", error);
    return null;
  });

  let sections = FALLBACK;

  if (html) {
    const parsed = splitSections(html)
      .map((s) => ({ title: s.title, people: parsePeople(s.nodes) }))
      .filter((s) => s.people.length > 0);
    if (parsed.length > 0) {
      sections = parsed;
    } else {
      console.error("Leadership page: no people found in WordPress content; using static content.");
    }
  }

  return <LeadershipView title="Leadership" sections={sections} />;
}
