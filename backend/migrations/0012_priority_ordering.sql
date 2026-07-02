-- Prioritize most-searched brands and their most-searched gamas.
-- Everything not listed here keeps display_order = 0 and sorts alphabetically.

UPDATE brands SET display_order = 1 WHERE id = 'apple';
UPDATE brands SET display_order = 2 WHERE id = 'samsung';
UPDATE brands SET display_order = 3 WHERE id = 'xiaomi';
UPDATE brands SET display_order = 4 WHERE id = 'huawei';

-- Apple (no "Geral" gama)
UPDATE model_families SET display_order = 1 WHERE id = 'apple-iphone';
UPDATE model_families SET display_order = 2 WHERE id = 'apple-ipad';
UPDATE model_families SET display_order = 3 WHERE id = 'apple-watch';
UPDATE model_families SET display_order = 4 WHERE id = 'apple-mac';
UPDATE model_families SET display_order = 5 WHERE id = 'apple-ipod';

-- Samsung
UPDATE model_families SET display_order = 1 WHERE id = 'samsung-produto';
UPDATE model_families SET display_order = 2 WHERE id = 'samsung-serie-galaxy-s';
UPDATE model_families SET display_order = 3 WHERE id = 'samsung-galaxy-z-flip';
UPDATE model_families SET display_order = 4 WHERE id = 'samsung-galaxy-z-fold';
UPDATE model_families SET display_order = 5 WHERE id = 'samsung-serie-a';
UPDATE model_families SET display_order = 6 WHERE id = 'samsung-serie-galaxy-note';
UPDATE model_families SET display_order = 7 WHERE id = 'samsung-serie-galaxy-m';
UPDATE model_families SET display_order = 8 WHERE id = 'samsung-serie-j';
UPDATE model_families SET display_order = 9 WHERE id = 'samsung-samsung-galaxy-watch';
UPDATE model_families SET display_order = 10 WHERE id = 'samsung-samsunggalaxytab';

-- Xiaomi
UPDATE model_families SET display_order = 1 WHERE id = 'xiaomi-produto';
UPDATE model_families SET display_order = 2 WHERE id = 'xiaomi-serie-redmi';
UPDATE model_families SET display_order = 3 WHERE id = 'xiaomi-serie-mi';
UPDATE model_families SET display_order = 4 WHERE id = 'xiaomi-xiaomi-poco';
UPDATE model_families SET display_order = 5 WHERE id = 'xiaomi-serie-mi-mix';
UPDATE model_families SET display_order = 6 WHERE id = 'xiaomi-serie-mi-a';
UPDATE model_families SET display_order = 7 WHERE id = 'xiaomi-xiaomimipad';

-- Huawei
UPDATE model_families SET display_order = 1 WHERE id = 'huawei-produto';
UPDATE model_families SET display_order = 2 WHERE id = 'huawei-serie-p';
UPDATE model_families SET display_order = 3 WHERE id = 'huawei-serie-mate';
UPDATE model_families SET display_order = 4 WHERE id = 'huawei-huawei-nova';
UPDATE model_families SET display_order = 5 WHERE id = 'huawei-serie-y';
UPDATE model_families SET display_order = 6 WHERE id = 'huawei-serie-p-smart';
UPDATE model_families SET display_order = 7 WHERE id = 'huawei-huawei-matepad';
UPDATE model_families SET display_order = 8 WHERE id = 'huawei-smartwatches-huawei';
UPDATE model_families SET display_order = 9 WHERE id = 'huawei-huaweimediapad';
