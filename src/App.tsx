import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import SidePanel from './components/SidePanel';
import NodeGraph from './components/NodeGraph';
import { Node, Link } from './types';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
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
});

// Sample data for the node graph
const sampleNodes: Node[] = [
  { id: '1', name: 'Node 1', properties: { type: 'source' } },
  { id: '2', name: 'Node 2', properties: { type: 'process' } },
  { id: '3', name: 'Node 3', properties: { type: 'process' } },
  { id: '4', name: 'Node 4', properties: { type: 'destination' } },
];

const sampleLinks: Link[] = [
  { source: '1', target: '2', weight: 1 },
  { source: '2', target: '3', weight: 2 },
  { source: '3', target: '4', weight: 1 },
  { source: '4', target: '1', weight: 3 },
];

const App: React.FC = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleMenuClick = () => {
    setPanelOpen(true);
  };

  const handlePanelClose = () => {
    setPanelOpen(false);
  };

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
    setPanelOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header 
        onMenuClick={handleMenuClick} 
        companyName="Node Graph Visualization"
        logoUrl="/logo.png"
      />
      <NodeGraph 
        nodes={sampleNodes} 
        links={sampleLinks} 
        onNodeClick={handleNodeClick}
      />
      <SidePanel 
        open={panelOpen} 
        onClose={handlePanelClose} 
      />
    </ThemeProvider>
  );
};

export default App; 