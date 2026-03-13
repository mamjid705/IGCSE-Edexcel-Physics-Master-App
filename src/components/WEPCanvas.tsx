import React, { useEffect, useRef } from 'react';

interface WEPCanvasProps {
  type: string;
}

export const WEPCanvas: React.FC<WEPCanvasProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set styles
    ctx.strokeStyle = '#60a5fa'; // blue-400
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.font = 'bold 14px Inter';
    ctx.lineCap = 'round';

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    if (type === 'lifting') {
      // Draw Pulley
      ctx.beginPath();
      ctx.arc(centerX, 50, 15, 0, Math.PI * 2);
      ctx.stroke();
      
      // Rope
      ctx.beginPath();
      ctx.moveTo(centerX + 15, 50);
      ctx.lineTo(centerX + 15, 130);
      ctx.stroke();
      
      // Crate
      ctx.strokeStyle = '#fbbf24'; // amber-400
      ctx.strokeRect(centerX + 5, 130, 20, 20);
      
      // Force Label
      ctx.fillStyle = '#60a5fa';
      ctx.fillText('F', centerX + 35, 90);
      drawArrow(ctx, centerX + 30, 110, centerX + 30, 70);
      
      // Height Label
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(centerX - 30, 150);
      ctx.lineTo(centerX - 30, 50);
      ctx.stroke();
      ctx.fillText('h', centerX - 45, 105);
      // Height ticks
      ctx.moveTo(centerX - 35, 150); ctx.lineTo(centerX - 25, 150);
      ctx.moveTo(centerX - 35, 50); ctx.lineTo(centerX - 25, 50);
      ctx.stroke();

    } else if (type === 'ramp') {
      // Draw Triangle
      ctx.strokeStyle = '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(50, 150);
      ctx.lineTo(250, 150);
      ctx.lineTo(250, 50);
      ctx.closePath();
      ctx.stroke();
      
      // Block on ramp
      ctx.save();
      ctx.translate(150, 100);
      ctx.rotate(-Math.atan(100/200));
      ctx.strokeStyle = '#fbbf24';
      ctx.strokeRect(-15, -15, 30, 15);
      ctx.restore();
      
      // Labels
      ctx.fillStyle = '#60a5fa';
      ctx.fillText('h', 260, 105);
      ctx.fillText('d', 140, 75);
      
      // Dimension lines
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      // h line
      ctx.beginPath();
      ctx.moveTo(255, 150); ctx.lineTo(255, 50); ctx.stroke();
      // d line
      ctx.save();
      ctx.translate(150, 100);
      ctx.rotate(-Math.atan(100/200));
      ctx.beginPath();
      ctx.moveTo(-60, 10); ctx.lineTo(60, 10); ctx.stroke();
      ctx.restore();

    } else if (type === 'motion') {
      // Draw Ground
      ctx.strokeStyle = '#475569';
      ctx.beginPath();
      ctx.moveTo(50, centerY + 25);
      ctx.lineTo(250, centerY + 25);
      ctx.stroke();

      // Draw Car
      ctx.strokeStyle = '#60a5fa';
      ctx.strokeRect(centerX - 40, centerY - 10, 80, 25);
      ctx.strokeRect(centerX - 20, centerY - 25, 40, 15);
      
      // Wheels
      ctx.beginPath();
      ctx.arc(centerX - 25, centerY + 15, 8, 0, Math.PI * 2);
      ctx.arc(centerX + 25, centerY + 15, 8, 0, Math.PI * 2);
      ctx.stroke();
      
      // Force Arrows
      // Forward (Thrust)
      ctx.strokeStyle = '#10b981'; // emerald-500
      drawArrow(ctx, centerX + 40, centerY, centerX + 90, centerY);
      ctx.fillStyle = '#10b981';
      ctx.fillText('Thrust', centerX + 45, centerY - 15);
      
      // Backward (Friction)
      ctx.strokeStyle = '#ef4444'; // red-500
      drawArrow(ctx, centerX - 40, centerY, centerX - 90, centerY);
      ctx.fillStyle = '#ef4444';
      ctx.fillText('Friction', centerX - 105, centerY - 15);
    } else if (type.startsWith('rollerCoaster')) {
      // Track: Smooth curved line
      ctx.strokeStyle = '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(30, 50); // Peak A
      ctx.bezierCurveTo(80, 50, 120, 150, 150, 150); // Dip to B
      ctx.bezierCurveTo(180, 150, 220, 100, 270, 100); // Rise to C
      ctx.stroke();

      // Cart at Peak A
      ctx.strokeStyle = '#fbbf24';
      ctx.strokeRect(20, 35, 20, 15);
      
      // Labels A, B, C
      ctx.fillStyle = '#ffffff';
      ctx.fillText('A', 30, 30);
      ctx.fillText('B', 150, 170);
      ctx.fillText('C', 270, 90);

      // Dashed lines for heights
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = '#475569';
      // h1 (Peak A)
      ctx.beginPath();
      ctx.moveTo(30, 50); ctx.lineTo(10, 50); ctx.stroke();
      // h2 (Hill C)
      ctx.beginPath();
      ctx.moveTo(270, 100); ctx.lineTo(290, 100); ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#94a3b8';
      ctx.fillText('h1', 5, 55);
      ctx.fillText('h2', 280, 115);

      // Friction arrow (Heat squiggly)
      if (type.includes('Friction')) {
        ctx.strokeStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(180, 140);
        ctx.bezierCurveTo(185, 135, 175, 130, 180, 125);
        ctx.bezierCurveTo(185, 120, 175, 115, 180, 110);
        ctx.stroke();
        ctx.fillStyle = '#ef4444';
        ctx.font = '10px Inter';
        ctx.fillText('Heat', 185, 120);
      }
    }
  }, [type]);

  const drawArrow = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
    const headlen = 10;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  };

  return (
    <div className="flex justify-center my-6 bg-black/20 rounded-xl p-4 border border-white/5">
      <canvas ref={canvasRef} width={300} height={200} className="max-w-full h-auto" />
    </div>
  );
};
