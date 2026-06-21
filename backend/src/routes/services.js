import { Hono } from "hono";
import { brands } from "../data/brands.js";

const app = new Hono();

app.get("/", async (c) => {
  const category = c.req.query("category");
  const stmt = category
    ? c.env.DB.prepare(
        "SELECT id, category, title, description, price_from AS priceFrom, eta FROM services WHERE category = ?"
      ).bind(category)
    : c.env.DB.prepare(
        "SELECT id, category, title, description, price_from AS priceFrom, eta FROM services"
      );
  const { results } = await stmt.all();
  return c.json(results);
});

app.get("/brands", (c) => c.json(brands));

export default app;
