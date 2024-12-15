//Here I will write all this the controllers and all the logic for our product resource.
import Product from "../models/products.js";

//Create a new product => /api/v1/products
export const getProducts = async (req, res) => {
  res.status(200).json({
    message: "All Products",
  });
};

//Create a new product => /api/v1/admin/products
export const newProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
};
