import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Input,
  useTheme
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { SortableTable } from './SortableTable';
import MenuItem from '@mui/material/MenuItem';

const mockTableData = [
  { appId: 'TBCS', scheduler: 'PB1', jobId: 4584, status: 'completed', csv: 'Download' },
  { appId: '1CCP', scheduler: 'PB1', jobId: 3741, status: 'completed', csv: 'Download' },
  { appId: '1CCP', scheduler: 'PB1', jobId: 4265, status: 'completed', csv: 'Download' },
  { appId: '1CCP', scheduler: 'PB1', jobId: 3000, status: 'completed', csv: 'Download' },
  { appId: '1CCP', scheduler: 'PB1', jobId: 6468, status: 'scheduled', csv: 'Unavailable' },
];

const Onboarding: React.FC = () => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [filter, setFilter] = useState('');

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.default, p: { xs: 1, md: 3 } }}>
      {/* Header Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        {/* Removed Onboarding Page and Request Status from header */}
      </Box>

      {/* Two-column layout for upload and table */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3
            }}
          >
            {/* File Upload Card */}
            <Paper sx={{ flex: 1, p: 2, borderRadius: 2, mb: { xs: 2, md: 0 }, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Onboarding Page
              </Typography>
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                aria-label="onboard tabs"
                sx={{ mb: 2 }}
              >
                <Tab label="1. Form" />
                <Tab label="2. File Upload" />
              </Tabs>
              {tab === 0 && (
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                  <TextField
                    label="App Id"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                  <TextField
                    select
                    label="Scheduler Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    defaultValue=""
                  >
                    <MenuItem value="PB1">PB1</MenuItem>
                    <MenuItem value="PB2">PB2</MenuItem>
                    <MenuItem value="PB3">PB3</MenuItem>
                    <MenuItem value="PB4">PB4</MenuItem>
                  </TextField>
                  <TextField
                    label="User"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                  <Button variant="contained" color="primary" sx={{ mt: 1, alignSelf: 'flex-start', minWidth: 120 }}>
                    Submit
                  </Button>
                </Box>
              )}
              {tab === 1 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    sx={{ borderRadius: 2 }}
                  >
                    Choose File
                    <Input
                      type="file"
                      sx={{ display: 'none' }}
                      onChange={e => {
                        const target = e.target as HTMLInputElement;
                        setFile(target.files && target.files[0] ? target.files[0] : null);
                      }}
                    />
                  </Button>
                  <Typography variant="body2">
                    {file ? file.name : 'No file chosen'}
                  </Typography>
                </Box>
              )}
            </Paper>

            {/* Table Card with sorting */}
            <Paper sx={{ flex: 2, p: 2, borderRadius: 2, display: 'flex', flexDirection: 'column', minHeight: 300, maxHeight: 500 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, flexShrink: 0 }}>
                Request Status
              </Typography>
              <Box sx={{ mb: 2, flexShrink: 0 }}>
                <TextField
                  size="small"
                  label="Filter by App Id"
                  variant="outlined"
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  sx={{ background: theme.palette.background.paper, borderRadius: 1, minWidth: 200 }}
                />
              </Box>
              <Box sx={{ flex: 1, overflow: 'auto' }}>
                <SortableTable filter={filter} />
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* How to use this page */}
      <Paper sx={{ mb: 3, p: 2, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          How to use this page
        </Typography>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li>For an entirely new application, supply App Id and Scheduler Name (PA1, PB3, R63, PC1, PG1, PG3) and submit.</li>
          <li>The page will intermediately show the status of request as Accepted or Failed.</li>
          <li>For Accepted entries, it will allow you to download the basic CSV form with details filled for your application.</li>
          <li>Download the CSV and fill in the remaining columns to represent data in your application.</li>
          <li>Come back and upload the CSV file and if the upload is successful, it will accept the provided data and apply to your application.</li>
        </ol>
      </Paper>

      {/* Onboarding Workflow (Mermaid placeholder) */}
      <Paper sx={{ p: 2, borderRadius: 2, mb: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Onboarding Workflow
        </Typography>
        {/* Mermaid diagram placeholder - to be implemented */}
        <Box sx={{ minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="body2" color="textSecondary">
            [Workflow diagram will appear here]
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Onboarding;
