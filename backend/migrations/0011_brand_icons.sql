-- Logos das marcas servidos a partir do CDN do Simple Icons (https://cdn.simpleicons.org/{slug}/{HEX}).
-- icon_slug = slug no Simple Icons; icon_color = HEX (sem #) para versão mono na cor da marca.
-- Marcas sem slug ficam NULL -> o frontend mostra monograma (1ª letra).
ALTER TABLE brands ADD COLUMN icon_slug TEXT;
ALTER TABLE brands ADD COLUMN icon_color TEXT;

UPDATE brands SET icon_slug = 'apple'                          WHERE id = 'apple';
UPDATE brands SET icon_slug = 'samsung',   icon_color = '1428A0' WHERE id = 'samsung';
UPDATE brands SET icon_slug = 'huawei',    icon_color = 'FF0000' WHERE id = 'huawei';
UPDATE brands SET icon_slug = 'motorola',  icon_color = 'E1140A' WHERE id = 'motorola';
UPDATE brands SET icon_slug = 'asus',      icon_color = '000000' WHERE id = 'asus';
UPDATE brands SET icon_slug = 'oneplus',   icon_color = 'F5010C' WHERE id = 'oneplus';
UPDATE brands SET icon_slug = 'xiaomi',    icon_color = 'FF6900' WHERE id = 'xiaomi';
UPDATE brands SET icon_slug = 'htc',       icon_color = 'A5C418' WHERE id = 'htc';
UPDATE brands SET icon_slug = 'nokia',     icon_color = '124191' WHERE id = 'nokia';
UPDATE brands SET icon_slug = 'lenovo',    icon_color = 'E2231A' WHERE id = 'lenovo';
UPDATE brands SET icon_slug = 'dell',      icon_color = '007DB8' WHERE id = 'dell';
UPDATE brands SET icon_slug = 'nintendo',  icon_color = 'E60012' WHERE id = 'nintendo';
UPDATE brands SET icon_slug = 'oppo',      icon_color = '1BA784' WHERE id = 'oppo';
UPDATE brands SET icon_slug = 'realme',    icon_color = 'FFC900' WHERE id = 'realme';
UPDATE brands SET icon_slug = 'honor',     icon_color = '000000' WHERE id = 'honor';
UPDATE brands SET icon_slug = 'tcl',       icon_color = '000000' WHERE id = 'tcl';
UPDATE brands SET icon_slug = 'microsoft'                        WHERE id = 'microsoft';
UPDATE brands SET icon_slug = 'alcatel',   icon_color = '0288D1' WHERE id = 'alcatel';
UPDATE brands SET icon_slug = 'google',    icon_color = '4285F4' WHERE id = 'google';
UPDATE brands SET icon_slug = 'nothing',   icon_color = '000000' WHERE id = 'nothing';
UPDATE brands SET icon_slug = 'dyson',     icon_color = '000000' WHERE id = 'dyson';
-- bq, wiko: sem slug no Simple Icons -> monograma.
