import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';

const RoadmapAI = () => {
  const [goalId, setGoalId] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission to generate roadmap
  const handleGenerateRoadmap = async () => {
    if (!goalId) {
      setError('Please provide a goal ID.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Make API call to the backend to generate roadmap
      const response = await axios.post('http://127.0.0.1:8000/generate-roadmap', { goal_id: goalId });
      setRoadmap(response.data.roadmap);
    } catch (err) {
      setError('Failed to generate roadmap. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Generate Roadmap to Achieve Your Goal
      </Typography>
      <TextField
        label="Goal ID"
        variant="outlined"
        fullWidth
        value={goalId}
        onChange={(e) => setGoalId(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateRoadmap}
        disabled={loading}
        sx={{ marginBottom: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Generate Roadmap'}
      </Button>

      {error && <Typography color="error">{error}</Typography>}

      {roadmap && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6">Your Roadmap:</Typography>
          <Typography>{roadmap}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default RoadmapAI;

