import mongoose from "mongoose";

const invoiceSechma = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "client" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  },
  { timestamps: true },
);

const invoiceModel =
  mongoose.models.invoice || mongoose.model("invoice", invoiceSechma);

export default invoiceModel;
