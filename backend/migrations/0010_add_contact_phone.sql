ALTER TABLE contacts ADD COLUMN phone TEXT;
UPDATE contacts SET phone = '' WHERE phone IS NULL;
