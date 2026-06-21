CREATE TABLE models_new (
  id            TEXT PRIMARY KEY,
  brand_id      TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  family_id     TEXT REFERENCES model_families(id) ON DELETE SET NULL,
  name          TEXT NOT NULL,
  category      TEXT NOT NULL CHECK (category IN ('phone','tablet','laptop','desktop','watch','console','vacuum','audio')),
  image_key     TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO models_new SELECT * FROM models;
DROP TABLE models;
ALTER TABLE models_new RENAME TO models;

CREATE INDEX idx_models_brand ON models(brand_id);
CREATE INDEX idx_models_family ON models(family_id);
CREATE INDEX idx_models_category ON models(category);
