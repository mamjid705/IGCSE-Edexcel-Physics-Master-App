import React, { useEffect, useRef } from 'react';

interface ThermalCanvasProps {
  type: 'displacementCan' | 'particleArrangement' | 'pressureHoles' | 'gasPiston' | 'heatingCurve' | 'manometerTube' | 'shcSetup' | 'absoluteZeroGraph' | 'surfaceParticles' | 'smokeCells' | 'boylesGraph' | 'molecularCollisions' | 'latentHeatGraph' | 'charlesLawGraph' | 'solid' | 'liquid' | 'gas' | 'molecules' | 'pressureHole' | 'piston';
}

export const ThermalCanvas: React.FC<ThermalCanvasProps> = ({ type }) => {
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
    ctx.font = 'bold 12px Inter';
    ctx.lineCap = 'round';

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

    switch (type) {
      case 'displacementCan':
        // Eureka Can
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX - 60, centerY - 60);
        ctx.lineTo(centerX - 60, centerY + 60);
        ctx.lineTo(centerX + 20, centerY + 60);
        ctx.lineTo(centerX + 20, centerY - 20);
        // Spout
        ctx.lineTo(centerX + 50, centerY + 10);
        ctx.stroke();
        
        // Water level
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX - 58, centerY - 20);
        ctx.lineTo(centerX + 18, centerY - 20);
        ctx.stroke();
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.fillRect(centerX - 58, centerY - 20, 76, 78);

        // Measuring Cylinder
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.strokeRect(centerX + 55, centerY + 20, 25, 40);
        
        // Drop
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(centerX + 52, centerY + 15, 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Eureka Can', centerX - 50, centerY + 80);
        break;

      case 'particleArrangement':
        const boxSize = 60;
        const radius = 4;
        
        // Solid
        ctx.strokeStyle = '#94a3b8';
        ctx.strokeRect(centerX - 110, centerY - 30, boxSize, boxSize);
        ctx.fillStyle = '#60a5fa';
        for(let i=0; i<4; i++) {
          for(let j=0; j<4; j++) {
            ctx.beginPath();
            ctx.arc(centerX - 100 + i*13, centerY - 20 + j*13, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Solid', centerX - 95, centerY + 50);

        // Liquid
        ctx.strokeStyle = '#94a3b8';
        ctx.strokeRect(centerX - 30, centerY - 30, boxSize, boxSize);
        ctx.fillStyle = '#60a5fa';
        const liquidPos = [
          {x:5, y:50}, {x:15, y:52}, {x:25, y:50}, {x:35, y:51}, {x:45, y:50}, {x:55, y:52},
          {x:10, y:40}, {x:20, y:42}, {x:30, y:40}, {x:40, y:41}, {x:50, y:40},
          {x:15, y:30}, {x:25, y:32}, {x:35, y:30}, {x:45, y:31}
        ];
        liquidPos.forEach(p => {
          ctx.beginPath();
          ctx.arc(centerX - 30 + p.x, centerY - 30 + p.y, radius, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Liquid', centerX - 20, centerY + 50);

        // Gas
        ctx.strokeStyle = '#94a3b8';
        ctx.strokeRect(centerX + 50, centerY - 30, boxSize, boxSize);
        ctx.fillStyle = '#60a5fa';
        const gasPos = [
          {x:10, y:10, vx:3, vy:2}, {x:50, y:20, vx:-2, vy:3}, 
          {x:20, y:50, vx:2, vy:-3}, {x:45, y:45, vx:-3, vy:-2}
        ];
        gasPos.forEach(p => {
          ctx.beginPath();
          ctx.arc(centerX + 50 + p.x, centerY - 30 + p.y, radius, 0, Math.PI * 2);
          ctx.fill();
          // Whoosh lines
          ctx.beginPath();
          ctx.moveTo(centerX + 50 + p.x - p.vx, centerY - 30 + p.y - p.vy);
          ctx.lineTo(centerX + 50 + p.x - p.vx*2, centerY - 30 + p.y - p.vy*2);
          ctx.stroke();
        });
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Gas', centerX + 70, centerY + 50);
        break;

      case 'pressureHoles':
        // Tank
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.strokeRect(centerX - 40, centerY - 80, 80, 160);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.fillRect(centerX - 38, centerY - 78, 76, 156);
        
        // Streams
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        const streams = [
          {y: centerY - 40, dist: 30},
          {y: centerY, dist: 60},
          {y: centerY + 40, dist: 100}
        ];
        streams.forEach(s => {
          ctx.beginPath();
          ctx.moveTo(centerX + 40, s.y);
          ctx.quadraticCurveTo(centerX + 40 + s.dist/2, s.y, centerX + 40 + s.dist, centerY + 80);
          ctx.stroke();
        });
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Pressure increases with depth', centerX - 80, centerY + 95);
        break;

      case 'gasPiston':
        // Cylinder
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX - 40, centerY - 80);
        ctx.lineTo(centerX - 40, centerY + 80);
        ctx.lineTo(centerX + 40, centerY + 80);
        ctx.lineTo(centerX + 40, centerY - 80);
        ctx.stroke();
        
        // Plunger
        const plungerY = centerY - 20;
        ctx.fillStyle = '#475569';
        ctx.fillRect(centerX - 38, plungerY, 76, 10);
        ctx.strokeRect(centerX - 5, centerY - 90, 10, plungerY - (centerY - 90));
        
        // Molecules
        ctx.fillStyle = '#60a5fa';
        for(let i=0; i<12; i++) {
          const px = centerX - 30 + Math.random() * 60;
          const py = plungerY + 15 + Math.random() * (centerY + 75 - (plungerY + 15));
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
          // Arrows
          const ang = Math.random() * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + Math.cos(ang)*5, py + Math.sin(ang)*5);
          ctx.stroke();
        }
        break;

      case 'heatingCurve':
      case 'latentHeatGraph':
        // Axes
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(40, 40);
        ctx.lineTo(40, 160);
        ctx.lineTo(260, 160);
        ctx.stroke();
        
        // Curve
        ctx.strokeStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(40, 150);
        ctx.lineTo(70, 120); // Heating solid
        ctx.lineTo(110, 120); // Melting (plateau)
        ctx.lineTo(150, 70); // Heating liquid
        ctx.lineTo(200, 70); // Boiling (plateau)
        ctx.lineTo(240, 45); // Heating gas
        ctx.stroke();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Inter';
        ctx.fillText('Temp', 10, 40);
        ctx.fillText('Time', 240, 175);
        ctx.fillText('Melting', 75, 115);
        ctx.fillText('Boiling', 165, 65);
        break;

      case 'manometerTube':
        // U-Tube
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(centerX - 40, centerY - 60);
        ctx.lineTo(centerX - 40, centerY + 40);
        ctx.arc(centerX, centerY + 40, 40, Math.PI, 0, true);
        ctx.lineTo(centerX + 40, centerY - 60);
        ctx.stroke();
        
        // Liquid
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(centerX - 40, centerY + 10);
        ctx.lineTo(centerX - 40, centerY + 40);
        ctx.arc(centerX, centerY + 40, 40, Math.PI, 0, true);
        ctx.lineTo(centerX + 40, centerY - 30);
        ctx.stroke();
        
        // Height difference
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX + 55, centerY + 10);
        ctx.lineTo(centerX + 55, centerY - 30);
        ctx.stroke();
        ctx.fillText('h', centerX + 60, centerY - 10);
        break;

      case 'shcSetup':
        // Block
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.strokeRect(centerX - 60, centerY - 40, 120, 80);
        
        // Heater hole
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(centerX - 40, centerY - 30, 15, 60);
        ctx.fillStyle = '#ffffff';
        ctx.font = '8px Inter';
        ctx.fillText('Heater', centerX - 45, centerY + 45);
        
        // Thermometer hole
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(centerX + 20, centerY - 30, 10, 60);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Thermometer', centerX + 5, centerY + 45);
        break;

      case 'absoluteZeroGraph':
        // Axes
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(centerX - 100, centerY);
        ctx.lineTo(centerX + 100, centerY); // T axis
        ctx.moveTo(centerX, centerY - 80);
        ctx.lineTo(centerX, centerY + 20); // P axis
        ctx.stroke();
        
        // Line
        ctx.strokeStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(centerX + 80, centerY - 60);
        ctx.lineTo(centerX + 20, centerY - 20);
        ctx.stroke();
        // Dashed extension
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(centerX + 20, centerY - 20);
        ctx.lineTo(centerX - 80, centerY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.fillStyle = '#ffffff';
        ctx.fillText('-273°C', centerX - 95, centerY + 15);
        ctx.fillText('P', centerX - 15, centerY - 70);
        ctx.fillText('T (°C)', centerX + 80, centerY + 15);
        break;

      case 'surfaceParticles':
        // Liquid surface
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.fillRect(centerX - 100, centerY, 200, 80);
        ctx.strokeStyle = '#3b82f6';
        ctx.beginPath();
        ctx.moveTo(centerX - 100, centerY);
        ctx.lineTo(centerX + 100, centerY);
        ctx.stroke();
        
        // Evaporating particles (fast)
        ctx.fillStyle = '#ef4444';
        for(let i=0; i<3; i++) {
          const px = centerX - 60 + i*60;
          const py = centerY - 20;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
          drawArrow(px, py, px, py - 30);
        }
        
        // Remaining particles (slow)
        ctx.fillStyle = '#3b82f6';
        for(let i=0; i<5; i++) {
          const px = centerX - 80 + i*40;
          const py = centerY + 30;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
          drawArrow(px, py, px + 5, py + 5);
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Evaporation', centerX - 35, centerY - 60);
        break;

      case 'smokeCells':
        // Large smoke particles
        ctx.fillStyle = '#94a3b8';
        for(let i=0; i<3; i++) {
          const px = centerX - 50 + i*50;
          const py = centerY + (i%2 === 0 ? 20 : -20);
          ctx.beginPath();
          ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.fill();
          // Random kick arrows
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          drawArrow(px, py, px + (Math.random()-0.5)*30, py + (Math.random()-0.5)*30);
        }
        
        // Tiny air molecules (dots)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        for(let i=0; i<40; i++) {
          ctx.beginPath();
          ctx.arc(Math.random()*300, Math.random()*200, 1, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Brownian Motion', 10, 20);
        break;

      case 'boylesGraph':
      case 'charlesLawGraph':
        // Axes
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(40, 40);
        ctx.lineTo(40, 160);
        ctx.lineTo(260, 160);
        ctx.stroke();
        
        // Straight line
        ctx.strokeStyle = '#60a5fa';
        ctx.beginPath();
        ctx.moveTo(40, 160);
        ctx.lineTo(240, 60);
        ctx.stroke();
        
        ctx.fillStyle = '#ffffff';
        if (type === 'boylesGraph') {
          ctx.fillText('P', 25, 45);
          ctx.fillText('1/V', 245, 175);
        } else {
          ctx.fillText('V', 25, 45);
          ctx.fillText('T (K)', 245, 175);
        }
        break;

      case 'molecularCollisions':
        // Wall
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX + 60, centerY - 60);
        ctx.lineTo(centerX + 60, centerY + 60);
        ctx.stroke();
        
        // Particle
        ctx.fillStyle = '#60a5fa';
        ctx.beginPath();
        ctx.arc(centerX + 50, centerY, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Force arrow
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        drawArrow(centerX + 60, centerY, centerX + 100, centerY);
        ctx.fillStyle = '#ef4444';
        ctx.fillText('Force', centerX + 70, centerY - 10);
        
        // Motion arrow
        ctx.strokeStyle = '#ffffff';
        drawArrow(centerX, centerY, centerX + 45, centerY);
        break;

      case 'solid':
      case 'liquid':
      case 'gas':
      case 'molecules':
        const bSize = 100;
        const rad = 6;
        ctx.strokeStyle = '#94a3b8';
        ctx.strokeRect(centerX - bSize/2, centerY - bSize/2, bSize, bSize);
        ctx.fillStyle = '#60a5fa';
        
        if (type === 'solid') {
          for(let i=0; i<5; i++) {
            for(let j=0; j<5; j++) {
              ctx.beginPath();
              ctx.arc(centerX - 40 + i*20, centerY - 40 + j*20, rad, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        } else if (type === 'liquid' || type === 'molecules') {
          for(let i=0; i<15; i++) {
            ctx.beginPath();
            ctx.arc(centerX - 40 + Math.random()*80, centerY + 10 + Math.random()*30, rad, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          for(let i=0; i<5; i++) {
            const px = centerX - 40 + Math.random()*80;
            const py = centerY - 40 + Math.random()*80;
            ctx.beginPath();
            ctx.arc(px, py, rad, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px + (Math.random()-0.5)*20, py + (Math.random()-0.5)*20);
            ctx.stroke();
          }
        }
        break;

      case 'pressureHole':
        // Reuse pressureHoles logic
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.strokeRect(centerX - 40, centerY - 80, 80, 160);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.fillRect(centerX - 38, centerY - 78, 76, 156);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        const sList = [{y: centerY - 40, dist: 30}, {y: centerY, dist: 60}, {y: centerY + 40, dist: 100}];
        sList.forEach(s => {
          ctx.beginPath();
          ctx.moveTo(centerX + 40, s.y);
          ctx.quadraticCurveTo(centerX + 40 + s.dist/2, s.y, centerX + 40 + s.dist, centerY + 80);
          ctx.stroke();
        });
        break;

      case 'piston':
        // Reuse gasPiston logic
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX - 40, centerY - 80);
        ctx.lineTo(centerX - 40, centerY + 80);
        ctx.lineTo(centerX + 40, centerY + 80);
        ctx.lineTo(centerX + 40, centerY - 80);
        ctx.stroke();
        const pY = centerY - 20;
        ctx.fillStyle = '#475569';
        ctx.fillRect(centerX - 38, pY, 76, 10);
        ctx.strokeRect(centerX - 5, centerY - 90, 10, pY - (centerY - 90));
        ctx.fillStyle = '#60a5fa';
        for(let i=0; i<12; i++) {
          const px = centerX - 30 + Math.random() * 60;
          const py = pY + 15 + Math.random() * (centerY + 75 - (pY + 15));
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
    }
  }, [type]);

  return (
    <div className="flex justify-center my-6 bg-black/20 rounded-xl p-4 border border-white/5">
      <canvas ref={canvasRef} width={300} height={200} className="max-w-full h-auto" />
    </div>
  );
};
