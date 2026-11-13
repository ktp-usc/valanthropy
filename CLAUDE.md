# Project notes for Claude

## How the text on the site is edited (WordPress is the source of the wording)

The site's design and code live in this repo (hosted on Vercel). The WORDING is edited by the client in
WordPress, on one private page per site page named `<route>-new`. The site reads those pages through the
WordPress REST API and shows the text in its own design. If WordPress is unreachable, or a block was deleted,
the wording written in the code is shown, so the site never breaks.

| Local page          | WordPress page (private, except leadership-new) | How its text is connected |
| ------------------- | ----------------------------------------------- | ------------------------- |
| `/` (home)          | `home-new`                  | `<T>` in `app/page.tsx` |
| `/about`            | `about-new`                 | parsed from the page's HTML; fallback `content/about.html` |
| `/leadership`       | `leadership-new` (public)   | parsed from the page's HTML; fallback `content/leadership.html` |
| `/contact`          | `contact-new`               | `<T>` in `app/contact/page.tsx` |
| `/projects`         | `projects-new`              | `<T>` in `app/projects/page.tsx` |
| `/ways-to-help`     | `ways-to-help-new`          | `<T>` in `app/ways-to-help/ways-to-help-view.tsx` (client view) |
| `/become-a-partner` | `partners-and-sponsors-new` | `<T>` in `app/become-a-partner/page.tsx` |
| `/financials`       | `financials-new`            | `<T>` in `app/financials/financials-view.tsx` (client view) |
| `/donate`           | `donate-new`                | `<T>` in `app/donate/page.tsx` |
| `/news`             | `news-new`                  | `<T>` in `app/news/page.tsx` |
| `/start-a-conversation` | `start-a-conversation-new` | `<T>` in `app/start-a-conversation/page.tsx` |

### Writing editable text in code

- Wrap text in `<T>`: `<h2><T>Contact Options</T></h2>` (`const T = slotText("contact-new")` once per file, from `lib/wp-text.tsx`).
  In client components use `slotTextClient()` from `lib/wp-text-client.tsx`; the server `page.tsx` loads the text with
  `loadSlotNodes()` and passes it in through `<SlotsProvider>` (see `app/ways-to-help/page.tsx`).
- Each piece of text is matched to its WordPress block by an id made from the wording in the code (`lib/wp-slot-id.ts`).
  If a developer changes the wording in code, run the sync below so WordPress gets a block for the new wording.
- Images, links, layout and colours stay in code. Only wording is editable in WordPress.

### "UPDATE WORDPRESS PAGES" (also: after adding or changing wording in code)

When the user types exactly `UPDATE WORDPRESS PAGES` (all caps), refresh the WordPress text pages:
1. Make sure the local dev server is running on `http://localhost:3000` (request `/contact`). If not, start
   `npm run dev` in the background and wait until it responds.
2. Run `npm run wp:text` (preview without writing: `npm run wp:text:preview`; only some pages:
   `npm run wp:text -- contact home`; names: home, contact, projects, ways, partners, financials, donate,
   news, conversation). About and Leadership use `scripts/create-wp-content-pages.mjs`; its `--overwrite` flag
   replaces a page's text with the local file and discards the client's edits, so only use it for a deliberate
   restore, with the user's explicit OK.
3. Report, per page: created / updated / failed, and the number of editable blocks.

DO NOT run `npm run wp:push` (`scripts/push-design-to-wordpress.mjs`) on these pages any more. It is the old
"frozen copy of the design" mirror and would overwrite the editable blocks. Re-running `wp:text` is safe: it only
adds blocks for wording that has none yet and never changes or removes an existing block, so the client's edits are
kept. Text inside pop-ups (Radix Dialog portals) is not in the server HTML, so it can't get a block automatically.

Rules:
- Only the `-new` pages in the table may be written. The live pages on valanthropy.org (`home`, `about`,
  `leadership`, `contact`, `ways-to-help`, `donate`, ...) must never be touched. The scripts enforce this.
- Credentials are in `.env.local` (`WP_USER`, `WP_APP_PASSWORD`). Never print, read aloud or commit them.
  The password contains a `$`, which Next.js would treat as a variable, so `.env.development.local` holds an
  escaped copy for `next dev`. Vercel needs the same two values as plain (non-`NEXT_PUBLIC_`) environment variables.
- The scripts save a backup of each WordPress page to `backups/` before overwriting it.
- If a login fails, stop after one attempt and tell the user (repeated failures can lock the account).
- The site refreshes WordPress text about every 5 minutes (`REVALIDATE_SECONDS` in `lib/wordpress.tsx`).
