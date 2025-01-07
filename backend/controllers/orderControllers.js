// Handle Orders Resource
// Create Order Model
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import ErrorHandler from "../utils/errorHandlers.js";

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
