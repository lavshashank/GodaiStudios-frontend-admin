import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/WorkshopAdmin.css";


const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const WorkshopAdmin = () => {
  const [workshops, setWorkshops] = useState([]);
  const [workshopForm, setWorkshopForm] = useState({
    name: "",
    instructor: "",
    description: "",
    time: "",
    date: "",
    location: "",
    slotsAvailable: 0,
    price: "",
    imageUrl: "",
  });

  const [editingWorkshop, setEditingWorkshop] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/workshops`).then((res) => setWorkshops(res.data));
  }, []);

  const handleWorkshopSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingWorkshop) {
        // Edit existing workshop
        await axios.put(`${API_URL}/workshops/${editingWorkshop._id}`, workshopForm);
        setWorkshops(workshops.map((w) => (w._id === editingWorkshop._id ? { ...workshopForm, _id: w._id } : w)));
      } else {
        // Add new workshop
        const res = await axios.post(`${API_URL}/workshops`, workshopForm);
        setWorkshops([...workshops, res.data]);
      }
      setWorkshopForm({ name: "", instructor: "", description: "", time: "", date: "", location: "", slotsAvailable: 0, price: "", imageUrl: "" });
      setEditingWorkshop(null);
    } catch (error) {
      console.error("Error saving workshop:", error);
    }
  };

  const handleWorkshopDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/workshops/${id}`);
      setWorkshops(workshops.filter((w) => w._id !== id));
    } catch (error) {
      console.error("Error deleting workshop:", error);
    }
  };

  const handleEdit = (workshop) => {
    setWorkshopForm(workshop);
    setEditingWorkshop(workshop);
  };

  return (
    <div className="workshop-admin-container">
      <h2>Manage Workshops</h2>

      {/* Workshop Form */}
      <form onSubmit={handleWorkshopSubmit} className="workshop-form">
        {Object.keys(workshopForm).map((key) => (
          <input
            key={key}
            type={key === "price" || key === "slotsAvailable" ? "number" : key === "date" ? "date" : key === "time" ? "time" : "text"}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={workshopForm[key]}
            onChange={(e) => setWorkshopForm({ ...workshopForm, [key]: e.target.value })}
            required
          />
        ))}
        <button type="submit" className="submit-btn">
          {editingWorkshop ? "Update Workshop" : "Add Workshop"}
        </button>
      </form>

      {/* Existing Workshops */}
      <h3>Existing Workshops</h3>
      <div className="workshop-grid">
        {workshops.length === 0 ? (
          <p>No workshops available.</p>
        ) : (
          workshops.map((w) => (
            <div key={w._id} className="workshop-card">
              <h4>{w.name}</h4>
              <p><strong>Instructor:</strong> {w.instructor}</p>
              <p><strong>Date:</strong> {w.date}</p>
              <p><strong>Price:</strong> ₹{w.price}</p>
              <div className="workshop-actions">
                <button onClick={() => handleEdit(w)} className="edit-btn">Edit</button>
                <button onClick={() => handleWorkshopDelete(w._id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkshopAdmin;