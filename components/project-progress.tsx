import Image from "next/image";
import { LAST_UPDATED, stages, statusGroups, type StageStatus } from "@/lib/project-progress";

// Layout
const SECTION_DARK = "bg-blue-900 px-8 py-14 text-white md:px-16";
const CONTAINER = "mx-auto max-w-5xl";
const SECTION_TITLE = "mb-6 text-2xl font-bold";
const INTRO = "mb-8 max-w-3xl text-sm text-white/80";
const LAST_UPDATED_TEXT = "mt-6 text-xs text-white/80";

// Stage tracker
const STAGE_GRID = "mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5";
const STAGE_BAR_DONE = "h-2 rounded bg-red-500";
const STAGE_BAR_CURRENT = "h-2 rounded bg-red-400/50";
const STAGE_BAR_UPCOMING = "h-2 rounded bg-white/30";
const STAGE_NAME = "mt-2 text-sm font-semibold";
const STAGE_STATUS_DONE = "text-xs text-red-400";
const STAGE_STATUS_CURRENT = "text-xs font-semibold text-white";
const STAGE_STATUS_UPCOMING = "text-xs text-white/80";

// Status cards
const GRID = "grid gap-4 md:grid-cols-3";
const CARD_DARK = "h-full w-full rounded border border-white/30 p-4 text-center";
const CARD_TITLE = "mb-4 text-[16px] uppercase tracking-wide text-red-400";
const MILESTONE_LIST = "space-y-4";
const MILESTONE_IMAGE = "relative mb-2 aspect-video overflow-hidden rounded bg-slate-200";
const MILESTONE_DATE = "text-sm text-red-400";
const MILESTONE_NAME = "text-sm font-semibold";
const MILESTONE_DETAILS = "text-sm text-white/80";

const STAGE_BAR: Record<StageStatus, string> = {
    done: STAGE_BAR_DONE,
    current: STAGE_BAR_CURRENT,
    upcoming: STAGE_BAR_UPCOMING,
};

const STAGE_STATUS: Record<StageStatus, string> = {
    done: STAGE_STATUS_DONE,
    current: STAGE_STATUS_CURRENT,
    upcoming: STAGE_STATUS_UPCOMING,
};

const STAGE_STATUS_LABEL: Record<StageStatus, string> = {
    done: "Complete",
    current: "In progress",
    upcoming: "Up next",
};

export default function ProjectProgress() {
    return (
        <section id="progress" className={SECTION_DARK}>
            <div className={CONTAINER}>
                <h2 className={SECTION_TITLE}>Where the project stands</h2>
                <p className={INTRO}>
                    Groundwork and infrastructure are complete. The current focus is final approval of the building
                    plans, which clears the way for construction.
                </p>

                {/* Stage tracker */}
                <ol className={STAGE_GRID} aria-label="Project stages">
                    {stages.map((stage) => (
                        <li key={stage.label} aria-current={stage.status === "current" ? "step" : undefined}>
                            <div className={STAGE_BAR[stage.status]} />
                            <p className={STAGE_NAME}>{stage.label}</p>
                            <p className={STAGE_STATUS[stage.status]}>{STAGE_STATUS_LABEL[stage.status]}</p>
                        </li>
                    ))}
                </ol>

                {/* Completed, happening now, what comes next */}
                <ul className={GRID}>
                    {statusGroups.map((group) => (
                        <li key={group.title} className={CARD_DARK}>
                            <h3 className={CARD_TITLE}>{group.title}</h3>
                            <ul className={MILESTONE_LIST}>
                                {group.milestones.map((milestone) => (
                                    <li key={milestone.name}>
                                        {milestone.image && (
                                            <div className={MILESTONE_IMAGE}>
                                                <Image
                                                    src={milestone.image}
                                                    alt={milestone.name}
                                                    fill
                                                    sizes="(min-width: 768px) 33vw, 100vw"
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        {milestone.date && <p className={MILESTONE_DATE}>{milestone.date}</p>}
                                        <p className={MILESTONE_NAME}>{milestone.name}</p>
                                        <p className={MILESTONE_DETAILS}>{milestone.details}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                <p className={LAST_UPDATED_TEXT}>{LAST_UPDATED}</p>
            </div>
        </section>
    );
}
