# Turso migrations

Plain SQL migration files. Apply them in order with the Turso CLI:

```bash
turso db shell <db-name> < migrations/0001_init.sql
```

Or pipe into `turso db shell` interactively. There's no migration runner — keep
the files numbered and idempotent (`CREATE TABLE IF NOT EXISTS`, etc.) so they
can be re-run safely.

## Backfill from Google Sheets

After applying `0001_init.sql`, import the legacy sheet rows into Turso:

```bash
# Preview without writing
node --env-file=.env scripts/import-sheets-to-turso.mjs --dry-run

# Run the import
npm run db:import-sheets
```

The script upserts on `id`, so it's safe to re-run — already-imported rows are
updated, missing fields are filled in, existing non-null values are preserved.

## Backfill from historical CSV (pre-Vipps era)

A second import script handles the 2020–2024 paid memberships exported as a
CSV (the bike kitchen's old Google Forms + invoice workflow):

```bash
# Preview without writing
node --env-file=.env scripts/import-historical-members-csv.mjs --dry-run

# Run the import
node --env-file=.env scripts/import-historical-members-csv.mjs

# Against a different DB (e.g. prod), swap the env file:
node --env-file=.env.prod scripts/import-historical-members-csv.mjs
```

By default it reads `./members.csv`; pass a different path as the first
positional arg if the file lives elsewhere. Imports only rows where
`Betalt = TRUE`, uses synthetic ids prefixed `legacy-` (stable across re-runs,
distinct from `manual-` used by the Sheets import), and only maps fields that
fit the Turso schema — phone, address, gender, etc. are dropped.
