import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { FaTrashAlt } from 'react-icons/fa';  // Import trash icon from react-icons
import { format } from 'date-fns'; // Import this to format the date

const ExpenseSingle = ({ expense, budgetName, onDelete, color }) => {
  // Format the date (assuming expense.createdAt is a valid date string)
  const formattedDate = expense.createdAt ? format(new Date(expense.createdAt), 'PPpp') : 'No date available';

  return (
    <Card 
      variant="outlined" 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
        p: 1,
        boxShadow: 1,
        backgroundColor: '#f9fafb',  // Light background color for the card
        border: `2px dotted ${color}`, // Dotted border with custom color
        borderRadius: '12px',
        '&:hover': {
          backgroundColor: '#f1f5f9',  // Slightly darker shade on hover
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
          <span style={{color:color}}>
            {expense.name}
          </span>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <span style={{color:color}}>
            
            Amount: <span style={{fontWeight:'bold'}}>${expense.amount}</span> | Budget: <span style={{fontWeight:'bold'}}>{budgetName}</span> | Created: {formattedDate}
          </span>
        </Typography>
      </CardContent>
      <IconButton 
        onClick={() => onDelete(expense._id)} 
        color='error' 
        aria-label="delete"
        sx={{ color: color }}  // Change the color of the delete icon

      >
        <FaTrashAlt /> {/* Render the trash icon */}
      </IconButton>
    </Card>
  );
}
export default ExpenseSingle;
