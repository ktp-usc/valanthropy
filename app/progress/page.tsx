import { redirect } from "next/navigation";

// The header's "Progress" link points to /progress; send visitors to the progress section on Projects.
export default function ProgressPage() {
    redirect("/projects#progress");
}