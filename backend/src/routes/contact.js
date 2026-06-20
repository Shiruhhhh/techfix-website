import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email e message são obrigatórios" });
  }
  console.log("Novo contacto:", { name, email, message });
  res.status(201).json({ ok: true });
});

export default router;
