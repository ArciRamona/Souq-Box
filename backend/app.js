// main entry files

import express from "express";
import cors from "cors"; // Import CORS if your frontend and backend are on different domains
const app = express(); // to register our routes and listen on some port.
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";

import multer from "multer";
const upload = multer(); // For handling multipart form data
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
// Load .env BEFORE using process.env variables
dotenv.config({ path: "backend/config/config.env" });

// =================================================

// =================================================
//Connecting to database
connectDatabase();
// =================================================

// =================================================
// Middlewares
app.use(express.json({ limit: "5mb" }));
app.use(upload.single("avatar")); // If you're handling file uploads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing) for development if needed
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // express.json connected from postman

// =================================================

// =================================================
//Import all routes
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/paymentss.js"; // 3 stripe -> to frontend redux-> api -> to order.js
import webhookRoutes from "./routes/webhook.js";

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1", webhookRoutes);
app.use("/api/v1", webhookRoutes);
// =================================================
// Use your product routes here

// =================================================
//App listining to process env PORT
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
// =================================================

// Define your endpoint
app.post("/api/v1/me/upload_avatar", (req, res) => {
  // Your logic for uploading the avatar
});

//Handle unhandled Promise rejections
//Make sure that if having any unhandled PROMISE REJECTIONS it will shut down the server and we to wait until the error was fixed
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});

// =================================================

// Error Handler (should always be the last middleware)
//Using Error middleware
app.use(errorMiddleware);

// =================================================
