-- Campos de gestão para o portal admin: marcar como lido e arquivar sem apagar.
-- Sem default em read_at porque D1 não permite default não-constante em ADD COLUMN.
ALTER TABLE contacts ADD COLUMN read_at TEXT;
ALTER TABLE contacts ADD COLUMN archived INTEGER NOT NULL DEFAULT 0;
