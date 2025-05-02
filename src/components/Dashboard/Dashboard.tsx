import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Header from '../header/header';
import NodeGraph from '../nodeGraph';
import SidePanel from '../sidePanel/sidePanel';
import { Node } from '../../types';

const Dashboard: React.FC = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const { nodes, links, selectedApplication } = useSelector((state: RootState) => state.app);

  const handleMenuClick = () => {
    setPanelOpen(prev => !prev);
  };

  const handlePanelClose = () => {
    setPanelOpen(false);
  };

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
    setPanelOpen(true);
  };

  return (
    <div className="dashboard">
      <Header 
        onMenuClick={handleMenuClick} 
        companyName={selectedApplication || "Node Graph Visualization"}
        logoUrl="/logo.png"
      />
      <NodeGraph 
        nodes={nodes} 
        links={links} 
        onNodeClick={handleNodeClick}
      />
      <SidePanel 
        open={panelOpen} 
        onClose={handlePanelClose} 
        selectedNode={selectedNode}
      />
    </div>
  );
};

// Sample data for the node graph
const sampleNodes: Node[] = [
  { id: '1', name: 'Node 1', properties: { type: 'source' } },
  { id: '2', name: 'Node 2', properties: { type: 'process' } },
  { id: '3', name: 'Node 3', properties: { type: 'process' } },
  { id: '4', name: 'Node 4', properties: { type: 'destination' } },
];

const sampleLinks = [
  { source: '1', target: '2', weight: 1 },
  { source: '2', target: '3', weight: 2 },
  { source: '3', target: '4', weight: 1 },
  { source: '4', target: '1', weight: 3 },
];

export default Dashboard; 