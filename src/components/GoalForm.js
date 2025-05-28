import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api';

const GoalForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      alert("No token found. Please login again.");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/goals/", {
        title,
        description,
        due_date: dueDate,
      });
      console.log("Goal created:", response.data);
      navigate("/goals");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create goal. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Goal
        </Typography>
        {error && (
          <Typography variant="body1" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleGoalSubmit} style={{ width: '100%' }}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            label="Due Date"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            fullWidth 
            sx={{ mt: 2 }}
          >
            Create Goal
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default GoalForm;
