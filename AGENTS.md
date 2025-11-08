## Project facts

* Framework: SvelteKit + TypeScript (partial)
* Content: Markdown + JSON translations
* Hosting: Netlify
* Node: 20.17
* Images: `vite-imagetools`
* CMS: Netlify CMS at `/admin`
* i18n: `sveltekit-i18n` with `en`, `nb`, `nn`

## Run, build, check

```bash
npm i
npm run dev           # local dev
npm run build         # production build
npm run preview       # serve built site
npm run check         # svelte-check
npm run lint          # prettier + eslint
npm run format        # write formatting
```

## Directory guide (change targets)

```
src/
  routes/                    # pages and endpoints
    +page.svelte            # home
    events/                 # Eventbrite integration
    blog/                   # blog index + [slug]
    membership/             # registration + Vipps flow
    resources/, tools/, volunteer/  # static pages
  lib/
    components/             # Header, Footer, etc.
    translations/           # i18n config + loaders
    types/                  # TS types
    utils/                  # crypto, email, googleSheets, vipps, logging
  content/
    posts/                  # blog posts (.md with frontmatter)
    pages/resources|tools/  # localized markdown pages
    translations/{en,nb,nn}/*.json  # UI strings
  config/
    header_message.json     # banner text (per-locale read)
    memberships.json        # membership products + prices
static/
  admin/config.yml          # Netlify CMS collections
  uploads/                  # CMS media
```

## Routing and content patterns

* SvelteKit pages use `+page.svelte` (client) and `+page.server.ts` (server load/actions).
* Blog posts: `src/content/posts/*.md` with frontmatter:

  ```yaml
  ---
  title: "Post title"
  slug: "post-slug"
  publication_date: "2024-01-15"
  ---
  ```
* Localized static pages: three files per page under `src/content/pages/<name>/<name>.(en|nb|nn).md`.
* UI text: `src/content/translations/<locale>/*.json`. Keys are loaded via `sveltekit-i18n`.
* i18n config: `src/lib/translations/index.js`. Default locale `en`. Cookie `lang` or Accept-Language picks locale.

## External services (do not leak secrets)

Used via `$env/static/private`. Required environment variables:

### Eventbrite (events page)

* `EVENTBRITE_API_KEY`

### Vipps (membership checkout)

* `VIPPS_CLIENT_ID`
* `VIPPS_CLIENT_SECRET`
* `VIPPS_OCP_APIM_SUBSCRIPTION_KEY`  *(exact name in code; keep consistent)*
* `VIPPS_MSN`
* `VIPPS_BASE_URL`

### Google Sheets (membership registry)

* `GOOGLE_SHEETS_KEY`          # service account private key
* `GOOGLE_SHEETS_EMAIL`        # service account email
* `GOOGLE_SHEETS_ID`           # spreadsheet id

### Gmail (confirmation emails)

* `GOOGLE_GMAIL_CLIENT_ID`
* `GOOGLE_GMAIL_SECRET`
* `GOOGLE_GMAIL_REFRESH_TOKEN`
* `GOOGLE_GMAIL_REDIRECT_URI`

### Crypto (querystring payload encryption)

* `ENCRYPTION_KEY`             # length fits AES-GCM raw key in code
* `INITIALIZATION_VECTOR`      # matches code expectations

### Logging

* `LOG_SECRET`
* `LOG_HOST`

### Misc

* `SIGNAL_GROUP_URL`           # included in email body

**Policy:** Never hardcode, print, or commit any secret. For local dev, use your Netlify environment or a `.env` that is `.gitignore`’d.

## Key flows

### 1) Events page

* Server load: `src/routes/events/+page.server.ts`
* Fetches live events from Eventbrite org id `486298958703` via API key.
* If you need to change filtering, edit the query params or the shape in `src/lib/types/events.type.ts`.

### 2) Membership registration + payment

* Page + server action: `src/routes/membership/+page.svelte` and `+page.server.ts`.
* On submit:

  1. Augment `FormData` with `id`, `paymentType`.
  2. Compute start/expiry: `src/lib/utils/memberships.ts`.
  3. Save to Google Sheets: `src/lib/utils/googleSheets.ts`.
  4. Initiate Vipps: `src/lib/utils/vipps.ts`.
  5. Encrypt payload for redirect: `src/lib/utils/crypto.ts`.
* Completion route: `src/routes/membership/registrationComplete/+page.server.ts`

  * Decrypt payload, verify/capture payment, update Google Sheet, send email.

### 3) Translations and banner message

* Header banner is read in `src/routes/+layout.svelte` from `src/config/header_message.json` keyed by locale.
* Translations: JSON per section under `src/content/translations/<locale>/`.

### 4) CMS

* Netlify CMS config at `static/admin/config.yml`.
* Collections include `settings` (header_message, memberships) and localized markdown pages.
* Media files go to `static/uploads/`.

## Image usage

Use the `imagetools` query params:

```svelte
<script>
  import img from '$lib/assets/2.jpg?w=900&format=webp&srcset&imagetools';
</script>
<img srcset={img.srcset} src={img.src} alt="..." />
```

## Code style and checks

* Prettier + ESLint configured. Run `npm run lint` before committing.
* `svelte-check` via `npm run check`.
* Keep `types/` up to date when changing API shapes.
* Favor small, localized changes. Stick to existing patterns.

## Common edit recipes

### Change homepage text or add a section

* Edit `src/routes/+page.svelte`.
* Add new i18n keys to `src/content/translations/*/home.json`.
* Use `$t('home.key')` in Svelte. Do not inline strings.

### Update header banner

* Edit `src/config/header_message.json` (structure matches locales).
* If exposing via CMS, verify the `settings` collection in `static/admin/config.yml`.

### Add a new static page with localization

1. Create markdown files:

   ```
   src/content/pages/<slug>/<slug>.en.md
   src/content/pages/<slug>/<slug>.nb.md
   src/content/pages/<slug>/<slug>.nn.md
   ```
2. Add a route `src/routes/<slug>/+page.svelte` that loads and renders the MD file(s), or reuse the pattern used in `resources`/`tools`.

### Add a translation key

* Add to `src/content/translations/{en,nb,nn}/<file>.json`.
* Use `$t('file.key')` in components.
* If the key is route-specific, ensure `loadTranslations(locale, pathname)` can find it (already wired in `+layout(.server).js`).

### Change membership products or prices

* Edit `src/config/memberships.json`. Fields: `id`, `name`, `norwegian_name`, `reduced`, `price`.
* Vipps amount comes from this file. Prices are multiplied by 100 to øre in `vipps.ts`.
* Validate membership type logic in `src/lib/utils/memberships.ts`.

### Modify Eventbrite filters

* Edit URL in `src/routes/events/+page.server.ts`. Keep auth header. Update TS types if response shape changes.

### Blog post

* Add a `.md` in `src/content/posts/` with proper frontmatter.
* Listing is auto-built via `import.meta.glob` in `routes/blog/+page.ts`.

## Guardrails for LLM-assisted changes

* Do not add new secrets or print existing ones. Never log env values.
* Do not change crypto primitives or payload schema in `crypto.ts` unless you update both encrypt and decrypt.
* Do not switch adapters or hosting settings without confirming Netlify compatibility.
* Keep i18n keys stable. Changing a key requires updating all three locales.
* Keep server-only code that touches secrets in `+page.server.ts` or `lib/utils/*` that run server-side. No secrets in client code.
* Run `npm run check` and `npm run lint` after edits. Ensure `npm run build` passes.

## Minimal prompt template for this repo

Use this when asking an LLM to change something:

```
Goal: <one sentence>

Change scope:
- Files to touch: <list exact paths>
- Affected locale keys: <keys or files>
- External services: <Eventbrite|Vipps|Sheets|Gmail> (no secret changes)

Constraints:
- SvelteKit patterns as in repo.
- No secrets in client code.
- Keep i18n in JSON, not inline.

Show:
- Full diffs per file.
- Any new/changed i18n keys for en/nb/nn.
- Commands to run: npm run check && npm run build.

Context snippets (paste only relevant parts):
<short excerpts from target files>
```

### Example ask

> Goal: Add a “About” page with localized content.
> Files:
>
> * `src/content/pages/about/about.en.md`, `.nb.md`, `.nn.md`
> * `src/routes/about/+page.svelte` (render the markdown like `resources/+page.svelte`).
>   Constraints: follow existing page pattern. No new libs.
>   Output: diffs and new files.

## Quick file map for common questions

* Layout shell: `src/routes/+layout.svelte`
* Header/Footer: `src/lib/components/`
* Home: `src/routes/+page.svelte`
* Events: `src/routes/events/`
* Membership: `src/routes/membership/`
* Blog: `src/routes/blog/` and `src/content/posts/`
* Translations: `src/content/translations/`
* Banner: `src/config/header_message.json`
* Membership products: `src/config/memberships.json`
* Utils: `src/lib/utils/` (googleSheets, vipps, email, crypto, logging)
* Types: `src/lib/types/`

## Deployment notes

* Netlify builds with `npm run build`, publishes `build/`.
* Ensure environment variables are set in Netlify before enabling pages that call external services.
* `adapter-static` is present but hosting uses Netlify adapter in practice; don’t flip adapters without a plan.
