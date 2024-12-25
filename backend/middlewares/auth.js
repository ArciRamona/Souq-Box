// Protect Route from Unauthorized Users

import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandlers.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Check if user is authenticated or not
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies; //npm i cookieparser --save§

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 404));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  //   if (!req.user) {
  //     return next(new ErrorHandler("User not found", 404));
  //   }

  next();
});
