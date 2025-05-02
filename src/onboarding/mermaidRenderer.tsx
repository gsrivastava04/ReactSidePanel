import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidRendererProps {
  chart: string;
}

const MermaidRenderer: React.FC<MermaidRendererProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderMermaid = async () => {
      try {
        // Log the chart content for debugging
        console.log('Mermaid Chart:', chart);

        // Ensure mermaid is initialized with full configuration
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          logLevel: 3, // Detailed logging
          flowchart: {
            htmlLabels: true,
            curve: 'basis'
          }
        });

        // Validate chart syntax before rendering
        if (!chart || chart.trim() === '') {
          throw new Error('Empty or invalid Mermaid chart');
        }

        // Render the diagram
        const { svg } = await mermaid.render('mermaid-graph', chart);
        
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (error) {
        console.error('Mermaid rendering error:', error);
        
        if (ref.current) {
          ref.current.innerHTML = `
            <div style="color: red; padding: 10px; border: 1px solid red;">
              <h3>Mermaid Diagram Rendering Failed</h3>
              <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
              <pre>Chart Content:
${chart}</pre>
            </div>
          `;
        }
      }
    };

    renderMermaid();
  }, [chart]);

  return (
    <div 
      ref={ref} 
      style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', 
        maxWidth: '900px', 
        margin: '20px auto', 
        border: '1px solid #e0e0e0',
        padding: '10px',
        overflow: 'hidden'
      }} 
    />
  );
};

export default MermaidRenderer;
