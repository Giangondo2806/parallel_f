import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f6fa',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Geist',
      'Geist Mono',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
