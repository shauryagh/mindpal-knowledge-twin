import { useEffect, useRef } from 'react';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  connections: string[];
}

const KnowledgeGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const nodes: Node[] = [
    { id: '1', label: 'Machine Learning', x: 150, y: 100, connections: ['2', '3'] },
    { id: '2', label: 'Neural Networks', x: 300, y: 150, connections: ['1', '4'] },
    { id: '3', label: 'Data Science', x: 100, y: 250, connections: ['1', '4', '5'] },
    { id: '4', label: 'Deep Learning', x: 350, y: 300, connections: ['2', '3'] },
    { id: '5', label: 'Statistics', x: 200, y: 350, connections: ['3'] },
    { id: '6', label: 'AI Ethics', x: 450, y: 200, connections: ['2'] },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      ctx.strokeStyle = 'hsl(263, 70%, 50.4%)';
      ctx.lineWidth = 2;
      
      nodes.forEach(node => {
        node.connections.forEach(connectionId => {
          const targetNode = nodes.find(n => n.id === connectionId);
          if (targetNode) {
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
        const pulse = Math.sin(time + index) * 0.2 + 1;
        
        // Node glow
        ctx.save();
        ctx.shadowColor = 'hsl(280, 80%, 60%)';
        ctx.shadowBlur = 15 * pulse;
        
        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, 25 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = 'hsl(280, 80%, 60%)';
        ctx.fill();
        
        ctx.restore();
        
        // Node border
        ctx.beginPath();
        ctx.arc(node.x, node.y, 25 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = 'hsl(320, 90%, 70%)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Node label
        ctx.fillStyle = 'white';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y - 40);
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="relative w-full h-96 bg-gradient-secondary rounded-lg overflow-hidden border border-neural-connection/20">
      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        className="w-full h-full"
      />
      <div className="absolute top-4 left-4 text-white">
        <h3 className="text-lg font-semibold mb-1">Knowledge Graph</h3>
        <p className="text-sm text-gray-300">Interactive visualization of your connected knowledge</p>
      </div>
    </div>
  );
};

export default KnowledgeGraph;