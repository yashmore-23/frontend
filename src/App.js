// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import GoalList from "./components/GoalList";
import GoalForm from "./components/GoalForm";
import ReminderList from "./components/ReminderList";
import RoadmapAI from "./components/RoadmapAI";
import Home from "./components/Home";

import { useAuth } from "./context/AuthContext";

// RequireAuth wrapper to protect private routes
const RequireAuth = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Publicly viewable goals list */}
        <Route path="/goals" element={<GoalList />} />

        {/* Protected routes */}
        <Route
          path="/goals/create"
          element={
            <RequireAuth>
              <GoalForm />
            </RequireAuth>
          }
        />
        <Route
          path="/reminders"
          element={
            <RequireAuth>
              <ReminderList />
            </RequireAuth>
          }
        />
        <Route
          path="/roadmap"
          element={
            <RequireAuth>
              <RoadmapAI />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

