// main entry files

import express from "express";
const app = express(); // to register our routes and listen on some port.
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";

// =================================================
// Load environment variables from.env file.
dotenv.config({ path: "backend/config/config.env" });
// =================================================

// =================================================
//Connecting to database
connectDatabase();
// =================================================

// =================================================
// Middlewares
app.use(express.json()); // express.json connected from postman
// =================================================

// =================================================
//Import all routes
import productRoutes from "./routes/products.js";

app.use("/api/v1", productRoutes);
// =================================================

// =================================================
//Using Error middleware
app.use(errorMiddleware);
// =================================================

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//Handle unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
