import { Router } from "express";
import { services, brands } from "../data/services.js";

const router = Router();

router.get("/", (req, res) => {
  const { category } = req.query;
  const filtered = category
    ? services.filter((s) => s.category === category)
    : services;
  res.json(filtered);
});

router.get("/brands", (req, res) => {
  res.json(brands);
});

export default router;
