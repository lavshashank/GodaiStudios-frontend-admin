import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/workshops`)
      .then(res => setWorkshops(res.data))
      .catch(error => console.error("Error fetching workshops:", error));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Upcoming Workshops</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {workshops.map((workshop) => (
          <div key={workshop._id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "10px", textAlign: "center" }}>
            <img src={workshop.imageUrl} alt={workshop.name} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }} />
            <h3>{workshop.name}</h3>
            <p><b>Instructor:</b> {workshop.instructor}</p>
            <p><b>Date:</b> {new Date(workshop.date).toDateString()}</p>
            <p><b>Time:</b> {workshop.time}</p>
            <p><b>Location:</b> {workshop.location}</p>
            <p><b>Slots Available:</b> {workshop.slotsAvailable}</p>
            <p><b>Price:</b> ₹{workshop.price}</p>
            <button style={{ background: "blue", color: "white", padding: "10px", border: "none", cursor: "pointer", borderRadius: "5px" }}>Register</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workshops;