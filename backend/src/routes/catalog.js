import { Hono } from "hono";

const app = new Hono();

app.get("/brands", async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT b.id, b.name, b.image_key AS imageKey,
            b.icon_slug AS iconSlug, b.icon_color AS iconColor,
            (SELECT COUNT(*) FROM models m WHERE m.brand_id = b.id AND m.enabled = 1) AS modelCount,
            (SELECT GROUP_CONCAT(name, ' · ') FROM (
               SELECT f.name FROM model_families f
               WHERE f.brand_id = b.id AND f.enabled = 1
               ORDER BY f.display_order, f.name LIMIT 3
            )) AS tagline
     FROM brands b
     WHERE b.enabled = 1
     ORDER BY b.display_order, b.name`
  ).all();
  return c.json(results);
});

app.get("/brands/:brandId/families", async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT f.id, f.name,
            (SELECT COUNT(*) FROM models m WHERE m.family_id = f.id AND m.enabled = 1) AS modelCount,
            (SELECT m.category FROM models m WHERE m.family_id = f.id AND m.enabled = 1
             ORDER BY m.name LIMIT 1) AS category,
            (SELECT MIN(p.price) FROM model_issue_types p
             JOIN models m ON m.id = p.model_id
             WHERE m.family_id = f.id AND m.enabled = 1 AND p.enabled = 1) AS minPrice
     FROM model_families f
     JOIN brands b ON b.id = f.brand_id
     WHERE f.brand_id = ? AND f.enabled = 1 AND b.enabled = 1
     ORDER BY f.display_order, f.name`
  ).bind(c.req.param("brandId")).all();
  return c.json(results);
});

app.get("/brands/:brandId/models", async (c) => {
  const brandId = c.req.param("brandId");
  const familyId = c.req.query("familyId");
  const cols = `m.id, m.name, m.category, m.image_key AS imageKey,
                (SELECT MIN(p.price) FROM model_issue_types p WHERE p.model_id = m.id AND p.enabled = 1) AS minPrice`;
  const order = `ORDER BY (m.release_date IS NULL), m.release_date DESC, m.name`;
  const stmt = familyId
    ? c.env.DB.prepare(
        `SELECT ${cols} FROM models m
         JOIN brands b ON b.id = m.brand_id
         WHERE m.brand_id = ? AND m.family_id = ? AND m.enabled = 1 AND b.enabled = 1 ${order}`
      ).bind(brandId, familyId)
    : c.env.DB.prepare(
        `SELECT ${cols} FROM models m
         JOIN brands b ON b.id = m.brand_id
         WHERE m.brand_id = ? AND m.enabled = 1 AND b.enabled = 1 ${order}`
      ).bind(brandId);
  const { results } = await stmt.all();
  return c.json(results);
});

app.get("/models/:modelId", async (c) => {
  const modelId = c.req.param("modelId");

  const header = await c.env.DB.prepare(
    `SELECT m.id, m.name, m.category, m.image_key AS imageKey,
            b.id AS brandId, b.name AS brandName,
            b.icon_slug AS brandIconSlug, b.icon_color AS brandIconColor
     FROM models m JOIN brands b ON b.id = m.brand_id
     WHERE m.id = ? AND m.enabled = 1 AND b.enabled = 1`
  ).bind(modelId).first();

  if (!header) {
    return c.json({ error: "not found" }, 404);
  }

  const { results: issues } = await c.env.DB.prepare(
    `SELECT it.id, it.name, it.icon_key AS iconKey, it.description,
            p.price, p.eta
     FROM model_issue_types p
     JOIN issue_types it ON it.id = p.issue_type_id
     WHERE p.model_id = ? AND p.enabled = 1
     ORDER BY it.display_order`
  ).bind(modelId).all();

  return c.json({
    id: header.id,
    name: header.name,
    category: header.category,
    imageKey: header.imageKey,
    brand: {
      id: header.brandId,
      name: header.brandName,
      iconSlug: header.brandIconSlug,
      iconColor: header.brandIconColor,
    },
    issues,
  });
});

export default app;
