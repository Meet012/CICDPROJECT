import React, { useContext, useEffect } from 'react';
import { Card, CardContent, Typography, LinearProgress, Box, Button} from '@mui/material';
import {Link} from 'react-router-dom';

import expenseContext from '../context/expenses/expenseContext';


const Budget = ({ name, amountAllocated, amountSpent, color, _id }) => {
  const context = useContext(expenseContext);
  const {setBudgetColor} = context;
  const amountLeft = amountAllocated - amountSpent; // Calculate remaining budget
  const progress = (amountSpent / amountAllocated) * 100; // Calculate progress percentage
  const onViewDetails = ()=>{
    setBudgetColor(color);
  };
  return (
    <Card
      sx={{
        width: '100%', // Adjusted to take full width
        maxWidth: 400, // Set max width for better control on larger screens
        height: 180, // Decrease the height for a more compact card
        borderRadius: 3,
        backgroundColor: 'white',
        borderColor: color,
        borderWidth: 2,
        borderStyle: 'solid',
        color: color,
        p: 1,
        mb: 3,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
          <Typography variant="body2">Allocated: ${amountAllocated}</Typography>
        </Box>
        
        <Box mt={2}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8, // Slightly thinner progress bar
              borderRadius: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: color,
              },
            }}
          />
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography variant="body2" color="textSecondary" sx={{color:color}}>
              Spent: ${amountSpent}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              ${amountLeft} remaining
            </Typography>
          </Box>
        </Box>

        <Box mt={2} display="flex" justifyContent="center">
          <Link to={`/budget/${_id}`} style={{textDecoration:'none'}} state={color}>
            <Button
              variant="contained"
              sx={{ backgroundColor: color, color: 'white' }}
              onClick={onViewDetails}
            >
              View Details
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Budget;
