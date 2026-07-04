import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
  const archived = c.req.query("archived");
  const where = archived !== undefined ? "WHERE archived = ?" : "";
  const stmt = archived !== undefined
    ? c.env.DB.prepare(
        `SELECT id, name, email, phone, message, read_at AS readAt, archived, created_at AS createdAt
         FROM contacts ${where} ORDER BY created_at DESC`
      ).bind(archived === "1" ? 1 : 0)
    : c.env.DB.prepare(
        `SELECT id, name, email, phone, message, read_at AS readAt, archived, created_at AS createdAt
         FROM contacts ORDER BY created_at DESC`
      );
  const { results } = await stmt.all();
  return c.json(results);
});

app.patch("/:id/read", async (c) => {
  await c.env.DB.prepare(`UPDATE contacts SET read_at = datetime('now') WHERE id = ?`)
    .bind(c.req.param("id")).run();
  return c.json({ ok: true });
});

app.patch("/:id/archive", async (c) => {
  await c.env.DB.prepare(`UPDATE contacts SET archived = 1 WHERE id = ?`)
    .bind(c.req.param("id")).run();
  return c.json({ ok: true });
});

app.patch("/:id/unarchive", async (c) => {
  await c.env.DB.prepare(`UPDATE contacts SET archived = 0 WHERE id = ?`)
    .bind(c.req.param("id")).run();
  return c.json({ ok: true });
});

export default app;
