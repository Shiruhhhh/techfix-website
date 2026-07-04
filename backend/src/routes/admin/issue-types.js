import { Hono } from "hono";
import { softDelete, restore, isUniqueConstraintError } from "../../lib/db.js";

const app = new Hono();

app.get("/", async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT id, name, description, icon_key AS iconKey, display_order AS displayOrder,
            enabled, created_at AS createdAt
     FROM issue_types ORDER BY display_order, name`
  ).all();
  return c.json(results);
});

app.get("/:id", async (c) => {
  const issueType = await c.env.DB.prepare(
    `SELECT id, name, description, icon_key AS iconKey, display_order AS displayOrder,
            enabled, created_at AS createdAt
     FROM issue_types WHERE id = ?`
  ).bind(c.req.param("id")).first();
  if (!issueType) return c.json({ error: "not found" }, 404);
  return c.json(issueType);
});

app.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const { id, name, description = null, iconKey = null, displayOrder = 0 } = body;
  if (!id || !name) return c.json({ error: "id e name são obrigatórios" }, 400);

  try {
    await c.env.DB.prepare(
      `INSERT INTO issue_types (id, name, description, icon_key, display_order) VALUES (?, ?, ?, ?, ?)`
    ).bind(id, name, description, iconKey, displayOrder).run();
  } catch (err) {
    if (isUniqueConstraintError(err)) return c.json({ error: "id ou name já existe" }, 409);
    throw err;
  }

  return c.json({ ok: true }, 201);
});

app.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json().catch(() => ({}));
  const { name, description = null, iconKey = null, displayOrder = 0 } = body;
  if (!name) return c.json({ error: "name é obrigatório" }, 400);

  try {
    await c.env.DB.prepare(
      `UPDATE issue_types SET name = ?, description = ?, icon_key = ?, display_order = ? WHERE id = ?`
    ).bind(name, description, iconKey, displayOrder, id).run();
  } catch (err) {
    if (isUniqueConstraintError(err)) return c.json({ error: "name já existe" }, 409);
    throw err;
  }

  return c.json({ ok: true });
});

app.delete("/:id", async (c) => {
  await softDelete(c.env.DB, "issue_types", c.req.param("id"));
  return c.json({ ok: true });
});

app.post("/:id/restore", async (c) => {
  await restore(c.env.DB, "issue_types", c.req.param("id"));
  return c.json({ ok: true });
});

export default app;
