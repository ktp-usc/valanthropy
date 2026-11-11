import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

type Organization = {
    name: string;
    logo?: string;
    href?: string;
};

const sponsors: Organization[] = [
    {
        name: "National Christian Foundation",
        logo: "/partners-and-sponsors/national-christian-foundation.png",
    },
    {
        name: "Tragedy Assistance Program for Survivors",
        logo: "/partners-and-sponsors/taps.png",
    },
    {
        name: "British Car Club Midlands Centre",
        logo: "/partners-and-sponsors/british-car-club-midlands.png",
    },
    {
        name: "Florida WineFest & Auction",
        logo: "/partners-and-sponsors/florida-winefest-auction.png",
    },
    {
        name: "US Foods",
        logo: "/partners-and-sponsors/us-foods.png",
    },
    {
        name: "Hidden Wounds",
        logo: "/partners-and-sponsors/hidden-wounds.png",
    },
    {
        name: "Optus Bank",
        logo: "/partners-and-sponsors/optus-bank.png",
    },
    {
        name: "George Law Firm",
        logo: "/partners-and-sponsors/george-law-firm.png",
    },
    {
        name: "VFW",
        logo: "/partners-and-sponsors/vfw.png",
    },
    {
        name: "Adluh Flour Mills",
        logo: "/partners-and-sponsors/adluh-flour-mills.png",
    },
    {
        name: "Duke Energy",
        logo: "/partners-and-sponsors/duke-energy.png",
    },
    {
        name: "Piggly Wiggly Sumter, SC",
        logo: "/partners-and-sponsors/piggly-wiggly-sumter.png",
    },
    {
        name: "Banner Bower & Coultrip, PC",
        logo: "/partners-and-sponsors/banner-bower-coultrip.png",
    },
    {
        name: "Asbestos.com",
        logo: "/partners-and-sponsors/asbestos-com.png",
    },
    {
        name: "SC Housing",
        logo: "/partners-and-sponsors/sc-housing.jpg",
    },
];

const partnerWays = [
    {
        title: "Create a Lasting Legacy",
        desc: "Purchase a Legacy Brick, sponsor an approved space or furnishing goal, or develop an annual signature partnership.",
    },
    {
        title: "Engage Your Customers",
        desc: "Round up purchases, dedicate a percentage of sales, feature a product for a purpose, or add a donation opportunity at checkout.",
    },
    {
        title: "Activate Your Team",
        desc: "Create a $20 for 12 workplace challenge, offer matching gifts, hold a department competition, or introduce payroll giving.",
    },
    {
        title: "Host an Event With Purpose",
        desc: "Organize a class, dinner, tournament, community event, open house, networking mixer, or customer appreciation fundraiser",
    },
    {
        title: "Provide What You Do Best",
        desc: "Contribute approved furnishings, household essentials, meals, professional services, printing, marketing, labor, or event support.",
    },
];

function SponsorLogo({ org }: { org: Organization }) {
    const card = (
        <div className="relative flex aspect-[3/2] items-center justify-center rounded border border-slate-200 bg-white p-4 text-center">
            {org.logo ? (
                <Image
                    src={org.logo}
                    alt={org.name}
                    fill
                    sizes="224px"
                    className="object-contain p-4"
                />
            ) : (
                <span className="text-sm font-semibold text-slate-400">
                    {org.name}
                </span>
            )}
        </div>
    );

    return org.href ? (
        <a
            href={org.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={org.name}
        >
            {card}
        </a>
    ) : (
        card
    );
}

export default function PartnersAndSponsors() {
    return (
        <div className="bg-white text-slate-900">
            <Header active="/about" />

            {/* Hero */}
            <section className="bg-slate-900 px-8 py-16 text-white md:px-16">
                <div className="mx-auto max-w-5xl">
                    <p className="mb-4 text-[16px] uppercase tracking-wide text-red-500">
                        About Us
                    </p>
                    <h1 className="mb-4 text-4xl font-bold leading-tight">
                        Partners & Sponsors
                    </h1>
                    <p className="mb-6 max-w-md text-sm">
                        The organizations and people who make our work possible.
                    </p>
                    <Link
                        href="/start-a-conversation"
                        className="inline-block rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white"
                    >
                        Become a Partner
                    </Link>
                </div>
            </section>

            {/* Businesses Building the Way Home */}
            <section className="bg-white px-8 py-14 md:px-16">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-3 text-2xl font-bold text-red-700">
                        Businesses Building the Way Home
                    </h2>
                    <p className="max-w-2xl text-sm text-slate-600">
                        Whether you engage your customers, challenge your
                        employees, sponsor an event, provide needed products or
                        services, or make a financial investment, your business
                        can help VAlanthropy build permanent housing and
                        long-term stability for veterans.
                    </p>
                </div>
            </section>

            {/* Why It Matters */}
            <section className="bg-blue-900 px-8 py-14 text-white md:px-16">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-3 text-2xl font-bold">
                        Why It Matters
                    </h2>
                    <p className="mb-3 max-w-2xl text-sm">
                        Hidden Wounds Village Alpha is VAlanthropy’s flagship
                        veteran housing initiative in Sumter, South Carolina.
                        The community will include 12 permanent, affordable
                        one-bedroom apartments designed to give veterans the
                        stability, connection, and support needed to move forward.
                    </p>
                    <p className="max-w-2xl text-sm">
                        VAlanthropy leads the development, infrastructure,
                        construction, furnishing, and long-term sustainability
                        of the community. Business partnerships help us continue
                        this work and prepare the village to become a place
                        veterans can truly call home.
                    </p>
                </div>
            </section>

            {/* Ways to Partner With Us */}
            <section className="bg-slate-100 px-8 py-14 md:px-16">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-6 text-2xl font-bold text-red-700">
                        Ways to Partner With Us
                    </h2>

                    {/* Three across, with the last two centered below */}
                    <ul className="grid gap-4 md:grid-cols-6">
                        {partnerWays.map((w, i) => (
                            <li
                                key={w.title}
                                className={`rounded border border-slate-200 bg-white p-5 md:col-span-2 ${
                                    i === 3 ? "md:col-start-2" : ""
                                }`}
                            >
                                <h3 className="mb-2 text-sm font-bold">
                                    {w.title}
                                </h3>
                                <p className="text-xs text-slate-600">
                                    {w.desc}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10 text-center">
                        <Link
                            href="/start-a-conversation"
                            className="inline-block rounded bg-red-700 px-12 py-4 text-sm font-semibold text-white"
                        >
                            Start a Conversation
                        </Link>
                    </div>
                </div>
            </section>

            {/* Sponsors: second copy makes the scrolling loop seamless */}
            <section className="bg-white py-14">
                <div className="mx-auto mb-6 max-w-5xl px-8 md:px-16">
                    <h2 className="text-2xl font-bold text-red-700">
                        Our Sponsors
                    </h2>
                </div>

                <div className="overflow-hidden motion-reduce:overflow-x-auto">
                    <ul className="flex w-max animate-marquee gap-6 pr-6 motion-reduce:animate-none">
                        {[...sponsors, ...sponsors].map((org, i) => (
                            <li
                                key={i}
                                className="w-56 shrink-0"
                                aria-hidden={i >= sponsors.length}
                            >
                                <SponsorLogo org={org} />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-slate-900 px-8 py-16 text-center text-white">
                <h2 className="mb-2 text-2xl font-bold">
                    Partner with VAlanthropy.
                </h2>
                <p className="mb-6 text-xs text-slate-300">
                    Contact us to learn how your organization can help build
                    the village.
                </p>
                <Link
                    href="/contact"
                    className="inline-block rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white"
                >
                    Contact Us
                </Link>
            </section>

            <Footer />
        </div>
    );
}