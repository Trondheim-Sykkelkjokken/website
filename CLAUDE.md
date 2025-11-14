# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for Trondheim Bike Kitchen (Trondheim sykkelkjøkken) at https://sykkelkjokken.no. It's a community bicycle workshop website for a volunteer-run organization that provides bicycle repair workshops, tools, and education. The site handles:

- Public information about the bike kitchen
- Event listings (via Eventbrite integration)
- Membership registration and payment processing (via Vipps)
- Multilingual content (English, Norwegian Bokmål, Norwegian Nynorsk)
- Blog functionality

The application is a SvelteKit SSR/SSG application deployed on Netlify.

## Development Commands

```bash
# Start development server
npm run dev

# Start development server and open in browser
npm run dev -- --open

# Start development server on local network (for mobile testing)
npm run dev -- --host

# Build for production
npm run build

# Preview production build (not for production use)
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

## Architecture

### Tech Stack
- **Framework**: SvelteKit 2.5 with Svelte 4.2.9
- **Language**: TypeScript (partial - mixed with JavaScript)
- **Build Tool**: Vite 5.0
- **Adapter**: `@sveltejs/adapter-auto` (configured for Netlify)
- **Content**: MDsveX for Markdown processing (`.svx`, `.md` files)
- **i18n**: `sveltekit-i18n` for multilingual support
- **Images**: vite-imagetools for optimization and srcset generation
- **Styling**: Svelte preprocessor with standard CSS (scoped component styles)
- **Icons**: svelte-icons-pack
- **Deployment**: Netlify (Node 20.17)
- **Code Quality**: ESLint + Prettier + svelte-check

### i18n Architecture

The site supports three locales: `en`, `nb` (Norwegian Bokmål), and `nn` (Norwegian Nynorsk). Default locale is `en`.

- **Translation config**: `src/lib/translations/index.js` - central configuration with route-specific translation loaders
- **Translation files**: `src/content/translations/{locale}/{page}.json` format
- **Supported pages**: layout, home, membership, volunteer, events, email
- **Content pages**: Located in `src/content/pages/` with locale-specific `.md` files

Translation keys are loaded dynamically per route to optimize bundle size. Each route defines which translation keys it needs via the loaders array.

### Route Structure

```
src/routes/
├── +layout.js              # i18n initialization
├── +layout.server.js       # Server-side layout logic
├── +layout.svelte          # Root layout component
├── +page.svelte            # Home page
├── blog/                   # Blog with markdown posts
├── events/                 # Eventbrite integration
│   └── +page.server.ts     # Fetches events from Eventbrite API
├── membership/             # Membership registration & payment
│   ├── +page.server.ts     # Handles Vipps payment flow
│   └── registrationComplete/ # Payment callback handler
├── resources/              # Static resources page
├── tools/                  # Static tools page
└── volunteer/              # Volunteer info page
```

### Payment & Data Flow (Membership)

The membership registration uses a multi-step flow:

1. **Registration form** (`/membership`) - User fills out form with membership type selection
2. **Server action** (`+page.server.ts`) - Creates unique ID, saves to Google Sheets, encrypts form data
3. **Vipps payment** - Initiates payment with Vipps ePayment API (supports both Vipps wallet and card)
4. **Callback** (`/membership/registrationComplete`) - Decrypts form data, captures payment, updates Google Sheets with payment details

**Important**: Form data is encrypted using `crypto.ts` utilities and passed via URL query parameter to the callback page. This ensures data integrity during the payment redirect flow.

### External Integrations

#### Google Sheets (`src/lib/utils/googleSheets.ts`)
- Acts as database for membership registrations
- Uses service account authentication (JWT)
- Two main operations:
  - `saveMemberToGoogleSheet()` - Initial registration data
  - `addPaymentDetailsToRegistration()` - Updates row with payment confirmation

#### Vipps Payment (`src/lib/utils/vipps.ts`)
- Integration with Vipps ePayment API
- Supports both Vipps wallet (`WALLET`) and card (`CARD`) payment methods
- Key functions:
  - `getVippsAccessToken()` - OAuth token retrieval
  - `initiateVippsPayment()` - Creates payment session
  - `getPaymentStatus()` - Checks payment status
  - `capturePayment()` - Captures authorized payment

#### Eventbrite (`src/routes/events/+page.server.ts`)
- Fetches live events and venues from Eventbrite API
- Combines event and venue data on the server side
- Organization ID: 486298958703

### Configuration Files

- **Memberships**: `src/config/memberships.json` - Defines membership types, prices, and IDs (regular and reduced pricing)
- **Header message**: `src/config/header_message.json` - Configurable header banner content

### Environment Variables

Required environment variables (set in Netlify or local `.env`):

**Vipps**:
- `VIPPS_CLIENT_ID`
- `VIPPS_CLIENT_SECRET`
- `VIPPS_OCP_APIM_SUBSCRIPTION_KEY`
- `VIPPS_MSN` (Merchant Serial Number)
- `VIPPS_BASE_URL`

**Google Sheets**:
- `GOOGLE_SHEETS_KEY` (Service account private key)
- `GOOGLE_SHEETS_EMAIL` (Service account email)
- `GOOGLE_SHEETS_ID` (Spreadsheet ID)

**Google Gmail**:
- `GOOGLE_GMAIL_CLIENT_ID`
- `GOOGLE_GMAIL_SECRET`
- `GOOGLE_GMAIL_REFRESH_TOKEN`
- `GOOGLE_GMAIL_REDIRECT_URI`

**Eventbrite**:
- `EVENTBRITE_API_KEY`

**Security**:
- `ENCRYPTION_KEY` (AES-GCM key for payment data)
- `INITIALIZATION_VECTOR` (AES-GCM IV)

**Logging**:
- `LOG_SECRET`
- `LOG_HOST`

**Misc**:
- `SIGNAL_GROUP_URL` (included in membership confirmation emails)

### Known Technical Debt (from debt.md)

- No database - relies on Google Sheets
- No comprehensive logging infrastructure
- Many magic strings - needs proper TypeScript types for memberships, payments
- Missing Vipps type definitions
- `crypto.ts` function should accept typed parameters instead of FormData

### Remote Logging

`src/lib/utils/logging.ts` provides `remoteLog()` for server-side logging. Currently logs to an external service for monitoring payments and integrations.

### Content Management

- **Blog posts**: `src/content/posts/` - Markdown files processed by MDsveX
- **Static pages**: `src/content/pages/` - Markdown content with locale variants
- **Images**: `static/` directory - referenced directly in markup

### Component Structure

Key reusable components in `src/lib/components/`:
- `Header.svelte` - Main navigation with language switcher, mobile hamburger menu, bikes-fixed badge
- `Footer.svelte` - Site footer with contact info and social links
- `NavLink.svelte` - Active route-aware navigation links
- `LangButton.svelte` - Language selector dropdown
- `BlogPost.svelte` - Blog post display component
- `BikesFixedCounter.svelte` - Counter badge showing bikes repaired
- `Spinner.svelte` - Loading spinner during navigation

### Utilities

- `src/lib/utils/crypto.ts` - Form data encryption/decryption for payment flow
- `src/lib/utils/memberships.ts` - Membership logic and expiry date calculations
- `src/lib/utils/email.ts` - Email sending utilities

### Types

TypeScript types are defined in:
- `src/lib/types/events.type.ts` - Eventbrite API response types
- `src/lib/types/post.type.ts` - Blog post types
- `src/lib/utils/vipps.ts` - PaymentType enum

### Testing & Quality

- ESLint configuration: `.eslintrc.cjs`
- Prettier configuration: `.prettierrc` (tabs, single quotes, 100 char width)
- TypeScript configuration: `tsconfig.json` (strict mode)
- Run `npm run check` before committing to catch type errors
- Code style: Prettier enforced with recommended settings for Svelte

## Important Conventions and Patterns

**Routing Pattern:**
- SvelteKit file-based routing: `+page.svelte` (client), `+page.server.ts` (server)
- Server actions for forms: defined in `+page.server.ts` exports.actions
- Dynamic routes: `[slug]` folders for parameterized URLs

**i18n Pattern:**
- Locale detection: Cookie `lang` → Accept-Language header → default `en`
- Translation usage in components: `$t('namespace.key')` from sveltekit-i18n
- Content organized by route/feature in `src/content/translations/{locale}/*.json`

**Content Pattern:**
- Blog posts: Markdown files with YAML frontmatter (title, slug, publication_date)
- Static pages: Three localized .md files per page (e.g., `resources.en.md`, `resources.nb.md`, `resources.nn.md`)
- Dynamic loading via `import.meta.glob()`

**Image Optimization:**
- Use imagetools query params: `?w=900&format=webp&srcset&imagetools`
- Returns object with srcset/src for responsive images
- Images stored in `src/lib/assets/`

**State Management:**
- Minimal stores: only `navOpen` for mobile menu state in `src/stores.ts`
- Server state passed via load functions, not stores

**Styling:**
- Scoped styles in `<style>` blocks within .svelte files
- Global styles in `src/routes/+layout.svelte`
- Color scheme: Background `#a6d2d5`, Header yellow `#efeb92`, Info banner `#fcf6d2`, Footer banner `#efa170`

## Key Workflows

**Membership Registration Flow:**
1. User fills form at `/membership`
2. Server action generates UUID, calculates expiry date
3. Data saved to Google Sheets
4. Data encrypted with AES-GCM
5. Vipps payment initiated
6. User redirects to Vipps
7. Returns to `/membership/registrationComplete?data={encrypted}`
8. Server decrypts, verifies payment, captures, updates Sheet, sends confirmation email

**Events Page:**
1. Server load fetches from Eventbrite API (org ID 486298958703)
2. Fetches venues separately
3. Merges venue data with events
4. Renders list with types from `src/lib/types/events.type.ts`

**Blog System:**
1. Markdown files in `src/content/posts/` with frontmatter
2. `import.meta.glob()` loads all posts in `src/routes/blog/+page.ts`
3. Sorted by publication_date
4. Dynamic route `[slug]` renders individual posts

**Locale Handling:**
1. Server detects locale from cookie or Accept-Language header
2. Loads translations for current route
3. Client renders with `$t()` function
4. Language switcher sets cookie and reloads
