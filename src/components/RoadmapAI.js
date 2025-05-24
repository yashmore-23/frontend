// src/components/RoadmapAI.js

import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";

function RoadmapAI() {
  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:8000/roadmap/generate-roadmap/", {
        goal,
      });
      setRoadmap(response.data.roadmap);
    } catch (err) {
      console.error(err);
      setError("Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "2rem", maxWidth: 700, margin: "2rem auto" }}>
      <Typography variant="h5" gutterBottom>
        Generate AI Roadmap
      </Typography>
      <TextField
        label="Enter your goal"
        fullWidth
        margin="normal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Roadmap"}
      </Button>

      {error && <Typography color="error" style={{ marginTop: "1rem" }}>{error}</Typography>}

      {roadmap && (
        <Paper style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#f4f4f4" }}>
          <Typography variant="h6">AI Roadmap</Typography>
          <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
            {roadmap}
          </Typography>
        </Paper>
      )}
    </Paper>
  );
}

export default RoadmapAI;

