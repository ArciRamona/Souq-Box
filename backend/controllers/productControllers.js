//Here I will write all  the controllers and all the logic for our product resource.
// Endpoint

import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/products.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandlers.js";
import Order from "../models/order.js";

import mongoose from "mongoose";

//Create a new product => /api/v1/products
export const getProducts = catchAsyncErrors(async (req, res, next) => {
  //catchAsyncErrors = use async errors handlers that will catch all the errors and return some responce

  const resPerPage = 4;
  //Here we are using APIFilters to filter and sort the products.
  const apiFilters = new APIFilters(Product, req.query).search().filters();

  // console.log("req?.user", req?.user);

  let products = await apiFilters.query;
  let filteredProductsCount = products.length;

  // return next(new ErrorHandler("error", 400));

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
  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
});

//routes that will give me deatails of one product by ID.
//Get single product details => /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id).populate(
    "reviews.user"
  ); //Optional Chaining Operator

  if (!product) {
    return next(new ErrorHandler("Product not found, 400")); //Next is a middleware that is provided by Express
    // return res.status(404).json({
    //   error: "Product not found",
    // });
  }

  res.status(200).json({
    product,
  });
  {
  }
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

// USER REVIEWS

// Add New / Update Revie

// Create/Update product review => /api/v1/reviews
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req?.user?._id,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const isReviewed = product?.reviews?.find(
    (r) => r.user.toString() === req?.user?._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review?.user?.toString() === req?.user?._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get all reviews of a product => /api/v1/reviews
export const getAllProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    reviews: product.reviews,
  });
});

// Delete product review => /api/v1/admin/reviews
export const deleteProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Filter out the review that matches the given review ID
  product.reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  // Update the number of reviews and the ratings
  const numOfReviews = product.reviews.length;

  const ratings =
    numOfReviews === 0
      ? 0
      : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        numOfReviews;

  // Save the updated product data
  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews: product.reviews, numOfReviews, ratings },
    { new: true }
  );

  res.status(200).json({
    success: true,
  });
});

// Can user review => /api/v1/can_review
export const canUserReview = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user._id,
    "orderItems.product": req.query.productId,
  });

  if (orders.length === 0) {
    return res.status(200).json({ canReview: false });
  }

  console.log("🔍 Checking review eligibility for user:", req.user._id);
  console.log("🛒 Orders found:", orders.length);
  res.status(200).json({
    canReview: true,
  });
  {
  }
});

// Get products - ADMIN => /api/v1/admin/products
export const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    products,
  });
});
