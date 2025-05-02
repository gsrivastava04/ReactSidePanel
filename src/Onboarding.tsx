import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';

const Onboarding: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.default,
        p: 3,
      }}
    >
      <Box
        sx={{
          background: theme.palette.background.paper,
          borderRadius: 3,
          boxShadow: theme.shadows[3],
          p: { xs: 3, sm: 5 },
          maxWidth: 480,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: theme.palette.primary.main }}>
          Welcome to Node Graph Dashboard!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
          Get started by selecting an application, exploring your data, and customizing your dashboard experience. Use the side panel to filter, search, and analyze your nodes and jobs.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ borderRadius: 2, fontWeight: 600, px: 4 }}
          href="/"
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Onboarding;
