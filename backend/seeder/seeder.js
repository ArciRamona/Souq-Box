//Create a Data Seeder = seeder will help to add multiple products in the database
// so we dont have to enter manually one by one

import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/products.js";

const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/soukboxit"); // Had to pass in here the connection string and we have to push in the local database

    //Now just have to push our products
    await Product.deleteMany();
    console.log("Products are deleted");

    await Product.insertMany(products);
    console.log("Products are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
