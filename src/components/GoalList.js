// src/components/GoalList.js

import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import API from "../api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 👈 Import useAuth

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [roadmaps, setRoadmaps] = useState({});
  const { token } = useAuth(); // 👈 Get token

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await API.get("/goals/");
        setGoals(response.data);
      } catch (err) {
        setError("Failed to fetch goals. Please log in again.");
      }
    };

    if (token) fetchGoals();
  }, [token]);

  const handleGenerateRoadmap = async (goalId) => {
    setLoadingId(goalId);
    try {
      const response = await API.post(`/goals/${goalId}/roadmap`);
      setRoadmaps((prev) => ({ ...prev, [goalId]: response.data.roadmap }));
    } catch (err) {
      setError("Failed to generate roadmap.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" gutterBottom>
          Your Goals
        </Typography>
        {token && ( // 👈 Only show if logged in
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/goals/create"
          >
            Create Goal
          </Button>
        )}
      </Box>

      {error && (
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        {goals.length === 0 ? (
          <Typography variant="h6">
            No goals found. {token ? "Please create a new goal." : "Login to view your goals."}
          </Typography>
        ) : (
          goals.map((goal) => (
            <Grid item xs={12} sm={6} md={4} key={goal.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography variant="h6">{goal.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {goal.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Due Date: {goal.due_date}
                  </Typography>
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Link to={`/goals/${goal.id}`}>
                      <Button variant="outlined" color="primary">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleGenerateRoadmap(goal.id)}
                      disabled={loadingId === goal.id}
                    >
                      {loadingId === goal.id ? <CircularProgress size={20} /> : "Generate Roadmap"}
                    </Button>
                  </Box>
                  {roadmaps[goal.id] && (
                    <Box sx={{ mt: 2, p: 1, bgcolor: "#f5f5f5", borderRadius: 2 }}>
                      <Typography variant="subtitle2">Roadmap:</Typography>
                      <Typography variant="body2" whiteSpace="pre-line">
                        {roadmaps[goal.id]}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default GoalList;

