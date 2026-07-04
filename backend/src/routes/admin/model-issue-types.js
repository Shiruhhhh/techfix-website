import { Hono } from "hono";
import { softDelete, restore } from "../../lib/db.js";

const app = new Hono();

app.get("/", async (c) => {
  const modelId = c.req.query("modelId");
  const stmt = modelId
    ? c.env.DB.prepare(
        `SELECT model_id AS modelId, issue_type_id AS issueTypeId, price, eta, enabled,
                created_at AS createdAt, updated_at AS updatedAt
         FROM model_issue_types WHERE model_id = ?`
      ).bind(modelId)
    : c.env.DB.prepare(
        `SELECT model_id AS modelId, issue_type_id AS issueTypeId, price, eta, enabled,
                created_at AS createdAt, updated_at AS updatedAt
         FROM model_issue_types`
      );
  const { results } = await stmt.all();
  return c.json(results);
});

app.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const { modelId, issueTypeId, price = null, eta = null } = body;
  if (!modelId || !issueTypeId) return c.json({ error: "modelId e issueTypeId são obrigatórios" }, 400);

  const model = await c.env.DB.prepare("SELECT id FROM models WHERE id = ?").bind(modelId).first();
  if (!model) return c.json({ error: "modelId inválido" }, 400);
  const issueType = await c.env.DB.prepare("SELECT id FROM issue_types WHERE id = ?").bind(issueTypeId).first();
  if (!issueType) return c.json({ error: "issueTypeId inválido" }, 400);

  await c.env.DB.prepare(
    `INSERT INTO model_issue_types (model_id, issue_type_id, price, eta, created_at, updated_at)
     VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
     ON CONFLICT (model_id, issue_type_id) DO UPDATE SET price = excluded.price, eta = excluded.eta,
       updated_at = datetime('now')`
  ).bind(modelId, issueTypeId, price, eta).run();

  return c.json({ ok: true }, 201);
});

// Upsert em lote — grava todos os preços de um modelo de uma vez em vez de N chamadas.
app.patch("/model/:modelId", async (c) => {
  const modelId = c.req.param("modelId");
  const body = await c.req.json().catch(() => ({}));
  const items = Array.isArray(body.items) ? body.items : null;
  if (!items) return c.json({ error: "items (array) é obrigatório" }, 400);

  const model = await c.env.DB.prepare("SELECT id FROM models WHERE id = ?").bind(modelId).first();
  if (!model) return c.json({ error: "modelId inválido" }, 400);

  const statements = items.map(({ issueTypeId, price = null, eta = null }) =>
    c.env.DB.prepare(
      `INSERT INTO model_issue_types (model_id, issue_type_id, price, eta, created_at, updated_at)
       VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
       ON CONFLICT (model_id, issue_type_id) DO UPDATE SET price = excluded.price, eta = excluded.eta,
         updated_at = datetime('now')`
    ).bind(modelId, issueTypeId, price, eta)
  );

  await c.env.DB.batch(statements);
  return c.json({ ok: true });
});

app.delete("/:modelId/:issueTypeId", async (c) => {
  await c.env.DB.prepare(
    `UPDATE model_issue_types SET enabled = 0 WHERE model_id = ? AND issue_type_id = ?`
  ).bind(c.req.param("modelId"), c.req.param("issueTypeId")).run();
  return c.json({ ok: true });
});

app.post("/:modelId/:issueTypeId/restore", async (c) => {
  await c.env.DB.prepare(
    `UPDATE model_issue_types SET enabled = 1 WHERE model_id = ? AND issue_type_id = ?`
  ).bind(c.req.param("modelId"), c.req.param("issueTypeId")).run();
  return c.json({ ok: true });
});

export default app;
