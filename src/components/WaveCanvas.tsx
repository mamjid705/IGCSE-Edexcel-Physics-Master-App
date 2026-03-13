import React, { useEffect, useRef } from 'react';

interface WaveCanvasProps {
  type: string;
}

export const WaveCanvas: React.FC<WaveCanvasProps> = ({ type }) => {
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
    ctx.strokeStyle = '#60a5fa'; // blue-400
    ctx.fillStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.font = 'italic 12px Georgia';

    const drawArrow = (x1: number, y1: number, x2: number, y2: number) => {
      const headlen = 10;
      const angle = Math.atan2(y2 - y1, x2 - x1);
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
    };

    switch (type) {
      case 'waveLabels': {
        // Transverse Wave
        ctx.beginPath();
        ctx.moveTo(50, h / 2);
        for (let x = 50; x < w - 50; x++) {
          const y = h / 2 + Math.sin((x - 50) * 0.05) * 40;
          ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Rest position line
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(50, h / 2);
        ctx.lineTo(w - 50, h / 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.strokeStyle = '#60a5fa';

        // Peak and Trough
        ctx.fillText('Peak', 50 + Math.PI / 0.1, h / 2 - 45);
        ctx.fillText('Trough', 50 + (3 * Math.PI) / 0.1, h / 2 + 55);

        // Amplitude
        const ampX = 100;
        drawArrow(ampX, h / 2, ampX, h / 2 - 40);
        ctx.fillText('Amplitude', ampX + 5, h / 2 - 20);

        // Wavelength
        const waveX1 = 50 + Math.PI / 0.1;
        const waveX2 = waveX1 + (2 * Math.PI) / 0.05;
        drawArrow(waveX1, h / 2 - 50, waveX2, h / 2 - 50);
        drawArrow(waveX2, h / 2 - 50, waveX1, h / 2 - 50);
        ctx.fillText('Wavelength (λ)', (waveX1 + waveX2) / 2 - 40, h / 2 - 60);
        break;
      }

      case 'refractionRay': {
        // Rectangular glass block
        ctx.strokeRect(100, 100, 200, 100);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.fillRect(100, 100, 200, 100);
        ctx.fillStyle = '#60a5fa';

        // Normal lines
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(150, 50); ctx.lineTo(150, 150);
        ctx.moveTo(250, 150); ctx.lineTo(250, 250);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.strokeStyle = '#60a5fa';

        // Incident Ray
        drawArrow(50, 50, 150, 100);
        ctx.fillText('i', 140, 85);

        // Refracted Ray
        drawArrow(150, 100, 250, 200);
        ctx.fillText('r', 160, 125);

        // Emergent Ray
        drawArrow(250, 200, 350, 250);
        
        ctx.fillText('Air', 50, 80);
        ctx.fillText('Glass', 110, 120);
        break;
      }

      case 'tirRay': {
        // Semi-circular glass block
        ctx.beginPath();
        ctx.arc(w / 2, 100, 100, 0, Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.fill();
        ctx.fillStyle = '#60a5fa';

        const cx = w / 2;
        const cy = 100;

        // Normal
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath(); ctx.moveTo(cx, 50); ctx.lineTo(cx, 250); ctx.stroke();
        ctx.setLineDash([]);
        ctx.strokeStyle = '#60a5fa';

        // Ray 1: Refraction
        ctx.strokeStyle = '#93c5fd';
        drawArrow(cx - 40, cy + 80, cx, cy);
        drawArrow(cx, cy, cx + 80, cy - 20);
        ctx.fillText('Refraction', cx + 85, cy - 10);

        // Ray 2: Critical Angle
        ctx.strokeStyle = '#3b82f6';
        drawArrow(cx - 70, cy + 70, cx, cy);
        drawArrow(cx, cy, cx + 100, cy);
        ctx.fillText('c', cx - 15, cy + 30);
        ctx.fillText('Critical Angle', cx + 105, cy + 5);

        // Ray 3: TIR
        ctx.strokeStyle = '#1d4ed8';
        drawArrow(cx - 90, cy + 40, cx, cy);
        drawArrow(cx, cy, cx + 90, cy + 40);
        ctx.fillText('TIR', cx + 95, cy + 45);
        break;
      }

      case 'diffraction': {
        const gapSize = 40;
        const gapY = h / 2 - gapSize / 2;

        // Barriers
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, gapY);
        ctx.moveTo(w / 2, gapY + gapSize); ctx.lineTo(w / 2, h);
        ctx.stroke();

        // Incident wavefronts
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#60a5fa';
        for (let x = 50; x < w / 2; x += 20) {
          ctx.beginPath();
          ctx.moveTo(x, 50); ctx.lineTo(x, h - 50);
          ctx.stroke();
        }

        // Diffracted wavefronts
        for (let r = 20; r < 150; r += 20) {
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, r, -Math.PI / 2.5, Math.PI / 2.5);
          ctx.stroke();
        }
        ctx.fillText('Diffraction', w / 2 + 50, 40);
        break;
      }

      case 'oscilloscope': {
        // Grid
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        for (let x = 0; x <= w; x += 40) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let y = 0; y <= h; y += 40) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // High Pitch (High Frequency)
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, h / 3);
        for (let x = 0; x < w; x++) {
          ctx.lineTo(x, h / 3 + Math.sin(x * 0.1) * 20);
        }
        ctx.stroke();
        ctx.fillStyle = '#f87171';
        ctx.fillText('High Pitch (High Freq)', 10, h / 3 - 25);

        // Loud (High Amplitude)
        ctx.strokeStyle = '#60a5fa';
        ctx.beginPath();
        ctx.moveTo(0, (2 * h) / 3);
        for (let x = 0; x < w; x++) {
          ctx.lineTo(x, (2 * h) / 3 + Math.sin(x * 0.03) * 40);
        }
        ctx.stroke();
        ctx.fillStyle = '#60a5fa';
        ctx.fillText('Loud (High Amp)', 10, (2 * h) / 3 - 45);
        break;
      }

      case 'emSpectrum': {
        const barY = h / 2 - 20;
        const barH = 40;
        const types = ['Radio', 'Micro', 'IR', 'Visible', 'UV', 'X-ray', 'Gamma'];
        const step = (w - 40) / 7;

        ctx.strokeStyle = '#94a3b8';
        ctx.strokeRect(20, barY, w - 40, barH);
        for (let i = 1; i < 7; i++) {
          ctx.beginPath();
          ctx.moveTo(20 + i * step, barY);
          ctx.lineTo(20 + i * step, barY + barH);
          ctx.stroke();
        }

        types.forEach((t, i) => {
          ctx.font = '10px sans-serif';
          ctx.fillStyle = '#f1f5f9';
          ctx.fillText(t, 25 + i * step, barY + 25);
        });

        // Arrows
        ctx.font = 'italic 11px Georgia';
        ctx.fillStyle = '#60a5fa';
        ctx.strokeStyle = '#60a5fa';
        drawArrow(20, barY - 30, w - 20, barY - 30);
        ctx.fillText('Increasing Frequency', w / 2 - 50, barY - 40);

        drawArrow(w - 20, barY + barH + 30, 20, barY + barH + 30);
        ctx.fillText('Increasing Wavelength', w / 2 - 50, barY + barH + 50);
        break;
      }

      case 'dopplerEffect': {
        const sourceX = w / 2 + 40;
        const sourceY = h / 2;

        // Source
        ctx.beginPath();
        ctx.arc(sourceX, sourceY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText('Source Moving →', sourceX - 40, sourceY - 15);

        // Bunched up waves (Front)
        for (let i = 1; i <= 5; i++) {
          ctx.beginPath();
          ctx.arc(sourceX - i * 15, sourceY, i * 25, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        ctx.fillText('Higher Freq', sourceX + 20, sourceY + 60);
        ctx.fillText('Lower Freq', sourceX - 140, sourceY + 60);
        break;
      }

      case 'opticalFiber': {
        // Curved tube
        ctx.beginPath();
        ctx.moveTo(50, 100);
        ctx.bezierCurveTo(150, 50, 250, 250, 350, 150);
        ctx.lineWidth = 30;
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
        ctx.stroke();
        
        ctx.lineWidth = 2;
        // Zig-zag ray
        ctx.beginPath();
        ctx.moveTo(40, 105);
        ctx.lineTo(100, 85);
        ctx.lineTo(180, 115);
        ctx.lineTo(260, 165);
        ctx.lineTo(340, 155);
        ctx.strokeStyle = '#f87171';
        ctx.stroke();
        
        ctx.fillStyle = '#f87171';
        ctx.fillText('TIR', 180, 135);
        ctx.fillStyle = '#60a5fa';
        ctx.fillText('Optical Fiber', 50, 50);
        break;
      }

      case 'soundVibrations': {
        // Loudspeaker
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(30, h / 2 - 20);
        ctx.lineTo(50, h / 2 - 20);
        ctx.lineTo(70, h / 2 - 40);
        ctx.lineTo(70, h / 2 + 40);
        ctx.lineTo(50, h / 2 + 20);
        ctx.lineTo(30, h / 2 + 20);
        ctx.closePath();
        ctx.stroke();

        // Particles
        ctx.fillStyle = '#94a3b8';
        for (let x = 80; x < w - 20; x += 2) {
          const isCompression = Math.sin(x * 0.1) > 0.5;
          const count = isCompression ? 8 : 2;
          for (let i = 0; i < count; i++) {
            const py = h / 2 + (Math.random() - 0.5) * 60;
            ctx.beginPath();
            ctx.arc(x + (Math.random() - 0.5) * 5, py, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.fillStyle = '#60a5fa';
        ctx.fillText('Compression', 100, h / 2 - 50);
        ctx.fillText('Rarefaction', 160, h / 2 - 50);
        break;
      }

      case 'reflection': {
        // Draw Mirror
        ctx.beginPath();
        ctx.moveTo(50, h / 2 + 20);
        ctx.lineTo(w - 50, h / 2 + 20);
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Mirror shading
        ctx.lineWidth = 1;
        for (let i = 50; i < w - 50; i += 10) {
          ctx.beginPath();
          ctx.moveTo(i, h / 2 + 20);
          ctx.lineTo(i - 5, h / 2 + 30);
          ctx.stroke();
        }

        // Normal line
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(w / 2, h / 2 - 80);
        ctx.lineTo(w / 2, h / 2 + 20);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.stroke();
        ctx.setLineDash([]);

        // Incident Ray
        ctx.strokeStyle = '#60a5fa';
        drawArrow(w / 2 - 80, h / 2 - 60, w / 2, h / 2 + 20);
        
        // Reflected Ray
        drawArrow(w / 2, h / 2 + 20, w / 2 + 80, h / 2 - 60);

        // Labels
        ctx.fillText('i', w / 2 - 15, h / 2 - 10);
        ctx.fillText('r', w / 2 + 10, h / 2 - 10);
        ctx.fillText('Normal', w / 2 - 20, h / 2 - 90);
        break;
      }

      case 'refraction': {
        // Draw Glass Block
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.fillRect(w / 2 - 80, h / 2 - 30, 160, 60);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.strokeRect(w / 2 - 80, h / 2 - 30, 160, 60);

        // Normal lines
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.moveTo(w / 2 - 40, h / 2 - 80);
        ctx.lineTo(w / 2 - 40, h / 2 + 20);
        ctx.stroke();
        ctx.setLineDash([]);

        // Incident Ray
        ctx.strokeStyle = '#60a5fa';
        drawArrow(w / 2 - 100, h / 2 - 70, w / 2 - 40, h / 2 - 30);

        // Refracted Ray
        drawArrow(w / 2 - 40, h / 2 - 30, w / 2, h / 2 + 30);

        ctx.fillText('Air', w / 2 - 120, h / 2 - 50);
        ctx.fillText('Glass', w / 2 - 20, h / 2 + 5);
        break;
      }

      case 'wavefronts': {
        // Deep to Shallow
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.moveTo(w / 2, 20);
        ctx.lineTo(w / 2, h - 20);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillText('Deep', w / 2 - 80, 40);
        ctx.fillText('Shallow', w / 2 + 20, 40);

        // Wavefronts
        ctx.strokeStyle = '#60a5fa';
        for (let i = 0; i < 4; i++) {
          const x = w / 2 - 100 + (i * 30);
          ctx.beginPath(); ctx.moveTo(x, 60); ctx.lineTo(x, h - 60); ctx.stroke();
        }
        for (let i = 0; i < 6; i++) {
          const x = w / 2 + 10 + (i * 15);
          ctx.beginPath(); ctx.moveTo(x, 60); ctx.lineTo(x, h - 60); ctx.stroke();
        }
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
        Physics Visualization Engine v3.1 - Waves
      </p>
    </div>
  );
};
