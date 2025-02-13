import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Our Products</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "10px", textAlign: "center" }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }} />
            <h3>{product.name}</h3>
            <p><b>Price:</b> ₹{product.price} <span style={{ textDecoration: "line-through", color: "red" }}>{product.mrp}</span></p>
            <p><b>Material:</b> {product.materialType}</p>
            <p><b>Glaze:</b> {product.glaze}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;