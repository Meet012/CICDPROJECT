import React, { useContext, useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid';
import expenseContext from '../context/expenses/expenseContext';
import ShowBudgets from './ShowBudgets';
import ShowExpense from './ShowExpense';

const Expense = () => {
    const [user, setUser] = useState(null);

    // All import from the context
    const context = useContext(expenseContext);
    const { addBudget, getBudget, option,addExpense,getAllExpense } = context;

    useEffect(() => {
        const fetchDetails = async () => {
            const token = localStorage.getItem('auth-token');
            const url = 'http://localhost:3000/api/v1/user/getUser'; // Replace with your API endpoint

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': `${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setUser(data.user); // Assuming the API response contains user details in `data.user`
                } else {
                    toast.error(data.error || 'Failed to fetch user details');
                }
            } catch (error) {
                // toast.error('An error occurred while fetching user details');
            }
        };
        fetchDetails();
        getBudget();
        getAllExpense();
    }, []);

    const [budget, setBudget] = useState({ name: '', amount: 0 });
    const [expense, setExpense] = useState({ name: '', amount: 0, category: '' });

    const handleBudgetChange = (e) => {
        const { name, value } = e.target;
        setBudget((prev) => ({ ...prev, [name]: value }));
    };

    const handleExpenseChange = (e) => {
        const { name, value } = e.target;
        setExpense((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddBudget = () => {
        if (budget.name && budget.amount) {
            if (addBudget(budget.name, budget.amount)) {
                toast.success("Your budget has been added");
            }
            setBudget({ name: "", amount: 0 });
        }
    };

    const handleAddExpense = () => {
        if (expense.name && expense.amount && expense.category) {
            addExpense(expense.name,expense.amount,expense.category);
            setExpense({ name: '', amount: '', category: '' });
        }
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Box sx={{ textAlign: 'left', mb: 5 }}>
                <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                    <span style={{ color: 'black' }}>Welcome back,</span>{' '}
                    <span style={{ color: 'hsl(183, 74%, 44%)' }}>{user ? `${user.username}!` : 'User'}</span>
                </Typography>
            </Box>

            {/* Budget and Expense Forms */}
            <Grid container spacing={2}>
                {/* Budget Form */}
                <Grid item xs={12} sm={6}>
                    <Box component={Paper} elevation={3} sx={{ p: 3 ,
                        border: `2px dotted black`, // Dotted border with custom color
                        borderRadius: '12px', // Rounded corners
                    }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Add New Budget</Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <TextField
                                label="Budget Name"
                                name="name"
                                value={budget.name}
                                onChange={handleBudgetChange}
                                fullWidth
                            />
                            <TextField
                                label="Amount"
                                name="amount"
                                type="number"
                                value={budget.amount}
                                onChange={handleBudgetChange}
                                fullWidth
                            />
                            <Button variant="contained" color="primary" sx={{ minWidth: '150px' }} onClick={handleAddBudget}>
                                Add Budget
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                {/* Expense Form */}
                <Grid item xs={12} sm={6}>
                    {/* Check if there is at least one option before rendering the expense form */}
                    {option.length > 0 ? (
                        <Box component={Paper} elevation={3} sx={{ p: 3 ,
                            border: `2px dotted black`, // Dotted border with custom color
                            borderRadius: '12px', // Rounded corners
                        }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Add New Expense</Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <TextField
                                    label="Expense Name"
                                    name="name"
                                    value={expense.name}
                                    onChange={handleExpenseChange}
                                    fullWidth
                                />
                                <TextField
                                    label="Amount"
                                    name="amount"
                                    type="number"
                                    value={expense.amount}
                                    onChange={handleExpenseChange}
                                    fullWidth
                                />
                                <FormControl fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        name="category"
                                        value={expense.category}
                                        onChange={handleExpenseChange}
                                    >
                                        {option.map((opt) => (
                                            <MenuItem key={opt._id} value={opt._id}>
                                                {opt.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button variant="contained" color="primary" sx={{ minWidth: '150px' }} onClick={handleAddExpense}>
                                    Add Expense
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        <></>
                    )}
                </Grid>

            </Grid>
            <ShowBudgets></ShowBudgets>
            <ShowExpense></ShowExpense>
        </Container>
    );
};

export default Expense;
