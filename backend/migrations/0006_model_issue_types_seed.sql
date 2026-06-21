-- iPhone 17 Pro Max: gama alta, quase todas avarias aplicáveis
INSERT INTO model_issue_types (model_id, issue_type_id) VALUES
  ('iphone-17-pro-max', 'screen'),
  ('iphone-17-pro-max', 'battery'),
  ('iphone-17-pro-max', 'camera-front'),
  ('iphone-17-pro-max', 'camera-back'),
  ('iphone-17-pro-max', 'charging-port'),
  ('iphone-17-pro-max', 'water-damage'),
  ('iphone-17-pro-max', 'earpiece'),
  ('iphone-17-pro-max', 'speaker'),
  ('iphone-17-pro-max', 'microphone'),
  ('iphone-17-pro-max', 'power-volume-button'),
  ('iphone-17-pro-max', 'proximity-sensor'),
  ('iphone-17-pro-max', 'back-cover'),
  ('iphone-17-pro-max', 'cleaning'),
  ('iphone-17-pro-max', 'data-transfer'),
  ('iphone-17-pro-max', 'technical-intervention');

-- iPhone 15: semelhante, sem antena separada nem vibração como avaria distinta
INSERT INTO model_issue_types (model_id, issue_type_id) VALUES
  ('iphone-15', 'screen'),
  ('iphone-15', 'battery'),
  ('iphone-15', 'camera-front'),
  ('iphone-15', 'camera-back'),
  ('iphone-15', 'charging-port'),
  ('iphone-15', 'water-damage'),
  ('iphone-15', 'earpiece'),
  ('iphone-15', 'speaker'),
  ('iphone-15', 'power-volume-button'),
  ('iphone-15', 'back-cover'),
  ('iphone-15', 'cleaning'),
  ('iphone-15', 'data-transfer'),
  ('iphone-15', 'technical-intervention');

-- Redmi Note 12 Pro 5G: tem antena/vibração como avarias distintas (Android)
INSERT INTO model_issue_types (model_id, issue_type_id) VALUES
  ('redmi-note-12-pro-5g', 'screen'),
  ('redmi-note-12-pro-5g', 'battery'),
  ('redmi-note-12-pro-5g', 'camera-front'),
  ('redmi-note-12-pro-5g', 'camera-back'),
  ('redmi-note-12-pro-5g', 'charging-port'),
  ('redmi-note-12-pro-5g', 'water-damage'),
  ('redmi-note-12-pro-5g', 'earpiece'),
  ('redmi-note-12-pro-5g', 'speaker'),
  ('redmi-note-12-pro-5g', 'microphone'),
  ('redmi-note-12-pro-5g', 'power-volume-button'),
  ('redmi-note-12-pro-5g', 'proximity-sensor'),
  ('redmi-note-12-pro-5g', 'antenna'),
  ('redmi-note-12-pro-5g', 'vibration'),
  ('redmi-note-12-pro-5g', 'back-cover'),
  ('redmi-note-12-pro-5g', 'cleaning'),
  ('redmi-note-12-pro-5g', 'data-transfer'),
  ('redmi-note-12-pro-5g', 'technical-intervention');

-- Redmi 13C: entrada, lista reduzida (sem câmara frente/proximidade/antena separadas)
INSERT INTO model_issue_types (model_id, issue_type_id) VALUES
  ('redmi-13c', 'screen'),
  ('redmi-13c', 'battery'),
  ('redmi-13c', 'camera-back'),
  ('redmi-13c', 'charging-port'),
  ('redmi-13c', 'water-damage'),
  ('redmi-13c', 'speaker'),
  ('redmi-13c', 'power-volume-button'),
  ('redmi-13c', 'back-cover'),
  ('redmi-13c', 'cleaning'),
  ('redmi-13c', 'data-transfer'),
  ('redmi-13c', 'technical-intervention');
