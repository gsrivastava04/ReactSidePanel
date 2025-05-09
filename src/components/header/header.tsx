import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { HeaderProps } from '../types';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: 'none',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.drawer + 1,
}));

const Logo = styled('img')({
  height: '40px',
  marginRight: '16px',
  objectFit: 'contain',
});

const Header: React.FC<HeaderProps> = ({ onMenuClick, companyName = 'Company Name', logoUrl = '/logo.svg' }) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Logo src={logoUrl} alt="Company Logo" />
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            textAlign: 'center',
            fontWeight: 'bold',
            letterSpacing: '0.5px'
          }}
        >
          {companyName && companyName !== 'Node Graph Visualization' ? `${companyName} Neurology` : 'Batch Neurology'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2 }}>

          <Typography
            variant="body2"
            sx={(theme: any) => ({
              color: theme.palette.primary.contrastText,
              fontWeight: 500,
              fontFamily: theme.typography.fontFamily,
              mr: 1
            })}
          >
            Enable Updates
          </Typography>
          <Switch
            color="secondary"
            sx={(theme: any) => ({
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: theme.palette.secondary.main,
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: theme.palette.secondary.main,
              },
            })}
            // TODO: Connect checked state and onChange to update logic
          />
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header; 