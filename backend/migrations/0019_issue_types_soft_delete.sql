-- Portal admin precisa poder desativar/reativar issue_types sem quebrar FKs
-- em model_issue_types (mesmo padrão soft-delete de 0018).
ALTER TABLE issue_types ADD COLUMN enabled INTEGER NOT NULL DEFAULT 1;
