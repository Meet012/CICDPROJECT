import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import illustration from '../assets/illustration.jpg'; // Update the path as needed

const Home = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #f5f5f5, #e0f7fa)',
        position: 'relative',
        overflow: 'hidden',
        height: '90vh', // Set to full height
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%', // Allow the box to take full height
            py: { xs: 5, md: 10 },
            mb: { xs: 3, md: 5 },
          }}
        >
          {/* Text Section */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mr: { md: 5 }, flex: 1 }}>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Take Control
            </Typography>
            <Typography variant="h2" component="p" sx={{ fontWeight: 'bold' }}>
              of <span style={{ color: 'hsl(183, 74%, 44%)' }}>Your Money</span>
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mt: 2, mb: 4, maxWidth: 450 }}>
              Take control of your finances, track your expenses, and achieve your financial goals.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/login"
              sx={{ fontWeight: 'bold', px: 4, py: 1.5 }}
            >
              Get Started
            </Button>
          </Box>

          {/* Image Section */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              ml: { md: 5 },
              maxWidth: 500,
              flex: 1,
            }}
          >
            <img src={illustration} alt="Financial management illustration" width="100%" style={{ borderRadius: '8px' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
