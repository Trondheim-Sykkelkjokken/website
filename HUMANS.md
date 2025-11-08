## Overview

This is a SvelteKit website for Trondheim Sykkelkjøkken. Content is mostly Markdown and JSON. Pages are standard SvelteKit routes. Some features talk to external services (Eventbrite, Google Sheets, Vipps, email). Most edits are content and layout changes.

Run it locally:

```bash
npm install
npm run dev
```

## Structure

```
src/
  routes/          # Each folder = page/endpoint
  lib/             # Components, utils, types
  content/         # Markdown pages, blog posts, translations
  config/          # Simple site config (banner, memberships)
static/            # Images, CMS config
```

**Pages**

* `src/routes/` contains `+page.svelte` files for each page.
* Blog and markdown pages are auto-loaded via `import.meta.glob`.

**Components**

* `src/lib/components/` includes Header, Footer, buttons, blog post renderer.

**Content**

* `src/content/translations/*/*.json` for UI strings.
* `src/content/pages/**` for static Markdown pages in EN/NB/NN.
* `src/content/posts/` for blog posts.

**Config**

* `src/config/*.json` stores banner text and membership products.

**External services**

* Eventbrite (events list)
* Google Sheets (membership data)
* Vipps (membership payment)
* Email (confirmation messages)

Secrets live in environment variables. Never commit them.

## How to Work Here

### Edit text content

* For UI strings: edit `src/content/translations/<locale>/*.json`
* For page content: edit Markdown in `src/content/pages/**`

### Change layout/structure

* Start in `src/routes/+layout.svelte` (global shell)
* Header/footer in `src/lib/components/`

### Add a page

* Create a folder under `src/routes/<name>/`
* Add `+page.svelte`
* If the page is static content, add Markdown in `src/content/pages/<name>/<name>.<locale>.md`

### Check and build

```bash
npm run check
npm run build
```

## Tips

* Follow existing patterns. Most pages already show how to load translations and content.
* Keep all user-visible text in translation JSON, not inline.
* Server code (APIs, secrets) lives in `+page.server.ts` or `src/routes/api/.../+server.ts`.
* Static assets go in `static/` or `src/lib/assets/`.

## Where to Start

1. Read `src/routes/+layout.svelte`
2. Read `src/lib/components/Header.svelte` and `Footer.svelte`
3. Browse `src/content/translations/` and `src/content/pages/`
