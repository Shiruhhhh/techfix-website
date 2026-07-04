import { Hono } from "hono";
import { cloudflareAccess } from "../../middleware/access.js";
import brands from "./brands.js";
import modelFamilies from "./model-families.js";
import models from "./models.js";
import issueTypes from "./issue-types.js";
import modelIssueTypes from "./model-issue-types.js";
import contacts from "./contacts.js";

const app = new Hono();

app.use("*", cloudflareAccess());

app.route("/brands", brands);
app.route("/model-families", modelFamilies);
app.route("/models", models);
app.route("/issue-types", issueTypes);
app.route("/model-issue-types", modelIssueTypes);
app.route("/contacts", contacts);

export default app;
