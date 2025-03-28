import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ReportForm from "./components/ReportForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;