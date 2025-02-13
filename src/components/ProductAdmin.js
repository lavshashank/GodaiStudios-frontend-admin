import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({ 
    name: "", capacity: "", materialType: "", glaze: "", firingTemp: "", discount: "", mrp: "", price: "", 
    dimensions: "", coneType: "", description: "", imageUrl: "", category: "", stock: 0 
  });
  const [editProduct, setEditProduct] = useState(null); // Track product being edited

  useEffect(() => {
    axios.get(`${API_URL}/products`).then(res => setProducts(res.data));
  }, []);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      alert("Name and Price are required!");
      return;
    }
    
    try {
      if (editProduct) {
        // Update existing product
        await axios.put(`${API_URL}/products/${editProduct._id}`, productForm);
        setProducts(products.map((p) => (p._id === editProduct._id ? { ...p, ...productForm } : p)));
        setEditProduct(null);
      } else {
        // Add new product
        const res = await axios.post(`${API_URL}/products`, productForm);
        setProducts([...products, res.data]);
      }

      setProductForm({ name: "", capacity: "", materialType: "", glaze: "", firingTemp: "", discount: "", mrp: "", price: "", dimensions: "", coneType: "", description: "", imageUrl: "", category: "", stock: 0 });
    } catch (error) {
      console.error("Error adding/updating product:", error);
    }
  };

  const handleProductDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${API_URL}/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = (product) => {
    setProductForm(product);
    setEditProduct(product);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>{editProduct ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleProductSubmit} style={{ display: "grid", gap: "10px", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
        {Object.keys(productForm).map((key) => (
          <input
            key={key}
            type={key === "price" || key === "stock" ? "number" : "text"}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={productForm[key]}
            onChange={(e) => setProductForm({ ...productForm, [key]: e.target.value })}
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        ))}
        <button type="submit" style={{ background: editProduct ? "#ffa500" : "#007bff", color: "white", padding: "10px", cursor: "pointer", border: "none", borderRadius: "5px" }}>
          {editProduct ? "Update Product" : "Add Product"}
        </button>
        {editProduct && (
          <button
            type="button"
            onClick={() => {
              setProductForm({ name: "", capacity: "", materialType: "", glaze: "", firingTemp: "", discount: "", mrp: "", price: "", dimensions: "", coneType: "", description: "", imageUrl: "", category: "", stock: 0 });
              setEditProduct(null);
            }}
            style={{ background: "#6c757d", color: "white", padding: "10px", cursor: "pointer", border: "none", borderRadius: "5px" }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <h2 style={{ marginTop: "30px", textAlign: "center", color: "#333" }}>Existing Products</h2>
      <div style={{ display: "grid", gap: "20px" }}>
        {products.map((p) => (
          <div key={p._id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "10px", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src={p.imageUrl} alt={p.name} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px" }} />
              <div>
                <h4 style={{ margin: "0", color: "#333" }}>{p.name}</h4>
                <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>₹{p.price}</p>
                <p style={{ margin: "0", fontSize: "12px", color: "#999" }}>{p.description}</p>
              </div>
            </div>
            <div>
              <button onClick={() => handleEditClick(p)} style={{ background: "#ffa500", color: "white", padding: "5px 10px", cursor: "pointer", border: "none", borderRadius: "5px", marginRight: "5px" }}>Edit</button>
              <button onClick={() => handleProductDelete(p._id)} style={{ background: "red", color: "white", padding: "5px 10px", cursor: "pointer", border: "none", borderRadius: "5px" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAdmin;