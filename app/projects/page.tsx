import Header from "@/components/header";
import Footer from "@/components/footer";
import ProjectProgress from "@/components/project-progress";

// Layout
const PAGE = "min-h-screen bg-white text-slate-900";
const CONTAINER = "mx-auto max-w-5xl";
const SECTION_HERO = "bg-slate-900 px-8 py-16 text-white md:px-16";

// Typography
const EYEBROW = "mb-4 text-[16px] uppercase tracking-wide text-red-500";
const PAGE_TITLE = "text-4xl font-bold";
const HERO_TEXT = "mt-4 max-w-2xl text-sm text-slate-300";

export default function ProjectsPage() {
    return (
        <div className={PAGE}>
            <Header active="/projects" />

            {/* Hero */}
            <section className={SECTION_HERO}>
                <div className={CONTAINER}>
                    <p className={EYEBROW}>Projects</p>
                    <h1 className={PAGE_TITLE}>Hidden Wounds Village Alpha</h1>
                    <p className={HERO_TEXT}>
                        Permanent, affordable housing in Sumter, South Carolina, designed to help veterans build
                        stability, independence and a stronger future.
                    </p>
                </div>
            </section>

            {/* Progress */}
            <ProjectProgress />

            <Footer />
        </div>
    );
}
