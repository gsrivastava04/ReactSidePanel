import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Node, Link } from '../types';

interface AppContextType {
  selectedApplication: string;
  setSelectedApplication: (app: string) => void;
  nodes: Node[];
  links: Link[];
  updateGraphData: (app: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Sample data for different applications
const applicationData = {
  'Application 1': {
    nodes: [
      { id: '1', name: 'App1 Node 1', properties: { type: 'source' } },
      { id: '2', name: 'App1 Node 2', properties: { type: 'process' } },
      { id: '3', name: 'App1 Node 3', properties: { type: 'process' } },
      { id: '4', name: 'App1 Node 4', properties: { type: 'destination' } },
    ],
    links: [
      { source: '1', target: '2', weight: 1 },
      { source: '2', target: '3', weight: 2 },
      { source: '3', target: '4', weight: 1 },
    ]
  },
  'Application 2': {
    nodes: [
      { id: '1', name: 'App2 Node 1', properties: { type: 'source' } },
      { id: '2', name: 'App2 Node 2', properties: { type: 'process' } },
      { id: '3', name: 'App2 Node 3', properties: { type: 'destination' } },
    ],
    links: [
      { source: '1', target: '2', weight: 1 },
      { source: '2', target: '3', weight: 1 },
    ]
  },
  'Application 3': {
    nodes: [
      { id: '1', name: 'App3 Node 1', properties: { type: 'source' } },
      { id: '2', name: 'App3 Node 2', properties: { type: 'process' } },
      { id: '3', name: 'App3 Node 3', properties: { type: 'process' } },
      { id: '4', name: 'App3 Node 4', properties: { type: 'process' } },
      { id: '5', name: 'App3 Node 5', properties: { type: 'destination' } },
    ],
    links: [
      { source: '1', target: '2', weight: 1 },
      { source: '2', target: '3', weight: 1 },
      { source: '3', target: '4', weight: 1 },
      { source: '4', target: '5', weight: 1 },
    ]
  }
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedApplication, setSelectedApplication] = useState<string>('');
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);

  const updateGraphData = (app: string) => {
    if (app && applicationData[app as keyof typeof applicationData]) {
      const data = applicationData[app as keyof typeof applicationData];
      setNodes(data.nodes);
      setLinks(data.links);
    } else {
      setNodes([]);
      setLinks([]);
    }
  };

  return (
    <AppContext.Provider value={{
      selectedApplication,
      setSelectedApplication,
      nodes,
      links,
      updateGraphData
    }}>
      {children}
    </AppContext.Provider>
  );
}; 