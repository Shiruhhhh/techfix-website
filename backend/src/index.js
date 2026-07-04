import { Hono } from "hono";
import { cors } from "hono/cors";
import services from "./routes/services.js";
import contact from "./routes/contact.js";
import catalog from "./routes/catalog.js";
import admin from "./routes/admin/index.js";

const app = new Hono();

// portal.<dominio>/localhost:8000 (Umi Max dev) e o *.pages.dev do projeto Pages
// do portal entram aqui assim que o domínio de branding fechar (ver plano do portal).
const allowedOrigins = [
  "https://techfix-website.pages.dev",
  "http://localhost:5173",
  "http://localhost:8000",
];

app.use(
  "*",
  cors({
    origin: (origin) => (allowedOrigins.includes(origin) ? origin : null),
  })
);

app.get("/api/health", (c) => c.json({ status: "ok" }));
app.route("/api/services", services);
app.route("/api/contact", contact);
app.route("/api/catalog", catalog);
app.route("/api/admin", admin);

export default app;
