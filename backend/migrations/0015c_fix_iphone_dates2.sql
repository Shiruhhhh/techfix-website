-- More bad rows in the local SmartDevices dataset: iPhone 6S/6S Plus picked
-- up the iPhone 7 launch date (2016-09-07) instead of their own (2015-09-25).
-- iPhone 5C was tagged 2014 instead of its actual 2013-09-20 launch
-- (it shipped alongside the 5S, not a year later). iPhone 6/6 Plus had only
-- year precision; adding the exact day fixes ordering against 5C/5S.
UPDATE models SET release_date = '2015-09-25' WHERE id = 'apple-iphone-6s';
UPDATE models SET release_date = '2015-09-25' WHERE id = 'apple-iphone-6s-plus';
UPDATE models SET release_date = '2013-09-20' WHERE id = 'apple-iphone-5c';
UPDATE models SET release_date = '2014-09-19' WHERE id = 'apple-iphone-6';
UPDATE models SET release_date = '2014-09-19' WHERE id = 'apple-iphone-6-plus';
