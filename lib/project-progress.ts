// Hidden Wounds Village Alpha progress content. Update this file as the project moves forward.
// When Projects content moves to WordPress (VALY-27), replace this data with the WordPress source.

export type StageStatus = "done" | "current" | "upcoming";

export type Stage = { label: string; status: StageStatus };

// `image` is optional: add a photo to /public/projects/ and set its path, e.g. "/projects/groundbreaking.png".
export type Milestone = { date?: string; name: string; details: string; image?: string };

export type StatusGroup = { title: string; milestones: Milestone[] };

export const LAST_UPDATED = "Progress reflects VAlanthropy's updates through July 2026.";

export const stages: Stage[] = [
    { label: "Groundbreaking", status: "done" },
    { label: "Infrastructure", status: "done" },
    { label: "Building plans", status: "current" },
    { label: "Construction", status: "upcoming" },
    { label: "Move-in", status: "upcoming" },
];

export const statusGroups: StatusGroup[] = [
    {
        title: "Completed",
        milestones: [
            {
                date: "March 2025",
                name: "Groundbreaking",
                details: "The site in Sumter was secured and engineering and development work began.",
            },
            {
                date: "March–June 2026",
                name: "Site work and utilities",
                details:
                    "Infrastructure installation began, including grading, utilities and earthwork for the retention pond and future parking area.",
            },
            {
                name: "Infrastructure complete",
                details: "Curbs are installed, the retention pond is finished and grading is complete.",
            },
            {
                date: "July 2026",
                name: "Building plans finalized",
                details: "Final building plans were completed and submitted for state approval.",
            },
        ],
    },
    {
        title: "Happening now",
        milestones: [
            {
                name: "Awaiting final plan approval",
                details:
                    "The building plans are with South Carolina housing officials for final approval. There is less activity on site during this phase, but it is essential preparation for construction.",
            },
        ],
    },
    {
        title: "What comes next",
        milestones: [
            {
                name: "Permits and construction",
                details: "Secure building permits and begin building the 12 homes.",
            },
            {
                name: "Furnishing and move-in readiness",
                details: "Furnish each home so veterans can move in ready to rebuild.",
            },
            {
                name: "Long-term sustainability",
                details: "Build dependable funding and partner support so the village thrives for years.",
            },
        ],
    },
];
