-- Huawei Mate 30 Lite: never actually released (cancelled after 2019 sanctions).
-- Huawei "M3 Pro": no such distinct product exists in the MediaPad M3 line.
DELETE FROM model_issue_types WHERE model_id IN ('huawei-huawei-mate-30-lite', 'huawei-huaweimediapadm3pro');
DELETE FROM models WHERE id IN ('huawei-huawei-mate-30-lite', 'huawei-huaweimediapadm3pro');
