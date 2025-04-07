// Handle Orders Resource
// Create Order Model
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.js";
import Product from "../models/products.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import ErrorHandler from "../utils/errorHandlers.js";
import mongoose from "mongoose";

// Create new Order = => /api/v1/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    paymentInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id,
  });

  res.status(200).json({
    order,
  });
});

// Get Single Order & Logged in User Order
// Create two Endpoints for the order. One is to get the order details by ID. And one is to get the orders of the current user.
// Get order deatails =>  /api/v1/orders/:id
export const getOrderDeatails = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); // populate the order details with user details, from "user" we get the entire order details from name email id etc. we only need name and email

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 400));
  }

  res.status(200).json({
    order,
  });
});

// Get orders of current user => /api/v1/orders/me/orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    orders,
  });
});

// Get all orders - ADMIN => /api/v1/admin/orders
export const allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    orders,
  });
});

// Update Order - ADMIN => /api/v1/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  if (order?.orderStatus === "Delivered") {
    return next(new ErrorHandler("You already delivered this order", 400));
  }

  // Update the stock order once shipped the order or deliver the order.
  order.orderItems?.forEach(async (item) => {
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
      return next(new ErrorHandler("No Product found with this ID", 404));
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  });

  order.orderStatus = req.body.status; // orderStatus
  order.deliveredAt = Date.now(); //

  await order.save();

  res.status(200).json({
    success: true,
  });
});

// Delete order => /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});

// Get Order Details => /api/v1/orders/:id
// export const getMyOrders = catchAsyncErrors(async (req, res, next) => {
//   console.log("🔍 Fetching orders for user:", req.user._id);

//   const orders = await Order.find({ user: req.user._id });

//   console.log("📦 Orders returned:", orders.length);

//   res.status(200).json({
//     success: true,
//     orders,
//   });
// });
// @route   GET /api/v1/orders/me
// @access  Private
export const getMyOrders = catchAsyncErrors(async (req, res, next) => {
  console.log("📥 User ID from req.user:", req.user?._id, typeof req.user?._id);

  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});
