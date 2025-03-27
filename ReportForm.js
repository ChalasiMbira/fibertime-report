import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ReportForm = () => {
  const [technician, setTechnician] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "reports"), {
        technician,
        date,
        startTime,
        endTime,
        notes,
        userId: auth.currentUser.uid,
        submittedAt: new Date().toISOString(),
      });
      alert("Report submitted successfully!");
      setTechnician("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setNotes("");
    } catch (error) {
      console.error("Submit Error:", error.message);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>FiberTime Report</h1>
      <button onClick={handleLogout} style={{ float: "right" }}>
        Logout
      </button>
      <form onSubmit={handleSubmit}>
        <label>
          Technician Name:
          <input
            type="text"
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </label>
        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </label>
        <label>
          Notes:
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ width: "100%", height: "100px", marginBottom: "10px" }}
          />
        </label>
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReportForm;