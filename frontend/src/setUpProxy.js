const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3004", // Change to 3004
      changeOrigin: true,
    })
  );
};

// In this file, we're using the createProxyMiddleware function from http-proxy-middleware to create a proxy middleware for our backend API. This middleware will forward all requests that start with "/api" to the backend server running at "http://localhost:3004".
