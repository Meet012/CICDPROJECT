import React from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import { Link, useLocation, useNavigate } from 'react-router-dom';
// rrd imports
import { Form, NavLink } from "react-router-dom"

// library
import { TrashIcon } from '@heroicons/react/24/solid'


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine the current tab based on the pathname
  const currentPath = location.pathname;
  const tabIndex = currentPath === '/' ? 0
                :  currentPath === '/budget' ? 2
                : currentPath === '/about' ? 1
                : false;

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/login');
  };

  return (
    <React.Fragment>
      <AppBar position="relative" sx={{ background: "#063970" }}>
        <Toolbar>
          <AddBusinessRoundedIcon
            aria-label="Home"
            sx={{ transform: "scale(2)" }}
          />
          <Tabs
            sx={{ml:3}}
            indicatorColor="secondary"
            textColor="inherit"
            value={tabIndex}
          >
            <Tab label="Home" component={Link} to="/" />
            <Tab label="About Us" component={Link} to="/about" />
            {localStorage.getItem('auth-token')?(
            <Tab label="Budget" component={Link} to="/budget" />
            ):(<></>)}
          </Tabs>
          {localStorage.getItem('auth-token') ? (
            <Button
              sx={{ marginLeft: "auto" }}
              variant="contained"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                sx={{ marginLeft: "auto" }}
                variant="contained"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                sx={{ marginLeft: "10px" }}
                variant="contained"
                component={Link}
                to="/signup"
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
