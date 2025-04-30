import React from 'react';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import GanttChart from './GanttChart';

// This wrapper ensures GanttChart and its modal content receive the current MUI theme
const GanttChartThemeWrapper = (props: React.ComponentProps<typeof GanttChart>) => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <GanttChart {...props} />
    </ThemeProvider>
  );
};

export default GanttChartThemeWrapper;
