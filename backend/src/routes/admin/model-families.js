import { Hono } from "hono";
import { softDelete, restore, isUniqueConstraintError } from "../../lib/db.js";

const app = new Hono();

app.get("/", async (c) => {
  const brandId = c.req.query("brandId");
  const stmt = brandId
    ? c.env.DB.prepare(
        `SELECT id, brand_id AS brandId, name, display_order AS displayOrder, enabled,
                created_at AS createdAt
         FROM model_families WHERE brand_id = ? ORDER BY display_order, name`
      ).bind(brandId)
    : c.env.DB.prepare(
        `SELECT id, brand_id AS brandId, name, display_order AS displayOrder, enabled,
                created_at AS createdAt
         FROM model_families ORDER BY brand_id, display_order, name`
      );
  const { results } = await stmt.all();
  return c.json(results);
});

app.get("/:id", async (c) => {
  const family = await c.env.DB.prepare(
    `SELECT id, brand_id AS brandId, name, display_order AS displayOrder, enabled,
            created_at AS createdAt
     FROM model_families WHERE id = ?`
  ).bind(c.req.param("id")).first();
  if (!family) return c.json({ error: "not found" }, 404);
  return c.json(family);
});

app.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const { id, brandId, name, displayOrder = 0 } = body;
  if (!id || !brandId || !name) return c.json({ error: "id, brandId e name são obrigatórios" }, 400);

  const brand = await c.env.DB.prepare("SELECT id FROM brands WHERE id = ?").bind(brandId).first();
  if (!brand) return c.json({ error: "brandId inválido" }, 400);

  try {
    await c.env.DB.prepare(
      `INSERT INTO model_families (id, brand_id, name, display_order) VALUES (?, ?, ?, ?)`
    ).bind(id, brandId, name, displayOrder).run();
  } catch (err) {
    if (isUniqueConstraintError(err)) return c.json({ error: "id já existe ou name já usado nesta marca" }, 409);
    throw err;
  }

  return c.json({ ok: true }, 201);
});

app.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json().catch(() => ({}));
  const { name, displayOrder } = body;
  if (!name) return c.json({ error: "name é obrigatório" }, 400);

  try {
    await c.env.DB.prepare(
      `UPDATE model_families SET name = ?, display_order = ? WHERE id = ?`
    ).bind(name, displayOrder ?? 0, id).run();
  } catch (err) {
    if (isUniqueConstraintError(err)) return c.json({ error: "name já usado nesta marca" }, 409);
    throw err;
  }

  return c.json({ ok: true });
});

app.delete("/:id", async (c) => {
  await softDelete(c.env.DB, "model_families", c.req.param("id"));
  return c.json({ ok: true });
});

app.post("/:id/restore", async (c) => {
  await restore(c.env.DB, "model_families", c.req.param("id"));
  return c.json({ ok: true });
});

export default app;
