import React, { useEffect, useRef } from 'react';

interface ElectricityCanvasProps {
  type: string;
}

export const ElectricityCanvas: React.FC<ElectricityCanvasProps> = ({ type }) => {
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

    const drawBattery = (x: number, y: number, horizontal = true) => {
      ctx.beginPath();
      if (horizontal) {
        ctx.moveTo(x - 3, y - 10); ctx.lineTo(x - 3, y + 10);
        ctx.moveTo(x + 3, y - 5); ctx.lineTo(x + 3, y + 5);
      } else {
        ctx.moveTo(x - 10, y - 3); ctx.lineTo(x + 10, y - 3);
        ctx.moveTo(x - 5, y + 3); ctx.lineTo(x + 5, y + 3);
      }
      ctx.stroke();
    };

    const drawResistor = (x: number, y: number, horizontal = true) => {
      const rw = horizontal ? 30 : 15;
      const rh = horizontal ? 15 : 30;
      ctx.strokeRect(x - rw / 2, y - rh / 2, rw, rh);
    };

    const drawVariableResistor = (x: number, y: number) => {
      drawResistor(x, y);
      ctx.beginPath();
      ctx.moveTo(x - 20, y + 15);
      ctx.lineTo(x + 20, y - 15);
      ctx.stroke();
      // Arrow head
      ctx.beginPath();
      ctx.moveTo(x + 20, y - 15);
      ctx.lineTo(x + 12, y - 15);
      ctx.moveTo(x + 20, y - 15);
      ctx.lineTo(x + 20, y - 7);
      ctx.stroke();
    };

    const drawAmmeter = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('A', x, y);
    };

    const drawVoltmeter = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('V', x, y);
    };

    const drawFuse = (x: number, y: number) => {
      ctx.strokeRect(x - 15, y - 7.5, 30, 15);
      ctx.beginPath();
      ctx.moveTo(x - 25, y);
      ctx.lineTo(x + 25, y);
      ctx.stroke();
    };

    const drawLDR = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.stroke();
      drawResistor(x, y);
      // Light arrows
      ctx.beginPath();
      ctx.moveTo(x - 25, y - 25); ctx.lineTo(x - 15, y - 15);
      ctx.moveTo(x - 30, y - 20); ctx.lineTo(x - 20, y - 10);
      ctx.stroke();
    };

    const drawThermistor = (x: number, y: number) => {
      drawResistor(x, y);
      ctx.beginPath();
      ctx.moveTo(x - 20, y + 15);
      ctx.lineTo(x + 10, y - 15);
      ctx.lineTo(x + 20, y - 15);
      ctx.stroke();
    };

    switch (type) {
      case 'circuitSymbols': {
        const cols = 3;
        const spacingX = w / 4;
        const spacingY = h / 3;
        
        const symbols = [
          { name: 'Battery', draw: drawBattery, label: 'A' },
          { name: 'Resistor', draw: drawResistor, label: 'B' },
          { name: 'Var. Resistor', draw: drawVariableResistor, label: 'C' },
          { name: 'Ammeter', draw: drawAmmeter, label: 'D' },
          { name: 'Voltmeter', draw: drawVoltmeter, label: 'E' },
          { name: 'Fuse', draw: drawFuse, label: 'F' }
        ];

        symbols.forEach((s, i) => {
          const x = spacingX * (i % cols + 1);
          const y = spacingY * (Math.floor(i / cols) + 1) - 20;
          s.draw(x, y);
          
          // Reference letters instead of names
          ctx.font = 'bold 14px sans-serif';
          ctx.fillStyle = '#94a3b8';
          ctx.textAlign = 'center';
          ctx.fillText(s.label, x, y + 35);
        });
        break;
      }

      case 'ivGraph':
      case 'ivGraphFilament':
      case 'ivGraphDiode':
      case 'ivGraphResistor': {
        // Axes
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(50, 50); ctx.lineTo(50, h - 50); // Y
        ctx.lineTo(w - 50, h - 50); // X
        ctx.stroke();
        
        // Axis Labels
        ctx.font = 'bold 16px sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'center';
        ctx.fillText('V', w - 30, h - 45);
        ctx.fillText('I', 30, 55);

        const isFilament = type === 'ivGraphFilament' || (type === 'ivGraph' && h > 0); // Default to all if just 'ivGraph' for backward compatibility if needed, but we will update bank
        const isDiode = type === 'ivGraphDiode';
        const isResistor = type === 'ivGraphResistor';
        const isGeneric = type === 'ivGraph';

        // Ohmic (Straight)
        if (isResistor || isGeneric) {
          ctx.strokeStyle = '#60a5fa';
          ctx.beginPath();
          ctx.moveTo(50, h - 50);
          ctx.lineTo(w - 100, 100);
          ctx.stroke();
        }

        // Filament (S curve)
        if (isFilament || isGeneric) {
          ctx.strokeStyle = '#f87171';
          ctx.beginPath();
          ctx.moveTo(50, h - 50);
          for (let x = 50; x < w - 100; x++) {
            const relX = (x - 50) / (w - 150);
            const y = (h - 50) - Math.pow(relX, 0.7) * 150;
            ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        // Diode
        if (isDiode || isGeneric) {
          ctx.strokeStyle = '#34d399';
          ctx.beginPath();
          ctx.moveTo(50, h - 50);
          const threshold = 150;
          ctx.lineTo(threshold, h - 50);
          for (let x = threshold; x < w - 100; x++) {
            const relX = (x - threshold) / (w - threshold - 100);
            const y = (h - 50) - Math.pow(relX, 3) * 150;
            ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        break;
      }

      case 'seriesParallel': {
        // Series
        const sX = 80;
        ctx.strokeRect(sX - 50, 50, 100, 150);
        drawBattery(sX, 50);
        drawResistor(sX - 50, 125, false);
        drawResistor(sX + 50, 125, false);
        ctx.fillText('Series', sX - 20, 220);

        // Parallel
        const pX = 250;
        ctx.strokeRect(pX - 50, 50, 100, 150);
        drawBattery(pX, 50);
        // Branches
        ctx.beginPath();
        ctx.moveTo(pX - 50, 125); ctx.lineTo(pX + 50, 125);
        ctx.stroke();
        drawResistor(pX, 125);
        drawResistor(pX, 200);
        ctx.fillText('Parallel', pX - 20, 220);
        break;
      }

      case 'staticRod': {
        // Rod
        ctx.fillStyle = '#475569';
        ctx.fillRect(50, 100, 200, 30);
        ctx.strokeStyle = '#94a3b8';
        ctx.strokeRect(50, 100, 200, 30);
        
        // Cloth
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(280, 80);
        ctx.lineTo(350, 80);
        ctx.lineTo(370, 150);
        ctx.lineTo(300, 150);
        ctx.closePath();
        ctx.fill();

        // Charges
        ctx.font = 'bold 24px sans-serif'; // Larger signs
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Cloth (+) - Red
        ctx.fillStyle = '#ef4444'; // Red-500
        for (let i = 0; i < 5; i++) {
          ctx.fillText('+', 310 + i * 10, 110 + i * 5);
        }
        
        // Rod (-) - Blue
        ctx.fillStyle = '#3b82f6'; // Blue-500
        for (let i = 0; i < 8; i++) {
          ctx.fillText('-', 70 + i * 20, 115);
        }

        ctx.font = 'bold 12px sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Polyethene Rod (-)', 150, 150);
        ctx.fillText('Cloth (+)', 325, 170);
        break;
      }

      case 'threePinPlug': {
        // Plug body
        ctx.beginPath();
        ctx.roundRect(100, 50, 200, 200, 20);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fill();

        // Pins/Terminals
        const earthX = 200, earthY = 80;
        const liveX = 260, liveY = 180;
        const neutralX = 140, neutralY = 180;

        // Wires
        ctx.lineWidth = 4;
        // Earth
        ctx.strokeStyle = '#eab308'; // Yellow
        ctx.beginPath(); ctx.moveTo(200, 250); ctx.lineTo(200, earthY); ctx.stroke();
        // Live
        ctx.strokeStyle = '#92400e'; // Brown
        ctx.beginPath(); ctx.moveTo(200, 250); ctx.lineTo(liveX, liveY); ctx.stroke();
        // Neutral
        ctx.strokeStyle = '#2563eb'; // Blue
        ctx.beginPath(); ctx.moveTo(200, 250); ctx.lineTo(neutralX, neutralY); ctx.stroke();

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#fbbf24';
        // Fuse
        ctx.strokeRect(liveX - 10, liveY - 40, 20, 40);
        ctx.font = '10px sans-serif';
        ctx.fillText('Fuse', liveX + 15, liveY - 20);

        ctx.fillText('Earth (G/Y)', earthX - 30, earthY - 10);
        ctx.fillText('Live (Br)', liveX - 10, liveY + 20);
        ctx.fillText('Neutral (Bl)', neutralX - 20, neutralY + 20);
        break;
      }

      case 'ldrThermistor': {
        // LDR
        drawLDR(100, 100);
        ctx.fillText('LDR', 90, 150);
        // Sun icon
        ctx.beginPath();
        ctx.arc(60, 60, 10, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 8; i++) {
          const ang = (i * Math.PI) / 4;
          ctx.moveTo(60 + Math.cos(ang) * 12, 60 + Math.sin(ang) * 12);
          ctx.lineTo(60 + Math.cos(ang) * 18, 60 + Math.sin(ang) * 18);
        }
        ctx.stroke();

        // Thermistor
        drawThermistor(300, 100);
        ctx.fillText('Thermistor', 270, 150);
        // Flame icon
        ctx.beginPath();
        ctx.moveTo(330, 70);
        ctx.bezierCurveTo(340, 50, 320, 40, 330, 30);
        ctx.bezierCurveTo(310, 40, 320, 50, 310, 70);
        ctx.closePath();
        ctx.stroke();
        break;
      }

      case 'potentialDivider': {
        // Battery
        drawBattery(w / 2, 50);
        // Circuit loop
        ctx.beginPath();
        ctx.moveTo(w / 2 - 20, 50);
        ctx.lineTo(100, 50);
        ctx.lineTo(100, 250);
        ctx.lineTo(300, 250);
        ctx.lineTo(300, 50);
        ctx.lineTo(w / 2 + 20, 50);
        ctx.stroke();

        // Resistors
        drawResistor(100, 120, false);
        drawResistor(100, 200, false);
        
        // Voltmeter across lower resistor
        ctx.beginPath();
        ctx.moveTo(100, 170); ctx.lineTo(160, 170);
        ctx.lineTo(160, 230); ctx.lineTo(100, 230);
        ctx.stroke();
        drawVoltmeter(160, 200);

        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('2 Ω', 70, 125);
        ctx.fillText('4 Ω', 70, 205);
        ctx.fillText('6 V', w / 2 - 10, 35);
        break;
      }

      case 'ldrSensor': {
        // Battery
        drawBattery(w / 2, 50);
        // Circuit loop
        ctx.beginPath();
        ctx.moveTo(w / 2 - 20, 50);
        ctx.lineTo(100, 50);
        ctx.lineTo(100, 250);
        ctx.lineTo(300, 250);
        ctx.lineTo(300, 50);
        ctx.lineTo(w / 2 + 20, 50);
        ctx.stroke();

        // LDR and Fixed Resistor
        drawLDR(100, 120);
        drawResistor(100, 200, false);
        
        // Voltmeter across fixed resistor
        ctx.beginPath();
        ctx.moveTo(100, 170); ctx.lineTo(160, 170);
        ctx.lineTo(160, 230); ctx.lineTo(100, 230);
        ctx.stroke();
        drawVoltmeter(160, 200);

        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('LDR', 60, 125);
        ctx.fillText('Fixed R', 55, 205);
        break;
      }

      case 'fuelStatic': {
        // Aircraft Fuel Tank
        ctx.beginPath();
        ctx.roundRect(100, 100, 200, 100, 10);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.fill();
        
        // Fuel Pipe
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(150, 50);
        ctx.lineTo(150, 100);
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.lineWidth = 2;

        // Earthing Wire
        ctx.strokeStyle = '#22c55e'; // Green-500
        ctx.beginPath();
        ctx.moveTo(300, 150);
        ctx.lineTo(350, 150);
        ctx.lineTo(350, 250);
        ctx.stroke();
        
        // Ground symbol
        ctx.beginPath();
        ctx.moveTo(330, 250); ctx.lineTo(370, 250);
        ctx.moveTo(340, 255); ctx.lineTo(360, 255);
        ctx.moveTo(345, 260); ctx.lineTo(355, 260);
        ctx.stroke();

        // Charges
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('+', 120, 130);
        ctx.fillText('+', 180, 160);
        ctx.fillText('+', 250, 120);
        
        ctx.fillStyle = '#22c55e';
        ctx.fillText('Earthing Wire', 280, 220);
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Aircraft Tank', 160, 220);
        break;
      }

      case 'breakerVsFuse': {
        // Fuse
        ctx.fillText('Fuse', 80, 50);
        drawFuse(100, 100);
        ctx.beginPath();
        ctx.moveTo(100, 110); ctx.lineTo(100, 130);
        ctx.stroke();
        ctx.fillText('Melts if I > rating', 50, 150);

        // Circuit Breaker
        ctx.fillText('Circuit Breaker', 250, 50);
        // Switch mechanism
        ctx.beginPath();
        ctx.moveTo(250, 100);
        ctx.lineTo(280, 70); // Open switch
        ctx.moveTo(220, 100);
        ctx.lineTo(250, 100);
        ctx.moveTo(280, 100);
        ctx.lineTo(310, 100);
        ctx.stroke();
        
        // Electromagnet coil
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          ctx.arc(265 + i * 4, 120, 5, 0, Math.PI);
        }
        ctx.stroke();

        ctx.fillText('Trips (Opens)', 230, 150);
        ctx.fillText('Can be reset', 230, 170);
        break;
      }

      case 'acOscilloscope': {
        // Screen
        ctx.strokeStyle = '#1e293b';
        ctx.strokeRect(50, 50, 300, 200);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(50, 50, 300, 200);
        
        // Grid
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.beginPath();
        for (let i = 1; i < 6; i++) {
          ctx.moveTo(50 + i * 50, 50); ctx.lineTo(50 + i * 50, 250);
          ctx.moveTo(50, 50 + i * 33); ctx.lineTo(350, 50 + i * 33);
        }
        ctx.stroke();

        // Sine Wave
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(50, 150);
        for (let x = 0; x <= 300; x++) {
          const y = 150 + Math.sin(x * 0.05) * 60;
          ctx.lineTo(50 + x, y);
        }
        ctx.stroke();
        ctx.lineWidth = 2;

        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Peak: 10V', 60, 70);
        ctx.fillText('AC Waveform', 160, 270);
        break;
      }

      case 'electroscope': {
        // Cap
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(w / 2, 50, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Stem
        ctx.beginPath();
        ctx.moveTo(w / 2, 70);
        ctx.lineTo(w / 2, 200);
        ctx.stroke();
        
        // Gold Leaves
        ctx.beginPath();
        ctx.moveTo(w / 2, 200);
        ctx.lineTo(w / 2 - 30, 250);
        ctx.moveTo(w / 2, 200);
        ctx.lineTo(w / 2 + 30, 250);
        ctx.stroke();

        // Charges
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('+', w / 2 - 40, 260);
        ctx.fillText('+', w / 2 + 30, 260);
        ctx.fillText('+', w / 2 - 5, 150);

        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Metal Cap', w / 2 + 25, 55);
        ctx.fillText('Diverging Leaves', w / 2 - 50, 280);
        break;
      }
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
        Physics Visualization Engine v3.1 - Electricity
      </p>
    </div>
  );
};
