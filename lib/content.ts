import { readFile } from "node:fs/promises";
import path from "node:path";

/** Read a page's editable text from the project's /content folder (server only). */
export const readContent = (file: string) =>
    readFile(path.join(process.cwd(), "content", file), "utf8");
