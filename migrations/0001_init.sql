-- Turso schema for membership registrations.
-- Mirrors the columns of the legacy `raw_data` Google Sheet so the dual-write
-- migration is straightforward; future migrations can normalize payments.

CREATE TABLE IF NOT EXISTS members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    membership_type TEXT NOT NULL,
    registered_at TEXT NOT NULL DEFAULT (datetime('now')),
    psp_reference TEXT,
    payment_date TEXT,
    payment_type TEXT,
    expiry_date TEXT,
    email_sent INTEGER
);

CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_members_expiry_date ON members(expiry_date);
