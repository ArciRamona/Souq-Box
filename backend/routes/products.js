//In this Routes slash products.js I will write all the routes for the product resource.

import express from "express";
import { getProducts, newProduct } from "../controllers/productControllers.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/admin/products").post(newProduct);

export default router;
