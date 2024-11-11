import React, { useContext } from 'react';
import expenseContext from '../context/expenses/expenseContext';
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { format } from 'date-fns'; // Import this if you wish to format the date

import ExpenseSingle from './ExpenseSingle';

const ShowExpense = () => {
  const context = useContext(expenseContext);
  const { allExpense, allbudget } = context;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Showing Expenses
      </Typography>
      <List>
        {allExpense && allExpense.length > 0 ? (
          // Reverse the array to display the latest expenses first
          [...allExpense].reverse().map((expense, index) => {
            // Find the budget name that matches the budgetId in the expense
            const budget = allbudget.find(b => b._id === expense.budget);
            const budgetName = budget ? budget.name : 'Unknown Budget';

            const TestColor = budget ? budget.color : 'blac';
            
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
  );
};

export default ShowExpense;
