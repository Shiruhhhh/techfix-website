import { Hono } from "hono";

const app = new Hono();

const MAX_LENGTHS = { name: 200, email: 200, phone: 40, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Remove caracteres de controlo (incl. \r\n) — evita injeção de headers/subject
// no email de notificação e lixo na BD.
function stripControl(value) {
  return value.replace(/[\x00-\x1F\x7F]/g, " ").trim();
}

app.post("/", async (c) => {
  // Rate limit por IP (binding CONTACT_RATE_LIMITER, wrangler.toml). Se o
  // binding não existir (ex: config antiga), segue sem limitar — falha aberta
  // de propósito para não derrubar o formulário por erro de config.
  if (c.env.CONTACT_RATE_LIMITER) {
    const ip = c.req.header("CF-Connecting-IP") ?? "unknown";
    const { success } = await c.env.CONTACT_RATE_LIMITER.limit({ key: ip });
    if (!success) {
      return c.json({ error: "demasiados pedidos, tenta novamente mais tarde" }, 429);
    }
  }

  const body = await c.req.json().catch(() => ({}));
  let { name, email, phone, message } = body;
  if (!name || !email || !phone || !message) {
    return c.json({ error: "name, email, phone e message são obrigatórios" }, 400);
  }
  for (const [field, value] of Object.entries({ name, email, phone, message })) {
    if (typeof value !== "string" || value.length > MAX_LENGTHS[field]) {
      return c.json({ error: `${field} inválido` }, 400);
    }
  }

  name = stripControl(name);
  email = stripControl(email);
  phone = stripControl(phone);
  if (!name || !EMAIL_RE.test(email)) {
    return c.json({ error: !name ? "name inválido" : "email inválido" }, 400);
  }

  await c.env.DB.prepare(
    "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)"
  ).bind(name, email, phone, message).run();

  if (c.env.RESEND_API_KEY && c.env.CONTACT_EMAIL_TO) {
    c.executionCtx.waitUntil(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${c.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "TechFix <onboarding@resend.dev>",
          to: [c.env.CONTACT_EMAIL_TO],
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
