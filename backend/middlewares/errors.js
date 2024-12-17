export default (err, req, res, next) => {
  //here are going have the error status code and erroe message.
  let error = {
    statusCode: err.statusCode || 500,
    message: err?.message || "Internal Server Error",
  };

  res.status(error.statusCode).json({
    message: error.message,
  });
};
