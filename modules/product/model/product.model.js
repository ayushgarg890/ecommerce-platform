const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    holdStock: {
      type: Number,
      min: 0,
      default:0
    },
  },
  { timestamps: true }
);

productSchema.index({ name: 1 }, { unique: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
