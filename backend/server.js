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
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;
console.log("Connection String is This: ", process.env.MONGODB_URI);
console.log("Port Numberis This: ", process.env.PORT);
// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });

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
