import React, { useState } from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Checkbox, 
  FormControlLabel,
  Button,
  Divider,
  TextField,
  SelectChangeEvent
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setSelectedApplication } from '../../store/appSlice';
import './Filter.css';

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const selectedApplication = useSelector((state: RootState) => state.app.selectedApplication);

  const [showBox, setShowBox] = useState(false); // (Legacy state, not used for Enable Updates)
  const [jobStatus, setJobStatus] = useState('');
  const [runInterval, setRunInterval] = useState('');
  const [type, setType] = useState('');
  const [component, setComponent] = useState('');
  const [search, setSearch] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const jobStatuses = [
    'Running',
    'Completed',
    'Failed',
    'Pending',
    'Scheduled'
  ];

  const runIntervals = [
    'Daily',
    'Weekly',
    'Monthly',
    'Quarterly',
    'Yearly'
  ];

  const types = [
    'Type A',
    'Type B',
    'Type C',
    'Type D'
  ];

  const handleClearFilters = () => {
    setShowBox(false);
    dispatch(setSelectedApplication(''));
    setJobStatus('');
    setRunInterval('');
    setType('');
  };

  const handleApplicationChange = (event: SelectChangeEvent<string>) => {
    dispatch(setSelectedApplication(event.target.value));
  };

  return (
    <Box className="filter-container">
{selectedApplication && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={false}
                sx={{
                  color: '#BA0C2F',
                  '&.Mui-checked': {
                    color: '#BA0C2F',
                  },
                }}
              />
            }
            label={<span style={{ fontWeight: 500, color: '#BA0C2F', fontSize: '1rem' }}>Enable Updates</span>}
          />
        </Box>
      )}
      <Box className="filter-content" style={{ marginTop: 0 }}>
        <Box sx={{ mb: 1 }}>
          <TextField
            id="search-input"
            label="Search"
            value={search}
            onChange={handleSearchChange}
            variant="outlined"
            fullWidth
            sx={(theme) => ({ backgroundColor: theme.palette.background.paper, fontFamily: theme.typography.fontFamily, fontSize: '1rem', display: 'none' })}
          />
        </Box>

        <FormControlLabel
          control={
            <Checkbox 
              checked={showBox}
              onChange={(e) => setShowBox(e.target.checked)}
              className="checkbox"
            />
          }
          label="Show Box Only"
        />

        <Divider className="divider" />

        <FormControl fullWidth className="form-control">
          <InputLabel id="application-label">Application</InputLabel>
          <Select
            labelId="application-label"
            id="application"
            value={selectedApplication}
            onChange={handleApplicationChange}
            label="Application"
          >
            <MenuItem value="">Select Application</MenuItem>
            <MenuItem value="Application 1">Application 1</MenuItem>
            <MenuItem value="Application 2">Application 2</MenuItem>
            <MenuItem value="Application 3">Application 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth className="form-control">
          <InputLabel>Job Status</InputLabel>
          <Select
            value={jobStatus}
            onChange={(e) => setJobStatus(e.target.value)}
            label="Job Status"
          >
            {jobStatuses.map((status) => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth className="form-control">
          <InputLabel>Run Interval</InputLabel>
          <Select
            value={runInterval}
            onChange={(e) => setRunInterval(e.target.value)}
            label="Run Interval"
          >
            {runIntervals.map((interval) => (
              <MenuItem key={interval} value={interval}>{interval}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth className="form-control">
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Type"
          >
            {types.map((t) => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth className="form-control">
          <InputLabel>Component</InputLabel>
          <Select
            value={component}
            onChange={(e) => setComponent(e.target.value)}
            label="Component"
          >
            <MenuItem value="">Select Component</MenuItem>
            <MenuItem value="Component A">Component A</MenuItem>
            <MenuItem value="Component B">Component B</MenuItem>
            <MenuItem value="Component C">Component C</MenuItem>
          </Select>
        </FormControl>

        <Box className="button-container">
          <Button 
            variant="outlined" 
            color="primary" 
            className="clear-button"
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Filter; 