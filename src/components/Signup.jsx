import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Grid,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const host = "http://localhost:3000";
    const url = `${host}/api/v1/user/signup`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify({username:formData.username,email:formData.email,password:formData.password})
        });
        const json = await response.json();
        if(json.success){
          navigate('/login');
          toast.success("You have sign up");
          toast.success("Now please Login");
        }else{
          toast.error(json.error);
        }
    } catch (error) {
        console.error(error.message);
    }

  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>

      <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, bgcolor: "#f9f9f9" }}>
        {/* Icon code */}
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
          Create Your Account
        </Typography>
        {/* Form is form here */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={onChange}
                sx={{ background: "#ffffff", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                sx={{ background: "#ffffff", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={onChange}
                sx={{ background: "#ffffff", borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "primary.main",
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Button href="/login" sx={{ textDecoration: 'underline' }}>
                  Log In
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
