ALTER TABLE model_issue_types ADD COLUMN price INTEGER;
ALTER TABLE model_issue_types ADD COLUMN eta TEXT;
ALTER TABLE model_issue_types ADD COLUMN updated_at TEXT;
ALTER TABLE model_issue_types ADD COLUMN created_at TEXT;

UPDATE model_issue_types
SET price = (SELECT p.price FROM model_issue_prices p WHERE p.model_id = model_issue_types.model_id AND p.issue_type_id = model_issue_types.issue_type_id),
    eta = (SELECT p.eta FROM model_issue_prices p WHERE p.model_id = model_issue_types.model_id AND p.issue_type_id = model_issue_types.issue_type_id),
    updated_at = (SELECT p.updated_at FROM model_issue_prices p WHERE p.model_id = model_issue_types.model_id AND p.issue_type_id = model_issue_types.issue_type_id),
    created_at = (SELECT p.created_at FROM model_issue_prices p WHERE p.model_id = model_issue_types.model_id AND p.issue_type_id = model_issue_types.issue_type_id);

UPDATE model_issue_types SET created_at = datetime('now') WHERE created_at IS NULL;

DROP TABLE model_issue_prices;
