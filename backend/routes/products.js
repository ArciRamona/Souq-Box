//In this Routes slash products.js I will write all the routes for the product resource.

import express from "express";
import { getProducts } from "../controllers/productControllers.js";

const router = express.Router();

router.route("/products").get(getProducts);

export default router;
