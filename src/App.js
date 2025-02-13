import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import ProductAdmin from "./components/ProductAdmin";
import Product from "./components/Product";
import Workshops from "./components/Workshops";
import WorkshopAdmin from "./components/WorkshopAdmin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/productadmin" element={<ProductAdmin />} />
        <Route path="/product" element={<Product />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/workshopadmin" element={<WorkshopAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;