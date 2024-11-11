import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Email:", loginData.email, "Password:", loginData.password);
    // Add login logic here, like API requests to login endpoint

    const host = "http://localhost:3000";
    const url = `${host}/api/v1/user/login`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email:loginData.email,password:loginData.password})
        });
        const json = await response.json();

        if(json.success){
          localStorage.setItem('auth-token',json.token);
          toast.success("Login Successful");
          navigate('/');
        }else{
          toast.error(json.error);
        }
    } catch (error) {
        console.error(error.message);
    }

  };

  const onChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ padding: 3, borderRadius: 3, bgcolor: "#f9f9f9" }}>
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
          Log In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={loginData.email}
            onChange={onChange}
            sx={{ background: "#ffffff", borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={loginData.password}
            onChange={onChange}
            sx={{ background: "#ffffff", borderRadius: 1 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Log In
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                Don’t have an account?{" "}
                <Button href="/signup" sx={{ textDecoration: "underline" }}>
                  Sign Up
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
