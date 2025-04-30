import express from "express";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import {
  allOrders,
  deleteOrder,
  getMyOrders,
  getOrderDeatails,
  getSales,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/orderControllers.js";
import Order from "../models/order.js";

const router = express.Router();

router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/me/orders").get(isAuthenticatedUser, myOrders);
router.get("/orders/me", isAuthenticatedUser, getMyOrders);

router.route("/orders/:id").get(isAuthenticatedUser, getOrderDeatails);

router.get(
  "/admin/get_sales",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSales
);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);

router
  .route("/admin/orders/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

// 🧪 DEV ONLY — Clear Fake Orders (for testing cleanup)
router.delete(
  "/admin/dev/clear-fake-orders",
  isAuthenticatedUser, // Optional: only allow logged-in
  authorizeRoles("admin"), // Optional: only allow admins
  async (req, res) => {
    try {
      const result = await Order.deleteMany({
        user: "67697619ec0d7206c2038949", // your user ID
        "paymentInfo.status": "Not Paid",
      });

      res.status(200).json({ success: true, deleted: result.deletedCount });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

export default router;
