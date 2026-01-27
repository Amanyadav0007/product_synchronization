import mongoose from "mongoose";

const productSechma = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true, unique: true },
    price: { type: String },
    quantity: { type: Number },
  },
  { timestamps: true },
);

const productModel =
  mongoose.models.product || mongoose.model("product", productSechma);

export default productModel;
