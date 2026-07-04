import { Hono } from "hono";
import { softDelete, restore } from "../../lib/db.js";

const app = new Hono();

const CATEGORIES = ["phone", "tablet", "laptop", "desktop", "watch", "console", "vacuum", "audio"];

app.get("/", async (c) => {
  const brandId = c.req.query("brandId");
  const familyId = c.req.query("familyId");
  const conditions = [];
  const params = [];
  if (brandId) { conditions.push("brand_id = ?"); params.push(brandId); }
  if (familyId) { conditions.push("family_id = ?"); params.push(familyId); }
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const { results } = await c.env.DB.prepare(
    `SELECT id, brand_id AS brandId, family_id AS familyId, name, category,
            image_key AS imageKey, release_date AS releaseDate,
            enabled, created_at AS createdAt
     FROM models ${where} ORDER BY brand_id, (release_date IS NULL), release_date DESC, name`
  ).bind(...params).all();
  return c.json(results);
});

app.get("/:id", async (c) => {
  const model = await c.env.DB.prepare(
    `SELECT id, brand_id AS brandId, family_id AS familyId, name, category,
            image_key AS imageKey, release_date AS releaseDate,
            enabled, created_at AS createdAt
     FROM models WHERE id = ?`
  ).bind(c.req.param("id")).first();
  if (!model) return c.json({ error: "not found" }, 404);
  return c.json(model);
});

app.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const { id, brandId, familyId = null, name, category, imageKey = null, releaseDate = null } = body;
  if (!id || !brandId || !name || !category) {
    return c.json({ error: "id, brandId, name e category são obrigatórios" }, 400);
  }
  if (!CATEGORIES.includes(category)) return c.json({ error: "category inválida" }, 400);

  const brand = await c.env.DB.prepare("SELECT id FROM brands WHERE id = ?").bind(brandId).first();
  if (!brand) return c.json({ error: "brandId inválido" }, 400);
  if (familyId) {
    const family = await c.env.DB.prepare("SELECT id FROM model_families WHERE id = ?").bind(familyId).first();
    if (!family) return c.json({ error: "familyId inválido" }, 400);
  }

  await c.env.DB.prepare(
    `INSERT INTO models (id, brand_id, family_id, name, category, image_key, release_date)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(id, brandId, familyId, name, category, imageKey, releaseDate).run();

  return c.json({ ok: true }, 201);
});

app.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json().catch(() => ({}));
  const { familyId = null, name, category, imageKey = null, releaseDate = null } = body;
  if (!name || !category) return c.json({ error: "name e category são obrigatórios" }, 400);
  if (!CATEGORIES.includes(category)) return c.json({ error: "category inválida" }, 400);

  if (familyId) {
    const family = await c.env.DB.prepare("SELECT id FROM model_families WHERE id = ?").bind(familyId).first();
    if (!family) return c.json({ error: "familyId inválido" }, 400);
  }

  await c.env.DB.prepare(
    `UPDATE models SET family_id = ?, name = ?, category = ?, image_key = ?, release_date = ?
     WHERE id = ?`
  ).bind(familyId, name, category, imageKey, releaseDate, id).run();

  return c.json({ ok: true });
});

app.delete("/:id", async (c) => {
  await softDelete(c.env.DB, "models", c.req.param("id"));
  return c.json({ ok: true });
});

app.post("/:id/restore", async (c) => {
  await restore(c.env.DB, "models", c.req.param("id"));
  return c.json({ ok: true });
});

export default app;
