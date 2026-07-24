import mongoose from "mongoose";
// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Product", productSchema);
