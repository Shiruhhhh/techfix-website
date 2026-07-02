-- OnePlus had 13 fragmented gamas (one per generation pair: "1", "2", "3 3t",
-- "6 6t", "9 9pro", "Oneplus 10", "Oneplus 11"...) instead of one coherent
-- numbered line. Merge all non-Nord models into a single "OnePlus" gama;
-- Nord stays separate (genuinely distinct mid-range product line).
INSERT INTO model_families (id, brand_id, name) VALUES ('oneplus-oneplus', 'oneplus', 'OnePlus')
ON CONFLICT(id) DO NOTHING;

UPDATE models SET family_id = 'oneplus-oneplus' WHERE id IN (
  'oneplus-oneplus-1',
  'oneplus-oneplus-2',
  'oneplus-oneplus-3',
  'oneplus-oneplus-3t',
  'oneplus-oneplus-5',
  'oneplus-oneplus-5t',
  'oneplus-oneplus-x',
  'oneplus-oneplus-6',
  'oneplus-oneplus-6t',
  'oneplus-oneplus-7',
  'oneplus-oneplus-7-pro',
  'oneplus-oneplus-7t',
  'oneplus-oneplus-7t-pro',
  'oneplus-oneplus7tpromclarenedition',
  'oneplus-one-plus-8',
  'oneplus-oneplus-8-pro',
  'oneplus-oneplus8t5g',
  'oneplus-oneplus85g',
  'oneplus-oneplus-9',
  'oneplus-oneplus-9-pro',
  'oneplus-oneplus-10-pro-5g',
  'oneplus-oneplus-10t',
  'oneplus-oneplus-11',
  'oneplus-oneplus-12',
  'oneplus-oneplus-13',
  'oneplus-oneplus-13r'
);

-- Drop the now-empty fragmented gamas (safe: no models reference them anymore).
DELETE FROM model_families WHERE id IN (
  'oneplus-serie-1',
  'oneplus-serie-2',
  'oneplus-serie-3-3t',
  'oneplus-serie-5-5t',
  'oneplus-serie-x',
  'oneplus-serie-6-6t',
  'oneplus-serie-7-7-pro',
  'oneplus-serie-8-8pro',
  'oneplus-serie-9-9pro',
  'oneplus-oneplus-10',
  'oneplus-oneplus-11',
  'oneplus-oneplus-12',
  'oneplus-oneplus-13'
);
