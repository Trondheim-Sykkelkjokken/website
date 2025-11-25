# CLAUDE.md

This file provides guidance for working with the Trondheim Bike Kitchen website codebase.

## Project Overview

This is the website for Trondheim Bike Kitchen (Trondheim sykkelkjøkken) at https://sykkelkjokken.no. It's a community bicycle workshop website for a volunteer-run organization that provides bicycle repair workshops, tools, and education.

**Key Features:**
- Public information about the bike kitchen
- Event listings (via Eventbrite integration)
- Membership registration and payment processing (via Vipps)
- Multilingual content (English, Norwegian Bokmål, Norwegian Nynorsk)
- Blog functionality
- Netlify CMS for content management

**Tech Stack:**
- Framework: SvelteKit 2.5 with Svelte 4.2.9
- Language: TypeScript (partial - mixed with JavaScript)
- Build Tool: Vite 5.0
- Adapter: `@sveltejs/adapter-auto` (configured for Netlify)
- Content: MDsveX for Markdown processing
- i18n: `sveltekit-i18n` with `en`, `nb`, `nn` locales
- Images: vite-imagetools for optimization and srcset generation
- Deployment: Netlify (Node 20.17)
- Code Quality: ESLint + Prettier + svelte-check

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start dev server and open in browser
npm run dev -- --open

# Start dev server on local network (for mobile testing)
npm run dev -- --host

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run check

# Type checking in watch mode
npm run check:watch

# Linting
npm run lint

# Format code
npm run format
```

## Project Structure

```
src/
  routes/                    # SvelteKit pages and endpoints
    +layout.js              # i18n initialization
    +layout.server.js       # Server-side layout logic
    +layout.svelte          # Root layout component
    +page.svelte            # Home page
    blog/                   # Blog index + [slug] dynamic route
    events/                 # Eventbrite integration
      +page.server.ts       # Fetches events from Eventbrite API
    membership/             # Membership registration + Vipps payment flow
      +page.server.ts       # Handles payment flow
      registrationComplete/ # Payment callback handler
    resources/              # Static resources page
    tools/                  # Static tools page
    volunteer/              # Volunteer info page
  lib/
    components/             # Reusable Svelte components
      Header.svelte         # Main nav with language switcher, mobile menu
      Footer.svelte         # Site footer with contact info
      NavLink.svelte        # Active route-aware navigation links
      LangButton.svelte     # Language selector dropdown
      BlogPost.svelte       # Blog post display component
      BikesFixedCounter.svelte  # Counter badge showing bikes repaired
      Spinner.svelte        # Loading spinner during navigation
    translations/           # i18n config + loaders
      index.js              # Central i18n configuration
    types/                  # TypeScript type definitions
      events.type.ts        # Eventbrite API response types
      post.type.ts          # Blog post types
    utils/                  # Utility functions
      crypto.ts             # Form data encryption/decryption for payment flow
      email.ts              # Email sending utilities
      googleSheets.ts       # Google Sheets integration
      vipps.ts              # Vipps payment integration
      memberships.ts        # Membership logic and expiry calculations
      logging.ts            # Remote logging utilities
    assets/                 # Images for optimization via imagetools
  content/
    posts/                  # Blog posts (.md with frontmatter)
    pages/                  # Localized markdown pages
      resources/            # Resources page content
      tools/                # Tools page content
    translations/           # UI strings organized by locale
      en/                   # English translations
      nb/                   # Norwegian Bokmål translations
      nn/                   # Norwegian Nynorsk translations
  config/
    header_message.json     # Banner text (per-locale)
    memberships.json        # Membership products + prices
static/
  admin/
    config.yml              # Netlify CMS collections
  uploads/                  # CMS media files
```

## Content Patterns

### Blog Posts

Blog posts are Markdown files in `src/content/posts/` with YAML frontmatter:

```yaml
---
title: "Post title"
slug: "post-slug"
publication_date: "2024-01-15"
---

Post content here...
```

Posts are auto-loaded via `import.meta.glob()` in `src/routes/blog/+page.ts` and sorted by publication_date.

### Static Pages with Localization

Static pages have three localized markdown files:

```
src/content/pages/<slug>/<slug>.en.md
src/content/pages/<slug>/<slug>.nb.md
src/content/pages/<slug>/<slug>.nn.md
```

Create a corresponding route at `src/routes/<slug>/+page.svelte` that loads and renders the MD files (see `resources` or `tools` pages for examples).

### Translations

UI text is stored in `src/content/translations/<locale>/*.json`. Translations are loaded dynamically per route to optimize bundle size.

**In components:**
```svelte
{$t('namespace.key')}
```

**i18n config:** `src/lib/translations/index.js` defines which translation keys are loaded for each route.

**Locale detection:** Cookie `lang` → Accept-Language header → default `en`

### Images

Use imagetools query params for optimization:

```svelte
<script>
  import img from '$lib/assets/2.jpg?w=900&format=webp&srcset&imagetools';
</script>
<img srcset={img.srcset} src={img.src} alt="..." />
```

## Routing and Conventions

**SvelteKit Routing:**
- `+page.svelte` - Client-side page component
- `+page.server.ts` - Server-side load functions and form actions
- `+page.ts` - Client-side load functions
- `[slug]` - Dynamic route parameters

**Server Actions:**
Form handling is done via server actions exported from `+page.server.ts`:

```typescript
export const actions = {
  default: async ({ request }) => {
    // handle form submission
  }
};
```

**State Management:**
Minimal stores - only `navOpen` for mobile menu state in `src/stores.ts`. Server state is passed via load functions, not stores.

**Styling:**
- Scoped styles in `<style>` blocks within .svelte files
- Global styles in `src/routes/+layout.svelte`
- Color scheme: Background `#a6d2d5`, Header yellow `#efeb92`, Info banner `#fcf6d2`, Footer banner `#efa170`

## Key Workflows

### Membership Registration + Payment Flow

1. User fills form at `/membership`
2. Server action (`+page.server.ts`):
   - Generates UUID
   - Calculates membership expiry date (`src/lib/utils/memberships.ts`)
   - Saves to Google Sheets (`src/lib/utils/googleSheets.ts`)
   - Encrypts form data (`src/lib/utils/crypto.ts`)
   - Initiates Vipps payment (`src/lib/utils/vipps.ts`)
3. User redirects to Vipps for payment
4. Returns to `/membership/registrationComplete?data={encrypted}`
5. Callback handler:
   - Decrypts payload
   - Verifies payment status
   - Captures payment
   - Updates Google Sheet with payment details
   - Sends confirmation email

**Important:** Form data is encrypted using AES-GCM and passed via URL query parameter to ensure data integrity during the payment redirect flow.

### Events Page

1. Server load fetches from Eventbrite API (org ID `486298958703`)
2. Fetches venues separately
3. Merges venue data with events
4. Renders list with types from `src/lib/types/events.type.ts`

### Blog System

1. Markdown files in `src/content/posts/` with frontmatter
2. `import.meta.glob()` loads all posts in `src/routes/blog/+page.ts`
3. Sorted by publication_date
4. Dynamic route `[slug]` renders individual posts

### Locale Handling

1. Server detects locale from cookie or Accept-Language header
2. Loads translations for current route
3. Client renders with `$t()` function
4. Language switcher sets cookie and reloads

### Netlify CMS

- CMS config: `static/admin/config.yml`
- Collections include `settings` (header_message, memberships) and localized markdown pages
- Media files go to `static/uploads/`
- Access at `/admin`

## External Integrations

### Eventbrite (`src/routes/events/+page.server.ts`)
- Fetches live events and venues from Eventbrite API
- Organization ID: 486298958703
- To change filtering, edit query params or types in `src/lib/types/events.type.ts`

### Google Sheets (`src/lib/utils/googleSheets.ts`)
- Acts as database for membership registrations
- Uses service account authentication (JWT)
- Key functions:
  - `saveMemberToGoogleSheet()` - Initial registration data
  - `addPaymentDetailsToRegistration()` - Updates row with payment confirmation

### Vipps Payment (`src/lib/utils/vipps.ts`)
- Integration with Vipps ePayment API
- Supports both Vipps wallet (`WALLET`) and card (`CARD`) payment methods
- Key functions:
  - `getVippsAccessToken()` - OAuth token retrieval
  - `initiateVippsPayment()` - Creates payment session
  - `getPaymentStatus()` - Checks payment status
  - `capturePayment()` - Captures authorized payment

### Gmail (`src/lib/utils/email.ts`)
- Sends membership confirmation emails
- Uses OAuth2 authentication

### Remote Logging (`src/lib/utils/logging.ts`)
- `remoteLog()` function for server-side logging
- Logs to external service for monitoring payments and integrations

## Environment Variables

Required environment variables (set in Netlify or local `.env`):

**Vipps:**
- `VIPPS_CLIENT_ID`
- `VIPPS_CLIENT_SECRET`
- `VIPPS_OCP_APIM_SUBSCRIPTION_KEY` (exact name - keep consistent)
- `VIPPS_MSN` (Merchant Serial Number)
- `VIPPS_BASE_URL`

**Google Sheets:**
- `GOOGLE_SHEETS_KEY` (Service account private key)
- `GOOGLE_SHEETS_EMAIL` (Service account email)
- `GOOGLE_SHEETS_ID` (Spreadsheet ID)

**Gmail:**
- `GOOGLE_GMAIL_CLIENT_ID`
- `GOOGLE_GMAIL_SECRET`
- `GOOGLE_GMAIL_REFRESH_TOKEN`
- `GOOGLE_GMAIL_REDIRECT_URI`

**Eventbrite:**
- `EVENTBRITE_API_KEY`

**Security:**
- `ENCRYPTION_KEY` (AES-GCM key for payment data)
- `INITIALIZATION_VECTOR` (AES-GCM IV)

**Logging:**
- `LOG_SECRET`
- `LOG_HOST`

**Misc:**
- `SIGNAL_GROUP_URL` (included in membership confirmation emails)

**Policy:** Never hardcode, print, or commit any secret. For local dev, use your Netlify environment or a `.env` that is `.gitignore`'d.

## Configuration Files

### `src/config/memberships.json`
Defines membership types, prices, and IDs (regular and reduced pricing).

Fields: `id`, `name`, `norwegian_name`, `reduced`, `price`

Vipps amount comes from this file. Prices are multiplied by 100 to øre in `vipps.ts`.

### `src/config/header_message.json`
Configurable header banner content, keyed by locale. Read in `src/routes/+layout.svelte`.

## Common Edit Recipes

### Change Homepage Text

1. Edit `src/routes/+page.svelte`
2. Add new i18n keys to `src/content/translations/*/home.json`
3. Use `$t('home.key')` in Svelte - do not inline strings

### Update Header Banner

1. Edit `src/config/header_message.json` (structure matches locales)
2. If exposing via CMS, verify the `settings` collection in `static/admin/config.yml`

### Add a Translation Key

1. Add to `src/content/translations/{en,nb,nn}/<file>.json`
2. Use `$t('file.key')` in components
3. If route-specific, ensure `loadTranslations(locale, pathname)` can find it (already wired in `+layout(.server).js`)

### Change Membership Products or Prices

1. Edit `src/config/memberships.json`
2. Validate membership type logic in `src/lib/utils/memberships.ts`

### Modify Eventbrite Filters

Edit URL in `src/routes/events/+page.server.ts`. Keep auth header. Update TS types if response shape changes.

### Add a Blog Post

Add a `.md` in `src/content/posts/` with proper frontmatter. Listing is auto-built via `import.meta.glob` in `routes/blog/+page.ts`.

### Add a New Static Page with Localization

1. Create markdown files:
   ```
   src/content/pages/<slug>/<slug>.en.md
   src/content/pages/<slug>/<slug>.nb.md
   src/content/pages/<slug>/<slug>.nn.md
   ```
2. Add a route `src/routes/<slug>/+page.svelte` that loads and renders the MD file(s), or reuse the pattern used in `resources`/`tools`

## Code Quality and Checks

**Before committing:**
```bash
npm run check     # TypeScript and Svelte checking
npm run lint      # Prettier + ESLint
npm run build     # Ensure build passes
```

**Configuration:**
- ESLint: `.eslintrc.cjs`
- Prettier: `.prettierrc` (tabs, single quotes, 100 char width)
- TypeScript: `tsconfig.json` (strict mode)

**Style guidelines:**
- Follow existing patterns
- Favor small, localized changes
- Keep all user-visible text in translation JSON, not inline
- Server code (APIs, secrets) lives in `+page.server.ts` or `src/lib/utils/*`
- Static assets go in `static/` or `src/lib/assets/`

## Security and Safety Guidelines

**For AI assistants:**
- Never add new secrets or print existing ones
- Never log environment variable values
- Do not change crypto primitives or payload schema in `crypto.ts` unless you update both encrypt and decrypt
- Keep server-only code that touches secrets in `+page.server.ts` or `lib/utils/*` - no secrets in client code
- Keep i18n keys stable - changing a key requires updating all three locales
- Do not switch adapters or hosting settings without confirming Netlify compatibility

**For all developers:**
- Run `npm run check` and `npm run lint` after edits
- Ensure `npm run build` passes before committing
- Never commit secrets or API keys
- Use `.env` for local development (already in `.gitignore`)

## Known Technical Debt

From `debt.md`:
- No database - relies on Google Sheets
- No comprehensive logging infrastructure
- Many magic strings - needs proper TypeScript types for memberships, payments
- Missing Vipps type definitions
- `crypto.ts` function should accept typed parameters instead of FormData

## Deployment

- Netlify builds with `npm run build`, publishes `build/`
- Ensure environment variables are set in Netlify before enabling pages that call external services
- `adapter-static` is present but hosting uses Netlify adapter in practice - don't flip adapters without a plan

## Quick File Map

**Most commonly edited:**
- Home: `src/routes/+page.svelte`
- Header/Footer: `src/lib/components/Header.svelte`, `Footer.svelte`
- Layout shell: `src/routes/+layout.svelte`
- Translations: `src/content/translations/{en,nb,nn}/*.json`
- Banner: `src/config/header_message.json`
- Membership products: `src/config/memberships.json`

**External integrations:**
- Events: `src/routes/events/+page.server.ts`
- Membership: `src/routes/membership/+page.server.ts`
- Utils: `src/lib/utils/` (googleSheets, vipps, email, crypto, logging)

**Content:**
- Blog: `src/routes/blog/` and `src/content/posts/`
- Pages: `src/content/pages/`

**Types:**
- `src/lib/types/`

## Getting Started (for new developers)

1. Read `src/routes/+layout.svelte` - understand the app shell
2. Read `src/lib/components/Header.svelte` and `Footer.svelte` - understand navigation
3. Browse `src/content/translations/` and `src/content/pages/` - see how content is organized
4. Look at `src/routes/+page.svelte` - see how a simple page works
5. Check out `src/routes/blog/+page.svelte` - see how dynamic content loading works
6. Review `src/routes/membership/+page.server.ts` - understand server actions and external integrations

## Asking AI Assistants for Help

When asking an LLM to make changes, use this template:

```
Goal: <one sentence>

Change scope:
- Files to touch: <list exact paths>
- Affected locale keys: <keys or files>
- External services: <Eventbrite|Vipps|Sheets|Gmail> (no secret changes)

Constraints:
- SvelteKit patterns as in repo
- No secrets in client code
- Keep i18n in JSON, not inline

Show:
- Full diffs per file
- Any new/changed i18n keys for en/nb/nn
- Commands to run: npm run check && npm run build

Context snippets (paste only relevant parts):
<short excerpts from target files>
```

### Example

> Goal: Add an "About" page with localized content.
>
> Files:
> - `src/content/pages/about/about.en.md`, `.nb.md`, `.nn.md`
> - `src/routes/about/+page.svelte` (render the markdown like `resources/+page.svelte`)
>
> Constraints: follow existing page pattern. No new libs.
>
> Output: diffs and new files.
