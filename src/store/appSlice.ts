import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Link } from '../types';

interface AppState {
  selectedApplication: string;
  nodes: Node[];
  links: Link[];
}

const initialState: AppState = {
  selectedApplication: '',
  nodes: [],
  links: [],
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

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedApplication: (state, action: PayloadAction<string>) => {
      state.selectedApplication = action.payload;
      if (action.payload && applicationData[action.payload as keyof typeof applicationData]) {
        const data = applicationData[action.payload as keyof typeof applicationData];
        state.nodes = data.nodes;
        state.links = data.links;
      } else {
        state.nodes = [];
        state.links = [];
      }
    },
  },
});

export const { setSelectedApplication } = appSlice.actions;
export default appSlice.reducer; 