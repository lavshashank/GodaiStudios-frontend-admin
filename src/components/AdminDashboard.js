import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/AdminDashboard.css";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get(`${API_URL}/products`);
        const workshopRes = await axios.get(`${API_URL}/workshops`);
        setProducts(productRes.data);
        setWorkshops(workshopRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/productadmin">Manage Products</Link>
            </li>
            <li>
              <Link to="/workshopadmin">Manage Workshops</Link>
            </li>
            <li>
              <Link to="/workshops">Our Workshops</Link>
            </li>
            <li>
              <Link to="/product">Our Products</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Dashboard Content */}
      <main className="dashboard-content">
        <h2>Welcome to Admin Dashboard</h2>
        <p>Manage your products and workshops easily from here.</p>

        {loading ? (
          <p>Loading data...</p>
        ) : (
          <>
            {/* Products Section */}
            <section>
              <h3>Current Products</h3>
              {products.length === 0 ? (
                <p>No products available.</p>
              ) : (
                <div className="product-grid">
                  {products.map((product) => (
                    <div key={product._id} className="product-card">
                      <img src={product.imageUrl} alt={product.name} />
                      <h4>{product.name}</h4>
                      <p>₹{product.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Workshops Section */}
            <section>
              <h3>Current Workshops</h3>
              {workshops.length === 0 ? (
                <p>No workshops available.</p>
              ) : (
                <div className="workshop-grid">
                  {workshops.map((workshop) => (
                    <div key={workshop._id} className="workshop-card">
                      <h4>{workshop.title}</h4>
                      <p>{workshop.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;