import { Hono } from "hono";

const app = new Hono();

app.get("/brands", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT id, name, image_key AS imageKey FROM brands ORDER BY display_order, name"
  ).all();
  return c.json(results);
});

app.get("/brands/:brandId/families", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT id, name FROM model_families WHERE brand_id = ? ORDER BY display_order, name"
  ).bind(c.req.param("brandId")).all();
  return c.json(results);
});

app.get("/brands/:brandId/models", async (c) => {
  const brandId = c.req.param("brandId");
  const familyId = c.req.query("familyId");
  const stmt = familyId
    ? c.env.DB.prepare(
        "SELECT id, name, category, image_key AS imageKey FROM models WHERE brand_id = ? AND family_id = ? ORDER BY display_order, name"
      ).bind(brandId, familyId)
    : c.env.DB.prepare(
        "SELECT id, name, category, image_key AS imageKey FROM models WHERE brand_id = ? ORDER BY display_order, name"
      ).bind(brandId);
  const { results } = await stmt.all();
  return c.json(results);
});

app.get("/models/:modelId", async (c) => {
  const modelId = c.req.param("modelId");

  const header = await c.env.DB.prepare(
    `SELECT m.id, m.name, m.category, m.image_key AS imageKey,
            b.id AS brandId, b.name AS brandName
     FROM models m JOIN brands b ON b.id = m.brand_id
     WHERE m.id = ?`
  ).bind(modelId).first();

  if (!header) {
    return c.json({ error: "not found" }, 404);
  }

  const { results: issues } = await c.env.DB.prepare(
    `SELECT it.id, it.name, it.icon_key AS iconKey, it.description,
            p.price, p.eta
     FROM model_issue_types mit
     JOIN issue_types it ON it.id = mit.issue_type_id
     LEFT JOIN model_issue_prices p
       ON p.issue_type_id = it.id AND p.model_id = mit.model_id
     WHERE mit.model_id = ?
     ORDER BY it.display_order`
  ).bind(modelId).all();

  return c.json({
    id: header.id,
    name: header.name,
    category: header.category,
    imageKey: header.imageKey,
    brand: { id: header.brandId, name: header.brandName },
    issues,
  });
});

export default app;
