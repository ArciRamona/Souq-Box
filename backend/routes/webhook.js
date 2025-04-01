import express from "express";
import { stripeWebhookHandler } from "../controllers/webhookControllers.js";
import bodyParser from "body-parser";

const router = express.Router();

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }), // ⚠️ must use RAW here!
  stripeWebhookHandler
);

export default router;
