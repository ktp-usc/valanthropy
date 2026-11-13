import { HTMLElement } from "node-html-parser";
import { clean, splitSections } from "@/lib/wordpress";
import { contentSources } from "@/lib/content";
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

function parsePeople(
  nodes: import("node-html-parser").Node[],
): Person[] {
  const people: (Person & { fromPhoto: boolean })[] = [];
  const titleLines: string[][] = [];

  for (const node of nodes) {
    if (!(node instanceof HTMLElement)) continue;

    const tag = node.tagName.toLowerCase();
    const last = people[people.length - 1];

    // Biography blocks belong to the person immediately above them.
    if (node.hasAttribute("data-bio")) {
      if (last) {
        const paragraphs = node.querySelectorAll("p");
        const lines = paragraphs.length
          ? paragraphs.map((p) => clean(p.text))
          : [clean(node.text)];

        last.bio =
          lines.filter(Boolean).join("\n\n") || PLACEHOLDER_BIO;
      }
      continue;
    }

    if (tag === "figure") {
      const img = node.querySelector("img");
      const name = clean(
        node.querySelector("figcaption")?.text ??
          img?.getAttribute("alt") ??
          "",
      );

      if (!name) continue;

      people.push({
        name,
        title: "",
        bio: PLACEHOLDER_BIO,
        image: img?.getAttribute("src") ?? undefined,
        fromPhoto: true,
      });
      titleLines.push([]);
    } else if (tag === "p") {
      const text = clean(node.text);
      if (!text) continue;

      if (
        last &&
        (last.fromPhoto ||
          (TITLE_WORDS.test(text) &&
            titleLines[titleLines.length - 1].length === 0))
      ) {
        titleLines[titleLines.length - 1].push(text);
      } else {
        people.push({
          name: text,
          title: "",
          bio: PLACEHOLDER_BIO,
          fromPhoto: false,
        });
        titleLines.push([]);
      }
    }
  }

  return people.map((person, i) => ({
    name: person.name,
    title: titleLines[i].join(", "),
    bio: person.bio,
    image: person.image,
  }));
}

// Slug of the WordPress page that holds this page's text. Falls back to content/leadership.html.
const WP_CONTENT_SLUG = "leadership-new";

export default async function Leadership() {
  let sections = FALLBACK;

  for (const html of await contentSources(WP_CONTENT_SLUG, "leadership.html")) {
    const parsed = splitSections(html)
      .map((s) => ({ title: s.title, people: parsePeople(s.nodes) }))
      .filter((s) => s.people.length > 0);
    if (parsed.length > 0) {
      sections = parsed;
      break;
    }
    console.error("Leadership page: no people found in a content source; trying the next one.");
  }

  return <LeadershipView title="Leadership" sections={sections} />;
}
