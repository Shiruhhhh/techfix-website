-- Several model_families were seeded with un-spaced auto-slug names
-- (e.g. "Samsunggalaxytab" instead of "Galaxy Tab"), visible to users in
-- FamilyPicker/brand tagline. Fix display names without touching ids.
UPDATE model_families SET name = 'Galaxy Tab' WHERE id = 'samsung-samsunggalaxytab';
UPDATE model_families SET name = 'MediaPad' WHERE id = 'huawei-huaweimediapad';
UPDATE model_families SET name = 'Surface' WHERE id = 'microsoft-microsoftsurface';
UPDATE model_families SET name = 'Tablets' WHERE id = 'tcl-tcltablets';
UPDATE model_families SET name = 'Mi Pad' WHERE id = 'xiaomi-xiaomimipad';
UPDATE model_families SET name = 'Tablet' WHERE id = 'alcatel-alcateltablet';
UPDATE model_families SET name = 'Reno' WHERE id = 'oppo-opporeno';
UPDATE model_families SET name = 'Find' WHERE id = 'oppo-oppofind';
UPDATE model_families SET name = 'A' WHERE id = 'oppo-oppoa';
