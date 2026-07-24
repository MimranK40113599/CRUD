import React, { useState, useEffect } from "react";
import { productAPI } from "../api";

function ProductForm({ product, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      resetForm();
    }
  }, [product]);

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      imageUrl: "",
      category: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (product) {
        // Update
        await productAPI.update(product._id, formData);
      } else {
        // Create
        await productAPI.create(formData);
      }
      resetForm();
      onSuccess(); // Refresh the product list
    } catch (err) {
      setError(err.response?.data?.error || "Operation failed");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{product ? "Edit Product" : "Add New Product"}</h2>

      {error && <div className="error">{error}</div>}

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={handleChange}
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : product ? "Update" : "Add"} Product
      </button>
      {product && (
        <button type="button" onClick={resetForm}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default ProductForm;
