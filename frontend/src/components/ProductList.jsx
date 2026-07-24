import React, { useState, useEffect } from "react";
import { productAPI } from "../api";

function ProductList({ refresh, onEdit }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productAPI.delete(id);
        fetchProducts(); // Refresh list
      } catch (err) {
        alert("Failed to delete product");
        console.error("Error deleting product:", err);
      }
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          {product.imageUrl && (
            <img src={product.imageUrl} alt={product.name} />
          )}
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <p>{product.description}</p>
          <button onClick={() => onEdit(product)}>Edit</button>
          <button onClick={() => handleDelete(product._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
