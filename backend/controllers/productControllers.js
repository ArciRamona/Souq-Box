//Here I will write all  the controllers and all the logic for our product resource.

import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/products.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandlers.js";

//Create a new product => /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res) => {
  //catchAsyncErrors = use async errors handlers that will catch all the errors and return some responce

  const resPerPage = 4;
  //Here we are using APIFilters to filter and sort the products.
  const apiFilters = new APIFilters(Product, req.query).search().filters();

  let products = await apiFilters.query;
  let filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();

  // const products = await Product.find();

  res.status(200).json({
    resPerPage,
    filteredProductsCount,
    products,
  });
});

//Create a new product => /api/v1/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
});

//routes that will give me deatails of one product by ID.
//Get single product details => /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id); //Optional Chaining Operator

  if (!product) {
    return next(new ErrorHandler("Product not found, 400")); //Next is a middleware that is provided by Express
    // return res.status(404).json({
    //   error: "Product not found",
    // });
  }

  res.status(200).json({
    product,
  });
});

//Update product details => /api/v1/products/:id
export const updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req?.params?.id); //Optional Chaining Operator

  if (!product) {
    return next(new ErrorHandler("Product not found, 400"));
    // return res.status(404).json({
    //   error: "Product not found",
    // });
  }

  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  }); //New to true means that it will return back the product document or the product object that is new that is updated version

  res.status(200).json({
    product,
  });
});

//Delete product details => /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req?.params?.id); //Optional Chaining Operator

  if (!product) {
    return next(new ErrorHandler("Product not found, 400"));
    // throw new Error(); //Creating Error Handle class
    // return res.status(404).json({
    //   error: "Product not found",
    // });
  }

  product = await Product.findByIdAndDelete(req?.params?.id, req.body); //New to true means that it will return back the product document or the product object that is new that is updated version

  // or await product.deleteOne();

  res.status(200).json({
    product,
  });
});
