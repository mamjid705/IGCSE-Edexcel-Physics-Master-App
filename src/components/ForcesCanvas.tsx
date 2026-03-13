import React, { useEffect, useRef } from 'react';

interface ForcesCanvasProps {
  type: string;
}

export const ForcesCanvas: React.FC<ForcesCanvasProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    
    // Default styles
    ctx.strokeStyle = '#fbbf24'; // amber-400
    ctx.fillStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.font = 'italic 12px Georgia';

    const drawArrow = (x1: number, y1: number, x2: number, y2: number, label?: string, color?: string) => {
      const headlen = 10;
      const angle = Math.atan2(y2 - y1, x2 - x1);
      const oldStroke = ctx.strokeStyle;
      const oldFill = ctx.fillStyle;
      if (color) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
      }
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();
      if (label) {
        ctx.fillText(label, x2 + 5 * Math.cos(angle), y2 + 5 * Math.sin(angle));
      }
      ctx.strokeStyle = oldStroke;
      ctx.fillStyle = oldFill;
    };

    switch (type) {
      case 'slopeForces': {
        // Slope
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(50, 250);
        ctx.lineTo(350, 250);
        ctx.lineTo(350, 100);
        ctx.closePath();
        ctx.stroke();

        // Block
        ctx.save();
        ctx.translate(200, 175);
        ctx.rotate(-Math.atan(150/300));
        ctx.strokeRect(-20, -20, 40, 20);
        ctx.restore();
        break;
      }

      case 'dtGraph': {
        // Axes
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(50, 50); ctx.lineTo(50, 250); ctx.lineTo(350, 250);
        ctx.stroke();
        ctx.fillText('Distance (m)', 20, 40);
        ctx.fillText('Time (s)', 320, 270);
        break;
      }

      case 'momentsPivot': {
        // Beam
        ctx.strokeStyle = '#94a3b8';
        ctx.strokeRect(50, 150, 300, 10);
        
        // Pivot
        ctx.beginPath();
        ctx.moveTo(200, 160);
        ctx.lineTo(185, 190);
        ctx.lineTo(215, 190);
        ctx.closePath();
        ctx.stroke();

        // Weights
        // Left weight (40N)
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(100, 130, 20, 20);
        ctx.fillText('40N', 95, 125);
        ctx.fillText('2m', 140, 175);
        
        // Right weight (10N)
        ctx.fillStyle = '#60a5fa';
        ctx.fillRect(300, 140, 10, 10);
        ctx.fillText('10N', 295, 135);
        ctx.fillText('d = ?', 240, 175);
        break;
      }

      case 'vtGraph': {
        // Axes
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(50, 50); ctx.lineTo(50, 250); ctx.lineTo(350, 250);
        ctx.stroke();
        ctx.fillText('Velocity (m/s)', 20, 40);
        ctx.fillText('Time (s)', 320, 270);

        // Parachutist curve
        ctx.strokeStyle = '#fbbf24';
        ctx.beginPath();
        ctx.moveTo(50, 250);
        // 1. Acceleration to terminal velocity
        for (let x = 0; x <= 100; x++) {
          const y = 250 - 150 * (1 - Math.exp(-x / 30));
          ctx.lineTo(50 + x, y);
        }
        // 2. Parachute opens (sharp drop)
        const dropX = 150;
        const dropY = 100;
        ctx.lineTo(dropX, dropY);
        ctx.lineTo(dropX + 10, 200);
        // 3. New lower terminal velocity
        for (let x = 0; x <= 140; x++) {
          const y = 200 - 20 * (1 - Math.exp(-x / 20));
          ctx.lineTo(dropX + 10 + x, y);
        }
        ctx.stroke();
        
        ctx.fillStyle = '#ef4444';
        ctx.fillText('Parachute Opens', dropX - 40, dropY - 10);
        break;
      }

      default:
        ctx.fillText(`Drawing: ${type}`, 50, 50);
    }
  }, [type]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-sm my-6">
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="max-w-full h-auto"
      />
      <p className="mt-2 text-[10px] font-mono text-white/30 uppercase tracking-widest">
        Physics Visualization Engine v3.1 - Forces
      </p>
    </div>
  );
};
