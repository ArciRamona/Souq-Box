import express from "express";
import bodyParser from "body-parser";
import { stripeWebhookHandler } from "../controllers/webhookControllers.js";

const router = express.Router();

// ✅ This is REQUIRED for Stripe to verify the signature
router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  stripeWebhookHandler
);

export default router;
