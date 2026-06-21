CREATE TABLE services (
  id          TEXT PRIMARY KEY,
  category    TEXT NOT NULL CHECK (category IN ('phone','laptop','desktop')),
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  price_from  INTEGER NOT NULL,
  eta         TEXT NOT NULL,
  image_key   TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_services_category ON services(category);

CREATE TABLE contacts (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  message     TEXT NOT NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
