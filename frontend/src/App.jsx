import React, { useState } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleSuccess = () => {
    setRefresh(!refresh);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  return (
    <div className="App">
      <h1>Product Management System</h1>

      <div className="container">
        <ProductForm product={editingProduct} onSuccess={handleSuccess} />

        <ProductList refresh={refresh} onEdit={handleEdit} />
      </div>
    </div>
  );
}

export default App;
