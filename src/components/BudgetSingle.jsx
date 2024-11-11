import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import expenseContext from '../context/expenses/expenseContext';
import { Card, CardContent, Typography, LinearProgress, Box, Button, Grid, TextField, Paper,List } from '@mui/material';
import ExpenseSingle from './ExpenseSingle';
const BudgetSingle = () => {

    // State for getting the specified color
    const locaiton = useLocation();
    const newColor = locaiton.state;


    const context = useContext(expenseContext);
    const { getBudgetById, currBudget, addExpense, getExpenseById, allExpense } = context;
    const { id } = useParams();


    useEffect(() => {
        getBudgetById(id);
        getExpenseById(id);
    }, []);

    const amountLeft = currBudget.amount - currBudget.spend; // Calculate remaining budget
    const progress = (currBudget.spend / currBudget.amount) * 100; // Calculate progress percentage

    const [expense, setExpense] = useState({ name: '', amount: 0, category: id });

    const handleExpenseChange = (e) => {
        const { name, value } = e.target;
        setExpense((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddExpense = () => {
        if (expense.name && expense.amount && expense.category) {
            console.log(expense.name, expense.amount, expense.category);
            addExpense(expense.name, expense.amount, expense.category);
            setExpense({ name: '', amount: '', category: id });
        }
    };

    return (
        <div style={{ padding: '20px 40px', paddingTop: '40px', background: 'linear-gradient(to bottom, #f5f5f5, #e0f7fa)', height: 'auto',minHeight:'90vh' }}>
            <Typography variant="h3" sx={{ mb: 3, fontWeight: 'bold' }}>
                <span style={{ color: newColor }}>{currBudget.name}</span> Overview
            </Typography>

            <Grid container spacing={0}>
                {/* Budget Overview Card */}
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            width: '100%',
                            maxWidth: 650,
                            height: 200,
                            borderRadius: 3,
                            backgroundColor: 'white',
                            borderColor: newColor,
                            borderWidth: 2,
                            borderStyle: 'solid',
                            color: newColor,
                            p: 1,
                        }}
                    >
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {currBudget.name}
                                </Typography>
                                <Typography variant="body2">Allocated: ${currBudget.amount}</Typography>
                            </Box>

                            <Box mt={2}>
                                <LinearProgress
                                    variant="determinate"
                                    value={progress}
                                    sx={{
                                        height: 8,
                                        borderRadius: 5,
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: newColor,
                                        },
                                    }}
                                />
                                <Box display="flex" justifyContent="space-between" mt={1}>
                                    <Typography variant="body2" sx={{ color: newColor }}>
                                        Spent: ${currBudget.spend}
                                    </Typography>
                                    <Typography variant="body2">
                                        ${amountLeft} remaining
                                    </Typography>
                                </Box>
                            </Box>

                            <Box mt={2} display="flex" justifyContent="center">
                                <Button variant="contained" sx={{ backgroundColor: 'red', color: 'white' }}>
                                    Delete Budget
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Add Expense Form */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{
                        p: 3,
                        border: `2px dotted ${newColor}`, // Dotted border with custom color
                        borderRadius: '12px', // Rounded corners
                    }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Add New Expense in <span style={{ color: newColor }}>{currBudget.name}</span>
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                            <TextField
                                label="Expense Name"
                                name="name"
                                value={expense.name}
                                onChange={handleExpenseChange}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'rgba(0, 0, 0, 0.23)', // Default color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: newColor, // Color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: newColor, // Color on focus
                                        },
                                    },
                                }}
                            />
                            <TextField
                                label="Amount"
                                name="amount"
                                type="number"
                                value={expense.amount}
                                onChange={handleExpenseChange}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'rgba(0, 0, 0, 0.23)', // Default color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: newColor, // Color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: newColor, // Color on focus
                                        },
                                    },
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ minWidth: '150px', backgroundColor: newColor }}
                                onClick={handleAddExpense}
                            >
                                Add Expense
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <div>
                <Typography variant="h4" gutterBottom>
                    Showing Expenses
                </Typography>
                <List>
                    {allExpense && allExpense.length > 0 ? (
                        // Reverse the array to display the latest expenses first
                        [...allExpense].reverse().map((expense, index) => {
                            // Find the budget name that matches the budgetId in the expense
                            const budgetName = currBudget.name;
                            const TestColor = newColor;
                            return (
                                <React.Fragment key={expense._id || index}>
                                    <ExpenseSingle expense={expense} budgetName={budgetName} color={TestColor}></ExpenseSingle>
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <Typography variant="body1">No expenses to show.</Typography>
                    )}
                </List>
            </div>
        </div>
    );
};

export default BudgetSingle;
