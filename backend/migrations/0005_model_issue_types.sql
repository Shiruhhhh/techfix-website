CREATE TABLE model_issue_types (
  model_id      TEXT NOT NULL REFERENCES models(id) ON DELETE CASCADE,
  issue_type_id TEXT NOT NULL REFERENCES issue_types(id) ON DELETE CASCADE,
  PRIMARY KEY (model_id, issue_type_id)
);
CREATE INDEX idx_model_issue_types_model ON model_issue_types(model_id);

ALTER TABLE model_issue_prices ADD COLUMN updated_at TEXT;
UPDATE model_issue_prices SET updated_at = created_at WHERE updated_at IS NULL;
