import React, { useEffect, useRef } from 'react';

interface NuclearCanvasProps {
  type: 'atom' | 'penetration' | 'halfLifeGraph' | 'fission' | 'gmTube' | 'smokeDetector' | 'thicknessMonitor' | 'nuclearWaste' | 'betaDecay' | 'sterilization' | 'internalExternal' | 'radonEntry' | 'countRateDiff' | 'carbonDating' | 'reactorShielding' | 'brachytherapy' | 'fieldDeflection' | 'dataInterpretation' | 'modelComparison' | 'foodIrradiation';
}

export const NuclearCanvas: React.FC<NuclearCanvasProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const drawArrow = (context: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) => {
      const headlen = 10;
      const dx = toX - fromX;
      const dy = toY - fromY;
      const angle = Math.atan2(dy, dx);
      context.beginPath();
      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.stroke();
      context.beginPath();
      context.moveTo(toX, toY);
      context.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
      context.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
      context.closePath();
      context.fill();
    };

    switch (type) {
      case 'atom':
        // Nucleus
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          const r = 8 + Math.random() * 5;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          ctx.fillStyle = i % 2 === 0 ? '#ef4444' : '#3b82f6'; // Proton/Neutron
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Inter';
        ctx.fillText('Nucleus', centerX - 20, centerY + 30);

        // Orbits
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        for (let r = 60; r <= 100; r += 40) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
          ctx.stroke();
          
          // Electrons
          const eCount = r === 60 ? 2 : 4;
          for (let j = 0; j < eCount; j++) {
            const eAngle = (j / eCount) * Math.PI * 2 + (r / 50);
            const ex = centerX + Math.cos(eAngle) * r;
            const ey = centerY + Math.sin(eAngle) * r;
            ctx.fillStyle = '#fbbf24';
            ctx.beginPath();
            ctx.arc(ex, ey, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;

      case 'penetration':
        const startX = 40;
        const spacingY = 60;
        
        // Barriers
        const barriers = [
          { name: 'Paper', x: 120, color: 'rgba(255,255,255,0.8)', thickness: 2 },
          { name: 'Aluminum', x: 200, color: 'rgba(148,163,184,0.8)', thickness: 6 },
          { name: 'Lead', x: 280, color: 'rgba(71,85,105,0.8)', thickness: 15 }
        ];

        barriers.forEach(b => {
          ctx.fillStyle = b.color;
          ctx.fillRect(b.x, 40, b.thickness, 160);
          ctx.fillStyle = '#ffffff';
          ctx.font = '10px Inter';
          ctx.fillText(b.name, b.x - 10, 35);
        });

        // Alpha
        ctx.fillStyle = '#ef4444';
        ctx.fillText('α (Alpha)', startX, 70);
        ctx.strokeStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(startX + 50, 67);
        ctx.lineTo(120, 67);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(120, 67, 3, 0, Math.PI * 2);
        ctx.fill();

        // Beta
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('β (Beta)', startX, 120);
        ctx.strokeStyle = '#3b82f6';
        ctx.beginPath();
        ctx.moveTo(startX + 50, 117);
        ctx.lineTo(200, 117);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(200, 117, 3, 0, Math.PI * 2);
        ctx.fill();

        // Gamma
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('γ (Gamma)', startX, 170);
        ctx.strokeStyle = '#fbbf24';
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(startX + 50, 167);
        ctx.lineTo(280, 167);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(280, 167, 3, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'halfLifeGraph':
        const margin = 40;
        const w = canvas.width - margin * 2;
        const h = canvas.height - margin * 2;

        // Axes
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(margin, margin);
        ctx.lineTo(margin, margin + h);
        ctx.lineTo(margin + w, margin + h);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Inter';
        ctx.fillText('Activity', margin - 35, margin);
        ctx.fillText('Time', margin + w - 30, margin + h + 15);

        // Exponential Curve
        ctx.strokeStyle = '#3b82f6';
        ctx.beginPath();
        ctx.moveTo(margin, margin + 20);
        for (let x = 0; x <= w; x++) {
          const y = 20 + (h - 40) * (1 - Math.exp(-x / 60));
          ctx.lineTo(margin + x, margin + h - (h - 20 - y));
        }
        ctx.stroke();

        // Half-life lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.setLineDash([4, 4]);
        
        // Half activity point
        const halfY = margin + (h / 2);
        ctx.beginPath();
        ctx.moveTo(margin, halfY);
        // Find x where y is half
        const tHalfX = 60 * Math.log(2);
        ctx.lineTo(margin + tHalfX, halfY);
        ctx.lineTo(margin + tHalfX, margin + h);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#fbbf24';
        ctx.fillText('N₀/2', margin - 30, halfY + 4);
        ctx.fillText('t½', margin + tHalfX - 5, margin + h + 15);
        break;

      case 'fission':
        // Incoming neutron
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(centerX - 140, centerY, 4, 0, Math.PI * 2);
        ctx.fill();
        drawArrow(ctx, centerX - 130, centerY, centerX - 100, centerY);
        ctx.fillText('Neutron', centerX - 160, centerY - 10);

        // Uranium Nucleus
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(centerX - 60, centerY, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText('U-235', centerX - 80, centerY + 5);

        // Split
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX - 20, centerY);
        ctx.lineTo(centerX + 20, centerY - 40);
        ctx.moveTo(centerX - 20, centerY);
        ctx.lineTo(centerX + 20, centerY + 40);
        ctx.stroke();

        // Daughter Nuclei
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(centerX + 60, centerY - 50, 20, 0, Math.PI * 2);
        ctx.arc(centerX + 60, centerY + 50, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Daughter', centerX + 40, centerY - 75);
        ctx.fillText('Daughter', centerX + 40, centerY + 85);

        // Released Neutrons
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 3; i++) {
          const ny = centerY - 20 + i * 20;
          ctx.beginPath();
          ctx.arc(centerX + 120, ny, 4, 0, Math.PI * 2);
          ctx.fill();
          drawArrow(ctx, centerX + 90, ny, centerX + 110, ny);
        }
        ctx.fillText('3 Neutrons', centerX + 130, centerY + 5);
        break;

      case 'gmTube':
        // GM Tube
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.strokeRect(centerX - 40, centerY - 30, 100, 40);
        ctx.beginPath();
        ctx.moveTo(centerX + 60, centerY - 10);
        ctx.lineTo(centerX + 100, centerY - 10);
        ctx.stroke();

        // Wire to Counter
        ctx.strokeStyle = '#64748b';
        ctx.beginPath();
        ctx.moveTo(centerX + 100, centerY - 10);
        ctx.lineTo(centerX + 100, centerY + 40);
        ctx.lineTo(centerX + 40, centerY + 40);
        ctx.stroke();

        // Counter Box
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(centerX - 40, centerY + 20, 80, 50);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(centerX - 40, centerY + 20, 80, 50);
        
        // Digital Display
        ctx.fillStyle = '#000000';
        ctx.fillRect(centerX - 30, centerY + 30, 60, 20);
        ctx.fillStyle = '#22c55e';
        ctx.font = '12px monospace';
        ctx.fillText('0842', centerX - 25, centerY + 45);
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Inter';
        ctx.fillText('Counter', centerX - 20, centerY + 85);

        // Source
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(centerX - 120, centerY - 10, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.font = '14px Inter';
        ctx.fillText('☢', centerX - 127, centerY - 5);
        
        // Rays
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)';
        for (let i = 0; i < 5; i++) {
          const ry = centerY - 25 + i * 8;
          ctx.beginPath();
          ctx.moveTo(centerX - 100, ry);
          ctx.lineTo(centerX - 50, ry);
          ctx.stroke();
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Source', centerX - 135, centerY + 25);
        ctx.fillText('GM Tube', centerX - 15, centerY - 40);
        break;

      case 'smokeDetector':
        // Electrodes
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(centerX - 80, centerY - 40, 160, 5);
        ctx.fillRect(centerX - 80, centerY + 40, 160, 5);
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Inter';
        ctx.fillText('Electrode (+)', centerX - 30, centerY - 50);
        ctx.fillText('Electrode (-)', centerX - 30, centerY + 65);

        // Alpha Particles
        ctx.fillStyle = '#ef4444';
        for (let i = 0; i < 8; i++) {
          const ax = centerX - 60 + i * 20;
          const ay = centerY - 20 + Math.sin(i) * 10;
          ctx.beginPath();
          ctx.arc(ax, ay, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.font = '8px Inter';
          ctx.fillText('α', ax - 2, ay - 5);
        }

        // Smoke Cloud
        const gradient = ctx.createRadialGradient(centerX + 20, centerY, 10, centerX + 20, centerY, 40);
        gradient.addColorStop(0, 'rgba(100, 116, 139, 0.8)');
        gradient.addColorStop(1, 'rgba(100, 116, 139, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX + 20, centerY, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Smoke', centerX + 5, centerY + 5);
        break;

      case 'thicknessMonitor':
        // Rollers
        ctx.fillStyle = '#475569';
        ctx.beginPath();
        ctx.arc(centerX - 60, centerY - 60, 30, 0, Math.PI * 2);
        ctx.arc(centerX - 60, centerY + 60, 30, 0, Math.PI * 2);
        ctx.fill();
        
        // Sheet
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(centerX - 150, centerY - 2, 300, 4);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Material Sheet', centerX - 40, centerY + 15);

        // Beta Source
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(centerX + 40, centerY - 80, 40, 20);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Beta Source', centerX + 30, centerY - 90);

        // Detector
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(centerX + 40, centerY + 60, 40, 20);
        ctx.strokeStyle = '#3b82f6';
        ctx.strokeRect(centerX + 40, centerY + 60, 40, 20);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Detector', centerX + 35, centerY + 95);

        // Radiation lines
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(centerX + 60, centerY - 60);
        ctx.lineTo(centerX + 60, centerY + 60);
        ctx.stroke();
        ctx.setLineDash([]);
        break;

      case 'nuclearWaste':
        // Geological Layer
        ctx.fillStyle = '#334155';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Rock texture
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        for (let i = 0; i < 20; i++) {
          ctx.beginPath();
          ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
          ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
          ctx.stroke();
        }

        // Storage Drum
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(centerX - 30, centerY - 40, 60, 80);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(centerX - 30, centerY - 40, 60, 80);
        
        // Radiation Symbol on drum
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '12px Inter';
        ctx.fillText('☢', centerX - 6, centerY + 4);

        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Inter';
        ctx.fillText('Geological Disposal', centerX - 60, 30);
        ctx.fillText('High-Level Waste', centerX - 50, centerY + 60);
        break;

      case 'betaDecay':
        // Neutron
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.arc(centerX - 80, centerY, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Neutron', centerX - 100, centerY + 35);

        // Transformation Arrow
        drawArrow(ctx, centerX - 40, centerY, centerX + 20, centerY);

        // Proton
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(centerX + 60, centerY, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Proton', centerX + 45, centerY + 35);

        // Ejected Electron (Beta)
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(centerX + 120, centerY - 40, 6, 0, Math.PI * 2);
        ctx.fill();
        drawArrow(ctx, centerX + 75, centerY - 15, centerX + 110, centerY - 35);
        ctx.fillText('Beta particle (e⁻)', centerX + 100, centerY - 55);
        break;

      case 'sterilization':
        // Conveyor Belt
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX - 150, centerY + 40);
        ctx.lineTo(centerX + 150, centerY + 40);
        ctx.stroke();

        // Medical Supplies Box
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(centerX - 40, centerY - 10, 80, 50);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.strokeRect(centerX - 40, centerY - 10, 80, 50);
        ctx.fillStyle = '#1e293b';
        ctx.font = '10px Inter';
        ctx.fillText('Medical', centerX - 25, centerY + 15);
        ctx.fillText('Supplies', centerX - 25, centerY + 30);

        // Gamma Source
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(centerX - 20, centerY - 80, 40, 20);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Gamma Source', centerX - 35, centerY - 90);

        // Gamma Rays (Wavy lines)
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          const rx = centerX - 20 + i * 10;
          ctx.beginPath();
          ctx.moveTo(rx, centerY - 60);
          for (let y = centerY - 60; y < centerY + 40; y += 5) {
            ctx.lineTo(rx + Math.sin(y / 5) * 3, y);
          }
          ctx.stroke();
        }
        break;

      case 'internalExternal':
        // Two Torso Icons
        const drawTorso = (x: number, label: string) => {
          ctx.fillStyle = '#fed7aa';
          // Head
          ctx.beginPath();
          ctx.arc(x, centerY - 60, 15, 0, Math.PI * 2);
          ctx.fill();
          // Body
          ctx.fillRect(x - 25, centerY - 45, 50, 80);
          ctx.fillStyle = '#ffffff';
          ctx.font = '12px Inter';
          ctx.fillText(label, x - 25, centerY + 60);
        };

        // External Alpha
        drawTorso(centerX - 80, 'External');
        ctx.fillStyle = '#ef4444';
        for (let i = 0; i < 3; i++) {
          const ay = centerY - 30 + i * 20;
          ctx.beginPath();
          ctx.arc(centerX - 130, ay, 4, 0, Math.PI * 2);
          ctx.fill();
          // Bounce off
          ctx.strokeStyle = '#ef4444';
          ctx.beginPath();
          ctx.moveTo(centerX - 125, ay);
          ctx.lineTo(centerX - 105, ay);
          ctx.lineTo(centerX - 125, ay - 10);
          ctx.stroke();
        }
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Inter';
        ctx.fillText('Stopped by skin', centerX - 145, centerY - 50);

        // Internal Alpha
        drawTorso(centerX + 80, 'Internal');
        // Source in lungs
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(centerX + 80, centerY - 10, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.font = '8px Inter';
        ctx.fillText('☢', centerX + 77, centerY - 7);

        // Damage symbols (Explosions)
        ctx.strokeStyle = '#ef4444';
        const drawExplosion = (ex: number, ey: number) => {
          ctx.beginPath();
          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            ctx.moveTo(ex, ey);
            ctx.lineTo(ex + Math.cos(angle) * 10, ey + Math.sin(angle) * 10);
          }
          ctx.stroke();
        };
        drawExplosion(centerX + 65, centerY - 20);
        drawExplosion(centerX + 95, centerY);
        ctx.fillStyle = '#ef4444';
        ctx.font = '10px Inter';
        ctx.fillText('Cell Damage', centerX + 55, centerY - 40);
        break;

      case 'radonEntry':
        // House Cross-section
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        // Foundation
        ctx.strokeRect(centerX - 100, centerY - 40, 200, 80);
        // Roof
        ctx.beginPath();
        ctx.moveTo(centerX - 110, centerY - 40);
        ctx.lineTo(centerX, centerY - 90);
        ctx.lineTo(centerX + 110, centerY - 40);
        ctx.stroke();

        // Ground (Rocks/Soil)
        ctx.fillStyle = '#451a03';
        ctx.fillRect(centerX - 150, centerY + 40, 300, 60);
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Inter';
        ctx.fillText('Rocks / Soil (Uranium)', centerX - 60, centerY + 85);

        // Radon Entry Arrows
        ctx.fillStyle = '#fbbf24';
        for (let i = 0; i < 3; i++) {
          const rx = centerX - 60 + i * 60;
          drawArrow(ctx, rx, centerY + 50, rx, centerY + 20);
        }
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('Radon Gas', centerX - 30, centerY + 15);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Cracks in floor', centerX - 140, centerY + 35);
        break;

      case 'countRateDiff':
        // Source
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(centerX - 40, centerY, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.font = '12px Inter';
        ctx.fillText('☢', centerX - 46, centerY + 5);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Activity (360°)', centerX - 70, centerY - 25);

        // Rays in all directions
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(centerX - 40 + Math.cos(angle) * 15, centerY + Math.sin(angle) * 15);
          ctx.lineTo(centerX - 40 + Math.cos(angle) * 60, centerY + Math.sin(angle) * 60);
          ctx.stroke();
        }

        // GM Tube (Narrow slice)
        ctx.strokeStyle = '#94a3b8';
        ctx.strokeRect(centerX + 60, centerY - 15, 60, 30);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('GM Tube', centerX + 65, centerY - 25);
        
        // Detected rays
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX - 25, centerY - 5);
        ctx.lineTo(centerX + 60, centerY - 10);
        ctx.moveTo(centerX - 25, centerY + 5);
        ctx.lineTo(centerX + 60, centerY + 10);
        ctx.stroke();
        
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('Count Rate', centerX + 65, centerY + 35);
        ctx.font = '10px Inter';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('(Only a fraction detected)', centerX + 40, centerY + 55);
        break;

      case 'carbonDating':
        // Living Tree
        ctx.fillStyle = '#166534'; // Dark green
        ctx.beginPath();
        ctx.moveTo(centerX - 100, centerY + 40);
        ctx.lineTo(centerX - 120, centerY + 80);
        ctx.lineTo(centerX - 80, centerY + 80);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX - 100, centerY + 30, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Inter';
        ctx.fillText('Living Tree', centerX - 125, centerY + 95);
        
        // Constant C-14 dots
        ctx.fillStyle = '#fbbf24';
        for (let i = 0; i < 8; i++) {
          ctx.beginPath();
          ctx.arc(centerX - 115 + Math.random() * 30, centerY + 15 + Math.random() * 30, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Old Wooden Tool
        ctx.fillStyle = '#78350f'; // Brown
        ctx.fillRect(centerX + 60, centerY + 40, 60, 15);
        ctx.fillRect(centerX + 85, centerY + 55, 10, 30);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Ancient Tool', centerX + 60, centerY + 95);

        // Decreasing C-14 dots (faded)
        for (let i = 0; i < 8; i++) {
          ctx.fillStyle = `rgba(251, 191, 36, ${0.1 + Math.random() * 0.3})`;
          ctx.beginPath();
          ctx.arc(centerX + 65 + Math.random() * 50, centerY + 45 + Math.random() * 10, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = '#fbbf24';
        ctx.fillText('C-14 Constant', centerX - 130, centerY - 10);
        ctx.fillText('C-14 Decaying', centerX + 50, centerY - 10);
        drawArrow(ctx, centerX - 60, centerY + 40, centerX + 40, centerY + 40);
        break;

      case 'reactorShielding':
        // Reactor Core
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Inter';
        ctx.fillText('Core', centerX - 12, centerY + 4);

        // Steel Pressure Vessel
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 45, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Steel Vessel', centerX - 80, centerY - 55);

        // Concrete Shielding
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 25;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 85, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#475569';
        ctx.fillText('Concrete Shielding', centerX - 50, centerY + 115);
        break;

      case 'brachytherapy':
        // Tumor
        ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Tumor', centerX - 15, centerY - 45);

        // Radioactive Seed
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText('Radioactive Seed', centerX + 10, centerY + 5);

        // Localized radiation
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(centerX + Math.cos(angle) * 6, centerY + Math.sin(angle) * 6);
          ctx.lineTo(centerX + Math.cos(angle) * 35, centerY + Math.sin(angle) * 35);
          ctx.stroke();
        }
        break;

      case 'fieldDeflection':
        // Plates
        ctx.fillStyle = '#ef4444'; // Positive
        ctx.fillRect(centerX - 100, centerY - 80, 200, 10);
        ctx.fillStyle = '#3b82f6'; // Negative
        ctx.fillRect(centerX - 100, centerY + 70, 200, 10);
        
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Positive Plate (+)', centerX - 40, centerY - 90);
        ctx.fillText('Negative Plate (-)', centerX - 40, centerY + 95);

        // Source
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(centerX - 140, centerY - 10, 20, 20);

        // Alpha (Curves to negative)
        ctx.strokeStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(centerX - 120, centerY);
        ctx.quadraticCurveTo(centerX, centerY, centerX + 80, centerY + 65);
        ctx.stroke();
        ctx.fillStyle = '#ef4444';
        ctx.fillText('Alpha (α)', centerX + 85, centerY + 65);

        // Beta (Curves sharply to positive)
        ctx.strokeStyle = '#3b82f6';
        ctx.beginPath();
        ctx.moveTo(centerX - 120, centerY);
        ctx.quadraticCurveTo(centerX - 40, centerY, centerX + 20, centerY - 65);
        ctx.stroke();
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('Beta (β)', centerX + 25, centerY - 65);

        // Gamma (Straight)
        ctx.strokeStyle = '#fbbf24';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(centerX - 120, centerY);
        ctx.lineTo(centerX + 120, centerY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('Gamma (γ)', centerX + 125, centerY + 5);
        break;

      case 'dataInterpretation':
        // Table Icon
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(centerX - 80, centerY - 60, 160, 120);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 60);
        ctx.lineTo(centerX, centerY + 60);
        ctx.moveTo(centerX - 80, centerY - 30);
        ctx.lineTo(centerX + 80, centerY - 30);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px Inter';
        ctx.fillText('Time', centerX - 60, centerY - 40);
        ctx.fillText('Count Rate', centerX + 10, centerY - 40);

        ctx.font = '10px Inter';
        const data = [
          { t: '12:00', c: '400' },
          { t: '12:20', c: '200' },
          { t: '12:40', c: '100' }
        ];

        data.forEach((row, i) => {
          ctx.fillText(row.t, centerX - 60, centerY - 10 + i * 25);
          ctx.fillStyle = '#fbbf24';
          ctx.fillText(row.c, centerX + 25, centerY - 10 + i * 25);
          ctx.fillStyle = '#ffffff';
        });

        ctx.fillStyle = '#fbbf24';
        ctx.fillText('Values Halving', centerX - 35, centerY + 85);
        break;

      case 'modelComparison':
        // Plum Pudding (Left)
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(centerX - 80, centerY, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Inter';
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          ctx.fillText('-', centerX - 85 + Math.cos(angle) * 20, centerY + 5 + Math.sin(angle) * 20);
        }
        ctx.font = '10px Inter';
        ctx.fillText('Plum Pudding', centerX - 110, centerY + 65);

        // Nuclear Model (Right)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX + 80, centerY, 40, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX + 80, centerY, 25, 0, Math.PI * 2);
        ctx.stroke();
        
        // Nucleus
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(centerX + 80, centerY, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Nuclear Model', centerX + 50, centerY + 65);
        ctx.fillText('Mostly Empty Space', centerX + 35, centerY - 55);
        break;

      case 'foodIrradiation':
        // Crate
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 3;
        ctx.strokeRect(centerX - 60, centerY + 10, 120, 60);
        
        // Apples
        ctx.fillStyle = '#ef4444';
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 2; j++) {
            ctx.beginPath();
            ctx.arc(centerX - 35 + i * 35, centerY + 30 + j * 25, 12, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Inter';
        ctx.fillText('Crate of Apples', centerX - 40, centerY + 85);

        // Gamma Source
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(centerX - 20, centerY - 80, 40, 20);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Gamma Source', centerX - 35, centerY - 90);

        // Gamma Rays
        ctx.strokeStyle = '#fbbf24';
        ctx.setLineDash([2, 4]);
        for (let i = 0; i < 5; i++) {
          const rx = centerX - 20 + i * 10;
          ctx.beginPath();
          ctx.moveTo(rx, centerY - 60);
          ctx.lineTo(rx, centerY + 70);
          ctx.stroke();
        }
        ctx.setLineDash([]);

        // Bacteria with X
        const bx = centerX + 90;
        const by = centerY + 30;
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.ellipse(bx, by, 15, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(bx - 10, by - 10);
        ctx.lineTo(bx + 10, by + 10);
        ctx.moveTo(bx + 10, by - 10);
        ctx.lineTo(bx - 10, by + 10);
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Bacteria Killed', bx - 35, by + 25);
        break;
    }
  }, [type]);

  return (
    <div className="flex justify-center p-4 bg-black/20 rounded-xl border border-white/10 mb-6">
      <canvas
        ref={canvasRef}
        width={400}
        height={250}
        className="max-w-full h-auto"
      />
    </div>
  );
};
