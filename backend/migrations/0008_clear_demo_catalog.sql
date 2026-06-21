DELETE FROM model_issue_types WHERE model_id IN ('iphone-17-pro-max', 'iphone-15', 'redmi-note-12-pro-5g', 'redmi-13c');
DELETE FROM models WHERE id IN ('iphone-17-pro-max', 'iphone-15', 'redmi-note-12-pro-5g', 'redmi-13c');
DELETE FROM model_families WHERE id IN ('iphone', 'xiaomi-redmi');
DELETE FROM brands WHERE id IN ('apple', 'xiaomi');
