import ErrorHandler from "../utils/errorHandlers.js";

export default (err, req, res, next) => {
  //here are going have the error status code and erroe message.
  let error = {
    statusCode: err.statusCode || 500,
    message: err?.message || "Internal Server Error",
  };

  //Handle Invalid Mongoose ID Error
  if (err.name === "CastError") {
    const message = `Resource  not found. Invalid: ${err?.path}`;
    error = new ErrorHandler(message, 400);
  }

  //Handle Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(message, 400);
  }

  //Development error and the Production errors
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(error.statusCode).json({
      message: error.message,
      error: err, //error itself
      stack: err.stack, //stack is where we track our error that product not found in file and it really big help in development.
    });
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
};
