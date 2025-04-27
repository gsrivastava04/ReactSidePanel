export interface Node {
  id: string;
  name: string;
  x?: number;
  y?: number;
  properties?: Record<string, any>;
}

export interface Link {
  source: string;
  target: string;
  weight?: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface HeaderProps {
  onMenuClick: () => void;
  companyName?: string;
  logoUrl?: string;
}

export interface SidePanelProps {
  open: boolean;
  onClose: () => void;
}

export interface NodeGraphProps {
  nodes: Node[];
  links: Link[];
  onNodeClick?: (node: Node) => void;
  onLinkClick?: (link: Link) => void;
} 