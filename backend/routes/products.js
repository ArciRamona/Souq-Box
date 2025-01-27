//In this Routes slash products.js I will write all the routes for the product resource.

import express from "express";
import {
  createProductReview,
  deleteProduct,
  deleteProductReview,
  getAllProductReviews,
  getProductDetails,
  getProducts,
  newProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/products").get(isAuthenticatedUser, getProducts);

//Authorized the routes for the admin
router
  .route("/admin/products")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct); //Authorized only for admin

router.route("/products/:id").get(getProductDetails);
router
  .route("/admin/products/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct); //Authorized only for admin
router
  .route("/admin/products/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct); //Authorized only for admin

router
  .route("/reviews")
  .put(isAuthenticatedUser, createProductReview)
  .get(isAuthenticatedUser, getAllProductReviews);

router
  .route("/admin/reviews")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProductReview); //Authorized only for admin

export default router;
