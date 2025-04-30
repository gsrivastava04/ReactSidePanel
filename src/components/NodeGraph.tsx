import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { styled } from '@mui/material/styles';
import GanttChartThemeWrapper from './GanttChart/GanttChartThemeWrapper';

const GraphContainer = styled('div')({
  width: '100%',
  height: 'calc(100vh - 64px)', // Subtract header height
  backgroundColor: '#f5f5f5',
});

const AddNodeButton = styled('button')(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(1, 2),
  background: theme.palette.background.paper,
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  fontWeight: 500,
  fontSize: '1rem',
  transition: 'background 0.2s',
  '&:hover': {
    background: theme.palette.action.hover,
    borderColor: theme.palette.primary.dark,
    color: theme.palette.primary.dark,
  },
}));

interface Node {
  id: string;
  name: string;
  x?: number;
  y?: number;
}

interface Link {
  source: string;
  target: string;
}

interface NodeGraphProps {
  nodes: Node[];
  links: Link[];
  onNodeClick?: (node: Node) => void;
}

const NodeGraph: React.FC<NodeGraphProps> = ({ nodes, links, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [showGantt, setShowGantt] = useState(false);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create a copy of nodes for the simulation
    const simulationNodes = nodes.map(node => ({ ...node }));

    // Create simulation
    const simulation = d3.forceSimulation<Node>()
      .force('link', d3.forceLink<Node, Link>()
        .id(d => d.id)
        .distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#BA0C2F')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    // Create nodes
    const node = svg.append('g')
      .selectAll('circle')
      .data(simulationNodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', '#BA0C2F')
      .call(d3.drag<SVGCircleElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    if (onNodeClick) {
      node.on('click', (event, d) => onNodeClick(d));
    }

    // Add labels
    const label = svg.append('g')
      .selectAll('text')
      .data(simulationNodes)
      .enter()
      .append('text')
      .text(d => d.name)
      .attr('font-size', 12)
      .attr('dx', 15)
      .attr('dy', 4);

    // Update positions
    simulation.nodes(simulationNodes).on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      node
        .attr('cx', d => d.x!)
        .attr('cy', d => d.y!);

      label
        .attr('x', d => d.x!)
        .attr('y', d => d.y!);
    });

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [nodes, links, onNodeClick]);

  return (
    <GraphContainer>
      <AddNodeButton onClick={() => setShowGantt(true)}>
        Add Node
      </AddNodeButton>
      <svg ref={svgRef} />
      {showGantt && (
        <GanttChartThemeWrapper isOpen={showGantt} onClose={() => setShowGantt(false)} />
      )}
    </GraphContainer>
  );
};

export default NodeGraph;