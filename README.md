# The website of Trondheim Bike Kitchen
[![Netlify Status](https://api.netlify.com/api/v1/badges/ae31624e-c928-4f86-83db-15728b188e15/deploy-status)](https://app.netlify.com/sites/hardcore-panini-a7e5bc/deploys)

This is the website of Trondheim Bike Kitchen / Trondheim sykkelkjøkken.

You can find it here: **https://sykkelkjokken.no**

This is a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Setup

1. Install a recent version of [Node.js](https://nodejs.org/en)
1. `cd` to where you cloned this repo
1. Install dependencies: `npm install`

## Develop

Start a development server:

```sh
npm run dev
```

To preview on your browser:

```sh
npm run dev -- --open
```

Host on local network for e.g. testing on mobile:

```sh
npm run dev -- --host
```

(You can combine `--open` and `--host`.)

To preview mobile view in Firefox: Press F12, then click the responsive design mode icon (top right of toolbar).

## Build

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

---

## Database (Turso)

Membership registrations are persisted to a [Turso](https://turso.tech) (libSQL/SQLite) database. During the migration phase, every write also goes to the legacy Google Sheet — Sheets remains the source of truth until Turso has been verified in parallel.

There are two databases:

| Name | Purpose |
| --- | --- |
| `sykkelkjokken-members` | Production. Used by the deployed site. |
| `sykkelkjokken-members-dev` | Local development. Safe to wipe and re-seed. |

### Set up Turso locally

1. Install the [Turso CLI](https://docs.turso.tech/cli/installation) and `turso auth login`.
2. Create a token for the dev database:
   ```sh
   turso db tokens create sykkelkjokken-members-dev
   ```
3. Add the dev URL and token to your local `.env`:
   ```
   TURSO_DATABASE_URL=libsql://sykkelkjokken-members-dev-<your-org>.aws-eu-west-1.turso.io
   TURSO_AUTH_TOKEN=<token from step 2>
   ```
4. The other secrets (`VIPPS_*`, `GOOGLE_SHEETS_*`, `GOOGLE_GMAIL_*`, `EVENTBRITE_API_KEY`, `ENCRYPTION_KEY`, `INITIALIZATION_VECTOR`, `LOG_*`) are not in the repo — **ask Sverre for them** if you need them locally. The full list lives in `CLAUDE.md`.

After `.env` is in place, `npm run dev` will dual-write to both Sheets and Turso on every membership registration.

### Apply schema changes

Schema files live in `migrations/`, numbered sequentially. They are plain SQL and idempotent (`CREATE TABLE IF NOT EXISTS`, etc.). Apply with:

```sh
turso db shell sykkelkjokken-members-dev < migrations/0001_init.sql
```

(Swap in `sykkelkjokken-members` for production. Be deliberate about which DB you target.)

### Inspect the data

```sh
turso db shell sykkelkjokken-members-dev
```

Useful queries:

```sql
SELECT COUNT(*) FROM members;
SELECT * FROM members ORDER BY registered_at DESC LIMIT 10;
SELECT COUNT(*) FROM members WHERE id LIKE 'manual-%'; -- entries imported without a UUID
```

### Backfill from the legacy Google Sheet

A one-shot script imports historical rows from `raw_data` in the Google Sheet into Turso. It is idempotent (UPSERT on `id`), so re-running won't create duplicates and won't blank existing fields.

```sh
# Preview without writing
node --env-file=.env scripts/import-sheets-to-turso.mjs --dry-run

# Run the import (atomic — all rows or nothing)
npm run db:import-sheets
```

The script needs both Google Sheets credentials and Turso credentials in your `.env`. For Google auth you can use either `GOOGLE_APPLICATION_CREDENTIALS` (path to the service-account JSON file — recommended) or `GOOGLE_SHEETS_KEY` + `GOOGLE_SHEETS_EMAIL`. **Ask Sverre for the service-account JSON** if you don't have it.

Manual rows in the sheet (no UUID, payment type `MANUAL`) get a stable synthetic id derived from email + dates, so they import cleanly and re-run idempotently.

---

## How to write a blog post

Posts appear at https://sykkelkjokken.no/blog and in the main navigation menu.

1. **Go to the CMS**
   - Visit: **https://sykkelkjokken.no/admin**
   - If you don't have access yet: ask an admin to add you as a collaborator on Netlify, then check your email for an invitation

2. **Create a New Post**
   - Click on **"Blog"** in the left sidebar
   - Click the **"New Blog"** button
   - Fill in the required fields:
     - **Slug**: The URL-friendly name (e.g., `summer-workshop-2024`)
     - **Title**: The post title (e.g., "Summer Workshop 2024")
     - **Publication Date**: When the post should appear (defaults to today)
     - **Body**: Your post content (markdown formatting is supported)

3. **Add Images**
   - Click the **"+"** icon in the editor toolbar
   - Select **"Image"**
   - Upload your image from Instagram/Facebook/phone
   - Add alt text (description of the image for accessibility)

4. **Publish**
   - Click **"Save"** to save as a draft
   - When ready, change status to **"Ready"** and click **"Publish"**
   - Your post will appear on the blog within a few minutes
