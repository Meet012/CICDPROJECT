import React, { useContext } from 'react';
import { Container, Grid ,Typography} from '@mui/material';
import Budget from './Budget';
import expenseContext from '../context/expenses/expenseContext';

const ShowBudgets = () => {

    const context = useContext(expenseContext);
    const { allbudget } = context;

    const colors = ['#FF7F50', '#4682B4', '#8A2BE2', '#FF6347', '#20B2AA'];

    return (
        <Container sx={{mt:6}}>
            <Typography component="h3" variant='h3' sx={{fontWeight:'bold', mb:3}}>
                Existing Budgets
            </Typography>
            <Grid container spacing={2}>
                {allbudget.map((b, index) => (
                    <Grid item xs={12} sm={6} md={4} key={b._id}>
                        <Budget
                            name={b.name}
                            amountAllocated={b.amount}
                            amountSpent={b.spend}
                            color={b.color}
                            _id={b._id}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ShowBudgets;
