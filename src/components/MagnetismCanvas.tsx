import React, { useEffect, useRef } from 'react';

interface MagnetismCanvasProps {
  type: 'fieldLines' | 'wireField' | 'motorEffect' | 'transformer' | 'relay' | 'dynamo' | 'lenzLaw' | 'microphone' | 'circuitBreaker' | 'solenoidField' | 'coilField' | 'electronBeam' | 'transformerMath' | 'laminatedCore' | 'generatorGraph' | 'handRules' | 'transformerDC' | 'lenzEnergy' | 'forceFactors' | 'coreInduction' | 'transmissionMath';
}

export const MagnetismCanvas: React.FC<MagnetismCanvasProps> = ({ type }) => {
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

    switch (type) {
      case 'fieldLines':
        // Bar Magnet
        ctx.strokeStyle = '#ef4444'; // red-500 (North)
        ctx.strokeRect(centerX - 60, centerY - 20, 60, 40);
        ctx.fillStyle = '#ef4444';
        ctx.fillText('N', centerX - 40, centerY + 5);
        
        ctx.strokeStyle = '#3b82f6'; // blue-500 (South)
        ctx.strokeRect(centerX, centerY - 20, 60, 40);
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('S', centerX + 20, centerY + 5);

        // Field Lines (Loops)
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        
        // Top loops
        drawFieldLoop(ctx, centerX, centerY, 80, 40, true);
        drawFieldLoop(ctx, centerX, centerY, 100, 60, true);
        
        // Bottom loops
        drawFieldLoop(ctx, centerX, centerY, 80, 40, false);
        drawFieldLoop(ctx, centerX, centerY, 100, 60, false);

        // Arrows (N to S)
        drawArrow(ctx, centerX, centerY - 40, centerX + 5, centerY - 40);
        drawArrow(ctx, centerX, centerY + 40, centerX + 5, centerY + 40);
        break;

      case 'wireField':
        // Wire cross-section
        ctx.strokeStyle = '#fbbf24'; // amber-400
        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
        ctx.stroke();
        // Dot for current coming out
        ctx.beginPath();
        ctx.arc(centerX, centerY, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText('Current (out)', centerX - 40, centerY - 20);

        // Concentric circles
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        for (let r = 30; r <= 70; r += 20) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
          ctx.stroke();
          // Direction arrow (Anti-clockwise for current out)
          drawArrowOnCircle(ctx, centerX, centerY, r, Math.PI * 1.5);
        }
        break;

      case 'motorEffect':
        // Magnet Poles
        ctx.strokeStyle = '#ef4444';
        ctx.strokeRect(centerX - 120, centerY - 40, 40, 80);
        ctx.fillText('N', centerX - 105, centerY + 5);

        ctx.strokeStyle = '#3b82f6';
        ctx.strokeRect(centerX + 80, centerY - 40, 40, 80);
        ctx.fillText('S', centerX + 95, centerY + 5);

        // Wire in middle
        ctx.strokeStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillText('Wire', centerX - 15, centerY + 25);

        // Bent field lines
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        for (let y = -30; y <= 30; y += 20) {
          ctx.beginPath();
          ctx.moveTo(centerX - 80, centerY + y);
          // Bend around the wire
          const bend = y < 0 ? -15 : 15;
          ctx.quadraticCurveTo(centerX, centerY + y + bend, centerX + 80, centerY + y);
          ctx.stroke();
          drawArrow(ctx, centerX + 40, centerY + y + bend/2, centerX + 45, centerY + y + bend/2);
        }
        break;

      case 'transformer':
        // Iron Core (Square)
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 15;
        ctx.strokeRect(centerX - 80, centerY - 60, 160, 120);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Inter';
        ctx.fillText('Iron Core', centerX - 25, centerY + 5);

        // Primary Coil (Left)
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.ellipse(centerX - 80, centerY - 40 + i * 20, 20, 8, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Primary', centerX - 130, centerY - 70);

        // Secondary Coil (Right)
        ctx.strokeStyle = '#fbbf24';
        for (let i = 0; i < 8; i++) {
          ctx.beginPath();
          ctx.ellipse(centerX + 80, centerY - 50 + i * 14, 20, 6, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillText('Secondary', centerX + 60, centerY - 70);
        break;

      case 'relay':
        // Solenoid (Electromagnet)
        ctx.strokeStyle = '#475569';
        ctx.strokeRect(centerX - 100, centerY - 30, 60, 60);
        ctx.strokeStyle = '#fbbf24';
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.ellipse(centerX - 70, centerY - 25 + i * 10, 25, 4, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Inter';
        ctx.fillText('Solenoid', centerX - 95, centerY + 45);

        // Armature (L-shaped lever)
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX - 10, centerY + 60); // Pivot
        ctx.lineTo(centerX - 10, centerY - 40); // Vertical part
        ctx.lineTo(centerX + 40, centerY - 40); // Horizontal part
        ctx.stroke();
        
        // Pivot point
        ctx.fillStyle = '#475569';
        ctx.beginPath();
        ctx.arc(centerX - 10, centerY + 60, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Armature', centerX - 20, centerY + 75);

        // Contacts
        ctx.strokeStyle = '#10b981'; // emerald-500
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX + 50, centerY - 50);
        ctx.lineTo(centerX + 70, centerY - 50);
        ctx.moveTo(centerX + 50, centerY - 30);
        ctx.lineTo(centerX + 70, centerY - 30);
        ctx.stroke();
        ctx.fillText('Contacts', centerX + 45, centerY - 60);
        break;

      case 'dynamo':
        // Rotating Magnet
        ctx.save();
        ctx.translate(centerX - 40, centerY);
        ctx.rotate(Math.PI / 4); // Show it rotated
        ctx.strokeStyle = '#ef4444';
        ctx.strokeRect(-30, -15, 30, 30);
        ctx.fillStyle = '#ef4444';
        ctx.fillText('N', -20, 5);
        ctx.strokeStyle = '#3b82f6';
        ctx.strokeRect(0, -15, 30, 30);
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('S', 10, 5);
        ctx.restore();

        // Spin arrows
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.arc(centerX - 40, centerY, 50, -Math.PI / 4, Math.PI / 4);
        ctx.stroke();
        drawArrowOnCircle(ctx, centerX - 40, centerY, 50, Math.PI / 4);

        // Coil
        ctx.strokeStyle = '#fbbf24';
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.ellipse(centerX + 60, centerY - 30 + i * 12, 30, 5, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Coil', centerX + 50, centerY + 55);
        break;

      case 'lenzLaw':
        // Bar Magnet
        ctx.strokeStyle = '#ef4444';
        ctx.strokeRect(centerX - 120, centerY - 20, 40, 40);
        ctx.fillStyle = '#ef4444';
        ctx.fillText('N', centerX - 105, centerY + 5);
        ctx.strokeStyle = '#3b82f6';
        ctx.strokeRect(centerX - 160, centerY - 20, 40, 40);
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('S', centerX - 145, centerY + 5);

        // Push Arrow
        ctx.strokeStyle = '#ffffff';
        drawArrow(ctx, centerX - 70, centerY, centerX - 30, centerY);
        ctx.fillText('Push', centerX - 65, centerY - 10);

        // Solenoid
        ctx.strokeStyle = '#fbbf24';
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.ellipse(centerX + 40, centerY - 30 + i * 12, 30, 5, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        // Lenz Law Label
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 16px Inter';
        ctx.fillText('N', centerX + 5, centerY + 5);
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Inter';
        ctx.fillText('Repulsion', centerX - 5, centerY + 25);
        break;

      case 'microphone':
        // Diaphragm
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX - 80, centerY - 60);
        ctx.lineTo(centerX - 80, centerY + 60);
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Diaphragm', centerX - 130, centerY - 70);

        // Coil attached to diaphragm
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.ellipse(centerX - 50, centerY - 20 + i * 10, 30, 4, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        // U-Magnet
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(centerX + 20, centerY - 50);
        ctx.lineTo(centerX - 30, centerY - 50);
        ctx.lineTo(centerX - 30, centerY + 50);
        ctx.lineTo(centerX + 20, centerY + 50);
        ctx.stroke();
        ctx.fillStyle = '#ef4444';
        ctx.fillText('N', centerX + 10, centerY - 60);
        ctx.fillStyle = '#3b82f6';
        ctx.fillText('S', centerX + 10, centerY + 70);
        break;

      case 'circuitBreaker':
        // Electromagnet
        ctx.strokeStyle = '#475569';
        ctx.strokeRect(centerX - 40, centerY + 20, 80, 40);
        ctx.strokeStyle = '#fbbf24';
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.ellipse(centerX, centerY + 25 + i * 10, 35, 4, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Iron Catch
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 4;
        ctx.strokeRect(centerX - 10, centerY - 10, 20, 20);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Catch', centerX + 15, centerY + 5);

        // Spring Switch
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX - 60, centerY - 50);
        ctx.lineTo(centerX - 20, centerY - 50);
        // Spring zigzag
        for (let i = 0; i < 4; i++) {
          ctx.lineTo(centerX - 15 + i * 5, centerY - 55 + (i % 2) * 10);
        }
        ctx.lineTo(centerX + 20, centerY - 50);
        ctx.lineTo(centerX + 60, centerY - 50);
        ctx.stroke();
        ctx.fillText('Switch', centerX - 50, centerY - 65);
        break;

      case 'solenoidField':
        // Solenoid
        ctx.strokeStyle = '#fbbf24';
        for (let i = 0; i < 8; i++) {
          ctx.beginPath();
          ctx.ellipse(centerX, centerY - 50 + i * 14, 40, 6, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        // Internal Field Lines
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        for (let x = -20; x <= 20; x += 10) {
          ctx.beginPath();
          ctx.moveTo(centerX + x, centerY - 60);
          ctx.lineTo(centerX + x, centerY + 60);
          ctx.stroke();
        }
        ctx.fillText('Uniform Field Inside', centerX + 45, centerY);
        break;

      case 'coilField':
        // Coil cross-section
        ctx.strokeStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(centerX, centerY - 50, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillText('•', centerX - 4, centerY - 46); // Current out
        
        ctx.beginPath();
        ctx.arc(centerX, centerY + 50, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillText('×', centerX - 4, centerY + 54); // Current in

        // Field lines
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        // Center line
        ctx.beginPath();
        ctx.moveTo(centerX - 80, centerY);
        ctx.lineTo(centerX + 80, centerY);
        ctx.stroke();
        
        // Loops around wires
        ctx.beginPath();
        ctx.arc(centerX, centerY - 50, 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY + 50, 20, 0, Math.PI * 2);
        ctx.stroke();
        break;

      case 'electronBeam':
        // Magnetic Field (Into page)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.font = '12px Inter';
        for (let x = 40; x < 260; x += 40) {
          for (let y = 40; y < 160; y += 40) {
            ctx.fillText('×', x, y);
          }
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Field Into Page', centerX - 45, 25);

        // Electron Beam
        ctx.strokeStyle = '#60a5fa';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(centerX - 40, centerY);
        // Curve into arc
        ctx.arc(centerX - 40, centerY - 60, 60, Math.PI / 2, Math.PI, true);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#60a5fa';
        ctx.fillText('Electron Beam', 10, centerY - 10);
        break;

      case 'transformerMath':
        // Core
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 10;
        ctx.strokeRect(centerX - 70, centerY - 50, 140, 100);
        
        // Primary
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.ellipse(centerX - 70, centerY - 30 + i * 20, 15, 6, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Vp, Ip', centerX - 120, centerY);

        // Secondary
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.ellipse(centerX + 70, centerY - 35 + i * 14, 15, 5, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillText('Vs, Is', centerX + 85, centerY);
        ctx.font = '10px Inter';
        ctx.fillText('Vp × Ip = Vs × Is', centerX - 40, centerY + 70);
        break;

      case 'laminatedCore':
        // Laminated Core (Slices)
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1;
        for (let i = 0; i < 10; i++) {
          ctx.strokeRect(centerX - 50 + i * 10, centerY - 60, 8, 120);
          // Small gap/insulation
          ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.fillRect(centerX - 42 + i * 10, centerY - 60, 2, 120);
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Laminated Iron Core', centerX - 65, centerY + 80);
        ctx.font = '10px Inter';
        ctx.fillText('Reduces Eddy Currents', centerX - 55, centerY - 75);
        break;

      case 'generatorGraph':
        // Axes
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(20, centerY);
        ctx.lineTo(280, centerY);
        ctx.moveTo(centerX, 20);
        ctx.lineTo(centerX, 180);
        ctx.stroke();

        // Normal Sine Wave
        ctx.strokeStyle = '#60a5fa';
        ctx.beginPath();
        for (let x = 20; x < 280; x++) {
          const y = centerY + Math.sin((x - 20) * 0.05) * 30;
          if (x === 20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.fillStyle = '#60a5fa';
        ctx.fillText('Normal', 20, 40);

        // Doubled Speed (2x Amp, 2x Freq)
        ctx.strokeStyle = '#ef4444';
        ctx.beginPath();
        for (let x = 20; x < 280; x++) {
          const y = centerY + Math.sin((x - 20) * 0.1) * 60;
          if (x === 20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.fillStyle = '#ef4444';
        ctx.fillText('2x Speed', 20, 60);
        break;

      case 'handRules':
        // Grip Rule (Left)
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        // Wire
        ctx.beginPath();
        ctx.moveTo(centerX - 80, 40);
        ctx.lineTo(centerX - 80, 160);
        ctx.stroke();
        // Hand sketch (simplified)
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(centerX - 80, centerY, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Grip Rule', centerX - 110, 180);

        // Left Hand Rule (Right)
        const rx = centerX + 80;
        const ry = centerY;
        ctx.strokeStyle = '#ef4444'; // Motion
        drawArrow(ctx, rx, ry, rx, ry - 50);
        ctx.fillText('Motion', rx + 5, ry - 40);
        
        ctx.strokeStyle = '#3b82f6'; // Field
        drawArrow(ctx, rx, ry, rx + 50, ry);
        ctx.fillText('Field', rx + 10, ry + 15);
        
        ctx.strokeStyle = '#10b981'; // Current
        drawArrow(ctx, rx, ry, rx - 30, ry + 30);
        ctx.fillText('Current', rx - 60, ry + 45);
        
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Left-Hand Rule', centerX + 40, 180);
        break;

      case 'transformerDC':
        // DC Transformer (Battery)
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 10;
        ctx.strokeRect(centerX - 70, centerY - 50, 140, 100);
        
        // Primary with Battery
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.ellipse(centerX - 70, centerY - 30 + i * 20, 15, 6, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillText('DC (Battery)', centerX - 130, centerY);
        
        // Secondary
        ctx.strokeStyle = '#94a3b8';
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.ellipse(centerX + 70, centerY - 35 + i * 14, 15, 5, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 12px Inter';
        ctx.fillText('NO INDUCTION', centerX - 45, centerY);
        ctx.font = '10px Inter';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Constant Magnetic Field', centerX - 55, centerY + 20);
        break;

      case 'lenzEnergy':
        // Coil
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.ellipse(centerX + 40, centerY - 40 + i * 20, 30, 8, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        // Magnet moving in
        ctx.fillStyle = '#ef4444'; // North
        ctx.fillRect(centerX - 100, centerY - 15, 40, 30);
        ctx.fillStyle = '#3b82f6'; // South
        ctx.fillRect(centerX - 60, centerY - 15, 40, 30);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('N', centerX - 90, centerY + 5);
        ctx.fillText('S', centerX - 50, centerY + 5);
        
        // Motion Arrow
        ctx.strokeStyle = '#ffffff';
        drawArrow(ctx, centerX - 110, centerY - 30, centerX - 30, centerY - 30);
        ctx.fillText('Work Done', centerX - 100, centerY - 40);
        
        // Repulsion Arrow
        ctx.strokeStyle = '#ef4444';
        drawArrow(ctx, centerX - 20, centerY + 30, centerX - 80, centerY + 30);
        ctx.fillText('Repulsive Force', centerX - 90, centerY + 45);
        break;

      case 'forceFactors':
        // Magnetic Field
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i < 5; i++) {
          drawArrow(ctx, 40, 40 + i * 30, 260, 40 + i * 30);
        }
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillText('Field (B)', 240, 30);
        
        // Wire
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX, 20);
        ctx.lineTo(centerX, 180);
        ctx.stroke();
        
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('Current (I)', centerX + 10, 40);
        ctx.fillText('Length (L)', centerX + 10, centerY);
        
        // Force Arrow
        ctx.strokeStyle = '#ef4444';
        drawArrow(ctx, centerX, centerY, centerX + 60, centerY + 40);
        ctx.fillStyle = '#ef4444';
        ctx.fillText('Force (F)', centerX + 40, centerY + 60);
        ctx.fillText('F = B × I × L', centerX - 30, 195);
        break;

      case 'coreInduction':
        // Magnet
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(centerX - 80, centerY - 60, 40, 120);
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(centerX - 80, centerY + 60, 40, 20); // Just a bit of South
        
        // Field Lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        for (let i = -2; i <= 2; i++) {
          ctx.beginPath();
          ctx.moveTo(centerX - 40, centerY + i * 20);
          ctx.lineTo(centerX + 100, centerY + i * 20);
          ctx.stroke();
        }
        
        // Moving Wire (Cross section)
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(centerX + 40, centerY - 40, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Motion Arrow
        ctx.strokeStyle = '#ffffff';
        drawArrow(ctx, centerX + 40, centerY - 40, centerX + 40, centerY + 40);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Wire "Cutting" Lines', centerX + 55, centerY);
        ctx.fillText('Induced Voltage ∝ Rate of Cutting', centerX - 80, 190);
        break;

      case 'transmissionMath':
        // Power Station
        ctx.fillStyle = '#475569';
        ctx.fillRect(20, centerY - 20, 40, 40);
        ctx.fillStyle = '#ffffff';
        ctx.font = '8px Inter';
        ctx.fillText('Power', 25, centerY + 5);
        
        // Step Up
        ctx.strokeStyle = '#fbbf24';
        ctx.strokeRect(70, centerY - 15, 20, 30);
        ctx.fillText('Step Up', 65, centerY - 20);
        
        // Transmission Lines
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(90, centerY - 5);
        ctx.lineTo(210, centerY - 5);
        ctx.moveTo(90, centerY + 5);
        ctx.lineTo(210, centerY + 5);
        ctx.stroke();
        
        ctx.fillStyle = '#60a5fa';
        ctx.fillText('High V, Low I', 120, centerY - 15);
        ctx.fillStyle = '#ef4444';
        ctx.fillText('P_loss = I²R', 125, centerY + 20);
        
        // Step Down
        ctx.strokeStyle = '#fbbf24';
        ctx.strokeRect(210, centerY - 15, 20, 30);
        ctx.fillText('Step Down', 205, centerY - 20);
        
        // Homes
        ctx.fillStyle = '#475569';
        ctx.fillRect(240, centerY - 15, 30, 30);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Homes', 242, centerY + 5);
        break;
    }
  }, [type]);

  const drawFieldLoop = (ctx: CanvasRenderingContext2D, cx: number, cy: number, rx: number, ry: number, top: boolean) => {
    ctx.beginPath();
    const startAngle = top ? Math.PI : 0;
    const endAngle = top ? 0 : Math.PI;
    ctx.ellipse(cx, cy, rx, ry, 0, startAngle, endAngle, !top);
    ctx.stroke();
  };

  const drawArrow = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
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

  const drawArrowOnCircle = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, angle: number) => {
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    const headlen = 8;
    const tangentAngle = angle - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + headlen * Math.cos(tangentAngle - Math.PI / 6), y + headlen * Math.sin(tangentAngle - Math.PI / 6));
    ctx.moveTo(x, y);
    ctx.lineTo(x + headlen * Math.cos(tangentAngle + Math.PI / 6), y + headlen * Math.sin(tangentAngle + Math.PI / 6));
    ctx.stroke();
  };

  return (
    <div className="flex justify-center my-6 bg-black/20 rounded-xl p-4 border border-white/5">
      <canvas ref={canvasRef} width={300} height={200} className="max-w-full h-auto" />
    </div>
  );
};
