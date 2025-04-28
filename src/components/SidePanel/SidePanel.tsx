import React from 'react';
import { Drawer, Tabs, Tab, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SidePanelProps, TabPanelProps } from '../../types';
import Filter from '../Filter/Filter';
import './SidePanel.css';

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
        <Box className="tab-panel">
          {children}
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
    <Drawer
      className="side-panel"
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box className="close-button-container">
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="panel tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Filters" />
          <Tab label="Details" />
          <Tab label="Trend" />
          <Tab label="SLA" />
          <Tab label="Search" />
        </Tabs>
      </Box>
      <Box className="content-container">
        <TabPanel value={value} index={0}>
          <Filter />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant="body1">Details content coming soon</Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography variant="body1">Trend content coming soon</Typography>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Typography variant="body1">SLA content coming soon</Typography>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Typography variant="body1">Search content coming soon</Typography>
        </TabPanel>
      </Box>
    </Drawer>
  );
};

export default SidePanel; 