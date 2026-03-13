import React, { useEffect, useRef } from 'react';

interface AstroCanvasProps {
  type: string;
}

export const AstroCanvas: React.FC<AstroCanvasProps> = ({ type }) => {
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
      case 'orbitalPaths': {
        // Sun
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(200, 150, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText('Sun', 190, 140);

        // Planet Orbit (Circular)
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath();
        ctx.arc(200, 150, 60, 0, Math.PI * 2);
        ctx.stroke();
        
        // Planet
        const px = 200 + 60 * Math.cos(Math.PI / 4);
        const py = 150 + 60 * Math.sin(Math.PI / 4);
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();
        drawArrow(px, py, px - 30 * Math.sin(Math.PI / 4), py + 30 * Math.cos(Math.PI / 4), 'v', '#3b82f6');

        // Comet Orbit (Elliptical)
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.ellipse(250, 150, 120, 40, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Comet
        const cx = 250 + 120 * Math.cos(Math.PI);
        const cy = 150 + 40 * Math.sin(Math.PI);
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();
        drawArrow(cx, cy, cx, cy + 40, 'v (fast)', '#94a3b8');
        break;
      }

      case 'hrDiagram': {
        // Axes
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(50, 50); ctx.lineTo(50, 250); ctx.lineTo(350, 250);
        ctx.stroke();
        ctx.fillText('Luminosity (Abs Mag)', 20, 40);
        ctx.fillText('Temperature (K) - High to Low', 180, 270);

        // Main Sequence
        ctx.strokeStyle = '#fbbf24';
        ctx.beginPath();
        ctx.moveTo(70, 70);
        ctx.bezierCurveTo(150, 100, 250, 200, 330, 230);
        ctx.stroke();
        ctx.fillText('Main Sequence', 150, 140);

        // Red Giants
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.ellipse(300, 80, 30, 20, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText('Red Giants', 280, 85);

        // White Dwarfs
        ctx.fillStyle = '#60a5fa';
        ctx.beginPath();
        ctx.ellipse(100, 220, 20, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText('White Dwarfs', 80, 225);
        break;
      }

      case 'starLifecycle': {
        const drawBox = (x: number, y: number, text: string, color: string) => {
          ctx.strokeStyle = color;
          ctx.strokeRect(x, y, 90, 30);
          ctx.fillStyle = '#fff';
          ctx.font = '10px sans-serif';
          ctx.fillText(text, x + 5, y + 18);
        };

        // Nebula
        drawBox(20, 135, 'Nebula', '#94a3b8');
        drawArrow(110, 150, 140, 150);

        // Branch 1: Sun-sized
        drawBox(140, 80, 'Main Sequence', '#fbbf24');
        drawArrow(230, 95, 260, 95);
        drawBox(260, 80, 'Red Giant', '#ef4444');
        drawArrow(350, 95, 380, 95);
        ctx.fillText('White Dwarf', 385, 95);

        // Branch 2: Massive
        drawBox(140, 190, 'Red Supergiant', '#ef4444');
        drawArrow(230, 205, 260, 205);
        drawBox(260, 190, 'Supernova', '#f59e0b');
        drawArrow(350, 205, 380, 205);
        ctx.fillText('Neutron Star / BH', 385, 205);

        // Split arrows
        drawArrow(110, 150, 140, 95);
        drawArrow(110, 150, 140, 205);
        break;
      }

      case 'redshift': {
        const drawSpectrum = (y: number, label: string, shift = 0) => {
          ctx.fillStyle = '#fff';
          ctx.fillText(label, 50, y - 10);
          // Background gradient
          const grad = ctx.createLinearGradient(50, 0, 350, 0);
          grad.addColorStop(0, '#3b82f6'); // Blue
          grad.addColorStop(0.5, '#fbbf24'); // Yellow
          grad.addColorStop(1, '#ef4444'); // Red
          ctx.fillStyle = grad;
          ctx.fillRect(50, y, 300, 40);
          
          // Absorption lines
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          [100, 150, 220, 280].forEach(x => {
            ctx.beginPath();
            ctx.moveTo(50 + x + shift, y);
            ctx.lineTo(50 + x + shift, y + 40);
            ctx.stroke();
          });
        };

        drawSpectrum(80, 'Laboratory (Rest)');
        drawSpectrum(180, 'Distant Galaxy (Redshifted)', 30);
        drawArrow(200, 130, 230, 130, 'Shifted to Red');
        break;
      }

      case 'bigBang': {
        const centerX = 200;
        const centerY = 150;
        
        // Center point
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Expanding galaxies
        for (let i = 0; i < 12; i++) {
          const angle = (i * Math.PI * 2) / 12;
          const dist = 80;
          const gx = centerX + dist * Math.cos(angle);
          const gy = centerY + dist * Math.sin(angle);
          
          // Galaxy dot
          ctx.beginPath();
          ctx.arc(gx, gy, 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Expansion arrow
          drawArrow(gx, gy, gx + 30 * Math.cos(angle), gy + 30 * Math.sin(angle));
        }
        ctx.fillText('Expansion in all directions', 140, 270);
        break;
      }

      case 'orbitalMath': {
        // Star
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(200, 150, 15, 0, Math.PI * 2);
        ctx.fill();

        // Orbit
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.beginPath();
        ctx.arc(200, 150, 80, 0, Math.PI * 2);
        ctx.stroke();

        // Planet
        const px = 200 + 80 * Math.cos(0);
        const py = 150 + 80 * Math.sin(0);
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();

        // Labels
        ctx.strokeStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(200, 150);
        ctx.lineTo(280, 150);
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.fillText('radius (r)', 230, 145);
        
        ctx.fillText('Orbital Period (T)', 210, 60);
        drawArrow(200, 70, 250, 70);
        
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('v = (2 * π * r) / T', 140, 260);
        break;
      }

      case 'supernova': {
        // Explosion effect
        const centerX = 200;
        const centerY = 150;
        ctx.strokeStyle = '#ef4444';
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * Math.PI * 2;
          const len = 40 + Math.random() * 60;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(centerX + len * Math.cos(angle), centerY + len * Math.sin(angle));
          ctx.stroke();
        }
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillText('SUPERNOVA', 165, 155);
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
        Astro-Physics Visualization Engine v1.0
      </p>
    </div>
  );
};
