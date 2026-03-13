import React, { useEffect, useRef } from 'react';
import { GraphPoint } from '../types';

interface GraphCanvasProps {
  points: GraphPoint[];
  xLabel?: string;
  yLabel?: string;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({ points, xLabel = 't', yLabel = 'v' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    // Draw Grid (Subtle)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const x = padding + (i / 5) * width;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, canvas.height - padding);
        ctx.stroke();

        const y = padding + (i / 5) * height;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }

    // Draw Axes
    ctx.strokeStyle = '#fbbf24'; // amber-400
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Y-axis
    ctx.moveTo(padding, padding - 10);
    ctx.lineTo(padding, canvas.height - padding);
    // X-axis
    ctx.lineTo(canvas.width - padding + 10, canvas.height - padding);
    ctx.stroke();

    // Arrowheads
    ctx.fillStyle = '#fbbf24';
    // Y arrow
    ctx.beginPath();
    ctx.moveTo(padding - 5, padding - 10);
    ctx.lineTo(padding + 5, padding - 10);
    ctx.lineTo(padding, padding - 20);
    ctx.fill();
    // X arrow
    ctx.beginPath();
    ctx.moveTo(canvas.width - padding + 10, canvas.height - padding - 5);
    ctx.lineTo(canvas.width - padding + 10, canvas.height - padding + 5);
    ctx.lineTo(canvas.width - padding + 20, canvas.height - padding);
    ctx.fill();

    // Labels
    ctx.font = 'italic bold 14px Inter';
    ctx.fillStyle = '#fbbf24';
    ctx.textAlign = 'left';
    ctx.fillText(yLabel, padding - 20, padding - 5);
    ctx.fillText(xLabel, canvas.width - padding + 15, canvas.height - padding + 20);

    if (points && points.length > 0) {
      // Find max values for scaling
      const maxX: number = Math.max(...points.map(p => p.x), 1);
      const maxY: number = Math.max(...points.map(p => p.y), 1);

      // Draw Axis Values
      ctx.font = '10px Inter';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.textAlign = 'center';

      // Origin
      ctx.fillText('0', padding - 10, canvas.height - padding + 15);

      // X-axis values (unique x points)
      const uniqueX = Array.from(new Set(points.map(p => p.x))).filter(x => x !== 0);
      uniqueX.forEach((val: number) => {
        const ratio = Number(val) / Number(maxX);
        const xPos = padding + ratio * width;
        // Tick
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.moveTo(xPos, canvas.height - padding);
        ctx.lineTo(xPos, canvas.height - padding + 5);
        ctx.stroke();
        // Label
        ctx.fillText(val.toString(), xPos, canvas.height - padding + 15);
      });

      // Y-axis values (unique y points)
      ctx.textAlign = 'right';
      const uniqueY = Array.from(new Set(points.map(p => p.y))).filter(y => y !== 0);
      uniqueY.forEach((val: number) => {
        const ratio = Number(val) / Number(maxY);
        const yPos = (canvas.height - padding) - ratio * height;
        // Tick
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.moveTo(padding - 5, yPos);
        ctx.lineTo(padding, yPos);
        ctx.stroke();
        // Label
        ctx.fillText(val.toString(), padding - 10, yPos + 4);
      });

      // Draw Line
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.setLineDash([]);
      ctx.beginPath();

      points.forEach((p, i) => {
        const xRatio = Number(p.x) / Number(maxX);
        const yRatio = Number(p.y) / Number(maxY);
        const x = padding + xRatio * width;
        const y = (canvas.height - padding) - yRatio * height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Draw Points
      points.forEach(p => {
        const xRatio = Number(p.x) / Number(maxX);
        const yRatio = Number(p.y) / Number(maxY);
        const x = padding + xRatio * width;
        const y = (canvas.height - padding) - yRatio * height;
        
        // Point glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#fbbf24';
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }
  }, [points]);

  return (
    <div className="flex justify-center my-6">
      <div className="bg-black/40 p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm">
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={200} 
          className="block"
        />
      </div>
    </div>
  );
};
