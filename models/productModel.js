const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  image: {
    type: String,
    required: [true, "Product image URL is required"],
  },
  productDescription: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  department: {
    type: String,
    required: [true, "Please Enter Product Department"],
  },
  id: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    default: "No",
  }
});

module.exports = mongoose.model("Product", productSchema);
