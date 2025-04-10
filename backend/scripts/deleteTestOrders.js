import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "../models/order.js"; // make sure the path is correct

dotenv.config();

const deleteTestOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🛠 Connected to MongoDB");

    const result = await Order.deleteMany({
      user: "67697619ec0d7206c2038949",
      paymentMethod: "Cash on Delivery",
      "paymentInfo.status": "Not Paid",
    });

    console.log(`🧹 Deleted ${result.deletedCount} test orders`);
    process.exit();
  } catch (error) {
    console.error("❌ Error deleting test orders:", error.message);
    process.exit(1);
  }
};

deleteTestOrders();
