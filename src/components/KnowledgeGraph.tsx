import { useEffect, useRef, useState } from 'react';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  connections: string[];
  color?: string;
}

const KnowledgeGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  
  const nodes: Node[] = [
    { id: '1', label: 'Machine Learning', x: 150, y: 100, connections: ['2', '3'], color: 'hsl(280, 80%, 60%)' },
    { id: '2', label: 'Neural Networks', x: 300, y: 150, connections: ['1', '4'], color: 'hsl(263, 70%, 50.4%)' },
    { id: '3', label: 'Data Science', x: 100, y: 250, connections: ['1', '4', '5'], color: 'hsl(320, 90%, 70%)' },
    { id: '4', label: 'Deep Learning', x: 350, y: 300, connections: ['2', '3'], color: 'hsl(280, 80%, 60%)' },
    { id: '5', label: 'Statistics', x: 200, y: 350, connections: ['3'], color: 'hsl(263, 70%, 50.4%)' },
    { id: '6', label: 'AI Ethics', x: 450, y: 200, connections: ['2'], color: 'hsl(320, 90%, 70%)' },
  ];

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);

    // Check if click is near any node
    const clickedNode = nodes.find(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= 25;
    });

    setSelectedNode(clickedNode ? clickedNode.id : null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.lineWidth = 2;
      
      nodes.forEach(node => {
        node.connections.forEach(connectionId => {
          const targetNode = nodes.find(n => n.id === connectionId);
          if (targetNode) {
            const isHighlighted = selectedNode === node.id || selectedNode === targetNode.id;
            ctx.strokeStyle = isHighlighted ? 'hsl(320, 90%, 70%)' : 'hsl(263, 70%, 50.4%)';
            ctx.lineWidth = isHighlighted ? 3 : 2;
            ctx.globalAlpha = isHighlighted ? 1 : 0.6;
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodes.forEach((node, index) => {
        const time = Date.now() * 0.001;
        const pulse = Math.sin(time + index) * 0.1 + 1;
        const isSelected = selectedNode === node.id;
        const scale = isSelected ? 1.2 : 1;
        
        ctx.globalAlpha = 1;
        
        // Node glow
        ctx.save();
        ctx.shadowColor = node.color || 'hsl(280, 80%, 60%)';
        ctx.shadowBlur = isSelected ? 25 : 15 * pulse;
        
        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, 25 * pulse * scale, 0, Math.PI * 2);
        ctx.fillStyle = node.color || 'hsl(280, 80%, 60%)';
        ctx.fill();
        
        ctx.restore();
        
        // Node border
        ctx.beginPath();
        ctx.arc(node.x, node.y, 25 * pulse * scale, 0, Math.PI * 2);
        ctx.strokeStyle = isSelected ? 'hsl(320, 90%, 70%)' : 'hsl(320, 90%, 70%)';
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.stroke();
        
        // Node label
        ctx.fillStyle = 'white';
        ctx.font = isSelected ? '14px sans-serif' : '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y - 40);
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [selectedNode]);

  return (
    <div className="relative w-full h-96 bg-gradient-secondary rounded-lg overflow-hidden border border-neural-connection/20">
      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        className="w-full h-full cursor-pointer"
        onClick={handleCanvasClick}
      />
      <div className="absolute top-4 left-4 text-white">
        <h3 className="text-lg font-semibold mb-1">Knowledge Graph</h3>
        <p className="text-sm text-gray-300">
          {selectedNode 
            ? `Selected: ${nodes.find(n => n.id === selectedNode)?.label}` 
            : 'Click on nodes to explore connections'
          }
        </p>
      </div>
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 text-white">
          <h4 className="font-semibold mb-1">{nodes.find(n => n.id === selectedNode)?.label}</h4>
          <p className="text-sm text-gray-300">Connected concepts highlighted</p>
        </div>
      )}
    </div>
  );
};

export default KnowledgeGraph;