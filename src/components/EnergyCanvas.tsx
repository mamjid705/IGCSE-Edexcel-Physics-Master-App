import React, { useEffect, useRef } from 'react';

interface EnergyCanvasProps {
  type: string;
  data?: {
    useful?: number;
    wasted?: number;
    usefulEnergy?: number;
  };
}

export const EnergyCanvas: React.FC<EnergyCanvasProps> = ({ type, data }) => {
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
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.font = 'bold 12px Inter';
    ctx.fillStyle = '#94a3b8'; // slate-400

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const drawArrow = (x1: number, y1: number, x2: number, y2: number) => {
      const headlen = 8;
      const angle = Math.atan2(y2 - y1, x2 - x1);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
      ctx.stroke();
    };

    const drawCurvedArrow = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, curve: number) => {
      const midX = (x1 + x2) / 2 + (y2 - y1) * curve;
      const midY = (y1 + y2) / 2 + (x1 - x2) * curve;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(midX, midY, x2, y2);
      ctx.stroke();
      const angle = Math.atan2(y2 - midY, x2 - midX);
      ctx.save();
      ctx.translate(x2, y2);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(-6, -3);
      ctx.lineTo(0, 0);
      ctx.lineTo(-6, 3);
      ctx.stroke();
      ctx.restore();
    };

    const drawWavyLine = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      for(let i=0; i<20; i++) {
        const tx = x1 + (x2-x1)*(i/20);
        const ty = y1 + Math.sin(i*0.8)*3;
        ctx.lineTo(tx, ty);
      }
      ctx.stroke();
    };

    const drawStickFigure = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y - 35, 5, 0, Math.PI * 2); // Head
      ctx.moveTo(x, y - 30); ctx.lineTo(x, y - 15); // Body
      ctx.moveTo(x, y - 25); ctx.lineTo(x - 10, y - 20); // Arms
      ctx.moveTo(x, y - 25); ctx.lineTo(x + 10, y - 20);
      ctx.moveTo(x, y - 15); ctx.lineTo(x - 5, y); // Legs
      ctx.moveTo(x, y - 15); ctx.lineTo(x + 5, y);
      ctx.stroke();
    };

    switch (type) {
      case 'sankey':
        const usefulPercent = data?.usefulEnergy ?? 30;
        const wastedPercent = 100 - usefulPercent;
        
        ctx.fillStyle = '#3b82f6';
        ctx.strokeStyle = '#ffffff';
        
        // Input
        ctx.beginPath();
        ctx.moveTo(20, centerY - 30);
        ctx.lineTo(100, centerY - 30);
        // Useful branch
        ctx.lineTo(240, centerY - 30);
        ctx.lineTo(240, centerY - 30 + (usefulPercent * 0.6));
        ctx.lineTo(100 + (wastedPercent * 0.6), centerY - 30 + (usefulPercent * 0.6));
        // Wasted branch curve
        ctx.quadraticCurveTo(100 + (wastedPercent * 0.6), centerY + 50, 100 + (wastedPercent * 0.3), centerY + 70);
        ctx.lineTo(100 - (wastedPercent * 0.3), centerY + 70);
        ctx.quadraticCurveTo(100, centerY + 50, 100, centerY + 30);
        // Back to input
        ctx.lineTo(20, centerY + 30);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Labels
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Useful: ' + usefulPercent + '%', 180, centerY - 40);
        ctx.fillText('Wasted: ' + wastedPercent + '%', 60, centerY + 85);
        break;

      case 'vacuumFlask':
        // Walls
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.strokeRect(centerX - 40, centerY - 60, 80, 120);
        ctx.strokeRect(centerX - 35, centerY - 55, 70, 110);
        
        // Silvering
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.strokeRect(centerX - 33, centerY - 53, 66, 106);
        
        // Cap
        ctx.fillStyle = '#475569';
        ctx.fillRect(centerX - 42, centerY - 75, 84, 15);
        
        // Labels
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Inter';
        ctx.fillText('Vacuum', centerX - 20, centerY);
        ctx.fillText('Silvered Lining', centerX - 35, centerY + 75);
        ctx.fillText('Plastic Cap', centerX - 30, centerY - 80);
        
        // Reflection arrows
        ctx.strokeStyle = '#ef4444';
        drawArrow(centerX - 10, centerY - 20, centerX - 30, centerY - 30);
        drawArrow(centerX - 30, centerY - 30, centerX - 10, centerY - 40);
        break;

      case 'convection':
        // Room
        ctx.strokeStyle = '#94a3b8';
        ctx.strokeRect(centerX - 100, centerY - 60, 200, 120);
        
        // Radiator
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(centerX - 95, centerY, 10, 50);
        
        // Loop
        ctx.strokeStyle = '#ef4444'; // Hot rising
        drawCurvedArrow(ctx, centerX - 80, centerY - 10, centerX + 60, centerY - 50, -0.3);
        ctx.strokeStyle = '#60a5fa'; // Cool sinking
        drawCurvedArrow(ctx, centerX + 80, centerY - 10, centerX - 60, centerY + 50, -0.3);
        
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Radiator', centerX - 95, centerY + 65);
        break;

      case 'radiationSurface':
        // Black object
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(centerX - 80, centerY - 30, 60, 60);
        // Silver object
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(centerX + 20, centerY - 30, 60, 60);
        
        // Wavy lines (radiation)
        ctx.strokeStyle = '#ef4444';
        for(let i=0; i<5; i++) {
          drawWavyLine(ctx, centerX - 20, centerY - 20 + i*10, centerX + 10, centerY - 20 + i*10);
        }
        drawWavyLine(ctx, centerX + 80, centerY, centerX + 100, centerY);
        
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Matte Black', centerX - 80, centerY + 45);
        ctx.fillText('Shiny Silver', centerX + 20, centerY + 45);
        break;

      case 'windTurbine':
        // Pole
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + 80);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
        
        // Blades
        ctx.lineWidth = 2;
        for(let i=0; i<3; i++) {
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate((i * 120 * Math.PI) / 180);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -50);
          ctx.stroke();
          ctx.restore();
        }
        
        // Generator box
        ctx.fillStyle = '#475569';
        ctx.fillRect(centerX - 10, centerY - 10, 20, 20);
        ctx.fillStyle = '#ffffff';
        ctx.font = '8px Inter';
        ctx.fillText('Generator', centerX - 20, centerY + 25);
        
        // Whoosh lines
        ctx.strokeStyle = '#ffffff33';
        for(let i=0; i<3; i++) {
          ctx.beginPath();
          ctx.moveTo(centerX - 80, centerY - 40 + i*40);
          ctx.lineTo(centerX - 40, centerY - 40 + i*40);
          ctx.stroke();
        }
        break;

      case 'fallingBall':
        ctx.strokeStyle = '#94a3b8';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 80);
        ctx.lineTo(centerX, centerY + 80);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Balls
        const positions = [
          {y: centerY - 70, label: 'Max GPE'},
          {y: centerY, label: 'GPE + KE'},
          {y: centerY + 70, label: 'Max KE'}
        ];
        positions.forEach(p => {
          ctx.fillStyle = '#60a5fa';
          ctx.beginPath();
          ctx.arc(centerX, p.y, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.fillText(p.label, centerX + 15, p.y + 5);
        });
        drawArrow(centerX - 20, centerY - 60, centerX - 20, centerY + 60);
        break;

      case 'loftInsulation':
        // Joists
        ctx.fillStyle = '#78350f';
        for(let i=0; i<4; i++) {
          ctx.fillRect(centerX - 90 + i*50, centerY + 20, 10, 40);
        }
        // Insulation
        ctx.fillStyle = '#fde047';
        ctx.fillRect(centerX - 100, centerY + 30, 200, 20);
        // Air pockets (stipple)
        ctx.fillStyle = '#00000022';
        for(let i=0; i<50; i++) {
          ctx.fillRect(centerX - 100 + Math.random()*200, centerY + 30 + Math.random()*20, 1, 1);
        }
        
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Fiberglass Insulation', centerX - 60, centerY + 65);
        ctx.fillText('Ceiling Joists', centerX - 40, centerY + 15);
        break;

      case 'rollerCoaster':
        // Track
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(20, centerY - 60);
        ctx.bezierCurveTo(100, centerY - 60, 120, centerY + 80, 180, centerY + 80);
        ctx.bezierCurveTo(240, centerY + 80, 260, centerY, 300, centerY);
        ctx.stroke();
        
        // Cart
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(30, centerY - 75, 20, 15);
        
        // Labels
        ctx.fillStyle = '#ffffff';
        ctx.fillText('h1', 10, centerY - 60);
        ctx.fillText('h2', 280, centerY - 10);
        break;

      case 'metalConduction':
        // Ions
        ctx.fillStyle = '#475569';
        for(let i=0; i<4; i++) {
          for(let j=0; j<3; j++) {
            ctx.beginPath();
            ctx.arc(centerX - 75 + i*50, centerY - 40 + j*40, 12, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        // Electrons
        ctx.fillStyle = '#60a5fa';
        for(let i=0; i<20; i++) {
          const ex = Math.random()*200 + centerX - 100;
          const ey = Math.random()*120 + centerY - 60;
          ctx.beginPath();
          ctx.arc(ex, ey, 2, 0, Math.PI * 2);
          ctx.fill();
          // Zig zag
          ctx.strokeStyle = '#60a5fa33';
          ctx.beginPath();
          ctx.moveTo(ex, ey);
          ctx.lineTo(ex + (Math.random()-0.5)*20, ey + (Math.random()-0.5)*20);
          ctx.stroke();
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Metal Ions', centerX - 30, centerY + 80);
        ctx.fillText('Free Electrons', centerX - 40, centerY - 70);
        break;

      case 'leslieCube':
        // Cube (isometric-ish)
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        // Front face
        ctx.strokeRect(centerX - 40, centerY - 20, 60, 60);
        // Top face
        ctx.beginPath();
        ctx.moveTo(centerX - 40, centerY - 20);
        ctx.lineTo(centerX - 10, centerY - 50);
        ctx.lineTo(centerX + 50, centerY - 50);
        ctx.lineTo(centerX + 20, centerY - 20);
        ctx.stroke();
        // Side face
        ctx.beginPath();
        ctx.moveTo(centerX + 20, centerY - 20);
        ctx.lineTo(centerX + 50, centerY - 50);
        ctx.lineTo(centerX + 50, centerY + 10);
        ctx.lineTo(centerX + 20, centerY + 40);
        ctx.stroke();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '8px Inter';
        ctx.fillText('Matte Black', centerX - 35, centerY + 15);
        ctx.fillText('Shiny Silver', centerX + 22, centerY);
        
        // Detector
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(centerX + 80, centerY + 10, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Detector', centerX + 65, centerY + 35);
        break;

      case 'stairClimb':
        // Stairs
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(centerX - 80, centerY + 60);
        ctx.lineTo(centerX + 40, centerY + 60);
        ctx.lineTo(centerX + 40, centerY - 40);
        ctx.closePath();
        ctx.stroke();
        
        // Figures
        ctx.strokeStyle = '#ffffff';
        drawStickFigure(ctx, centerX - 70, centerY + 60);
        ctx.setLineDash([3, 3]);
        drawStickFigure(ctx, centerX + 30, centerY - 40);
        ctx.setLineDash([]);
        
        ctx.fillStyle = '#ffffff';
        ctx.fillText('h = 5m', centerX + 50, centerY + 10);
        break;

      case 'solarPanel':
        // Roof
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(centerX - 120, centerY + 40);
        ctx.lineTo(centerX, centerY - 40);
        ctx.lineTo(centerX + 120, centerY + 40);
        ctx.stroke();
        
        // Solar Cell
        ctx.fillStyle = '#1e3a8a';
        ctx.fillRect(centerX - 90, centerY - 10, 40, 30);
        ctx.strokeStyle = '#ffffff33';
        for(let i=0; i<4; i++) ctx.strokeRect(centerX - 90 + i*10, centerY - 10, 10, 30);
        
        // Water Panel
        ctx.fillStyle = '#111827';
        ctx.fillRect(centerX + 50, centerY - 10, 40, 30);
        ctx.strokeStyle = '#b45309'; // Copper
        ctx.beginPath();
        for(let i=0; i<3; i++) {
          ctx.moveTo(centerX + 55, centerY - 5 + i*8);
          ctx.lineTo(centerX + 85, centerY - 5 + i*8);
        }
        ctx.stroke();
        
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Solar Cell', centerX - 95, centerY + 35);
        ctx.fillText('Water Panel', centerX + 45, centerY + 35);
        break;

      case 'pendulum':
        // Arc
        ctx.strokeStyle = '#94a3b8';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(centerX, centerY - 80, 140, Math.PI*0.35, Math.PI*0.65);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Bobs
        const angles = [0.35, 0.5, 0.65];
        angles.forEach((a, i) => {
          const bx = centerX + Math.cos(a * Math.PI) * 140;
          const by = (centerY - 80) + Math.sin(a * Math.PI) * 140;
          ctx.fillStyle = '#60a5fa';
          ctx.beginPath();
          ctx.arc(bx, by, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          if(i === 1) ctx.fillText('Max KE', bx - 20, by + 25);
          else ctx.fillText('Max GPE', bx - 20, by + 25);
        });
        break;

      case 'doubleGlazing':
        // Panes
        ctx.fillStyle = '#3b82f633';
        ctx.fillRect(centerX - 30, centerY - 60, 10, 120);
        ctx.fillRect(centerX + 20, centerY - 60, 10, 120);
        ctx.strokeStyle = '#94a3b8';
        ctx.strokeRect(centerX - 30, centerY - 60, 10, 120);
        ctx.strokeRect(centerX + 20, centerY - 60, 10, 120);
        
        // Gap
        ctx.fillStyle = '#ffffff11';
        ctx.fillRect(centerX - 20, centerY - 60, 40, 120);
        
        // Heat arrows
        ctx.strokeStyle = '#ef4444';
        drawArrow(centerX - 60, centerY, centerX - 35, centerY);
        ctx.beginPath();
        ctx.moveTo(centerX - 35, centerY);
        ctx.lineTo(centerX - 50, centerY - 20);
        ctx.stroke(); // Reflected
        
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Trapped Air', centerX - 30, centerY + 75);
        ctx.fillText('Glass', centerX - 35, centerY - 70);
        break;

      case 'powerStation':
        const steps = ['Boiler', 'Turbine', 'Generator', 'Exchanger'];
        steps.forEach((s, i) => {
          const sx = 30 + i*70;
          ctx.strokeStyle = '#94a3b8';
          ctx.strokeRect(sx, centerY - 20, 60, 40);
          ctx.fillStyle = '#ffffff';
          ctx.font = '10px Inter';
          ctx.fillText(s, sx + 5, centerY + 5);
          if(i < 3) drawArrow(sx + 60, centerY, sx + 70, centerY);
        });
        // Icons
        ctx.fillText('🔥', 45, centerY + 35);
        ctx.fillText('🌀', 115, centerY + 35);
        ctx.fillText('⚡', 185, centerY + 35);
        ctx.fillText('➰', 255, centerY + 35);
        break;
    }
  }, [type, data]);

  return (
    <div className="flex justify-center my-6 bg-black/20 rounded-xl p-4 border border-white/5">
      <canvas 
        ref={canvasRef} 
        width={300} 
        height={200}
        className="max-w-full h-auto"
      />
    </div>
  );
};
