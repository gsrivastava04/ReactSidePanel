import React from 'react';
import { Drawer, Tabs, Tab, Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { SidePanelProps, TabPanelProps } from '../types';
import TabsComponent from './Tabs';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 300,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 300,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
}));

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const SidePanel: React.FC<SidePanelProps> = ({ open, onClose }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <StyledDrawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="panel tabs"
          variant="fullWidth"
        >
          <Tab label="Node Details" />
          <Tab label="Search" />
          <Tab label="Settings" />
          <Tab label="Analytics" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TabsComponent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h6" gutterBottom>
          Search
        </Typography>
        <Typography>
          Search functionality coming soon
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h6" gutterBottom>
          Settings
        </Typography>
        <Typography>
          Settings panel coming soon
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography variant="h6" gutterBottom>
          Analytics
        </Typography>
        <Typography>
          Analytics panel coming soon
        </Typography>
      </TabPanel>
    </StyledDrawer>
  );
};

export default SidePanel; 