//Handling product resource like product, user and order. Every resource have diff. structure like PRODUCT we have product name, product price, product description, images, rating.
//These are all the fields or Structures of the product

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // the mongoose.schema we have to pass here the options or the fields ex. product name, price etc.
    name: {
      type: String,
      required: [true, "Please enter product name"],
      maxLength: [200, "Product name cannot exceed 200 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLength: [5, "Product price cannot exceed 5 digits"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
        },
      },
    ], //going to host our images on Cloudinary, a very popular image hosting website.
    // From cloudinary we will get 2 value one of that is going to be ID of that image, and the URL of that image that we have to pass in the image component to display the image.
    category: {
      type: String,
      required: [true, "Please enter product categotry"],
      enum: {
        values: [
          "Electronics",
          "Cameras",
          "Laptops",
          "Accessories",
          "Headphones",
          "Food",
          "Books",
          "Sports",
          "Outdoor",
          "Home",
        ],
        message: "Please select correct category",
      },
    },
    seller: {
      type: String,
      required: [true, "Please enter product seller"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    //We can separate this schema but for now only small project so I will just put and save here the RATING, the COMMENT and then the user that has given that reviews.
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, //The timestamps option tells mongoose to assign createdAt and updatedAt fields to your schema. The type assigned is Date.
    //By default, the names of the fields are createdAt and updatedAt. Customize the field names by setting timestamps.createdAt and timestamps.updatedAt.
  }
);

export default mongoose.model("Product", productSchema);
