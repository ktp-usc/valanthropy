# Valanthropy Style Guide

This guide is based on [app/about-leadership/page.tsx](app/about-leadership/page.tsx). New pages should follow these patterns so the site looks the same everywhere.

All styling uses Tailwind CSS utility classes. Don't add custom CSS unless Tailwind can't do what you need.

---

## 1. Color palette

| Role                          | Class                       | Where it's used                              |
| ----------------------------- | --------------------------- | -------------------------------------------- |
| Page background               | `bg-white`                  | Page wrapper, light sections, cards, dialogs |
| Primary text                  | `text-slate-900`            | Page wrapper, dialog content                 |
| Secondary / body text         | `text-slate-600`            | Paragraphs and bios                          |
| Hero background               | `bg-slate-900`              | Page hero banner                             |
| Feature section background    | `bg-blue-900`               | Dark content sections (e.g. Board)           |
| Text on dark backgrounds      | `text-white`                | Hero, dark sections, buttons                 |
| Accent on light backgrounds   | `text-red-700` / `bg-red-700` | Job titles, primary buttons                |
| Accent on dark backgrounds    | `text-red-400`, `text-red-500` | Eyebrow labels, titles on dark sections   |
| Borders (light)               | `border-slate-200`          | Cards on white                               |
| Borders (dark)                | `border-white/30`           | Cards on `blue-900`                          |
| Image placeholder             | `bg-slate-200`              | Behind images while they load                |
| Modal overlay                 | `bg-black/60`               | Dialog backdrop                              |

**Rule:** red is the only accent color. Use `red-700` on light backgrounds and a lighter red (`red-400`/`red-500`) on dark backgrounds so it stays readable.

---

## 2. Typography

| Element             | Classes                                              |
| ------------------- | ---------------------------------------------------- |
| Eyebrow label       | `mb-4 text-[16px] uppercase tracking-wide text-red-500` |
| Page title (`h1`)   | `text-4xl font-bold`                                 |
| Section title (`h2`)| `mb-6 text-2xl font-bold`                            |
| Card name (`h3`)    | `font-bold` (light) or `text-sm font-semibold` (dark/compact) |
| Card subtitle       | `text-[16px] text-red-700` (light) / `text-red-400` (dark) |
| Body text           | `text-sm text-slate-600`                             |
| Button text         | `text-xs font-semibold`                              |

- Each page has exactly one `h1`, in the hero.
- Headings use sentence case ("Our team"). Proper names stay capitalized ("Board of Directors").
- The eyebrow label sits above the `h1` and names the parent section (e.g. "About Us").

---

## 3. Layout

### Page structure

```
<div page wrapper>
  <Header active="/section-path" />
  <section hero />
  <section content />   ← repeat, alternating light/dark
  <Footer />
</div>
```

- Mark each section with a JSX comment (`{/* Hero */}`, `{/* Board */}`).
- Pass the parent route to `Header` via `active` so the right nav item is highlighted.

### Sections

| Section type | Classes                                         |
| ------------ | ----------------------------------------------- |
| Hero         | `bg-slate-900 px-8 py-16 text-white md:px-16`   |
| Light        | `bg-white px-8 py-14 md:px-16`                  |
| Dark         | `bg-blue-900 px-8 py-14 text-white md:px-16`    |

- Horizontal padding is always `px-8`, growing to `md:px-16`.
- The hero uses `py-16`; content sections use `py-14`.
- Alternate light and dark sections to separate content.

### Content container

Every section wraps its content in:

```
mx-auto max-w-5xl
```

### Grids

- Use `grid gap-4` with responsive columns: `sm:grid-cols-2`, then `md:grid-cols-3` or `md:grid-cols-4` depending on how many items there are.
- Lists of people or items use `<ul>` / `<li>`, not plain `div`s.

---

## 4. Components

### Cards

Cards that open something are `<button type="button">` elements so they work with the keyboard.

| Variant      | Classes                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------- |
| Light card   | `h-full w-full cursor-pointer rounded border border-slate-200 bg-white p-4 text-center transition hover:shadow-lg` |
| Dark card    | `w-full cursor-pointer rounded border border-white/30 p-4 text-center transition hover:bg-white/10` |

- Corners: `rounded` (small radius). Dialogs use `rounded-lg`.
- Hover: a shadow on light backgrounds, a slight white tint on dark ones. Always include `transition`.
- Card text is centered.

### Primary button

```
cursor-pointer rounded bg-red-700 px-8 py-3 text-xs font-semibold text-white
```

Add `w-full` when the button should span its container (e.g. inside a dialog).

### Dialogs (modals)

Use Radix `Dialog` from `radix-ui`. The `BioDialog` component is the reference.

| Part        | Classes                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------ |
| Overlay     | `fixed inset-0 z-40 bg-black/60`                                                                 |
| Content     | `fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 text-slate-900 shadow-xl` |
| Title       | `text-center text-xl font-bold`                                                                  |
| Description | `mb-4 text-center text-xs text-red-700`                                                          |
| Close       | Primary button + `mt-6 w-full`                                                                   |

- Always include `Dialog.Title` and `Dialog.Description` for screen readers.
- Wrap the trigger with `Dialog.Trigger asChild` so the card's own button is the trigger.

---

## 5. Images

- Always use `next/image` with `fill`, inside a `relative overflow-hidden rounded bg-slate-200` wrapper.
- Use `className="object-cover"` on the image.
- Give a `sizes` value that matches the layout, e.g. `"(min-width: 768px) 25vw, 50vw"` for a 4-column grid, or a fixed size like `"128px"`.
- Use `aspect-square` for grid portraits; use fixed sizes (`h-32 w-32`) for images in dialogs.
- `alt` text is the person's or item's name.
- Store images in `public/<route-name>/` and name them `firstname-lastname-valanthropy.png`.

---

## 6. Code conventions

### Class name constants

Don't write long Tailwind strings inline in JSX. Put them in `SCREAMING_SNAKE_CASE` constants near the top of the file, grouped by section:

```tsx
// Layout
const CONTAINER = "mx-auto max-w-5xl";
const SECTION_HEADING = "mb-6 text-2xl font-bold";

// ...

<div className={CONTAINER}>
  <h2 className={SECTION_HEADING}>Our team</h2>
</div>
```

- Keep each constant a **complete, literal string**. Don't build class names with template strings like `` `text-${color}-700` ``; Tailwind can't detect them and won't generate the CSS.
- When two elements share the same styling, reuse one constant.
- If a constant is needed on more than one page, move it to a shared module (e.g. `lib/styles.ts`).

### Data

- Define a `type` for structured content (e.g. `Person`).
- Keep page content in typed arrays at the top of the file and render it with `.map()`, using a stable `key` (e.g. the name).
- Use a named constant for repeated placeholder text (e.g. `PLACEHOLDER_BIO`).

### Components

- Add `"use client";` at the top of pages that use interactive components like Radix Dialog.
- Default-export one page component in PascalCase (e.g. `Leadership`).
- Small helper components (e.g. `BioDialog`) can live in the same file until another page needs them.
- Import shared components with the `@/components/...` alias.

### Tailwind class order

Keep classes in a consistent order, roughly: position, layout/display, sizing, spacing, borders/radius, background, typography, effects/transitions, then responsive and state variants (`md:`, `hover:`). Running Prettier with `prettier-plugin-tailwindcss` handles this automatically.
