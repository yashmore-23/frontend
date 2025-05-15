// src/components/LoginForm.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); // Hook to navigate after login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", new URLSearchParams({ username, password }));
      console.log("Login response:", res.data);  // Check the response
      if (res.data.access_token) {
        login(res.data.access_token);  // Store the token
        localStorage.setItem("token", res.data.access_token);  // Store the token explicitly
        navigate("/home");  // Redirect to the home page after login
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" mb={2}>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
      </form>
    </Paper>
  );
};

export default LoginForm;

