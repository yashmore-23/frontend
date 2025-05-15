// src/components/ReminderList.js

import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Card, CardContent, Button, Grid } from "@mui/material";
import axios from "axios";

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://127.0.0.1:8000/reminders/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReminders(response.data);
      } catch (err) {
        setError("Failed to fetch reminders.");
      }
    };
    fetchReminders();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Reminders
        </Typography>
        {error && <Typography variant="body1" color="error">{error}</Typography>}
        <Grid container spacing={3}>
          {reminders.length === 0 ? (
            <Typography variant="h6">No reminders found.</Typography>
          ) : (
            reminders.map((reminder) => (
              <Grid item xs={12} sm={6} md={4} key={reminder.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{reminder.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{reminder.description}</Typography>
                    <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                      View Reminder
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default ReminderList;

