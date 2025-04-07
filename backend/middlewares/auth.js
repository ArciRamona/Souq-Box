// Protect Route from Unauthorized Users

import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandlers.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Check if the user is authenticated
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // Ensure you have `cookie-parser` middleware setup in your app

  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401)); // 401 for unauthorized
  }

  try {
    // Verify token and get the decoded user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user details from the database
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    next();
  } catch (error) {
    return next(
      new ErrorHandler("Invalid or expired token, please login again", 401)
    );
  }
});

//Authorize User Roles and Permissions
// Authorized User Roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acess this resource`,
          403
        )
      ); //I change the email on mongoDB compass from "user" to "admin" I mean my own email
    }

    next();
  };
};
