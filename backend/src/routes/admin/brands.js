import { Hono } from "hono";
import { softDelete, restore, isUniqueConstraintError } from "../../lib/db.js";

const app = new Hono();

app.get("/", async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT id, name, image_key AS imageKey, icon_slug AS iconSlug, icon_color AS iconColor,
            display_order AS displayOrder, enabled, created_at AS createdAt
     FROM brands ORDER BY display_order, name`
  ).all();
  return c.json(results);
});

app.get("/:id", async (c) => {
  const brand = await c.env.DB.prepare(
    `SELECT id, name, image_key AS imageKey, icon_slug AS iconSlug, icon_color AS iconColor,
            display_order AS displayOrder, enabled, created_at AS createdAt
     FROM brands WHERE id = ?`
  ).bind(c.req.param("id")).first();
  if (!brand) return c.json({ error: "not found" }, 404);
  return c.json(brand);
});

app.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const { id, name, imageKey = null, iconSlug = null, iconColor = null, displayOrder = 0 } = body;
  if (!id || !name) return c.json({ error: "id e name são obrigatórios" }, 400);

  try {
    await c.env.DB.prepare(
      `INSERT INTO brands (id, name, image_key, icon_slug, icon_color, display_order)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(id, name, imageKey, iconSlug, iconColor, displayOrder).run();
  } catch (err) {
    if (isUniqueConstraintError(err)) return c.json({ error: "id ou name já existe" }, 409);
    throw err;
  }

  return c.json({ ok: true }, 201);
});

app.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json().catch(() => ({}));
  const { name, imageKey, iconSlug, iconColor, displayOrder } = body;
  if (!name) return c.json({ error: "name é obrigatório" }, 400);

  try {
    await c.env.DB.prepare(
      `UPDATE brands SET name = ?, image_key = ?, icon_slug = ?, icon_color = ?, display_order = ?
       WHERE id = ?`
    ).bind(name, imageKey ?? null, iconSlug ?? null, iconColor ?? null, displayOrder ?? 0, id).run();
  } catch (err) {
    if (isUniqueConstraintError(err)) return c.json({ error: "name já existe" }, 409);
    throw err;
  }

  return c.json({ ok: true });
});

app.delete("/:id", async (c) => {
  await softDelete(c.env.DB, "brands", c.req.param("id"));
  return c.json({ ok: true });
});

app.post("/:id/restore", async (c) => {
  await restore(c.env.DB, "brands", c.req.param("id"));
  return c.json({ ok: true });
});

export default app;
