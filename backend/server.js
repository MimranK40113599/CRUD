import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import {
  createProduct,
  AllProducts,
  OneProduct,
  updateProduct,
  deleteProduct,
} from "./controllers/productControllers.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// CRUD Routes
// CREATE
app.post("/api/products", createProduct);

// READ ALL
app.get("/api/products", AllProducts);

// READ ONE
app.get("/api/products/:id", OneProduct);

// UPDATE
app.put("/api/products/:id", updateProduct);

// DELETE
app.delete("/api/products/:id", deleteProduct);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
