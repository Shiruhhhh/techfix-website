INSERT INTO brands (id, name, display_order) VALUES
  ('apple', 'Apple', 1),
  ('xiaomi', 'Xiaomi', 2);

INSERT INTO model_families (id, brand_id, name, display_order) VALUES
  ('iphone', 'apple', 'iPhone', 1),
  ('xiaomi-redmi', 'xiaomi', 'Xiaomi Redmi', 1);

INSERT INTO models (id, brand_id, family_id, name, category, display_order) VALUES
  ('iphone-17-pro-max', 'apple', 'iphone', 'iPhone 17 Pro Max', 'phone', 1),
  ('iphone-15', 'apple', 'iphone', 'iPhone 15', 'phone', 2),
  ('redmi-note-12-pro-5g', 'xiaomi', 'xiaomi-redmi', 'Redmi Note 12 Pro 5G', 'phone', 1),
  ('redmi-13c', 'xiaomi', 'xiaomi-redmi', 'Redmi 13C', 'phone', 2);

INSERT INTO issue_types (id, name, icon_key, display_order) VALUES
  ('screen', 'Ecrã', 'screen', 1),
  ('battery', 'Bateria', 'battery', 2),
  ('camera-front', 'Câmara Frente', 'camera-front', 3),
  ('camera-back', 'Câmara Traseira', 'camera-back', 4),
  ('charging-port', 'Porta de Ligação', 'charging-port', 5),
  ('water-damage', 'Danos Líquidos', 'water-damage', 6),
  ('earpiece', 'Auscultador', 'earpiece', 7),
  ('speaker', 'Colunas', 'speaker', 8),
  ('microphone', 'Microfone', 'microphone', 9),
  ('power-volume-button', 'Botão Power/Volume', 'button', 10),
  ('proximity-sensor', 'Sensor Proximidade', 'sensor', 11),
  ('antenna', 'Antena', 'antenna', 12),
  ('vibration', 'Vibração', 'vibration', 13),
  ('back-cover', 'Capa Traseira', 'back-cover', 14),
  ('cleaning', 'Limpeza/Higienização', 'cleaning', 15),
  ('data-transfer', 'Passagem de Dados', 'data-transfer', 16),
  ('technical-intervention', 'Intervenção Técnica', 'tools', 17);

INSERT INTO model_issue_prices (model_id, issue_type_id, price, eta) VALUES
  ('iphone-17-pro-max', 'screen', 349, '60-90 min'),
  ('iphone-17-pro-max', 'battery', 89, '30-40 min'),
  ('iphone-17-pro-max', 'camera-back', 159, 'Mesmo dia'),
  ('iphone-17-pro-max', 'charging-port', 79, '30-40 min'),
  ('iphone-17-pro-max', 'water-damage', 59, 'Diagnóstico em 24h'),
  ('iphone-17-pro-max', 'back-cover', 129, 'Mesmo dia'),
  ('iphone-17-pro-max', 'cleaning', 19, '20 min');

INSERT INTO model_issue_prices (model_id, issue_type_id, price, eta) VALUES
  ('iphone-15', 'screen', 249, '60-90 min'),
  ('iphone-15', 'battery', 69, '30-40 min'),
  ('iphone-15', 'charging-port', 59, '30-40 min');

INSERT INTO model_issue_prices (model_id, issue_type_id, price, eta) VALUES
  ('redmi-note-12-pro-5g', 'screen', 79, '60-90 min'),
  ('redmi-note-12-pro-5g', 'battery', 39, '30-40 min');

INSERT INTO model_issue_prices (model_id, issue_type_id, price, eta) VALUES
  ('redmi-13c', 'screen', 59, '60-90 min');
