-- Fix to 0015_model_release_dates_final.sql: the local SmartDevices dataset
-- had bad duplicate rows for some iPhone storage variants (e.g. iPhone 8
-- Plus 128GB said 2019 while the 64GB/256GB variants of the same phone
-- correctly said 2017), which the auto-matcher picked up. Corrected using
-- verified retail release dates.
UPDATE models SET release_date = '2017-09-22' WHERE id = 'apple-iphone-8';
UPDATE models SET release_date = '2017-09-22' WHERE id = 'apple-iphone-8-plus';
UPDATE models SET release_date = '2016-03-31' WHERE id = 'apple-iphone-se2007';
