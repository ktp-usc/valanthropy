# Project notes for Claude

## "UPDATE WORDPRESS PAGES"

When the user types exactly `UPDATE WORDPRESS PAGES` (all caps), copy the finished design of the
local pages into their WordPress mirror pages:

| Local page        | Text lives in              | WordPress page   |
| ----------------- | -------------------------- | ---------------- |
| `/about`          | `content/about.html`       | `about-new`      |
| `/leadership`     | `content/leadership.html`  | `leadership-new` |
| `/contact`        | `DEFAULTS` in `app/contact/page.tsx` | `contact-new` |
| `/projects`       | `app/projects/page.tsx` (placeholder) | `projects-new` |
| `/ways-to-help`   | `app/ways-to-help/page.tsx` | `ways-to-help-new` |
| `/become-a-partner` | `app/become-a-partner/page.tsx` | `partners-and-sponsors-new` |
| `/financials`     | `app/financials/page.tsx`  | `financials-new` |

Steps:
1. Make sure the local dev server is running on `http://localhost:3000` (check with a request to
   `/contact`). If it isn't, start `npm run dev` in the background and wait until it responds.
2. Run `npm run wp:push` (same as `node --env-file=.env.local scripts/push-design-to-wordpress.mjs --apply`).
3. Report, per page: written or failed, and whether the WordPress front end shows the design.
   Mention any `note:` lines the script prints.

Rules:
- Only `about-new`, `leadership-new`, `contact-new`, `projects-new`, `ways-to-help-new`,
  `partners-and-sponsors-new` and `financials-new` may be written.
  The live pages on valanthropy.org (`about`, `leadership`, `contact`, `ways-to-help`, ...) must never be
  touched. The script enforces this. All except `leadership-new` are kept private.
- Credentials are in `.env.local` (`WP_USER`, `WP_APP_PASSWORD`). Never print, read aloud or commit them.
- The script saves a backup of each WordPress page to `backups/` before overwriting it.
- If a login fails, stop after one attempt and tell the user (repeated failures can lock the account).
- To preview without writing: `node --env-file=.env.local scripts/push-design-to-wordpress.mjs` (no `--apply`).
  Add page names (`about`, `leadership`, `contact`, `projects`, `ways`, `partners`, `financials`) to do only those.

## Content

- Text for About and Leadership is edited in `content/*.html`; Contact text is in `app/contact/page.tsx`.
- The WordPress pages are one-way mirrors of the local design. Edits made directly in WordPress
  are overwritten by the next update (the old content is kept in `backups/`).
