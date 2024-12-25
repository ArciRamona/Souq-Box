//In this Routes slash products.js I will write all the routes for the product resource.

import express from "express";
import {
  deleteProduct,
  getProductDetails,
  getProducts,
  newProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getProducts);
router.route("/admin/products").post(newProduct); //Authorized only for admin

router.route("/products/:id").get(getProductDetails);
router.route("/admin/products/:id").put(updateProduct); //Authorized only for admin
router.route("/admin/products/:id").delete(deleteProduct); //Authorized only for admin
export default router;
