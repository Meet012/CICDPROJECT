// App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Importing all the pages
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Signup from './components/Signup';
import Expense from './components/Expense';
import BudgetSingle from "./components/BudgetSingle";

// Toast Library import for pop Up
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import default styles

// Importing the state
import ExpenseState from './context/expenses/ExpenseState';

// Importing the navbar
import Navbar from './components/Navbar';

// CSS Reset styles
import './App.css';

// Import wave image
import wave from './assets/wave.svg'; // Update the path as needed
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <ExpenseState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/budget' element={<Expense />} />
            <Route path='/budget/:id' element={<BudgetSingle />} />
          </Routes>
        <ToastContainer />
        </BrowserRouter>
      </ExpenseState>

      {/* Wave Image */}
    </>
  );
}

export default App;
