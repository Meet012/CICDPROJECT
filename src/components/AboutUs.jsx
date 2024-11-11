import React from 'react';
import { Container, Box, Typography, Grid, Paper } from '@mui/material';
import { AccountBalanceWallet, TrackChanges, Insights } from '@mui/icons-material'; // Import icons or you can use your own

const AboutUs = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #f5f5f5, #e0f7fa)',
        position: 'relative',
        overflow: 'hidden',
        pb: 10,
        pt: 10, // Add top padding
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* About Us Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: { xs: 3, md: 5 },
          }}
        >
          {/* Text Section */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, mr: { md: 5 } }}>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
              About Us
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
              Welcome to our platform, where we believe that financial literacy is the key to achieving your dreams.
              Our mission is to empower individuals to take control of their finances, manage their budgets effectively, and make informed financial decisions.
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
              With tools and resources designed for users of all levels, we aim to make personal finance accessible and understandable.
              Join us on this journey to financial freedom!
            </Typography>
          </Box>

          {/* Image Section */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              ml: { md: 5 },
              maxWidth: 500,
            }}
          >
          </Box>
        </Box>

        {/* Features Section */}
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 5 }}>
          Our Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 2 }}>
              <AccountBalanceWallet sx={{ fontSize: 60, color: 'hsl(183, 74%, 44%)' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                Budget Tracking
              </Typography>
              <Typography color="textSecondary">
                Easily track your income and expenses with our intuitive budgeting tools.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 2 }}>
              <TrackChanges sx={{ fontSize: 60, color: 'hsl(183, 74%, 44%)' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                Goal Setting
              </Typography>
              <Typography color="textSecondary">
                Set financial goals and track your progress to achieve them.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 2 }}>
              <Insights sx={{ fontSize: 60, color: 'hsl(183, 74%, 44%)' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                Insights & Reports
              </Typography>
              <Typography color="textSecondary">
                Get insights into your spending habits and receive detailed reports.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
