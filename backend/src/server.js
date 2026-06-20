import express from "express";
import cors from "cors";
import servicesRouter from "./routes/services.js";
import contactRouter from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/services", servicesRouter);
app.use("/api/contact", contactRouter);

app.listen(PORT, () => {
  console.log(`Backend a correr em http://localhost:${PORT}`);
});
