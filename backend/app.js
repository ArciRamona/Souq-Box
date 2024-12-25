// main entry files

import express from "express";
const app = express(); // to register our routes and listen on some port.
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";

// =================================================
//Handled unchaught exeptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});
// =================================================

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
app.use(express.json());
app.use(cookieParser()); // express.json connected from postman

// =================================================

// =================================================
//Import all routes
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
// =================================================

// =================================================
//Using Error middleware
app.use(errorMiddleware);

// =================================================

// =================================================
//App listining to process env PORT
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
// =================================================

//Handle unhandled Promise rejections
//Make sure that if having any unhandled PROMISE REJECTIONS it will shut down the server and we to wait until the error was fixed
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
