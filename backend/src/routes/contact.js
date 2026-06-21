import { Hono } from "hono";

const app = new Hono();

app.post("/", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const { name, email, message } = body;
  if (!name || !email || !message) {
    return c.json({ error: "name, email e message são obrigatórios" }, 400);
  }

  await c.env.DB.prepare(
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)"
  ).bind(name, email, message).run();

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
          text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
        }),
      }).then((r) => {
        if (!r.ok) console.error("Resend falhou", r.status);
      })
    );
  }

  return c.json({ ok: true }, 201);
});

export default app;
