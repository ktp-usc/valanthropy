import { readFile } from "node:fs/promises";
import path from "node:path";
import { fetchWpPage } from "@/lib/wordpress";

/** Read a page's text from the project's /content folder (server only). */
export const readContent = (file: string) =>
    readFile(path.join(process.cwd(), "content", file), "utf8");

/*
 * Where a page's text comes from, best source first:
 *   1. the WordPress page with the given slug (edited by admins in WordPress), then
 *   2. the local file in /content (used if WordPress is unreachable or the page is missing).
 * Callers use the first source that parses into something. The design stays in code.
 */
export async function contentSources(wpSlug: string, localFile: string): Promise<string[]> {
    const sources: string[] = [];
    const wp = await fetchWpPage(wpSlug); // returns null (and logs) on any failure
    // The old push script stored a frozen copy of the design here (shadow DOM); it is not editable text.
    if (wp?.html && !wp.html.includes("shadowrootmode")) sources.push(wp.html);
    try {
        sources.push(await readContent(localFile));
    } catch (error) {
        console.error(`Could not read content/${localFile}.`, error);
    }
    return sources;
}
