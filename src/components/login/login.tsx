import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper, useTheme, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo: any non-empty username/password logs in
    if (username.trim() && password.trim()) {
      setError('');
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard'); // Route to dashboard
    } else {
      setError('Please enter username and password');
    }
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.default,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: theme.palette.primary.main }}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            }}
          />
          <FormControlLabel
            control={<Checkbox
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              sx={{
                color: theme.palette.primary.main,
                '&.Mui-checked': {
                  color: theme.palette.primary.main,
                },
              }}
            />}
            label={<Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.95rem' }}>Remember Me</Typography>}
            sx={{ mt: 1, mb: 1, alignItems: 'center' }}
          />
          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 3,
              borderRadius: 2,
              fontWeight: 600,
              color: theme.palette.primary.contrastText,
              boxShadow: theme.shadows[2],
              textTransform: 'none',
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
