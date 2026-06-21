import { Hono } from "hono";

const app = new Hono();

const MAX_LENGTHS = { name: 200, email: 200, phone: 40, message: 5000 };

app.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const { name, email, phone, message } = body;
  if (!name || !email || !phone || !message) {
    return c.json({ error: "name, email, phone e message são obrigatórios" }, 400);
  }
  for (const [field, value] of Object.entries({ name, email, phone, message })) {
    if (typeof value !== "string" || value.length > MAX_LENGTHS[field]) {
      return c.json({ error: `${field} inválido` }, 400);
    }
  }

  await c.env.DB.prepare(
    "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)"
  ).bind(name, email, phone, message).run();

  if (c.env.RESEND_API_KEY) {
    c.executionCtx.waitUntil(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${c.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "TechFix <onboarding@resend.dev>",
          to: ["suporte@aquario.pt"],
          subject: `Novo contacto: ${name}`,
          text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\n\n${message}`,
        }),
      }).then((r) => {
        if (!r.ok) console.error("Resend falhou", r.status);
      })
    );
  }

  return c.json({ ok: true }, 201);
});

export default app;
