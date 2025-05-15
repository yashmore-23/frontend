// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // Import the useAuth hook
import { Button, AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  const { token, logout } = useAuth();  // Use the AuthContext

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Goal Tracker
          </Link>
        </Typography>
        {token ? (  // If logged in, show the Logout button
          <Button color="inherit" onClick={logout}>Logout</Button>
        ) : (  // If not logged in, show the Login and Sign Up buttons
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

