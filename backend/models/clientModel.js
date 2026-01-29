import mongoose from "mongoose";

const clientSechma = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    business: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    invoice: [{ type: mongoose.Schema.Types.ObjectId, ref: "invoice" }],
  },
  { timestamps: true },
);

const clientModel =
  mongoose.models.client || mongoose.model("client", clientSechma);

export default clientModel;
