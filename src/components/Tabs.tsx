import React, { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  TextField, 
  Grid, 
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button
} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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
          {children}
        </Box>
      )}
    </div>
  );
}

const TabsComponent: React.FC = () => {
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({
    basic: {
      name: '',
      description: '',
      isActive: false
    },
    advanced: {
      priority: '',
      category: '',
      tags: []
    },
    settings: {
      notifications: false,
      autoSave: true,
      theme: 'light'
    }
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Basic Information" />
          <Tab label="Advanced Settings" />
          <Tab label="Preferences" />
        </Tabs>
      </Box>
      
      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={formData.basic.name}
              onChange={(e) => handleInputChange('basic', 'name', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={formData.basic.description}
              onChange={(e) => handleInputChange('basic', 'description', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.basic.isActive}
                    onChange={(e) => handleInputChange('basic', 'isActive', e.target.checked)}
                  />
                }
                label="Active"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Priority"
              value={formData.advanced.priority}
              onChange={(e) => handleInputChange('advanced', 'priority', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Category"
              value={formData.advanced.category}
              onChange={(e) => handleInputChange('advanced', 'category', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tags"
              placeholder="Enter tags separated by commas"
              value={formData.advanced.tags.join(',')}
              onChange={(e) => handleInputChange('advanced', 'tags', e.target.value.split(','))}
            />
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.settings.notifications}
                    onChange={(e) => handleInputChange('settings', 'notifications', e.target.checked)}
                  />
                }
                label="Enable Notifications"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.settings.autoSave}
                    onChange={(e) => handleInputChange('settings', 'autoSave', e.target.checked)}
                  />
                }
                label="Auto Save"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Theme"
              value={formData.settings.theme}
              onChange={(e) => handleInputChange('settings', 'theme', e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </TextField>
          </Grid>
        </Grid>
      </TabPanel>

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
};

export default TabsComponent; 