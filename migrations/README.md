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
