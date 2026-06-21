CREATE TABLE brands (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL UNIQUE,
  image_key     TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE model_families (
  id            TEXT PRIMARY KEY,
  brand_id      TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (brand_id, name)
);
CREATE INDEX idx_model_families_brand ON model_families(brand_id);

CREATE TABLE models (
  id            TEXT PRIMARY KEY,
  brand_id      TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  family_id     TEXT REFERENCES model_families(id) ON DELETE SET NULL,
  name          TEXT NOT NULL,
  category      TEXT NOT NULL CHECK (category IN ('phone','laptop','desktop')),
  image_key     TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_models_brand ON models(brand_id);
CREATE INDEX idx_models_family ON models(family_id);
CREATE INDEX idx_models_category ON models(category);

CREATE TABLE issue_types (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL UNIQUE,
  description   TEXT,
  icon_key      TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE model_issue_prices (
  model_id      TEXT NOT NULL REFERENCES models(id) ON DELETE CASCADE,
  issue_type_id TEXT NOT NULL REFERENCES issue_types(id) ON DELETE CASCADE,
  price         INTEGER NOT NULL,
  eta           TEXT,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (model_id, issue_type_id)
);
CREATE INDEX idx_model_issue_prices_model ON model_issue_prices(model_id);
