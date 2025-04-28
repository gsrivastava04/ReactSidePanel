import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#BA0C2F', // Wells Fargo red
      light: '#E31C3D',
      dark: '#8A0B22',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#BA0C2F',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
        contained: {
          backgroundColor: '#BA0C2F',
          '&:hover': {
            backgroundColor: '#8A0B22',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 400,
          boxSizing: 'border-box',
          overflow: 'hidden',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            minWidth: '60px',
            padding: '6px 8px',
            fontSize: '0.75rem',
          },
          '& .MuiTabs-scroller': {
            overflow: 'visible !important',
          },
        },
      },
    },
  },
}); 