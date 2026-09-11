# Turso migrations

Plain SQL migration files. Apply them in order with the Turso CLI:

```bash
turso db shell <db-name> < migrations/0001_init.sql
```

Or pipe into `turso db shell` interactively. There's no migration runner — keep
the files numbered and idempotent (`CREATE TABLE IF NOT EXISTS`, etc.) so they
can be re-run safely.
