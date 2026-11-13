import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/header";

export const metadata: Metadata = {
    title: "News & Stories | VAlanthropy",
    description:
        "Follow the progress, partnerships, people, and purpose behind Hidden Wounds Village Alpha.",
};

/*
 * News & Stories. The stories are the WordPress posts on valanthropy.org, read through the public
 * WordPress REST API and shown in this site's design (a new post appears here within ~5 minutes).
 * If WordPress can't be reached, FALLBACK_POSTS is shown instead. "Read more" opens the full story
 * on valanthropy.org.
 */

// Same newsletter signup form that "Stay in Touch" uses on the Contact page.
const NEWSLETTER_SIGNUP_URL = "https://valanthropy.dm.networkforgood.com/forms/subscibe-for-updates";

const WP_ORIGIN = "https://valanthropy.org";
const REVALIDATE_SECONDS = 300;

type Post = {
    id: number | string;
    date: string; // ISO date, e.g. 2026-11-10
    title: string;
    excerpt?: string;
    link: string;
    image?: string;
};

// Shown only if the WordPress posts can't be loaded.
const FALLBACK_POSTS: Post[] = [
    { id: 1, date: "2026-11-10", title: "Veterans Day 2026", link: `${WP_ORIGIN}/veterans-day-2026/`, image: `${WP_ORIGIN}/wp-content/uploads/2026/11/HONORSERVICE.webp` },
    { id: 2, date: "2026-11-10", title: "VAlanthropy Earns 2026 Candid Platinum Seal of Transparency", link: `${WP_ORIGIN}/candid-platinum/`, image: `${WP_ORIGIN}/wp-content/uploads/2026/11/candid-seal-platinum-2026.webp` },
    { id: 3, date: "2026-09-23", title: "Legacy Beneath their Feet", link: `${WP_ORIGIN}/legacy-beneath-their-feet-honoring-veterans/`, image: `${WP_ORIGIN}/wp-content/uploads/2026/09/walkingpathtohealing-1024x683.webp` },
    { id: 4, date: "2026-09-23", title: "How Communities Can Help Veterans Thrive", link: `${WP_ORIGIN}/how-communities-can-help-veterans-thrive/` },
    { id: 5, date: "2026-09-17", title: "Building Smarter Paths to Giving", link: `${WP_ORIGIN}/building-smarter-paths-to-givng/` },
    { id: 6, date: "2026-09-02", title: "Progress not always visible", link: `${WP_ORIGIN}/progress-not-always-visible/` },
    { id: 7, date: "2026-08-31", title: "Key is Only the Beginning", link: `${WP_ORIGIN}/key-is-only-the-beginning/` },
    { id: 8, date: "2026-08-28", title: "Stronger Community in the Midlands – Shared Mission", link: `${WP_ORIGIN}/stronger-community-in-the-midlands/` },
    { id: 9, date: "2026-06-19", title: "VFW Convention Jun 19 2026", link: `${WP_ORIGIN}/vfw-convention-jun-19-2026/` },
    { id: 10, date: "2026-06-10", title: "Sumter Rotary Talks June 2026", link: `${WP_ORIGIN}/sumter-rotary-talks-june-2026/` },
    { id: 11, date: "2026-06-03", title: "June 02 VFW 6740 Talk", link: `${WP_ORIGIN}/elementor-81939/` },
    { id: 12, date: "2026-05-01", title: "Why Stable Housing Matters for Veterans Living with PTSD", link: `${WP_ORIGIN}/why-stable-housing-matters-for-veterans-living-with-ptsd/` },
    { id: 13, date: "2026-04-02", title: "Executive Briefing April 02 2026", link: `${WP_ORIGIN}/executive-briefing-april-02-2026/` },
    { id: 14, date: "2026-03-31", title: "Legacy Brick Campaign Launched", link: `${WP_ORIGIN}/legacy-brick-campaign-launched/` },
    { id: 15, date: "2025-11-25", title: "Hidden Wounds Resource Center-Operation Full Plate", link: `${WP_ORIGIN}/hidden-wounds-resource-center-operation-full-plate/` },
    { id: 16, date: "2025-10-13", title: "Community Support in Motion: The Mustang That Helped Share Our Mission", link: `${WP_ORIGIN}/south-carolina-veteran-housing-outreach/` },
    { id: 17, date: "2025-08-13", title: "Bringing the Community Together: The Veterans Luncheon at The Flight Deck", link: `${WP_ORIGIN}/veterans-luncheon-flight-deck-lexington-sc/` },
];

/* ---------- Load the posts from WordPress ---------- */

type WpPost = {
    id: number;
    date: string;
    link: string;
    title?: { rendered?: string };
    excerpt?: { rendered?: string };
    _embedded?: {
        "wp:featuredmedia"?: {
            source_url?: string;
            media_details?: { sizes?: Record<string, { source_url?: string }> };
        }[];
    };
};

const ENTITIES: Record<string, string> = {
    amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…",
    rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", ndash: "–", mdash: "—",
};

/** WordPress HTML (title / excerpt) -> plain text: drop tags, decode entities, collapse spaces. */
const plain = (html: string) =>
    html
        .replace(/<[^>]*>/g, " ")
        .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
        .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
        .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m)
        .replace(/\s+/g, " ")
        .trim();

function shorten(text: string, max = 170): string {
    const t = text.replace(/\s*(\[…\]|\[&hellip;\]|…|Read More »)\s*$/i, "").trim();
    if (t.length <= max) return t;
    return t.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

async function getPosts(): Promise<Post[]> {
    try {
        const res = await fetch(
            `${WP_ORIGIN}/wp-json/wp/v2/posts?per_page=100&_embed=wp:featuredmedia&_fields=id,date,link,title,excerpt,_links,_embedded`,
            { next: { revalidate: REVALIDATE_SECONDS } },
        );
        if (!res.ok) throw new Error(`WordPress responded ${res.status}`);
        const items = (await res.json()) as WpPost[];
        const posts = items
            .map((p): Post => {
                const media = p._embedded?.["wp:featuredmedia"]?.[0];
                const image =
                    media?.media_details?.sizes?.large?.source_url ??
                    media?.media_details?.sizes?.medium_large?.source_url ??
                    media?.source_url;
                return {
                    id: p.id,
                    date: p.date.slice(0, 10),
                    title: plain(p.title?.rendered ?? ""),
                    excerpt: shorten(plain(p.excerpt?.rendered ?? "")),
                    link: p.link,
                    image,
                };
            })
            .filter((p) => p.title && p.link.startsWith(WP_ORIGIN))
            .sort((a, b) => b.date.localeCompare(a.date));
        if (posts.length === 0) throw new Error("No posts returned");
        return posts;
    } catch (error) {
        console.error("News page: could not load WordPress posts; using the built-in list.", error);
        return FALLBACK_POSTS;
    }
}

const formatDate = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    });

/* ---------- Page ---------- */

const CONTAINER = "mx-auto max-w-6xl";
const LABEL = "mb-4 text-[16px] uppercase tracking-wide text-red-700";
const SECTION_TITLE = "mb-4 text-2xl font-bold";
const BODY = "text-sm leading-7 text-slate-600";

const SHARE = [
    {
        title: "Village Progress",
        text: "Updates from the development journey, including planning, construction, furnishing, and the work that transforms a vision into homes.",
    },
    {
        title: "Community Partnerships",
        text: "Stories about the businesses, organizations, leaders, and supporters who are helping create lasting solutions for veterans.",
    },
    {
        title: "Ways to Make an Impact",
        text: "Campaign news, giving opportunities, volunteer involvement, and practical ways our community can help build stability and belonging.",
    },
];

function StoryCard({ post }: { post: Post }) {
    return (
        <li className="flex flex-col overflow-hidden rounded border border-slate-200 bg-white">
            <a
                href={post.link}
                tabIndex={-1}
                aria-hidden="true"
                className="block aspect-[3/2] bg-slate-100"
            >
                {post.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={post.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span className="flex h-full w-full items-center justify-center bg-blue-900 text-sm font-bold tracking-wide text-white/80">
                        VAlanthropy
                    </span>
                )}
            </a>

            <div className="flex flex-1 flex-col p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-700">
                    {formatDate(post.date)}
                </p>
                <h3 className="mb-2 text-lg font-bold leading-snug">
                    <a href={post.link} className="hover:text-red-700 hover:underline">
                        {post.title}
                    </a>
                </h3>
                {post.excerpt && <p className="mb-4 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>}
                <a
                    href={post.link}
                    className="mt-auto inline-flex items-center gap-2 py-1 text-sm font-semibold text-red-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-700"
                    aria-label={`Read more: ${post.title}`}
                >
                    Read more
                    <ArrowUpRight size={16} aria-hidden="true" />
                </a>
            </div>
        </li>
    );
}

export default async function NewsPage() {
    const posts = await getPosts();

    return (
        <div className="bg-white text-slate-900">
            <Header active="/news" />

            {/* Hero */}
            <section className="bg-slate-900 px-8 py-16 text-white md:px-16">
                <div className={CONTAINER}>
                    <p className="mb-4 text-[16px] uppercase tracking-wide text-red-500">
                        News &amp; Stories
                    </p>
                    <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-tight">
                        Building Homes. Sharing Progress. Strengthening Community
                    </h1>
                    <div className="max-w-2xl space-y-3 text-sm leading-7 text-white/85">
                        <p>
                            Welcome to the VAlanthropy News &amp; Stories page&mdash;a place to
                            follow the progress, partnerships, people, and purpose behind Hidden
                            Wounds Village Alpha.
                        </p>
                        <p>
                            Every update represents more than construction milestones or event
                            photos. It reflects a community coming together to create permanent
                            affordable housing, greater stability, and new opportunities for
                            veterans in Sumter and beyond.
                        </p>
                        <p>
                            Here, you will find project updates, community partnerships, event
                            recaps, campaign news, volunteer moments, and stories that show how a
                            shared commitment can create lasting impact.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stories */}
            <section className="bg-white px-8 py-14 md:px-16" aria-labelledby="journey-title">
                <div className={CONTAINER}>
                    <p className={LABEL}>Latest stories</p>
                    <h2 id="journey-title" className={SECTION_TITLE}>
                        Follow the Journey
                    </h2>
                    <div className="mb-10 max-w-3xl space-y-3">
                        <p className={BODY}>
                            From conversations that open doors to partnerships that move the work
                            forward, VAlanthropy is building a strong foundation for long-term
                            veteran success.
                        </p>
                        <p className={BODY}>
                            Our stories share the work happening behind the scenes and the people
                            helping make it possible&mdash;community leaders, businesses,
                            supporters, service organizations, volunteers, and everyone who
                            believes veterans deserve a stable place to call home.
                        </p>
                    </div>

                    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <StoryCard key={post.id} post={post} />
                        ))}
                    </ul>
                </div>
            </section>

            {/* Every story helps build the village */}
            <section className="bg-slate-50 px-8 py-14 md:px-16" aria-labelledby="village-title">
                <div className={CONTAINER}>
                    <h2 id="village-title" className={SECTION_TITLE}>
                        Every Story Helps Build the Village
                    </h2>
                    <div className="mb-10 max-w-3xl space-y-3">
                        <p className={BODY}>
                            Hidden Wounds Village Alpha is VAlanthropy&rsquo;s flagship housing
                            development in Sumter, South Carolina. The community is designed to
                            provide permanent affordable housing in an environment built around
                            dignity, stability, connection, and opportunity.
                        </p>
                        <p className={BODY}>
                            VAlanthropy leads the development and long-term sustainability of the
                            housing infrastructure that makes this supportive ecosystem possible.
                            As progress continues, we are proud to share the partnerships,
                            planning, community support, and milestones that bring the vision
                            closer to reality.
                        </p>
                    </div>

                    <h3 className="mb-5 text-lg font-bold text-red-700">What We Share</h3>
                    <ul className="grid gap-6 md:grid-cols-3">
                        {SHARE.map((item) => (
                            <li
                                key={item.title}
                                className="rounded border border-slate-200 border-t-4 border-t-red-700 bg-white p-6"
                            >
                                <h4 className="mb-2 font-bold">{item.title}</h4>
                                <p className={BODY}>{item.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Stay connected */}
            <section className="bg-blue-900 px-8 py-14 text-center text-white md:px-16" aria-labelledby="connected-title">
                <div className={CONTAINER}>
                    <h2 id="connected-title" className="mb-4 text-2xl font-bold">
                        Stay Connected to the Mission
                    </h2>
                    <div className="mx-auto max-w-2xl space-y-3 text-sm leading-7 text-white/85">
                        <p>
                            The work of building a village takes a community. Subscribe to receive
                            VAlanthropy news, upcoming events, project updates, and meaningful ways
                            to join the journey.
                        </p>
                        <p>
                            Together, we can build stable housing, strong partnerships, and
                            sustainable opportunities that empower veterans to thrive.
                        </p>
                    </div>
                    <a
                        href={NEWSLETTER_SIGNUP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center justify-center gap-3 rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-400"
                    >
                        Sign Up for Updates
                        <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                </div>
            </section>
        </div>
    );
}
