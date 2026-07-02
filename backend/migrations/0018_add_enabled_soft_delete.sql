-- Soft delete: enabled flag lets catalog rows be hidden from public routes
-- without losing the row (unlike DELETE, which is permanent).
ALTER TABLE brands ADD COLUMN enabled INTEGER NOT NULL DEFAULT 1;
ALTER TABLE model_families ADD COLUMN enabled INTEGER NOT NULL DEFAULT 1;
ALTER TABLE models ADD COLUMN enabled INTEGER NOT NULL DEFAULT 1;
ALTER TABLE services ADD COLUMN enabled INTEGER NOT NULL DEFAULT 1;
ALTER TABLE model_issue_types ADD COLUMN enabled INTEGER NOT NULL DEFAULT 1;
