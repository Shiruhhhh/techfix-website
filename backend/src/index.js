import { Hono } from "hono";
import { cors } from "hono/cors";
import services from "./routes/services.js";
import contact from "./routes/contact.js";
import catalog from "./routes/catalog.js";

const app = new Hono();

const allowedOrigins = ["https://techfix-website.pages.dev", "http://localhost:5173"];

app.use(
  "*",
  cors({
    origin: (origin) => (allowedOrigins.includes(origin) ? origin : allowedOrigins[0]),
  })
);

app.get("/api/health", (c) => c.json({ status: "ok" }));
app.route("/api/services", services);
app.route("/api/contact", contact);
app.route("/api/catalog", catalog);

export default app;
