import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  getOrderDeatails,
  myOrders,
  newOrder,
} from "../controllers/orderControllers.js";

const router = express.Router();

router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/:id").get(isAuthenticatedUser, getOrderDeatails);
router.route("/me/orders").get(isAuthenticatedUser, myOrders);

export default router;
