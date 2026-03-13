import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, RotateCcw, Weight, Ruler as RulerIcon, 
  Table as TableIcon, ArrowUp, ArrowDown,
  Zap, Sun, Thermometer, Radiation,
  Waves as WavesIcon, Speaker, Mic,
  Telescope, Database, Info, Star, RefreshCcw
} from 'lucide-react';

interface SimulationProps {
  type: string;
  config?: any;
  simType?: string;
}

// --- Shared Components ---

const SimpleTable = ({ data, columns }: { data: any[], columns: { key: string, label: string, unit?: string }[] }) => (
  <div className="w-full h-full flex flex-col">
    <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">Results Log</div>
    <div className="flex-1 overflow-auto border border-slate-200 rounded-lg bg-slate-50/50">
      <table className="w-full text-left text-[13px]">
        <thead className="sticky top-0 bg-white border-b border-slate-200 z-10">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-4 py-3 font-bold text-slate-500 uppercase tracking-tight">
                {col.label} {col.unit && <span className="lowercase text-slate-400">({col.unit})</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-300 italic">
                Waiting for data...
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3 font-mono text-slate-700">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const ControlPanel = ({ 
  onStart, 
  onReset, 
  isRunning, 
  sliders,
  startLabel = "START"
}: { 
  onStart: () => void, 
  onReset: () => void, 
  isRunning: boolean,
  sliders: { label: string, value: number, min: number, max: number, step: number, unit: string, onChange: (val: number) => void }[],
  startLabel?: string
}) => (
  <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-center gap-5 shadow-sm">
    <div className="flex flex-1 gap-5 w-full">
      {sliders.map((s, i) => (
        <div key={i} className="flex-1 space-y-1.5">
          <div className="flex justify-between">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</label>
            <span className="text-[11px] font-bold text-blue-600">{s.value} {s.unit}</span>
          </div>
          <input 
            type="range" min={s.min} max={s.max} step={s.step} 
            value={s.value} onChange={(e) => s.onChange(parseFloat(e.target.value))}
            disabled={isRunning}
            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      ))}
    </div>
    <div className="flex gap-2.5">
      <button 
        onClick={onReset}
        className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all border border-slate-200"
      >
        <RotateCcw size={18} />
      </button>
      <button 
        onClick={onStart} 
        disabled={isRunning}
        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50 text-sm"
      >
        <Play size={18} fill="currentColor" /> {startLabel}
      </button>
    </div>
  </div>
);

// --- Trolley Ramp Engine ---
const TrolleyRamp = ({ isRunning, setIsRunning, setRecordedData, timer, setTimer, TIME_SCALE }: any) => {
  const [force, setForce] = useState(5);
  const [mass, setMass] = useState(1.0);
  const [pos, setPos] = useState(0);
  const [vel, setVel] = useState(0);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  
  const lastTimeRef = useRef<number | null>(null);
  const animateRef = useRef<any>(null);
  const hasFinishedRef = useRef(false);

  const animate = (time: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = time;
      return;
    }
    const wallDt = (time - lastTimeRef.current) / 1000;
    lastTimeRef.current = time;

    const physicsDt = wallDt * TIME_SCALE;
    const acc = force / mass;

    setTimer((prev: number) => prev + physicsDt);
    
    const ds = (vel * physicsDt + 0.5 * acc * physicsDt * physicsDt) * 40;
    const newPos = pos + ds;
    const newVel = vel + acc * physicsDt;

    if (newPos >= 100 && !hasFinishedRef.current) {
      hasFinishedRef.current = true;
      setIsRunning(false);
      setPos(100);
      setVel(newVel);
      const finalTime = (Math.sqrt((2 * (100/40)) / acc)).toFixed(2);
      const newData = { force, mass, time: finalTime, acceleration: acc.toFixed(2) };
      setLocalRecordedData(prev => [...prev, newData]);
      setRecordedData((prev: any[]) => [...prev, newData]);
    } else if (!hasFinishedRef.current) {
      setPos(newPos);
      setVel(newVel);
    }
  };

  animateRef.current = animate;

  useEffect(() => {
    if (!isRunning) {
      lastTimeRef.current = null;
      return;
    }
    hasFinishedRef.current = false;
    let frameId: number;
    const loop = (time: number) => {
      if (animateRef.current) animateRef.current(time);
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isRunning]);

  const reset = () => {
    setIsRunning(false);
    setPos(0);
    setVel(0);
    setTimer(0);
    lastTimeRef.current = null;
    hasFinishedRef.current = false;
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-1 flex-col lg:flex-row gap-4 min-h-[250px]">
        <div className="flex-[1.5] bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden flex flex-col min-h-[200px]">
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-white/80 backdrop-blur px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
              <span className="text-[9px] font-black text-slate-400 uppercase mr-2">Timer</span>
              <span className="text-xs font-mono font-bold text-blue-600">{timer.toFixed(2)}s</span>
            </div>
          </div>

          <div className="flex-1 relative flex items-center">
            {/* Track */}
            <div className="absolute bottom-1/3 left-0 w-full h-1 bg-slate-300" />
            <div className="absolute bottom-1/3 left-0 w-full h-10 bg-slate-100/50" />
            
            {/* Markers */}
            <div className="absolute bottom-1/3 left-0 w-[2px] h-6 bg-slate-400 -translate-y-1/2" />
            <div className="absolute bottom-1/3 left-[100%] w-[2px] h-6 bg-red-400 -translate-y-1/2" />
            <div className="absolute bottom-1/3 left-0 -translate-x-1/2 translate-y-6 text-[7px] font-bold text-slate-400">0m</div>
            <div className="absolute bottom-1/3 left-[100%] -translate-x-1/2 translate-y-6 text-[7px] font-bold text-red-400">FINISH</div>

            {/* Trolley */}
            <motion.div 
              className="absolute bottom-1/3 w-16 h-8 bg-blue-500 rounded-t-lg flex items-center justify-center shadow-sm"
              style={{ left: `${pos}%`, transform: 'translateY(-3px) translateX(-50%)' }}
            >
              <div className="w-3 h-3 rounded-full bg-slate-800 absolute -bottom-1.5 left-2" />
              <div className="w-3 h-3 rounded-full bg-slate-800 absolute -bottom-1.5 right-2" />
              <div className="text-[8px] font-black text-white">{mass}kg</div>
            </motion.div>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden min-h-[150px]">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'force', label: 'Force', unit: 'N' },
              { key: 'mass', label: 'Mass', unit: 'kg' },
              { key: 'time', label: 'Time', unit: 's' },
              { key: 'acceleration', label: 'Acc.', unit: 'm/s²' }
            ]} 
          />
        </div>
      </div>
      <ControlPanel 
        isRunning={isRunning}
        onStart={() => { reset(); setIsRunning(true); }}
        onReset={reset}
        sliders={[
          { label: 'Force', value: force, min: 1, max: 10, step: 1, unit: 'N', onChange: setForce },
          { label: 'Mass', value: mass, min: 0.5, max: 2.0, step: 0.1, unit: 'kg', onChange: setMass }
        ]}
      />
    </div>
  );
};

// --- Spring Stretch Engine ---
const SpringStretch = ({ setRecordedData }: any) => {
  const [weights, setWeights] = useState<number[]>([]);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const hookZoneRef = useRef<HTMLDivElement>(null);
  const k = 20; // Stiffer spring for a better experimental range
  const g = 10;
  
  const totalMass = weights.reduce((a, b) => a + b, 0);
  const force = (totalMass / 1000) * g;
  const targetExtension = (force / k) * 100; // cm scaling

  const [currentExtension, setCurrentExtension] = useState(0);

  useEffect(() => {
    let start: number;
    let frame: number;
    
    const animate = (time: number) => {
      if (!start) start = time;
      const elapsed = (time - start) / 1000;
      
      const damping = 5;
      const frequency = 10;
      const wiggleVal = Math.exp(-damping * elapsed) * Math.cos(frequency * elapsed) * 10;
      
      setCurrentExtension(targetExtension + wiggleVal);
      
      if (elapsed < 2) {
        frame = requestAnimationFrame(animate);
      } else {
        setCurrentExtension(targetExtension);
        if (weights.length > 0) {
           const newData = { mass: totalMass, force: force.toFixed(1), extension: (targetExtension/10).toFixed(2) };
           setLocalRecordedData(prev => {
             const last = prev[prev.length - 1];
             if (last?.mass === totalMass) return prev;
             return [...prev, newData];
           });
           setRecordedData((prev: any[]) => {
             const last = prev[prev.length - 1];
             if (last?.mass === totalMass) return prev;
             return [...prev, newData];
           });
        }
      }
    };

    if (weights.length > 0) {
      frame = requestAnimationFrame(animate);
    } else {
      setCurrentExtension(0);
    }
    
    return () => cancelAnimationFrame(frame);
  }, [weights, targetExtension, totalMass, force, setRecordedData]);

  const reset = () => {
    setWeights([]);
    setLocalRecordedData([]);
    setRecordedData([]);
  };

  const graphPoints = useMemo(() => {
    const maxF = 5;
    const maxE = 20; // Reduced to make the graph steeper visually
    const pointsWithOrigin = [{ force: "0", extension: "0" }, ...localRecordedData];
    const sorted = [...pointsWithOrigin].sort((a, b) => parseFloat(a.force) - parseFloat(b.force));
    
    return sorted.map(d => {
      const x = (parseFloat(d.force) / maxF) * 100;
      const y = 100 - (parseFloat(d.extension) / maxE) * 100;
      return `${x},${y}`;
    }).join(" ");
  }, [localRecordedData]);

  const addWeight = (m: number) => {
    setWeights(prev => [...prev, m]);
  };

  return (
    <div className="flex flex-col h-full space-y-2">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[240px]">
        {/* Simulation Area */}
        <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden flex justify-center min-h-[180px]">
          {/* Support */}
          <div className="absolute top-0 w-20 h-1 bg-slate-700 rounded-b z-10" />
          
          {/* Ruler */}
          <div className="absolute right-2 top-2 bottom-2 w-5 bg-amber-50 border-x border-amber-200 flex flex-col justify-between py-1 px-0.5">
            {Array.from({ length: 21 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className={`h-[0.5px] bg-amber-900/30 ${i % 5 === 0 ? 'w-1.5' : 'w-0.5'}`} />
                {i % 5 === 0 && <span className="text-[3px] font-bold text-amber-900/40 font-mono">{i}</span>}
              </div>
            ))}
          </div>

          {/* Spring & Hook Zone */}
          <div className="relative mt-1 flex flex-col items-center">
            <div className="w-0.5 h-3 bg-slate-400" />
            <svg width="20" height={60 + currentExtension} viewBox={`0 0 40 ${120 + currentExtension}`} preserveAspectRatio="none">
              <path 
                d={`M 20 0 ${Array.from({ length: 16 }).map((_, i) => {
                  const y = (i + 1) * ((120 + currentExtension) / 16);
                  const x = 20 + (i % 2 === 0 ? 12 : -12);
                  return `L ${x} ${y}`;
                }).join(' ')} L 20 ${120 + currentExtension}`}
                fill="none"
                stroke="#64748b"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            
            {/* Hook Zone */}
            <div 
              ref={hookZoneRef}
              className="w-10 h-10 -mt-5 rounded-full border border-dashed border-blue-400/30 flex items-center justify-center bg-blue-500/5 z-20"
            >
              <div className="w-3 h-3 border border-slate-400 rounded-full bg-slate-50" />
            </div>

            {/* Attached Weights */}
            <div className="flex flex-col items-center -mt-1.5">
              <AnimatePresence>
                {weights.map((w, i) => (
                  <motion.div 
                    key={i}
                    initial={{ y: -5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-7 h-4 bg-slate-600 border border-white/10 rounded flex items-center justify-center mb-0.5 shadow-sm"
                  >
                    <span className="text-[6px] font-black text-white">{w}g</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Draggable Source */}
          <div className="absolute left-3 bottom-3 flex flex-col gap-1.5">
            <div className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">Add Weights</div>
            <div className="flex gap-1.5">
              {[50, 100].map(m => (
                <motion.div 
                  key={m}
                  drag
                  dragSnapToOrigin
                  onDragEnd={(e, info) => {
                    if (hookZoneRef.current) {
                      const rect = hookZoneRef.current.getBoundingClientRect();
                      const margin = 20;
                      if (
                        info.point.x >= rect.left - margin &&
                        info.point.x <= rect.right + margin &&
                        info.point.y >= rect.top - margin &&
                        info.point.y <= rect.bottom + margin
                      ) {
                        addWeight(m);
                      }
                    }
                  }}
                  onClick={() => addWeight(m)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-7 bg-slate-500 border border-slate-400 rounded flex items-center justify-center cursor-grab shadow-sm active:cursor-grabbing"
                >
                  <span className="text-[7px] font-black text-white">{m}g</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Data & Graph Area */}
        <div className="flex-[1.2] flex flex-col gap-3">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm overflow-y-auto max-h-[160px]">
              <SimpleTable 
                data={localRecordedData} 
                columns={[
                  { key: 'force', label: 'Force', unit: 'N' },
                  { key: 'extension', label: 'Ext.', unit: 'cm' }
                ]} 
              />
            </div>
            
            {/* Graph */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2 shadow-sm relative overflow-hidden min-h-[120px]">
              <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Force vs Extension</div>
              <div className="relative w-full h-[80px] border-l border-b border-slate-700 mt-3 ml-5 mr-1">
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 opacity-10">
                  {Array.from({ length: 25 }).map((_, i) => <div key={i} className="border border-slate-500" />)}
                </div>
                
                {/* Graph Path */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                  <polyline
                    points={graphPoints}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  {localRecordedData.map((d, i) => {
                    const x = (parseFloat(d.force) / 5) * 100;
                    const y = 100 - (parseFloat(d.extension) / 20) * 100;
                    return (
                      <circle key={i} cx={x} cy={y} r="2" fill="#3b82f6" />
                    );
                  })}
                </svg>
                
                {/* Labels */}
                <div className="absolute -left-5 top-1/2 -translate-y-1/2 -rotate-90 text-[6px] text-slate-500 font-bold whitespace-nowrap">Extension (cm)</div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[6px] text-slate-500 font-bold">Force (N)</div>
                
                {/* Axis Values */}
                <div className="absolute -left-3.5 top-0 text-[5px] text-slate-600">20</div>
                <div className="absolute -left-3.5 bottom-0 text-[5px] text-slate-600">0</div>
                <div className="absolute right-0 -bottom-3.5 text-[5px] text-slate-600">5</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
              <Weight size={16} />
            </div>
            <div>
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Mass</div>
              <div className="text-sm font-bold text-slate-700">{totalMass}g</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500">
              <RulerIcon size={16} />
            </div>
            <div>
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Extension</div>
              <div className="text-sm font-bold text-blue-600">{(targetExtension/10).toFixed(2)}cm</div>
            </div>
          </div>
        </div>
        <button 
          onClick={reset}
          className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-lg transition-all border border-slate-200 text-xs flex items-center gap-1.5"
        >
          <RotateCcw size={14} /> RESET
        </button>
      </div>
    </div>
  );
};

// --- Falling Cases Engine ---
const FallingCases = ({ isRunning, setIsRunning, setRecordedData, timer, setTimer, TIME_SCALE }: any) => {
  const [cupCount, setCupCount] = useState(1);
  const [pos, setPos] = useState(0);
  const [vel, setVel] = useState(0);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  
  const lastTimeRef = useRef<number | null>(null);
  const animateRef = useRef<any>(null);
  const hasFinishedRef = useRef(false);

  const animate = (time: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = time;
      return;
    }
    const wallDt = (time - lastTimeRef.current) / 1000;
    lastTimeRef.current = time;

    const physicsDt = wallDt * TIME_SCALE;
    
    // Terminal velocity logic
    const vTerm = 3.0 * Math.sqrt(cupCount);
    const acc = 9.8;

    setTimer((prev: number) => prev + physicsDt);
    
    let newVel = vel;
    if (pos < 50) {
      newVel = vel + acc * physicsDt;
      if (newVel > vTerm) newVel = vTerm;
    } else {
      newVel = vTerm;
    }

    const ds = newVel * physicsDt * 15;
    const newPos = pos + ds;

    if (newPos >= 100 && !hasFinishedRef.current) {
      hasFinishedRef.current = true;
      setIsRunning(false);
      setPos(100);
      setVel(newVel);
      const newData = { cups: cupCount, time: timer.toFixed(2), vTerm: vTerm.toFixed(2) };
      setLocalRecordedData(prev => [...prev, newData]);
      setRecordedData((prev: any[]) => [...prev, newData]);
    } else if (!hasFinishedRef.current) {
      setPos(newPos);
      setVel(newVel);
    }
  };

  animateRef.current = animate;

  useEffect(() => {
    if (!isRunning) {
      lastTimeRef.current = null;
      return;
    }
    hasFinishedRef.current = false;
    let frameId: number;
    const loop = (time: number) => {
      if (animateRef.current) animateRef.current(time);
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isRunning]);

  const reset = () => {
    setIsRunning(false);
    setPos(0);
    setVel(0);
    setTimer(0);
    lastTimeRef.current = null;
    hasFinishedRef.current = false;
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-1 flex-col lg:flex-row gap-4 min-h-[300px]">
        <div className="flex-[1.5] bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden min-h-[250px]">
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-white/80 backdrop-blur px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
              <span className="text-[9px] font-black text-slate-400 uppercase mr-2">Stopwatch</span>
              <span className="text-xs font-mono font-bold text-blue-600">{timer.toFixed(2)}s</span>
            </div>
          </div>

          {/* Wind Arrows */}
          <div className="absolute inset-x-0 bottom-0 h-full pointer-events-none flex justify-around items-end pb-4">
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div 
                key={i}
                animate={{ 
                  height: isRunning ? vel * 8 : 0,
                  opacity: isRunning ? 0.3 : 0
                }}
                className="w-0.5 bg-blue-400 rounded-full flex flex-col items-center"
              >
                <ArrowUp size={10} className="text-blue-500 -mt-2" />
              </motion.div>
            ))}
          </div>

          {/* Scale */}
          <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-slate-200">
            {[0, 1, 2, 3, 4, 5].map(m => (
              <div key={m} className="absolute w-3 h-[1px] bg-slate-300 -left-1.5" style={{ top: `${m * 20}%` }}>
                <span className="absolute left-4 -top-1.5 text-[7px] font-bold text-slate-400">{m}m</span>
              </div>
            ))}
          </div>

          {/* Cups */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{ top: `${pos}%` }}
          >
            {Array.from({ length: cupCount }).map((_, i) => (
              <div 
                key={i} 
                className="w-12 h-8 bg-white border border-slate-200 rounded-b-lg -mt-5 first:mt-0 shadow-sm"
                style={{ zIndex: 10 - i }}
              />
            ))}
          </motion.div>
        </div>
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden min-h-[150px]">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'cups', label: 'Mass', unit: 'cups' },
              { key: 'time', label: 'Time', unit: 's' },
              { key: 'vTerm', label: 'V-Term', unit: 'm/s' }
            ]} 
          />
        </div>
      </div>
      <ControlPanel 
        isRunning={isRunning}
        onStart={() => { reset(); setIsRunning(true); }}
        onReset={reset}
        sliders={[
          { label: 'Number of Cups', value: cupCount, min: 1, max: 5, step: 1, unit: '', onChange: setCupCount }
        ]}
      />
    </div>
  );
};

// --- IV Tracer Engine ---
const IVTracer = ({ setRecordedData }: any) => {
  const [voltage, setVoltage] = useState(0);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [entryAdded, setEntryAdded] = useState(false);

  // Filament lamp characteristic: non-linear S-curve
  // I = k * V^0.6 (approx)
  const calculateCurrent = (v: number) => {
    const k = 0.4;
    return (k * Math.pow(v, 0.6)).toFixed(2);
  };

  const current = calculateCurrent(voltage);

  const recordData = () => {
    if (entryAdded) return;
    const newData = { voltage: voltage.toFixed(1), current };
    setLocalRecordedData(prev => {
      if (prev.find(d => d.voltage === newData.voltage)) return prev;
      return [...prev, newData].sort((a, b) => parseFloat(a.voltage) - parseFloat(b.voltage));
    });
    setRecordedData((prev: any[]) => {
      if (prev.find(d => d.voltage === newData.voltage)) return prev;
      return [...prev, newData].sort((a, b) => parseFloat(a.voltage) - parseFloat(b.voltage));
    });
    setEntryAdded(true);
  };

  useEffect(() => {
    setEntryAdded(false);
  }, [voltage]);

  const graphPoints = useMemo(() => {
    const maxV = 12;
    const maxI = 2;
    return localRecordedData.map(d => {
      const x = (parseFloat(d.voltage) / maxV) * 100;
      const y = 100 - (parseFloat(d.current) / maxI) * 100;
      return `${x},${y}`;
    }).join(" ");
  }, [localRecordedData]);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[280px]">
        <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col p-4">
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-white/5 backdrop-blur px-2 py-1 rounded-lg border border-white/10 shadow-sm">
              <span className="text-[9px] font-black text-slate-400 uppercase mr-2">Circuit Status</span>
              <span className="text-xs font-mono font-bold text-emerald-400">ACTIVE</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            {/* Circuit Diagram (Simplified) */}
            <svg width="200" height="150" viewBox="0 0 200 150" className="opacity-80">
              <rect x="20" y="20" width="160" height="110" fill="none" stroke="#475569" strokeWidth="2" />
              {/* Lamp Symbol */}
              <g transform="translate(100, 20)">
                <circle cx="0" cy="0" r="15" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                <line x1="-10" y1="-10" x2="10" y2="10" stroke="#94a3b8" strokeWidth="2" />
                <line x1="10" y1="-10" x2="-10" y2="10" stroke="#94a3b8" strokeWidth="2" />
                {/* Glow */}
                <motion.circle 
                  animate={{ opacity: Math.abs(voltage) / 6, scale: 1 + Math.abs(voltage) / 12 }}
                  cx="0" cy="0" r="15" fill="rgba(251, 191, 36, 0.3)" 
                />
              </g>
              {/* Ammeter */}
              <g transform="translate(180, 75)">
                <circle cx="0" cy="0" r="12" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                <text x="0" y="4" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">A</text>
              </g>
              {/* Voltmeter */}
              <g transform="translate(100, 60)">
                <line x1="-30" y1="-40" x2="-30" y2="0" stroke="#475569" strokeWidth="2" />
                <line x1="30" y1="-40" x2="30" y2="0" stroke="#475569" strokeWidth="2" />
                <rect x="-20" y="-15" width="40" height="30" rx="4" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                <text x="0" y="5" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">V</text>
              </g>
            </svg>

            {/* Live Readings */}
            <div className="absolute bottom-4 inset-x-4 flex justify-between">
              <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700">
                <div className="text-[8px] font-bold text-slate-500 uppercase">Voltmeter</div>
                <div className="text-sm font-mono font-bold text-blue-400">{voltage.toFixed(1)}V</div>
              </div>
              <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700">
                <div className="text-[8px] font-bold text-slate-500 uppercase">Ammeter</div>
                <div className="text-sm font-mono font-bold text-amber-400">{current}A</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-[1.2] flex flex-col gap-3">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm overflow-y-auto max-h-[160px]">
              <SimpleTable 
                data={localRecordedData} 
                columns={[
                  { key: 'voltage', label: 'Voltage', unit: 'V' },
                  { key: 'current', label: 'Current', unit: 'A' }
                ]} 
              />
            </div>
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2 shadow-sm relative overflow-hidden min-h-[140px]">
              <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">I-V Characteristic</div>
              <div className="relative w-full h-[90px] border-l border-b border-slate-700 mt-3 ml-5 mr-1">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                  <polyline
                    points={graphPoints}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  {localRecordedData.map((d, i) => {
                    const x = (parseFloat(d.voltage) / 12) * 100;
                    const y = 100 - (parseFloat(d.current) / 2) * 100;
                    return <circle key={i} cx={x} cy={y} r="2" fill="#3b82f6" />;
                  })}
                </svg>
                <div className="absolute -left-5 top-1/2 -translate-y-1/2 -rotate-90 text-[6px] text-slate-500 font-bold">I (A)</div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[6px] text-slate-500 font-bold">V (V)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ControlPanel 
        isRunning={false}
        onStart={recordData}
        onReset={() => { setVoltage(0); setLocalRecordedData([]); setRecordedData([]); }}
        startLabel="RECORD POINT"
        sliders={[
          { label: 'Voltage', value: voltage, min: 0, max: 12, step: 0.5, unit: 'V', onChange: setVoltage }
        ]}
      />
    </div>
  );
};

// --- Light Sensor Engine ---
const LightSensor = ({ setRecordedData }: any) => {
  const [distance, setDistance] = useState(10);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [entryAdded, setEntryAdded] = useState(false);

  // LDR Resistance: R = k / d^2 + R_base
  // Intensity I = P / (4 x PI x d^2)
  const calculateResistance = (d: number) => {
    const k = 50000;
    const rBase = 100;
    return Math.round(k / (d * d) + rBase);
  };

  const resistance = calculateResistance(distance);

  const recordData = () => {
    if (entryAdded) return;
    const newData = { distance: distance.toFixed(0), resistance: resistance.toString() };
    setLocalRecordedData(prev => {
      if (prev.find(d => d.distance === newData.distance)) return prev;
      return [...prev, newData].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    });
    setRecordedData((prev: any[]) => {
      if (prev.find(d => d.distance === newData.distance)) return prev;
      return [...prev, newData].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    });
    setEntryAdded(true);
  };

  useEffect(() => {
    setEntryAdded(false);
  }, [distance]);

  const graphPoints = useMemo(() => {
    const maxD = 100;
    const maxR = 1000;
    return localRecordedData.map(d => {
      const x = (parseFloat(d.distance) / maxD) * 100;
      const y = 100 - (Math.min(parseFloat(d.resistance), maxR) / maxR) * 100;
      return `${x},${y}`;
    }).join(" ");
  }, [localRecordedData]);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[280px]">
        <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden flex flex-col p-4">
          <div className="flex-1 relative flex items-center justify-center">
            {/* Lamp */}
            <div className="absolute left-10 flex flex-col items-center">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-700">
                <Sun className={distance < 30 ? "text-amber-400" : "text-amber-400/50"} size={24} />
              </div>
              <div className="text-[8px] font-bold text-slate-400 mt-2">LAMP (60W)</div>
            </div>

            {/* LDR */}
            <motion.div 
              animate={{ left: `${20 + (distance / 100) * 60}%` }}
              className="absolute flex flex-col items-center"
            >
              <div className="w-10 h-6 bg-red-900 rounded border border-red-800 flex flex-col p-0.5">
                <div className="flex-1 bg-red-700 rounded-sm flex flex-col justify-around px-1">
                  <div className="h-[1px] bg-red-400/50 w-full" />
                  <div className="h-[1px] bg-red-400/50 w-full" />
                  <div className="h-[1px] bg-red-400/50 w-full" />
                </div>
              </div>
              <div className="text-[8px] font-bold text-slate-400 mt-2">LDR</div>
            </motion.div>

            {/* Scale */}
            <div className="absolute bottom-10 left-[20%] right-[20%] h-1 bg-slate-200 rounded-full">
              {[0, 25, 50, 75, 100].map(m => (
                <div key={m} className="absolute h-3 w-[1px] bg-slate-300 top-0" style={{ left: `${m}%` }}>
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[6px] font-bold text-slate-400">{m}cm</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur p-2 rounded-lg border border-slate-200 shadow-sm">
            <div className="text-[8px] font-bold text-slate-500 uppercase">Resistance</div>
            <div className="text-sm font-mono font-bold text-blue-600">{resistance} Ω</div>
          </div>
        </div>

        <div className="flex-[1.2] flex flex-col gap-3">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm overflow-y-auto max-h-[160px]">
              <SimpleTable 
                data={localRecordedData} 
                columns={[
                  { key: 'distance', label: 'Dist.', unit: 'cm' },
                  { key: 'resistance', label: 'Res.', unit: 'Ω' }
                ]} 
              />
            </div>
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2 shadow-sm relative overflow-hidden min-h-[140px]">
              <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Resistance vs Distance</div>
              <div className="relative w-full h-[90px] border-l border-b border-slate-700 mt-3 ml-5 mr-1">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                  <polyline
                    points={graphPoints}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  {localRecordedData.map((d, i) => {
                    const x = (parseFloat(d.distance) / 100) * 100;
                    const y = 100 - (Math.min(parseFloat(d.resistance), 1000) / 1000) * 100;
                    return <circle key={i} cx={x} cy={y} r="2" fill="#3b82f6" />;
                  })}
                </svg>
                <div className="absolute -left-5 top-1/2 -translate-y-1/2 -rotate-90 text-[6px] text-slate-500 font-bold">R (Ω)</div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[6px] text-slate-500 font-bold">d (cm)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ControlPanel 
        isRunning={false}
        onStart={recordData}
        onReset={() => { setDistance(10); setLocalRecordedData([]); setRecordedData([]); }}
        startLabel="RECORD RESISTANCE"
        sliders={[
          { label: 'Distance', value: distance, min: 10, max: 100, step: 5, unit: 'cm', onChange: setDistance }
        ]}
      />
    </div>
  );
};

// --- Thermal Sensor Engine ---
const ThermalSensor = ({ setRecordedData }: any) => {
  const [temp, setTemp] = useState(20);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [entryAdded, setEntryAdded] = useState(false);

  // NTC Thermistor: R = R0 * e^(B * (1/T - 1/T0))
  const calculateResistance = (t: number) => {
    const r0 = 1000;
    const t0 = 293.15; // 20C in Kelvin
    const b = 3500;
    const tk = t + 273.15;
    return Math.round(r0 * Math.exp(b * (1/tk - 1/t0)));
  };

  const resistance = calculateResistance(temp);

  const recordData = () => {
    if (entryAdded) return;
    const newData = { temp: temp.toFixed(0), resistance: resistance.toString() };
    setLocalRecordedData(prev => {
      if (prev.find(d => d.temp === newData.temp)) return prev;
      return [...prev, newData].sort((a, b) => parseFloat(a.temp) - parseFloat(b.temp));
    });
    setRecordedData((prev: any[]) => {
      if (prev.find(d => d.temp === newData.temp)) return prev;
      return [...prev, newData].sort((a, b) => parseFloat(a.temp) - parseFloat(b.temp));
    });
    setEntryAdded(true);
  };

  useEffect(() => {
    setEntryAdded(false);
  }, [temp]);

  const graphPoints = useMemo(() => {
    const maxT = 100;
    const maxR = 1000;
    return localRecordedData.map(d => {
      const x = (parseFloat(d.temp) / maxT) * 100;
      const y = 100 - (Math.min(parseFloat(d.resistance), maxR) / maxR) * 100;
      return `${x},${y}`;
    }).join(" ");
  }, [localRecordedData]);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[280px]">
        <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden flex flex-col p-4">
          <div className="flex-1 relative flex items-center justify-center">
            {/* Beaker of Water */}
            <div className="relative w-32 h-40 bg-blue-100/50 border-2 border-slate-300 rounded-b-xl overflow-hidden">
              <motion.div 
                animate={{ height: `${40 + (temp - 20) / 2}%` }}
                className="absolute bottom-0 w-full bg-blue-400/30"
              />
              {/* Thermistor */}
              <div className="absolute left-1/2 -translate-x-1/2 top-10 flex flex-col items-center">
                <div className="w-1 h-20 bg-slate-400" />
                <div className="w-4 h-6 bg-slate-800 rounded-sm border border-slate-700" />
                <div className="text-[6px] font-bold text-slate-500 mt-1 uppercase">Thermistor</div>
              </div>
              {/* Thermometer */}
              <div className="absolute right-4 top-4 flex flex-col items-center">
                <div className="w-2 h-32 bg-white border border-slate-300 rounded-full relative overflow-hidden">
                  <motion.div 
                    animate={{ height: `${temp}%` }}
                    className="absolute bottom-0 w-full bg-red-500"
                  />
                </div>
                <div className="text-[6px] font-bold text-slate-500 mt-1 uppercase">Temp</div>
              </div>
            </div>

            {/* Heat Source */}
            <div className="absolute bottom-0 w-40 h-4 bg-slate-700 rounded-t-lg" />
            <motion.div 
              animate={{ opacity: temp > 20 ? 0.6 : 0 }}
              className="absolute bottom-4 w-32 h-8 bg-orange-500/20 blur-xl rounded-full"
            />
          </div>

          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur p-2 rounded-lg border border-slate-200 shadow-sm">
            <div className="text-[8px] font-bold text-slate-500 uppercase">Resistance</div>
            <div className="text-sm font-mono font-bold text-blue-600">{resistance} Ω</div>
          </div>
        </div>

        <div className="flex-[1.2] flex flex-col gap-3">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm overflow-y-auto max-h-[160px]">
              <SimpleTable 
                data={localRecordedData} 
                columns={[
                  { key: 'temp', label: 'Temp.', unit: '°C' },
                  { key: 'resistance', label: 'Res.', unit: 'Ω' }
                ]} 
              />
            </div>
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2 shadow-sm relative overflow-hidden min-h-[140px]">
              <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Resistance vs Temperature</div>
              <div className="relative w-full h-[90px] border-l border-b border-slate-700 mt-3 ml-5 mr-1">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                  <polyline
                    points={graphPoints}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  {localRecordedData.map((d, i) => {
                    const x = (parseFloat(d.temp) / 100) * 100;
                    const y = 100 - (Math.min(parseFloat(d.resistance), 1000) / 1000) * 100;
                    return <circle key={i} cx={x} cy={y} r="2" fill="#3b82f6" />;
                  })}
                </svg>
                <div className="absolute -left-5 top-1/2 -translate-y-1/2 -rotate-90 text-[6px] text-slate-500 font-bold">R (Ω)</div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[6px] text-slate-500 font-bold">T (°C)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ControlPanel 
        isRunning={false}
        onStart={recordData}
        onReset={() => { setTemp(20); setLocalRecordedData([]); setRecordedData([]); }}
        startLabel="RECORD RESISTANCE"
        sliders={[
          { label: 'Temperature', value: temp, min: 20, max: 100, step: 5, unit: '°C', onChange: setTemp }
        ]}
      />
    </div>
  );
};

// --- Refraction Box Engine ---
const RefractionBox = ({ setRecordedData, config }: any) => {
  const [angleI, setAngleI] = useState(30);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [entryAdded, setEntryAdded] = useState(false);
  const n = 1.5; // Refractive index of glass

  const minAngle = config?.minAngle ?? 0;
  const maxAngle = config?.maxAngle ?? 80;
  const step = config?.step ?? 5;

  const angleR = Math.asin(Math.sin(angleI * Math.PI / 180) / n) * 180 / Math.PI;

  const recordData = () => {
    if (entryAdded) return;
    const sinI = Math.sin(angleI * Math.PI / 180);
    const sinR = Math.sin(angleR * Math.PI / 180);
    const calculatedN = (sinI / sinR).toFixed(2);
    
    const newData = { 
      i: angleI.toFixed(0), 
      r: angleR.toFixed(1), 
      sinI: sinI.toFixed(3),
      sinR: sinR.toFixed(3),
      n: calculatedN
    };
    setLocalRecordedData(prev => {
      if (prev.find(d => d.i === newData.i)) return prev;
      return [...prev, newData].sort((a, b) => parseFloat(a.i) - parseFloat(b.i));
    });
    setRecordedData((prev: any[]) => {
      if (prev.find(d => d.i === newData.i)) return prev;
      return [...prev, newData].sort((a, b) => parseFloat(a.i) - parseFloat(b.i));
    });
    setEntryAdded(true);
  };

  useEffect(() => {
    setEntryAdded(false);
  }, [angleI]);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[280px]">
        <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden flex items-center justify-center p-4">
          <svg width="300" height="200" viewBox="0 0 300 200">
            {/* Glass Block (Horizontal) */}
            <rect x="50" y="100" width="200" height="80" fill="rgba(148, 163, 184, 0.2)" stroke="#94a3b8" strokeWidth="2" />
            
            {/* Normal Line (Vertical) */}
            <line x1="150" y1="20" x2="150" y2="180" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />

            {/* Incident Ray (from Air/Top) */}
            <line 
              x1={150 - 80 * Math.sin(angleI * Math.PI / 180)} 
              y1={100 - 80 * Math.cos(angleI * Math.PI / 180)} 
              x2="150" 
              y2="100" 
              stroke="#ef4444" 
              strokeWidth="2" 
            />
            {/* Arrow for Incident Ray */}
            <g transform={`translate(${150 - 40 * Math.sin(angleI * Math.PI / 180)}, ${100 - 40 * Math.cos(angleI * Math.PI / 180)}) rotate(${angleI}, 0, 0)`}>
              <path d="M -3 -5 L 0 5 L 3 -5 Z" fill="#ef4444" />
            </g>

            {/* Refracted Ray (into Glass/Bottom) */}
            <line 
              x1="150" 
              y1="100" 
              x2={150 + 80 * Math.sin(angleR * Math.PI / 180)} 
              y2={100 + 80 * Math.cos(angleR * Math.PI / 180)} 
              stroke="#ef4444" 
              strokeWidth="2" 
              opacity="0.6"
            />
            {/* Arrow for Refracted Ray */}
            <g transform={`translate(${150 + 40 * Math.sin(angleR * Math.PI / 180)}, ${100 + 40 * Math.cos(angleR * Math.PI / 180)}) rotate(${180 - angleR}, 0, 0)`}>
              <path d="M -3 -5 L 0 5 L 3 -5 Z" fill="#ef4444" opacity="0.6" />
            </g>
            
            {/* Angle Arcs */}
            <path 
              d={`M 150 70 A 30 30 0 0 0 ${150 - 30 * Math.sin(angleI * Math.PI / 180)} ${100 - 30 * Math.cos(angleI * Math.PI / 180)}`} 
              fill="none" 
              stroke="#ef4444" 
              strokeWidth="1" 
            />
            <path 
              d={`M 150 130 A 30 30 0 0 0 ${150 + 30 * Math.sin(angleR * Math.PI / 180)} ${100 + 30 * Math.cos(angleR * Math.PI / 180)}`} 
              fill="none" 
              stroke="#ef4444" 
              strokeWidth="1" 
              opacity="0.5"
            />

            {/* Angle Labels with Normal */}
            <text x={145 - 20 * Math.sin(angleI * Math.PI / 180)} y="65" fontSize="10" fill="#ef4444" fontWeight="bold" textAnchor="end">i = {angleI}°</text>
            <text x={155 + 20 * Math.sin(angleR * Math.PI / 180)} y="145" fontSize="10" fill="#ef4444" fontWeight="bold" opacity="0.8">r = {angleR.toFixed(1)}°</text>
            
            {/* Medium Labels */}
            <text x="60" y="90" fontSize="8" fill="#94a3b8" fontWeight="bold">AIR</text>
            <text x="60" y="120" fontSize="8" fill="#94a3b8" fontWeight="bold">GLASS</text>
          </svg>
        </div>

        <div className="flex-[1.2] bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'i', label: 'i', unit: '°' },
              { key: 'r', label: 'r', unit: '°' },
              { key: 'sinI', label: 'sin(i)' },
              { key: 'sinR', label: 'sin(r)' },
              { key: 'n', label: 'n' }
            ]} 
          />
        </div>
      </div>

      <ControlPanel 
        isRunning={false}
        onStart={recordData}
        onReset={() => { setAngleI(30); setLocalRecordedData([]); setRecordedData([]); }}
        startLabel="RECORD ANGLES"
        sliders={[
          { label: 'Angle of Incidence', value: angleI, min: minAngle, max: maxAngle, step: step, unit: '°', onChange: setAngleI }
        ]}
      />
    </div>
  );
};

// --- Semi-Circle Refraction Engine ---
const SemiCircleRefraction = ({ setRecordedData, config }: any) => {
  const [angleI, setAngleI] = useState(30);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [entryAdded, setEntryAdded] = useState(false);
  const n = 1.5; // Refractive index
  const criticalAngle = Math.asin(1/n) * 180 / Math.PI; // ~41.8°

  const minAngle = config?.minAngle ?? 30;
  const maxAngle = config?.maxAngle ?? 60;

  // Physics Logic for Rays
  const isTIR = angleI > 42;
  const isCritical = angleI >= 41 && angleI <= 42;
  
  // Refracted angle in air (n=1)
  // sin(i) * n_glass = sin(r) * n_air
  // sin(r) = sin(i) * 1.5
  const sinR = Math.sin(angleI * Math.PI / 180) * n;
  const angleR = !isTIR && !isCritical && sinR <= 1 ? Math.asin(sinR) * 180 / Math.PI : 90;

  const recordData = () => {
    if (entryAdded) return;
    
    const sinI = Math.sin(angleI * Math.PI / 180);
    const calculatedN = (1 / Math.sin(criticalAngle * Math.PI / 180)).toFixed(2);
    
    const newData = { 
      i: angleI.toFixed(1), 
      sinI: sinI.toFixed(3),
      c: isCritical ? `${angleI.toFixed(1)}° (Reached)` : (isTIR ? "TIR" : "Searching...")
    };
    setLocalRecordedData(prev => [...prev, newData]);
    setRecordedData((prev: any[]) => [...prev, newData]);
    setEntryAdded(true);
  };

  // Reset entryAdded when angle changes
  useEffect(() => {
    setEntryAdded(false);
  }, [angleI]);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[280px]">
        <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden flex items-center justify-center p-4">
          <svg width="300" height="200" viewBox="0 0 300 200">
            {/* Semi-circle block - Flat face on top, curved side on bottom */}
            <path d="M 100 100 A 50 50 0 0 0 200 100 Z" fill="rgba(148, 163, 184, 0.2)" stroke="#94a3b8" strokeWidth="2" />
            
            {/* Normal Line - Vertical from top through center */}
            <line x1="150" y1="50" x2="150" y2="150" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />

            {/* Incident Ray (from below, through curved surface to center) */}
            <g transform={`rotate(${angleI}, 150, 100)`}>
              <line x1="150" y1="100" x2="150" y2="160" stroke="#ef4444" strokeWidth="2" />
              <path d="M 147 130 L 150 140 L 153 130 Z" fill="#ef4444" />
            </g>

            {/* Refracted or Reflected Ray */}
            {isTIR ? (
              // Reflected Ray inside the block
              <g transform={`rotate(${-angleI}, 150, 100)`}>
                <line x1="150" y1="100" x2="150" y2="160" stroke="#ef4444" strokeWidth="2" />
                <path d="M 147 130 L 150 140 L 153 130 Z" fill="#ef4444" />
              </g>
            ) : isCritical ? (
              // Refracted ray exactly along the top flat surface (90°)
              <line x1="150" y1="100" x2="250" y2="100" stroke="#ef4444" strokeWidth="2" opacity="0.8" />
            ) : (
              // Refracted ray bending away from normal into air
              <g transform={`rotate(${angleR}, 150, 100)`}>
                <line x1="150" y1="100" x2="150" y2="40" stroke="#ef4444" strokeWidth="2" opacity="0.6" />
                <path d="M 147 60 L 150 50 L 153 60 Z" fill="#ef4444" opacity="0.6" />
              </g>
            )}
            
            <text x="160" y="140" fontSize="10" fill="#64748b" fontWeight="bold">i = {angleI}°</text>
            {isTIR && <text x="110" y="80" fontSize="10" fill="#ef4444" fontWeight="bold">Total Internal Reflection</text>}
            {isCritical && <text x="160" y="90" fontSize="8" fill="#ef4444" fontWeight="bold">Critical Angle Reached</text>}
          </svg>
        </div>

        <div className="flex-[1.8] bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden">
          <div className="text-[16px] h-full">
            <SimpleTable 
              data={localRecordedData} 
              columns={[
                { key: 'i', label: 'Angle of Incidence i', unit: '°' },
                { key: 'sinI', label: 'sin i' },
                { key: 'c', label: 'Critical Angle c' }
              ]} 
            />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto w-full">
        <ControlPanel 
          isRunning={false}
          onStart={recordData}
          onReset={() => { setAngleI(30); setLocalRecordedData([]); setRecordedData([]); }}
          startLabel="RECORD ANGLE"
          sliders={[
            { label: 'Angle of Incidence', value: angleI, min: minAngle, max: maxAngle, step: 0.5, unit: '°', onChange: setAngleI }
          ]}
        />
      </div>
    </div>
  );
};

// --- Ripple Tank Engine ---
const RippleTank = ({ setRecordedData, config }: any) => {
  const [frequency, setFrequency] = useState(20);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [entryAdded, setEntryAdded] = useState(false);
  const waveSpeed = 0.3; // 0.3 m/s constant for shallow water

  const minFreq = config?.frequencyRange?.[0] ?? 10;
  const maxFreq = config?.frequencyRange?.[1] ?? 50;

  const wavelength = waveSpeed / frequency;

  const recordData = () => {
    if (entryAdded) return;
    const newData = { 
      freq: frequency.toString(), 
      wavelength: wavelength.toFixed(3),
      speed: (frequency * wavelength).toFixed(2)
    };
    setLocalRecordedData(prev => [...prev, newData]);
    setRecordedData((prev: any[]) => [...prev, newData]);
    setEntryAdded(true);
  };

  useEffect(() => {
    setEntryAdded(false);
  }, [frequency]);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[280px]">
        <div className="flex-1 bg-blue-50 rounded-2xl border border-blue-200 relative overflow-hidden flex flex-col p-4">
          <div className="text-[8px] font-bold text-blue-500 uppercase tracking-widest mb-2">Ripple Tank (Top View)</div>
          
          <div className="flex-1 bg-blue-100/50 rounded-lg relative overflow-hidden">
            {/* Waves */}
            <div className="absolute inset-0 flex flex-col items-center justify-around">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ y: [0, 40] }}
                  transition={{ repeat: Infinity, duration: 10/frequency, ease: "linear" }}
                  className="w-full h-[2px] bg-blue-300/50"
                />
              ))}
            </div>
            
            {/* Ruler */}
            <div className="absolute left-4 top-0 bottom-0 w-4 bg-amber-100 border-x border-amber-300 flex flex-col justify-between py-2">
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className="w-full h-[1px] bg-amber-400" />
              ))}
            </div>
          </div>

          <div className="mt-3 flex justify-between items-center">
            <div className="text-[10px] font-bold text-blue-600">Frequency: {frequency} Hz</div>
            <div className="text-[10px] font-bold text-blue-600">λ ≈ {wavelength.toFixed(3)} m</div>
          </div>
        </div>

        <div className="flex-[1.2] bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'freq', label: 'Freq.', unit: 'Hz' },
              { key: 'wavelength', label: 'λ', unit: 'm' },
              { key: 'speed', label: 'v', unit: 'm/s' }
            ]} 
          />
        </div>
      </div>

      <ControlPanel 
        isRunning={false}
        onStart={recordData}
        onReset={() => { setFrequency(20); setLocalRecordedData([]); setRecordedData([]); }}
        startLabel="MEASURE WAVES"
        sliders={[
          { label: 'Motor Frequency', value: frequency, min: minFreq, max: maxFreq, step: 1, unit: 'Hz', onChange: setFrequency }
        ]}
      />
    </div>
  );
};

// --- Echo Timer Engine ---
const EchoTimer = ({ isRunning, setIsRunning, setRecordedData, timer, setTimer, config }: any) => {
  const [distance, setDistance] = useState(config?.distanceToWall ?? 100);
  const [claps, setClaps] = useState(0);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const soundSpeed = config?.soundSpeed ?? 340;
  const targetClaps = config?.claps ?? 20;

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      const clapInterval = (2 * distance / soundSpeed) * 1000;
      const startTime = Date.now();
      interval = setInterval(() => {
        setClaps(prev => {
          if (prev >= targetClaps - 1) {
            setIsRunning(false);
            clearInterval(interval);
            const actualTotalTime = (Date.now() - startTime) / 1000;
            const timePerClap = (actualTotalTime / targetClaps).toFixed(3);
            const newData = { 
              distance, 
              totalTime: actualTotalTime.toFixed(2), 
              timePerClap, 
              speed: (2 * distance / (actualTotalTime / targetClaps)).toFixed(0) 
            };
            setLocalRecordedData(prevData => [...prevData, newData]);
            setRecordedData((prevData: any[]) => [...prevData, newData]);
            return targetClaps;
          }
          return prev + 1;
        });
      }, clapInterval);
    } else {
      setClaps(0);
    }
    return () => clearInterval(interval);
  }, [isRunning, distance, setIsRunning, setRecordedData, soundSpeed, targetClaps]);

  useEffect(() => {
    let frame: any;
    if (isRunning) {
      const start = Date.now();
      const loop = () => {
        setTimer((Date.now() - start) / 1000);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(frame);
  }, [isRunning, setTimer]);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[280px]">
        <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden flex flex-col p-4">
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-white/80 backdrop-blur px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
              <span className="text-[9px] font-black text-slate-400 uppercase mr-2">Stopwatch</span>
              <span className="text-xs font-mono font-bold text-blue-600">{timer.toFixed(2)}s</span>
            </div>
          </div>

          <div className="flex-1 relative flex items-center">
            {/* Person */}
            <div className="absolute left-10 flex flex-col items-center">
              <div className="w-8 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                <motion.div 
                  animate={{ scale: isRunning ? [1, 1.2, 1] : 1 }}
                  transition={{ repeat: Infinity, duration: (2 * distance / soundSpeed) }}
                  className="text-white"
                >
                  👏
                </motion.div>
              </div>
              <div className="text-[8px] font-bold text-slate-400 mt-2">STUDENT</div>
            </div>

            {/* Wall */}
            <div className="absolute right-10 w-4 h-32 bg-slate-300 border-l-4 border-slate-400 rounded-r shadow-sm" />
            
            {/* Sound Wave */}
            {isRunning && (
              <motion.div 
                animate={{ 
                  left: ["15%", "85%", "15%"],
                  opacity: [0.8, 0.4, 0.8]
                }}
                transition={{ repeat: Infinity, duration: (2 * distance / soundSpeed), ease: "linear" }}
                className="absolute w-4 h-12 border-r-2 border-blue-400 rounded-full"
              />
            )}

            {/* Distance Label */}
            <div className="absolute bottom-10 left-10 right-10 h-[1px] bg-slate-300 flex items-center justify-center">
              <div className="bg-slate-50 px-2 text-[10px] font-bold text-slate-400">{distance}m</div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <div className="text-[10px] font-black text-slate-400 uppercase">Claps:</div>
            <div className="text-sm font-mono font-bold text-blue-600">{claps} / {targetClaps}</div>
          </div>
        </div>

        <div className="flex-[1.2] bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'distance', label: 'Distance d', unit: 'm' },
              { key: 'totalTime', label: 'Total Time', unit: 's' },
              { key: 'timePerClap', label: 'Time for 1 clap t', unit: 's' },
              { key: 'speed', label: 'Speed v', unit: 'm/s' }
            ]} 
          />
        </div>
      </div>

      <ControlPanel 
        isRunning={isRunning}
        onStart={() => { setClaps(0); setTimer(0); setIsRunning(true); }}
        onReset={() => { setIsRunning(false); setClaps(0); setTimer(0); setLocalRecordedData([]); setRecordedData([]); }}
        startLabel="START CLAPPING"
        sliders={[
          { label: 'Distance to Wall', value: distance, min: 50, max: 200, step: 10, unit: 'm', onChange: setDistance }
        ]}
      />
    </div>
  );
};

const CenterGravity = ({ setRecordedData }: any) => {
  const [rotation, setRotation] = useState(0);
  const [plumbLines, setPlumbLines] = useState<{ angle: number; id: number }[]>([]);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [showCG, setShowCG] = useState(false);

  const pivotX = 150;
  const pivotY = 50;

  const reset = () => {
    setRotation(0);
    setPlumbLines([]);
    setLocalRecordedData([]);
    setRecordedData([]);
    setShowCG(false);
  };

  const dropPlumbLine = () => {
    const newAngle = rotation;
    const id = plumbLines.length + 1;
    setPlumbLines(prev => [...prev, { angle: newAngle, id }]);
    
    const newData = { point: `Hole ${id}`, angle: `${newAngle}°`, status: 'Line Drawn' };
    setLocalRecordedData(prev => [...prev, newData]);
    setRecordedData((prev: any[]) => [...prev, newData]);

    if (plumbLines.length >= 2) {
      setShowCG(true);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-1 flex-col lg:flex-row gap-4 min-h-[300px]">
        <div className="flex-[1.5] bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden flex items-center justify-center min-h-[250px]">
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-white/80 backdrop-blur px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
              <span className="text-[9px] font-black text-slate-400 uppercase">Experiment Mode</span>
            </div>
          </div>
          
          <div className="absolute top-3 right-3 z-10 text-[8px] font-bold text-slate-400 uppercase max-w-[120px] text-right">
            Rotate lamina and drop plumb lines to find intersection
          </div>

          <motion.div 
            animate={{ rotate: rotation }}
            className="relative w-[280px] h-[280px] flex items-center justify-center"
            style={{ transformOrigin: `${pivotX}px ${pivotY}px` }}
          >
            {/* Lamina Shape */}
            <div 
              className="absolute inset-0 bg-amber-100 border-2 border-amber-300 shadow-sm"
              style={{ clipPath: 'polygon(20% 10%, 80% 0%, 100% 40%, 90% 90%, 40% 100%, 0% 70%, 10% 20%)' }}
            />
            
            {/* Plumb Lines (Fixed to Lamina) */}
            {plumbLines.map((line, i) => (
              <div 
                key={i}
                className="absolute w-[1px] h-[600px] bg-red-400/40"
                style={{ left: pivotX, top: pivotY, transform: `rotate(${-line.angle}deg)`, transformOrigin: 'top center' }}
              />
            ))}

            {/* Center of Gravity Mark */}
            {showCG && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute w-4 h-4 border-2 border-emerald-500 rounded-full flex items-center justify-center bg-emerald-50/50"
                style={{ left: 150 - 8, top: 150 - 8 }} // CG is roughly at 150, 150
              >
                <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                <span className="absolute -top-4 text-[8px] font-bold text-emerald-600">CG</span>
              </motion.div>
            )}
          </motion.div>

          {/* Pivot Pin (Fixed in Space) */}
          <div className="absolute w-3 h-3 bg-slate-800 rounded-full z-50 shadow-md" style={{ left: pivotX, top: pivotY, transform: 'translate(-50%, -50%)' }} />
          
          {/* Vertical Reference Line (Plumb String) */}
          <div className="absolute w-[1px] h-[400px] bg-slate-400 border-l border-dashed border-slate-400 pointer-events-none z-40" style={{ left: pivotX, top: pivotY }} />
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden min-h-[150px]">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'point', label: 'Pivot', unit: '' },
              { key: 'angle', label: 'Angle', unit: '' },
              { key: 'status', label: 'Status', unit: '' }
            ]} 
          />
        </div>
      </div>

      <ControlPanel 
        isRunning={false}
        onStart={dropPlumbLine}
        onReset={reset}
        startLabel="DROP PLUMB LINE"
        sliders={[
          { label: 'Rotate Lamina', value: rotation, min: -90, max: 90, step: 1, unit: '°', onChange: setRotation }
        ]}
      />
    </div>
  );
};

// --- Convection Beaker Engine ---
const ConvectionBeaker = ({ config }: any) => {
  const [isHeating, setIsHeating] = useState(false);
  
  // Create particles for the convection current
  const particles = Array.from({ length: 15 });

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
        <div className="relative flex flex-col items-center">
          {/* Beaker */}
          <div className="w-48 h-64 border-4 border-slate-700 border-t-0 rounded-b-3xl relative bg-blue-900/20 overflow-hidden">
            {/* Convection Current Particles */}
            <AnimatePresence>
              {isHeating && particles.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 1, 1, 1, 0],
                    left: ["80%", "80%", "20%", "20%", "80%"],
                    top: ["90%", "10%", "10%", "90%", "90%"],
                    backgroundColor: ["#ef4444", "#ef4444", "#3b82f6", "#3b82f6", "#ef4444"],
                    scale: [1, 1.2, 1, 0.8, 1]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    delay: i * 0.6,
                    ease: "linear"
                  }}
                  className="absolute w-3 h-3 rounded-full blur-[1px] shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                />
              ))}
            </AnimatePresence>

            {/* Heat Source Glow */}
            <AnimatePresence>
              {isHeating && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-0 right-0 w-24 h-24 bg-red-600/30 blur-2xl rounded-full"
                />
              )}
            </AnimatePresence>

            {/* Labels */}
            <div className="absolute top-4 left-4 text-[8px] font-bold text-blue-400 uppercase tracking-widest opacity-50">Sinking (Cold)</div>
            <div className="absolute top-4 right-4 text-[8px] font-bold text-red-400 uppercase tracking-widest opacity-50">Rising (Warm)</div>
          </div>

          {/* Bunsen Burner - Moved to the Right */}
          <div className="w-48 relative h-16 mt-2">
            <div className="absolute right-4 top-0 flex flex-col items-center">
              <div className="w-8 h-12 bg-slate-700 rounded-t-lg" />
              {isHeating && (
                <motion.div 
                  animate={{ scaleY: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  className="w-4 h-10 bg-blue-400 rounded-full -mt-16 blur-sm"
                />
              )}
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 text-right">
          <div className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Tracer</div>
          <div className="text-xs text-slate-400">{config?.tracer || "Potassium Manganate(VII)"}</div>
        </div>
        <button 
          onClick={() => setIsHeating(!isHeating)}
          className={`absolute bottom-4 right-4 px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-lg ${isHeating ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}`}
        >
          {isHeating ? 'STOP HEATING' : 'START HEATING'}
        </button>
      </div>
      <div className="p-4 bg-white rounded-xl border border-slate-200 text-center">
        <p className="text-xs text-slate-500 italic">Observe how the water heated on the right becomes less dense and rises, while cooler water on the left sinks to replace it.</p>
      </div>
    </div>
  );
};

// --- SHC Lab Engine ---
const SHCLab = ({ setRecordedData, config }: any) => {
  const [tempChange, setTempChange] = useState(0);
  const [isStirring, setIsStirring] = useState(false);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [entryAdded, setEntryAdded] = useState(false);

  const mass = config?.mass ?? 0.1;
  const voltage = config?.voltage ?? 12;
  const current = config?.current ?? 2;
  const shcValue = config?.shcValue ?? 4200;
  const power = voltage * current;
  
  // E = P * t = m * c * dT
  // t = (m * c * dT) / P
  const time = (mass * shcValue * tempChange) / power;
  const energy = power * time;

  const recordData = () => {
    if (entryAdded) return;
    const newData = { 
      mass: mass.toString(), 
      energy: Math.round(energy).toString(), 
      dT: tempChange.toString(),
      shc: tempChange > 0 ? (energy / (mass * tempChange)).toFixed(0) : "0"
    };
    setLocalRecordedData(prev => [...prev, newData]);
    setRecordedData((prev: any[]) => [...prev, newData]);
    setEntryAdded(true);
  };

  useEffect(() => { setEntryAdded(false); }, [tempChange]);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[280px]">
        <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden flex items-center justify-center p-4">
          <div className="relative flex flex-col items-center">
            <div className="w-24 h-32 border-2 border-slate-300 border-t-0 rounded-b-lg relative bg-blue-50/30 overflow-hidden">
              <div className="absolute bottom-0 w-full h-[80%] bg-blue-400/40" />
              {/* Heater */}
              <div className="absolute inset-x-8 top-4 bottom-4 bg-slate-800 rounded-full border-2 border-slate-700" />
              {/* Stirrer */}
              <motion.div 
                animate={{ rotate: isStirring ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                className="absolute left-1/2 -translate-x-1/2 top-2 w-1 h-28 bg-slate-400 origin-top"
              >
                <div className="absolute bottom-0 w-6 h-1 bg-slate-400 -left-2.5" />
              </motion.div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-2xl font-mono font-bold text-slate-700">+{tempChange}°C</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Immersion Heater</div>
            </div>
            <button 
              onMouseDown={() => setIsStirring(true)}
              onMouseUp={() => setIsStirring(false)}
              onMouseLeave={() => setIsStirring(false)}
              className={`mt-2 px-3 py-1 rounded-full text-[10px] font-bold transition-all ${isStirring ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}
            >
              HOLD TO STIR
            </button>
          </div>
        </div>

        <div className="flex-[1.5] bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'mass', label: 'Mass', unit: 'kg' },
              { key: 'energy', label: 'Energy', unit: 'J' },
              { key: 'dT', label: 'ΔT', unit: '°C' },
              { key: 'shc', label: 'SHC', unit: 'J/kg°C' }
            ]} 
          />
        </div>
      </div>

      <ControlPanel 
        isRunning={false}
        onStart={recordData}
        onReset={() => { setTempChange(0); setLocalRecordedData([]); setRecordedData([]); }}
        startLabel="RECORD DATA"
        sliders={[
          { label: 'Temp Change', value: tempChange, min: 0, max: 20, step: 2, unit: '°C', onChange: setTempChange }
        ]}
      />
    </div>
  );
};

// --- Leslie Cube Engine ---
const LeslieCube = ({ setRecordedData, config }: any) => {
  const [surface, setSurface] = useState("Matte Black");
  const [distance, setDistance] = useState(10);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [entryAdded, setEntryAdded] = useState(false);

  // Intensity = k * Emissivity / d^2
  const emissivities = config?.emissivity ?? {
    "Matte Black": 0.95,
    "Shiny Black": 0.8,
    "Matte White": 0.6,
    "Shiny Silver": 0.1
  };

  const baseIntensity = config?.baseIntensity ?? 1000;
  const intensity = (baseIntensity * emissivities[surface]) / (distance * distance);

  const recordData = () => {
    if (entryAdded) return;
    const newData = { 
      surface, 
      distance: distance.toString(), 
      intensity: intensity.toFixed(2) 
    };
    setLocalRecordedData(prev => [...prev, newData]);
    setRecordedData((prev: any[]) => [...prev, newData]);
    setEntryAdded(true);
  };

  useEffect(() => { setEntryAdded(false); }, [surface, distance]);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[280px]">
        <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
          <div className="relative flex flex-col items-center">
            {/* Leslie Cube */}
            <motion.div 
              animate={{ rotateY: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 bg-slate-700 border-2 border-slate-600 shadow-2xl flex items-center justify-center"
              style={{ backgroundColor: surface.includes("Black") ? "#1a1a1a" : (surface.includes("White") ? "#f8fafc" : "#94a3b8") }}
            >
              <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{surface}</div>
            </motion.div>
            
            {/* IR Detector */}
            <motion.div 
              animate={{ x: distance * 2 }}
              className="absolute right-0 w-12 h-12 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center"
            >
              <div className="text-[10px] font-mono font-bold text-amber-400">{intensity.toFixed(1)}</div>
            </motion.div>
          </div>
        </div>

        <div className="flex-[1.5] bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'surface', label: 'Surface' },
              { key: 'distance', label: 'Dist', unit: 'cm' },
              { key: 'intensity', label: 'IR Intensity' }
            ]} 
          />
        </div>
      </div>

      <ControlPanel 
        isRunning={false}
        onStart={recordData}
        onReset={() => { setDistance(10); setLocalRecordedData([]); setRecordedData([]); }}
        startLabel="RECORD INTENSITY"
        sliders={[
          { label: 'Distance', value: distance, min: 10, max: 50, step: 5, unit: 'cm', onChange: setDistance }
        ]}
      />
      <div className="flex gap-4 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
        {config?.surfaces?.map((s: string) => (
          <button 
            key={s} 
            onClick={() => setSurface(s)}
            className={`text-[10px] font-bold px-3 py-1 rounded-lg transition-all ${surface === s ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Insulation Lab Engine ---
const InsulationLab = ({ setRecordedData, config }: any) => {
  const [material, setMaterial] = useState("Control");
  const [hasLid, setHasLid] = useState(true);
  const [time, setTime] = useState(0);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [entryAdded, setEntryAdded] = useState(false);

  const startTemp = config?.startTemp ?? 80;
  const roomTemp = config?.roomTemp ?? 20;
  
  const rates = config?.coolingRates ?? {
    "Control": 0.05,
    "Newspaper": 0.03,
    "Wool": 0.015,
    "Bubble Wrap": 0.02
  };

  const lidPenalty = config?.lidPenalty ?? 1.5; // Default multiplier if lid is off
  const lidFactor = hasLid ? 1 : (1 + lidPenalty);
  
  // Newton's law of cooling approximation: T = T_env + (T_start - T_env) * e^(-kt)
  const k = rates[material] * lidFactor;
  const currentTemp = roomTemp + (startTemp - roomTemp) * Math.exp(-k * (time / 60));

  const recordData = () => {
    if (entryAdded) return;
    const newData = { 
      time: time.toString(), 
      material, 
      lid: hasLid ? "Yes" : "No", 
      temp: Math.max(roomTemp, currentTemp).toFixed(1) 
    };
    setLocalRecordedData(prev => [...prev, newData]);
    setRecordedData((prev: any[]) => [...prev, newData]);
    setEntryAdded(true);
  };

  useEffect(() => { setEntryAdded(false); }, [time, material, hasLid]);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[280px]">
        <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden flex items-center justify-center p-4">
          <div className="relative flex flex-col items-center">
            {/* Beaker */}
            <div className="w-24 h-32 border-2 border-slate-300 border-t-0 rounded-b-lg relative bg-blue-50/30 overflow-hidden">
              {/* Water */}
              <motion.div 
                animate={{ height: `${Math.max(0, (currentTemp / 100) * 100)}%` }}
                className="absolute bottom-0 w-full bg-blue-400/40"
              />
              {/* Insulation Layer */}
              {material !== "Control" && (
                <div className="absolute inset-0 border-4 border-slate-200/50 pointer-events-none" />
              )}
            </div>
            {/* Lid */}
            {hasLid && <div className="w-28 h-2 bg-slate-400 rounded-full -mt-32 z-10" />}
            
            <div className="mt-4 text-center">
              <div className="text-2xl font-mono font-bold text-slate-700">{Math.max(20, currentTemp).toFixed(1)}°C</div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">{material}</div>
            </div>
          </div>
        </div>

        <div className="flex-[1.5] bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'time', label: 'Time', unit: 's' },
              { key: 'material', label: 'Material' },
              { key: 'lid', label: 'Lid' },
              { key: 'temp', label: 'Temp', unit: '°C' }
            ]} 
          />
        </div>
      </div>

      <ControlPanel 
        isRunning={false}
        onStart={recordData}
        onReset={() => { setTime(0); setLocalRecordedData([]); setRecordedData([]); }}
        startLabel="RECORD TEMP"
        sliders={[
          { label: 'Time Elapsed', value: time, min: 0, max: 600, step: 60, unit: 's', onChange: setTime }
        ]}
      />
      <div className="flex flex-wrap gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex gap-2 mr-4 border-r border-slate-200 pr-4">
          {config?.materials?.map((m: string) => (
            <button 
              key={m} 
              onClick={() => setMaterial(m)}
              className={`text-[10px] font-bold px-3 py-1 rounded-lg transition-all ${material === m ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}
            >
              {m}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={hasLid} onChange={(e) => setHasLid(e.target.checked)} />
          <span className="text-xs font-bold text-slate-600">Use Lid</span>
        </label>
      </div>
    </div>
  );
};

// --- Density Tank Engine ---
const DensityTank = ({ setRecordedData, config }: any) => {
  const [object, setObject] = useState(config?.objects?.[0]?.name || "Stone");
  const [liquid, setLiquid] = useState(config?.liquids?.[0]?.name || "Water");
  const [isDipping, setIsDipping] = useState(false);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [entryAdded, setEntryAdded] = useState(false);

  const selectedObj = config?.objects?.find((o: any) => o.name === object);
  const selectedLiq = config?.liquids?.find((l: any) => l.name === liquid);

  const mass = selectedObj?.mass || 0;
  const trueVol = selectedObj?.trueVol || 0;
  const density = (mass / trueVol).toFixed(2);

  const recordData = () => {
    if (entryAdded) return;
    const newData = { 
      object, 
      mass: mass.toString(), 
      initialVol: "50.0", 
      finalVol: (50.0 + trueVol).toFixed(1),
      objVol: trueVol.toFixed(1),
      density
    };
    setLocalRecordedData(prev => [...prev, newData]);
    setRecordedData((prev: any[]) => [...prev, newData]);
    setEntryAdded(true);
  };

  useEffect(() => { setEntryAdded(false); setIsDipping(false); }, [object, liquid]);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[300px]">
        <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
          <div className="relative flex items-end gap-8">
            {/* Eureka Can */}
            <div className="relative">
              <div className="w-32 h-48 border-4 border-slate-700 border-t-0 rounded-b-2xl relative bg-blue-900/20 overflow-hidden">
                <motion.div 
                  animate={{ height: isDipping ? '85%' : '80%' }}
                  className="absolute bottom-0 w-full bg-blue-400/30"
                />
                {/* Spout */}
                <div className="absolute top-1/4 -right-4 w-6 h-2 bg-slate-700 rotate-[20deg]" />
              </div>
              {/* Object */}
              <motion.div 
                animate={{ y: isDipping ? 120 : 0 }}
                className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center"
              >
                <div className="w-1 h-16 bg-slate-500" />
                <div className={`w-12 h-12 rounded-xl shadow-lg flex items-center justify-center text-[8px] font-bold text-white ${object === 'Stone' ? 'bg-stone-500' : 'bg-amber-600'}`}>
                  {object}
                </div>
              </motion.div>
            </div>

            {/* Measuring Cylinder */}
            <div className="relative">
              <div className="w-12 h-32 border-2 border-slate-700 border-t-0 rounded-b-lg relative bg-blue-900/10">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: isDipping ? `${(trueVol / 40) * 100}%` : 0 }}
                  className="absolute bottom-0 w-full bg-blue-400/50"
                />
                {/* Scale */}
                <div className="absolute inset-y-0 left-0 w-2 flex flex-col justify-between py-1">
                  {[40, 30, 20, 10, 0].map(v => <div key={v} className="h-[1px] w-full bg-slate-700" />)}
                </div>
              </div>
              <div className="mt-2 text-center text-[10px] font-mono text-blue-400">
                {isDipping ? trueVol.toFixed(1) : "0.0"} cm³
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setIsDipping(!isDipping)}
            className={`absolute bottom-4 right-4 px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-lg ${isDipping ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}`}
          >
            {isDipping ? 'REMOVE OBJECT' : 'LOWER OBJECT'}
          </button>
        </div>

        <div className="flex-[1.5] bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'object', label: 'Object' },
              { key: 'mass', label: 'Mass', unit: 'g' },
              { key: 'objVol', label: 'Vol', unit: 'cm³' },
              { key: 'density', label: 'Density', unit: 'g/cm³' }
            ]} 
          />
        </div>
      </div>

      <div className="flex gap-4 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex gap-2 mr-4 border-r border-slate-200 pr-4">
          {config?.objects?.map((o: any) => (
            <button 
              key={o.name} 
              onClick={() => setObject(o.name)}
              className={`text-[10px] font-bold px-3 py-1 rounded-lg transition-all ${object === o.name ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}
            >
              {o.name}
            </button>
          ))}
        </div>
        <button 
          onClick={recordData}
          disabled={!isDipping || entryAdded}
          className="px-4 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg disabled:opacity-50"
        >
          RECORD DATA
        </button>
      </div>
    </div>
  );
};

// --- Boyle's Piston Engine ---
const BoylesPiston = ({ setRecordedData, config }: any) => {
  const [pressure, setPressure] = useState(config?.minPressure || 100);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [entryAdded, setEntryAdded] = useState(false);

  const k = config?.k || 2000;
  const volume = (k / pressure).toFixed(1);

  const recordData = () => {
    if (entryAdded) return;
    const newData = { 
      volume, 
      pressure: pressure.toString(), 
      constant: k.toFixed(0)
    };
    setLocalRecordedData(prev => [...prev, newData].sort((a, b) => parseFloat(a.pressure) - parseFloat(b.pressure)));
    setRecordedData((prev: any[]) => [...prev, newData].sort((a, b) => parseFloat(a.pressure) - parseFloat(b.pressure)));
    setEntryAdded(true);
  };

  useEffect(() => { setEntryAdded(false); }, [pressure]);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[320px]">
        <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
          <div className="relative flex items-center gap-12">
            {/* Vertical Cylinder */}
            <div className="w-24 h-48 border-x-4 border-b-4 border-slate-600 rounded-b-lg relative bg-slate-800/50 flex flex-col justify-end">
              {/* Piston from Top */}
              <motion.div 
                animate={{ height: `${100 - (parseFloat(volume) / 20) * 100}%` }}
                className="absolute top-0 left-0 w-full bg-slate-500 border-b-8 border-slate-400 z-10"
                initial={false}
              />
              
              {/* Gas Particles */}
              <div className="w-full relative overflow-hidden" style={{ height: `${(parseFloat(volume) / 20) * 100}%` }}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      x: [Math.random() * 80, Math.random() * 80],
                      y: [Math.random() * 80, Math.random() * 80]
                    }}
                    transition={{ 
                      duration: 0.3 / (pressure / 100), 
                      repeat: Infinity, 
                      repeatType: "reverse" 
                    }}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                  />
                ))}
              </div>

              {/* Scale */}
              <div className="absolute inset-y-0 -left-6 flex flex-col justify-between py-1">
                {[20, 15, 10, 5, 0].map(v => (
                  <div key={v} className="flex items-center gap-1">
                    <div className="h-[1px] w-2 bg-slate-500" />
                    <span className="text-[8px] font-mono text-slate-500">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pressure Gauge */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full border-4 border-slate-700 bg-slate-800 flex items-center justify-center relative shadow-inner">
                {/* Gauge Markings */}
                <div className="absolute inset-2 border border-slate-700/50 rounded-full" />
                <motion.div 
                  animate={{ rotate: (pressure / 400) * 270 - 135 }}
                  className="w-1 h-10 bg-red-500 origin-bottom -mt-10 z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 100 }}
                />
                <div className="w-2 h-2 rounded-full bg-slate-400 z-20" />
                <div className="absolute bottom-3 text-[10px] font-mono font-bold text-emerald-400 bg-black/40 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {pressure} kPa
                </div>
              </div>
              <div className="mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pressure Gauge</div>
            </div>
          </div>
        </div>

        <div className="flex-[1.2] bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'pressure', label: 'Press', unit: 'kPa' },
              { key: 'volume', label: 'Vol', unit: 'cm³' },
              { key: 'constant', label: 'P×V' }
            ]} 
          />
        </div>
      </div>

      <ControlPanel 
        isRunning={false}
        onStart={recordData}
        onReset={() => { setPressure(config?.minPressure || 100); setLocalRecordedData([]); setRecordedData([]); }}
        startLabel="RECORD POINT"
        sliders={[
          { label: 'Pressure', value: pressure, min: config?.minPressure || 100, max: config?.maxPressure || 400, step: 20, unit: 'kPa', onChange: setPressure }
        ]}
      />
    </div>
  );
};

// --- Electromagnet Lab Engine ---
const ElectromagnetLab = ({ setRecordedData, config }: any) => {
  const [turns, setTurns] = useState(config?.minTurns || 20);
  const [current, setCurrent] = useState(1);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [entryAdded, setEntryAdded] = useState(false);

  // Strength = turns * current * constant
  const paperclips = Math.floor((turns * current) / 10);

  const recordData = () => {
    if (entryAdded) return;
    const newData = { turns, current: current.toFixed(1), paperclips };
    setLocalRecordedData(prev => [...prev, newData].sort((a, b) => a.turns - b.turns || parseFloat(a.current) - parseFloat(b.current)));
    setRecordedData((prev: any[]) => [...prev, newData].sort((a, b) => a.turns - b.turns || parseFloat(a.current) - parseFloat(b.current)));
    setEntryAdded(true);
  };

  useEffect(() => { setEntryAdded(false); }, [turns, current]);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[300px]">
        <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
          <div className="relative flex flex-col items-center">
            {/* Nail Core */}
            <div className="w-4 h-48 bg-slate-400 rounded-full relative">
              <div className="absolute -top-2 -left-2 w-8 h-4 bg-slate-500 rounded-full" /> {/* Nail Head */}
              
              {/* Coils */}
              <div className="absolute inset-0 flex flex-col justify-center gap-1">
                {Array.from({ length: turns / 2 }).map((_, i) => (
                  <div key={i} className="w-8 h-1.5 bg-amber-600 -ml-2 rounded-full border border-amber-700 shadow-sm" />
                ))}
              </div>

              {/* Magnetic Field Lines (Visual) */}
              {current > 0 && turns > 0 && (
                <motion.div 
                  animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-12 border-2 border-blue-400/20 rounded-full pointer-events-none"
                />
              )}
            </div>

            {/* Lifted Paperclips */}
            <div className="mt-2 flex flex-col items-center">
              {Array.from({ length: paperclips }).map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="w-4 h-6 border-2 border-slate-300 rounded-full -mt-3 first:mt-0"
                />
              ))}
            </div>
          </div>

          {/* Power Supply Display */}
          <div className="absolute bottom-4 right-4 bg-slate-800 p-2 rounded border border-slate-700">
            <div className="text-[8px] font-bold text-slate-500 uppercase">Current</div>
            <div className="text-sm font-mono font-bold text-amber-400">{current.toFixed(1)} A</div>
          </div>
        </div>

        <div className="flex-[1.2] bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'turns', label: 'Turns (N)' },
              { key: 'current', label: 'Current', unit: 'A' },
              { key: 'paperclips', label: 'Paperclips' }
            ]} 
          />
        </div>
      </div>

      <ControlPanel 
        isRunning={false}
        onStart={recordData}
        onReset={() => { setTurns(20); setCurrent(1); setLocalRecordedData([]); setRecordedData([]); }}
        startLabel="TEST STRENGTH"
        sliders={[
          { label: 'Number of Turns', value: turns, min: config?.minTurns || 0, max: config?.maxTurns || 60, step: config?.stepTurns || 10, unit: '', onChange: setTurns },
          { label: 'Current', value: current, min: config?.currentRange?.[0] || 0, max: config?.currentRange?.[1] || 5, step: 0.5, unit: 'A', onChange: setCurrent }
        ]}
      />
    </div>
  );
};

// --- Motor Force Engine ---
const MotorForce = ({ setRecordedData, config }: any) => {
  const [current, setCurrent] = useState(1);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [entryAdded, setEntryAdded] = useState(false);

  const B = config?.B || 0.8;
  const L = config?.L || 0.12;
  const forceMN = (B * current * L * 1000).toFixed(1); // Force in milliNewtons

  const recordData = () => {
    if (entryAdded) return;
    const newData = { current: current.toFixed(1), length: L, flux: B, force: forceMN };
    setLocalRecordedData(prev => [...prev, newData].sort((a, b) => parseFloat(a.current) - parseFloat(b.current)));
    setRecordedData((prev: any[]) => [...prev, newData].sort((a, b) => parseFloat(a.current) - parseFloat(b.current)));
    setEntryAdded(true);
  };

  useEffect(() => { setEntryAdded(false); }, [current]);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[300px]">
        <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
          <div className="relative flex flex-col items-center">
            {/* Horseshoe Magnet */}
            <div className="relative w-48 h-32 border-8 border-slate-700 rounded-t-3xl border-b-0 flex justify-between px-8">
              <div className="w-12 h-full bg-red-600 flex items-center justify-center text-white font-bold">N</div>
              <div className="w-12 h-full bg-blue-600 flex items-center justify-center text-white font-bold">S</div>
            </div>

            {/* Wire in Field */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-amber-500 shadow-lg shadow-amber-500/20">
              <motion.div 
                animate={{ y: current * 2 }}
                className="w-full h-full bg-amber-400"
              />
            </div>

            {/* Force Arrow */}
            {current > 0 && (
              <motion.div 
                animate={{ height: current * 10, opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute top-1/2 -translate-y-full flex flex-col items-center"
              >
                <ArrowUp size={16} className="text-emerald-400" />
                <div className="w-1 flex-1 bg-emerald-500/50" />
                <div className="text-[8px] font-bold text-emerald-400 mt-1">FORCE</div>
              </motion.div>
            )}

            {/* Balance Base */}
            <div className="w-64 h-8 bg-slate-800 border-t-2 border-slate-700 mt-4 flex items-center justify-center">
              <div className="bg-black/40 px-3 py-1 rounded border border-slate-700">
                <span className="text-xs font-mono font-bold text-emerald-400">{forceMN} mN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-[1.2] bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'current', label: 'Current', unit: 'A' },
              { key: 'force', label: 'Force', unit: 'mN' }
            ]} 
          />
        </div>
      </div>

      <ControlPanel 
        isRunning={false}
        onStart={recordData}
        onReset={() => { setCurrent(1); setLocalRecordedData([]); setRecordedData([]); }}
        startLabel="MEASURE FORCE"
        sliders={[
          { label: 'Current (I)', value: current, min: config?.currentRange?.[0] || 0, max: config?.currentRange?.[1] || 5, step: 0.5, unit: 'A', onChange: setCurrent }
        ]}
      />
    </div>
  );
};

// --- Induction Lab Engine ---
const InductionLab = ({ setRecordedData, config }: any) => {
  const [turns, setTurns] = useState(config?.turns?.[0] || 100);
  const [speed, setSpeed] = useState("Medium");
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [isMoving, setIsMoving] = useState(false);

  const speedMultiplier = speed === "Slow" ? 1 : speed === "Medium" ? 2 : 3;
  const inducedVoltage = (turns / 100) * speedMultiplier * 0.5;

  const recordData = () => {
    if (isMoving) return;
    setIsMoving(true);
    
    setTimeout(() => {
      const newData = { speed, turns, direction: "In", voltage: inducedVoltage.toFixed(2) };
      setLocalRecordedData(prev => [...prev, newData]);
      setRecordedData((prev: any[]) => [...prev, newData]);
      setIsMoving(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[300px]">
        <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Coil */}
            <div className="relative w-32 h-32 border-4 border-amber-700 rounded-xl flex flex-col justify-center gap-1 p-2 bg-amber-900/10">
              {Array.from({ length: turns / 20 }).map((_, i) => (
                <div key={i} className="w-full h-1 bg-amber-600 rounded-full opacity-50" />
              ))}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-8">
                <div className="w-0.5 h-8 bg-slate-600" />
                <div className="w-0.5 h-8 bg-slate-600" />
              </div>
            </div>

            {/* Magnet */}
            <motion.div 
              animate={isMoving ? { x: [150, 0, 150] } : { x: 150 }}
              transition={{ duration: 1 / speedMultiplier, ease: "easeInOut" }}
              className="absolute w-24 h-8 flex shadow-xl"
            >
              <div className="flex-1 bg-red-600 flex items-center justify-center text-white font-bold rounded-l">N</div>
              <div className="flex-1 bg-blue-600 flex items-center justify-center text-white font-bold rounded-r">S</div>
            </motion.div>

            {/* Galvanometer */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-20 bg-slate-800 rounded-lg border-2 border-slate-700 flex flex-col items-center p-2">
              <div className="relative w-full h-8 border-b border-slate-700 flex justify-center">
                <motion.div 
                  animate={isMoving ? { rotate: [0, -45, 45, 0] } : { rotate: 0 }}
                  className="w-0.5 h-10 bg-red-500 origin-bottom"
                />
              </div>
              <div className="mt-2 text-[10px] font-mono text-emerald-400">
                {isMoving ? inducedVoltage.toFixed(2) : "0.00"} V
              </div>
            </div>
          </div>
        </div>

        <div className="flex-[1.2] bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'speed', label: 'Speed' },
              { key: 'turns', label: 'Turns' },
              { key: 'voltage', label: 'Voltage', unit: 'V' }
            ]} 
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-center gap-5 shadow-sm">
        <div className="flex flex-1 gap-5 w-full">
          <div className="flex-1 space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Number of Turns</label>
            <div className="flex gap-2">
              {config?.turns?.map((t: number) => (
                <button 
                  key={t}
                  onClick={() => setTurns(t)}
                  className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-all ${turns === t ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Speed of Magnet</label>
            <div className="flex gap-2">
              {config?.speeds?.map((s: string) => (
                <button 
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-all ${speed === s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button 
          onClick={recordData} 
          disabled={isMoving}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50 text-sm"
        >
          <Play size={18} fill="currentColor" /> PUSH MAGNET
        </button>
      </div>
    </div>
  );
};

// --- Transformer Sim Engine ---
const TransformerSim = ({ setRecordedData, config }: any) => {
  const [vp, setVp] = useState(6);
  const [np, setNp] = useState(100);
  const [ns, setNs] = useState(500);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [entryAdded, setEntryAdded] = useState(false);

  const vs = (vp * (ns / np)).toFixed(1);
  const type = ns > np ? "Step-Up" : ns < np ? "Step-Down" : "1:1";

  const recordData = () => {
    if (entryAdded) return;
    const newData = { vp, np, ns, vs, type };
    setLocalRecordedData(prev => [...prev, newData]);
    setRecordedData((prev: any[]) => [...prev, newData]);
    setEntryAdded(true);
  };

  useEffect(() => { setEntryAdded(false); }, [vp, np, ns]);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[300px]">
        <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
          <div className="relative flex items-center gap-4">
            {/* Primary Coil */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-32 border-2 border-slate-600 rounded bg-slate-800/50 flex flex-col justify-center gap-1 p-1">
                {Array.from({ length: np / 20 }).map((_, i) => (
                  <div key={i} className="w-full h-1.5 bg-blue-500 rounded-full opacity-60" />
                ))}
              </div>
              <div className="mt-2 text-[10px] font-bold text-blue-400">Primary (Np: {np})</div>
              <div className="text-xs font-mono text-white">{vp}V AC</div>
            </div>

            {/* Iron Core */}
            <div className="w-24 h-40 border-8 border-slate-500 rounded-lg flex items-center justify-center">
              <motion.div 
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-full h-full bg-slate-400/10 flex items-center justify-center"
              >
                <Zap size={24} className="text-amber-500/30" />
              </motion.div>
            </div>

            {/* Secondary Coil */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-32 border-2 border-slate-600 rounded bg-slate-800/50 flex flex-col justify-center gap-1 p-1">
                {Array.from({ length: ns / 20 }).map((_, i) => (
                  <div key={i} className="w-full h-1.5 bg-amber-500 rounded-full opacity-60" />
                ))}
              </div>
              <div className="mt-2 text-[10px] font-bold text-amber-400">Secondary (Ns: {ns})</div>
              <div className="text-xs font-mono text-emerald-400">{vs}V AC</div>
            </div>
          </div>

          <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{type}</span>
          </div>
        </div>

        <div className="flex-[1.2] bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'vp', label: 'Vp', unit: 'V' },
              { key: 'np', label: 'Np' },
              { key: 'ns', label: 'Ns' },
              { key: 'vs', label: 'Vs', unit: 'V' }
            ]} 
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Input Voltage (Vp)</label>
            <input 
              type="range" min={config?.Vp_range?.[0] || 2} max={config?.Vp_range?.[1] || 12} step={2}
              value={vp} onChange={(e) => setVp(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="text-right text-[10px] font-bold text-blue-600">{vp} V</div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Primary Turns (Np)</label>
            <div className="flex gap-1">
              {config?.Np_options?.map((n: number) => (
                <button key={n} onClick={() => setNp(n)} className={`flex-1 py-1 rounded text-[10px] font-bold ${np === n ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{n}</button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Secondary Turns (Ns)</label>
            <div className="flex gap-1">
              {config?.Ns_options?.map((n: number) => (
                <button key={n} onClick={() => setNs(n)} className={`flex-1 py-1 rounded text-[10px] font-bold ${ns === n ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{n}</button>
              ))}
            </div>
          </div>
        </div>
        <button 
          onClick={recordData}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all shadow-lg shadow-blue-600/20 text-xs"
        >
          RECORD TRANSFORMER DATA
        </button>
      </div>
    </div>
  );
};

// --- Pressure Kelvin Engine ---
const PressureKelvin = ({ setRecordedData, config }: any) => {
  const [tempC, setTempC] = useState(20);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [entryAdded, setEntryAdded] = useState(false);

  const initialP = config?.initialP || 101;
  const tempK = tempC + 273;
  const pressure = (initialP * (tempK / 293)).toFixed(1);

  const recordData = () => {
    if (entryAdded) return;
    const newData = { 
      tempC: tempC.toString(), 
      tempK: tempK.toString(),
      pressure, 
      constant: (parseFloat(pressure) / tempK).toFixed(3)
    };
    setLocalRecordedData(prev => [...prev, newData].sort((a, b) => parseFloat(a.tempC) - parseFloat(b.tempC)));
    setRecordedData((prev: any[]) => [...prev, newData].sort((a, b) => parseFloat(a.tempC) - parseFloat(b.tempC)));
    setEntryAdded(true);
  };

  useEffect(() => { setEntryAdded(false); }, [tempC]);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-1 flex-col lg:flex-row gap-3 min-h-[300px]">
        <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
          <div className="relative flex flex-col items-center">
            {/* Water Bath */}
            <div className="w-40 h-40 border-4 border-slate-700 border-t-0 rounded-b-2xl relative bg-blue-900/20 overflow-hidden">
              <motion.div 
                animate={{ backgroundColor: tempC > 50 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)' }}
                className="absolute inset-0"
              />
              {/* Flask */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-slate-400 bg-white/10 flex items-center justify-center">
                <div className="text-[8px] font-bold text-slate-500">AIR</div>
              </div>
            </div>

            {/* Gauges */}
            <div className="mt-4 flex gap-4">
              <div className="flex flex-col items-center">
                <div className="text-[8px] font-bold text-slate-500 uppercase">Temp</div>
                <div className="text-sm font-mono font-bold text-blue-400">{tempC}°C</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[8px] font-bold text-slate-500 uppercase">Pressure</div>
                <div className="text-sm font-mono font-bold text-emerald-400">{pressure} kPa</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-[1.5] bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'tempC', label: 'T', unit: '°C' },
              { key: 'tempK', label: 'T', unit: 'K' },
              { key: 'pressure', label: 'P', unit: 'kPa' },
              { key: 'constant', label: 'P/T' }
            ]} 
          />
        </div>
      </div>

      <ControlPanel 
        isRunning={false}
        onStart={recordData}
        onReset={() => { setTempC(20); setLocalRecordedData([]); setRecordedData([]); }}
        startLabel="RECORD POINT"
        sliders={[
          { label: 'Temperature', value: tempC, min: 0, max: 100, step: 10, unit: '°C', onChange: setTempC }
        ]}
      />
    </div>
  );
};

// --- Radioactivity Lab Engine ---
const RadioactivityLab = ({ setRecordedData, config }: any) => {
  const [absorber, setAbsorber] = useState('None');
  const [source, setSource] = useState('Alpha');
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);

  const getCountRate = (src: string, abs: string) => {
    const background = 20 + Math.floor(Math.random() * 5);
    let base = 500;
    
    if (src === 'Alpha') {
      if (abs === 'None') return base + background;
      if (abs === 'Paper' || abs === 'Aluminum' || abs === 'Lead') return background;
    }
    if (src === 'Beta') {
      if (abs === 'None') return base + background;
      if (abs === 'Paper') return base * 0.8 + background;
      if (abs === 'Aluminum' || abs === 'Lead') return background;
    }
    if (src === 'Gamma') {
      if (abs === 'None') return base + background;
      if (abs === 'Paper') return base * 0.98 + background;
      if (abs === 'Aluminum') return base * 0.9 + background;
      if (abs === 'Lead') return base * 0.1 + background;
    }
    return background;
  };

  const startMeasurement = () => {
    if (isMeasuring) return;
    setIsMeasuring(true);
    setCount(0);
    setProgress(0);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        const finalCount = getCountRate(source, absorber);
        setCount(finalCount);
        const newData = { source, absorber, count: finalCount };
        setLocalRecordedData(prev => [...prev, newData]);
        setRecordedData((prev: any[]) => [...prev, newData]);
        setIsMeasuring(false);
      }
    }, 200);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-1 flex-col lg:flex-row gap-4 min-h-[300px]">
        <div className="flex-[1.5] bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col p-6">
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-white/5 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 shadow-sm">
              <span className="text-[10px] font-black text-slate-400 uppercase mr-2">GM Counter</span>
              <span className="text-sm font-mono font-bold text-emerald-400">{isMeasuring ? 'MEASURING...' : `${count} Bq`}</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-around relative">
            {/* Source */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg border border-amber-500/40 flex items-center justify-center">
                <Radiation className="text-amber-500" size={24} />
              </div>
              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">{source} Source</div>
            </div>

            {/* Radiation Path */}
            <div className="flex-1 h-1 bg-white/5 relative mx-4">
              {isMeasuring && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  className="absolute inset-0 bg-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                />
              )}
              
              {/* Absorber */}
              {absorber !== 'None' && (
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-24 rounded border border-white/20"
                  style={{ 
                    backgroundColor: absorber === 'Paper' ? '#fff' : absorber === 'Aluminum' ? '#94a3b8' : '#475569',
                    opacity: 0.8
                  }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-white/50 uppercase whitespace-nowrap">{absorber}</div>
                </div>
              )}
            </div>

            {/* GM Tube */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-8 bg-slate-700 rounded-lg border border-slate-600 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GM Tube</div>
            </div>
          </div>

          {/* Progress Bar */}
          {isMeasuring && (
            <div className="mt-4 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-emerald-500"
              />
            </div>
          )}
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden min-h-[150px]">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'source', label: 'Source' },
              { key: 'absorber', label: 'Absorber' },
              { key: 'count', label: 'Count', unit: 'Bq' }
            ]} 
          />
        </div>
      </div>

      <ControlPanel 
        isRunning={isMeasuring}
        onStart={startMeasurement}
        onReset={() => { setAbsorber('None'); setSource('Alpha'); setLocalRecordedData([]); setRecordedData([]); setCount(0); }}
        startLabel="MEASURE (10s)"
        sliders={[
          { label: 'Source', value: source === 'Alpha' ? 0 : source === 'Beta' ? 1 : 2, min: 0, max: 2, step: 1, unit: '', onChange: (v) => setSource(['Alpha', 'Beta', 'Gamma'][v]) },
          { label: 'Absorber', value: absorber === 'None' ? 0 : absorber === 'Paper' ? 1 : absorber === 'Aluminum' ? 2 : 3, min: 0, max: 3, step: 1, unit: '', onChange: (v) => setAbsorber(['None', 'Paper', 'Aluminum', 'Lead'][v]) }
        ]}
      />
    </div>
  );
};

// --- Half Life Sim Engine ---
const HalfLifeSim = ({ isRunning, setIsRunning, setRecordedData }: any) => {
  const [halfLife, setHalfLife] = useState(10);
  const [time, setTime] = useState(0);
  const [nuclei, setNuclei] = useState(100);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const lastRecordedTimeRef = useRef<number>(-1);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) {
      lastTimeRef.current = null;
      return;
    }
    
    let frameId: number;
    const loop = (now: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = now;
      }
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      
      setTime(prev => prev + dt);
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning && time > 0) {
      // Strictly follow N = N0 * (1/2)^(t/t1/2)
      const remaining = 100 * Math.pow(0.5, time / halfLife);
      setNuclei(remaining);
      
      // Log at every half-life interval (e.g., 10s, 20s, 30s if half-life is 10s)
      const currentInterval = Math.floor(time / halfLife);
      if (currentInterval > lastRecordedTimeRef.current) {
        lastRecordedTimeRef.current = currentInterval;
        const logTime = currentInterval * halfLife;
        if (logTime > 0) {
          const logRemaining = 100 * Math.pow(0.5, logTime / halfLife);
          const entry = { time: logTime.toFixed(0), nuclei: logRemaining.toFixed(1) };
          setLocalRecordedData(d => [...d, entry]);
          setRecordedData((d: any[]) => [...d, entry]);
        }
      }

      if (remaining < 0.1) {
        setIsRunning(false);
      }
    }
  }, [time, isRunning, halfLife, setRecordedData, setIsRunning]);

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setNuclei(100);
    setLocalRecordedData([]);
    setRecordedData([]);
    lastRecordedTimeRef.current = -1;
    lastTimeRef.current = null;
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-1 flex-col lg:flex-row gap-4 min-h-[300px]">
        <div className="flex-[1.5] bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col p-6">
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <div className="bg-white/5 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 shadow-sm">
              <span className="text-[10px] font-black text-slate-400 uppercase mr-2">Time</span>
              <span className="text-sm font-mono font-bold text-blue-400">{time.toFixed(1)}s</span>
            </div>
            <div className="bg-white/5 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 shadow-sm">
              <span className="text-[10px] font-black text-slate-400 uppercase mr-2">Nuclei</span>
              <span className="text-sm font-mono font-bold text-emerald-400">{nuclei.toFixed(1)}%</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="grid grid-cols-10 gap-1 p-4 bg-white/5 rounded-xl border border-white/10">
              {Array.from({ length: 100 }).map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    scale: i < nuclei ? 1 : 0.5,
                    opacity: i < nuclei ? 1 : 0.2,
                    backgroundColor: i < nuclei ? '#3b82f6' : '#475569'
                  }}
                  className="w-3 h-3 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden min-h-[150px]">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'time', label: 'Time', unit: 's' },
              { key: 'nuclei', label: 'Remaining', unit: '%' }
            ]} 
          />
        </div>
      </div>

      <ControlPanel 
        isRunning={isRunning}
        onStart={() => setIsRunning(true)}
        onReset={reset}
        sliders={[
          { label: 'Half-Life', value: halfLife, min: 5, max: 20, step: 1, unit: 's', onChange: setHalfLife }
        ]}
      />
    </div>
  );
};

// --- Fission Sim Engine ---
const FissionSim = ({ setRecordedData }: any) => {
  const [isFired, setIsFired] = useState(false);
  const [stage, setStage] = useState('idle'); // idle, firing, hit, split
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);

  const fireNeutron = () => {
    if (isFired) return;
    setIsFired(true);
    setStage('firing');
    
    setTimeout(() => setStage('hit'), 1000);
    setTimeout(() => {
      setStage('split');
      const newData = { event: 'Fission', energy: '200 MeV', neutrons: 3 };
      setLocalRecordedData(prev => [...prev, newData]);
      setRecordedData((prev: any[]) => [...prev, newData]);
    }, 1500);
  };

  const reset = () => {
    setIsFired(false);
    setStage('idle');
    setLocalRecordedData([]);
    setRecordedData([]);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-1 flex-col lg:flex-row gap-4 min-h-[300px]">
        <div className="flex-[1.5] bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col p-6">
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-white/5 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 shadow-sm">
              <span className="text-[10px] font-black text-slate-400 uppercase mr-2">Status</span>
              <span className="text-sm font-mono font-bold text-blue-400 uppercase">{stage}</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            {/* Neutron */}
            {stage === 'firing' && (
              <motion.div 
                initial={{ x: -200 }}
                animate={{ x: -40 }}
                className="w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white] absolute"
              />
            )}

            {/* Nucleus */}
            {stage !== 'split' ? (
              <motion.div 
                animate={{ 
                  scale: stage === 'hit' ? [1, 1.2, 1] : 1,
                  backgroundColor: stage === 'hit' ? '#ef4444' : '#3b82f6'
                }}
                className="w-24 h-24 rounded-full flex items-center justify-center border-4 border-white/10"
              >
                <span className="text-white font-black">U-235</span>
              </motion.div>
            ) : (
              <div className="flex gap-12">
                <motion.div 
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: -40, opacity: 1 }}
                  className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white/10"
                >
                  <span className="text-white text-[10px] font-bold">Kr-92</span>
                </motion.div>
                <motion.div 
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: 40, opacity: 1 }}
                  className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white/10"
                >
                  <span className="text-white text-[10px] font-bold">Ba-141</span>
                </motion.div>
                {/* Released Neutrons */}
                {[1, 2, 3].map(i => (
                  <motion.div 
                    key={i}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: (i - 2) * 60, x: 100, opacity: 1 }}
                    className="w-3 h-3 bg-white rounded-full absolute"
                  />
                ))}
              </div>
            )}

            {/* Energy Burst */}
            {stage === 'split' && (
              <motion.div 
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                className="absolute w-20 h-20 bg-amber-400 rounded-full blur-xl"
              />
            )}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden min-h-[150px]">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'event', label: 'Event' },
              { key: 'energy', label: 'Energy' },
              { key: 'neutrons', label: 'Neutrons' }
            ]} 
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 flex justify-center gap-4 shadow-sm">
        <button 
          onClick={reset}
          className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all border border-slate-200"
        >
          <RotateCcw size={20} />
        </button>
        <button 
          onClick={fireNeutron}
          disabled={isFired}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50"
        >
          <Zap size={20} fill="currentColor" /> FIRE NEUTRON
        </button>
      </div>
    </div>
  );
};

// --- Smoke Detector Sim Engine ---
const SmokeDetectorSim = ({ setRecordedData }: any) => {
  const [smokeLevel, setSmokeLevel] = useState(0);
  const [current, setCurrent] = useState(100);
  const [alarm, setAlarm] = useState(false);
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);

  useEffect(() => {
    const newCurrent = 100 - smokeLevel * 0.8;
    setCurrent(Math.round(newCurrent));
    setAlarm(newCurrent < 40);
  }, [smokeLevel]);

  const recordData = () => {
    const newData = { smoke: `${smokeLevel}%`, current: `${current} mA`, status: alarm ? 'ALARM' : 'NORMAL' };
    setLocalRecordedData(prev => [...prev, newData]);
    setRecordedData((prev: any[]) => [...prev, newData]);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-1 flex-col lg:flex-row gap-4 min-h-[300px]">
        <div className="flex-[1.5] bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col p-6">
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <div className="bg-white/5 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 shadow-sm">
              <span className="text-[10px] font-black text-slate-400 uppercase mr-2">Current</span>
              <span className="text-sm font-mono font-bold text-blue-400">{current}mA</span>
            </div>
            {alarm && (
              <motion.div 
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="bg-red-500 text-white px-3 py-1.5 rounded-lg font-black text-[10px] flex items-center gap-1"
              >
                <Zap size={10} fill="currentColor" /> ALARM ACTIVE
              </motion.div>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            {/* Detector Chamber */}
            <div className="w-64 h-32 border-2 border-white/20 rounded-2xl relative bg-white/5 overflow-hidden">
              {/* Electrodes */}
              <div className="absolute top-0 inset-x-0 h-2 bg-slate-600" />
              <div className="absolute bottom-0 inset-x-0 h-2 bg-slate-600" />
              
              {/* Alpha Particles */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    y: [0, 120, 0],
                    opacity: smokeLevel > 50 ? 0.2 : 1
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1 + Math.random(),
                    delay: Math.random() * 2
                  }}
                  className="w-1 h-1 bg-amber-400 rounded-full absolute"
                  style={{ left: `${5 + i * 5}%`, top: '10%' }}
                />
              ))}

              {/* Smoke */}
              <motion.div 
                animate={{ opacity: smokeLevel / 100 }}
                className="absolute inset-0 bg-slate-500/60 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden min-h-[150px]">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'smoke', label: 'Smoke' },
              { key: 'current', label: 'Current' },
              { key: 'status', label: 'Status' }
            ]} 
          />
        </div>
      </div>

      <ControlPanel 
        isRunning={false}
        onStart={recordData}
        onReset={() => { setSmokeLevel(0); setLocalRecordedData([]); setRecordedData([]); }}
        startLabel="LOG DATA"
        sliders={[
          { label: 'Smoke Density', value: smokeLevel, min: 0, max: 100, step: 5, unit: '%', onChange: setSmokeLevel }
        ]}
      />
    </div>
  );
};

// --- Stellar Evolution ---
const StellarEvolution = ({ setRecordedData, config }: any) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const stages = config?.stages || ["Nebula", "Protostar", "Main Sequence", "Red Giant", "White Dwarf"];
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);

  const stageData: any = {
    "Nebula": { process: "Gravitational Collapse", pressure: "Gravity > Gas Pressure", color: "bg-purple-500/20", iconColor: "text-purple-400" },
    "Protostar": { process: "Heating & Compression", pressure: "Gravity >> Gas Pressure", color: "bg-orange-500/40", iconColor: "text-orange-400" },
    "Main Sequence": { process: "Hydrogen Fusion", pressure: "Gravity = Radiation Pressure", color: "bg-yellow-400", iconColor: "text-yellow-600" },
    "Red Giant": { process: "Helium Fusion / Expansion", pressure: "Radiation Pressure > Gravity", color: "bg-red-500", iconColor: "text-red-200" },
    "White Dwarf": { process: "Cooling Core", pressure: "Electron Degeneracy Pressure", color: "bg-blue-100", iconColor: "text-blue-400" }
  };

  const recordStage = () => {
    const stage = stages[currentStageIndex];
    const data = stageData[stage] || { process: "Unknown", pressure: "Unknown" };
    const newData = { stage, process: data.process, pressure: data.pressure };
    
    // Avoid duplicates
    if (!localRecordedData.find(d => d.stage === stage)) {
      setLocalRecordedData(prev => [...prev, newData]);
      setRecordedData((prev: any[]) => [...prev, newData]);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-1 flex-col lg:flex-row gap-4 min-h-[300px]">
        <div className="flex-[1.5] bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col p-6 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={stages[currentStageIndex]}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className={`relative rounded-full blur-xl transition-all duration-1000 ${stageData[stages[currentStageIndex]]?.color}`}
              style={{ 
                width: currentStageIndex === 3 ? '200px' : currentStageIndex === 4 ? '20px' : '100px',
                height: currentStageIndex === 3 ? '200px' : currentStageIndex === 4 ? '20px' : '100px',
                filter: 'blur(20px) brightness(1.2)'
              }}
            />
          </AnimatePresence>
          
          <div className="absolute bottom-10 text-center">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{stages[currentStageIndex]}</h3>
            <p className="text-slate-400 text-sm font-medium">{stageData[stages[currentStageIndex]]?.process}</p>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden min-h-[150px]">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'stage', label: 'Stage' },
              { key: 'process', label: 'Process' },
              { key: 'pressure', label: 'Pressure State' }
            ]} 
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {stages.map((s: string, i: number) => (
            <button
              key={s}
              onClick={() => setCurrentStageIndex(i)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                currentStageIndex === i 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => { setLocalRecordedData([]); setRecordedData([]); }}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all border border-slate-200"
            title="Reset Table"
          >
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={recordStage}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20 text-sm"
          >
            <TableIcon size={18} /> LOG STAGE
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Orbital Lab ---
const OrbitalLab = ({ setRecordedData, config }: any) => {
  const bodies = config?.bodies || [];
  const [selectedBody, setSelectedBody] = useState(bodies[0]?.name || "Earth");
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(prev => (prev + 2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const currentBody = bodies.find((b: any) => b.name === selectedBody) || bodies[0];
  
  const calculateSpeed = (r: number, T: number) => {
    // v = 2 * pi * r / T
    // r is in 10^6 km, T is in days
    // Speed in km/s
    const r_km = r * 1000000;
    const T_s = T * 24 * 3600;
    return (2 * Math.PI * r_km / T_s).toFixed(2);
  };

  const logData = () => {
    const speed = calculateSpeed(currentBody.r, currentBody.T);
    const newData = { 
      body: currentBody.name, 
      r: currentBody.r, 
      T: currentBody.T, 
      speed: currentBody.type === 'elliptical' ? 'Variable' : speed 
    };
    setLocalRecordedData(prev => [...prev, newData]);
    setRecordedData((prev: any[]) => [...prev, newData]);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-1 flex-col lg:flex-row gap-4 min-h-[300px]">
        <div className="flex-[1.5] bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
          <div className="w-10 h-10 bg-yellow-400 rounded-full blur-sm shadow-[0_0_20px_rgba(250,204,21,0.6)]" />
          
          <motion.div
            animate={{ rotate: angle }}
            transition={{ duration: 0 }}
            className="absolute"
            style={{ width: `${currentBody.r / 2}px`, height: `${currentBody.r / 2}px` }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className={`w-4 h-4 rounded-full ${currentBody.name === 'Comet' ? 'bg-blue-200' : 'bg-blue-500'} shadow-lg`} />
              {currentBody.name === 'Comet' && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-transparent to-blue-100/40 blur-sm -z-10" />
              )}
            </div>
            <div className="w-full h-full border border-white/10 rounded-full border-dashed" />
          </motion.div>

          <div className="absolute top-4 right-4 text-right">
            <div className="text-[10px] font-black text-slate-500 uppercase">Orbital Parameters</div>
            <div className="text-lg font-mono font-bold text-white">{currentBody.name}</div>
            <div className="text-xs text-slate-400">r = {currentBody.r} × 10⁶ km</div>
            <div className="text-xs text-slate-400">T = {currentBody.T} days</div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden min-h-[150px]">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'body', label: 'Body' },
              { key: 'r', label: 'Radius', unit: '10^6 km' },
              { key: 'T', label: 'Period', unit: 'days' },
              { key: 'speed', label: 'Speed', unit: 'km/s' }
            ]} 
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex gap-2">
          {bodies.map((b: any) => (
            <button
              key={b.name}
              onClick={() => setSelectedBody(b.name)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedBody === b.name 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => { setLocalRecordedData([]); setRecordedData([]); }}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all border border-slate-200"
            title="Reset Table"
          >
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={logData}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 text-sm"
          >
            <TableIcon size={18} /> CALCULATE SPEED
          </button>
        </div>
      </div>
    </div>
  );
};

// --- HR Diagram ---
const HRDiagram = ({ setRecordedData }: any) => {
  const [selectedStar, setSelectedStar] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);

  // Professional Star Data Set - Mapped to Inverted Temperature Scale
  // x: horizontal (Temperature - Hottest 0% on left, Coolest 100% on right)
  // y: vertical (Magnitude - Brightest/Negative 0% at top, Dimmest/Positive 100% at bottom)
  const stars = [
    { name: "Sun", temp: 5800, mag: "+4.8", x: 65, y: 55, color: "bg-yellow-400", class: "Main Sequence" },
    { name: "Betelgeuse", temp: 3500, mag: "-5.8", x: 88, y: 22, color: "bg-red-500", class: "Red Giant" },
    { name: "Sirius B", temp: 25000, mag: "+11.3", x: 15, y: 82, color: "bg-blue-200", class: "White Dwarf" },
    { name: "Rigel", temp: 12000, mag: "-7.0", x: 38, y: 15, color: "bg-blue-400", class: "Supergiant" },
    { name: "Proxima Centauri", temp: 3000, mag: "+15.5", x: 92, y: 92, color: "bg-orange-600", class: "Main Sequence" },
    { name: "Vega", temp: 9600, mag: "+0.6", x: 45, y: 40, color: "bg-white", class: "Main Sequence" }
  ];

  const handleRecord = () => {
    if (!selectedStar) return;
    const newEntry = {
      id: Date.now(),
      name: selectedStar.name,
      temp: selectedStar.temp + " K",
      mag: selectedStar.mag,
      type: selectedStar.class
    };
    setResults([newEntry, ...results]);
    setRecordedData((prev: any[]) => [newEntry, ...prev]);
  };

  return (
    <div className="h-full bg-[#020617] text-slate-200 p-4 font-sans overflow-hidden rounded-[2.5rem]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-6 h-full pb-2">
        
        {/* H-R Diagram Visualization Section */}
        <div className="col-span-12 lg:col-span-8 bg-[#0f172a] rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl flex flex-col h-full overflow-hidden">
          <header className="mb-6">
            <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">
              <Telescope size={14}/> <span>Astrophysics Lab • Activity 4</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight uppercase">H-R DIAGRAM MAPPING</h1>
          </header>

          {/* THE GRAPH AREA - FIXED COORDINATES & PADDING */}
          <div className="flex-1 bg-slate-950 rounded-3xl border border-slate-800 relative mb-6 shadow-inner flex items-center justify-center p-12">
            
            {/* Y-Axis Label (Pushed further left) */}
            <div className="absolute -left-20 top-1/2 -rotate-90 text-[10px] font-black text-blue-500 tracking-[0.2em] whitespace-nowrap uppercase opacity-80">
              ABSOLUTE MAGNITUDE (L)
            </div>

            {/* Y-Axis Values */}
            {[
              { val: "-10", top: "0%" },
              { val: "-5", top: "20%" },
              { val: "0", top: "40%" },
              { val: "+5", top: "60%" },
              { val: "+10", top: "80%" },
              { val: "+15", top: "100%" }
            ].map((tick) => (
              <div key={tick.val} className="absolute -left-10 text-[8px] font-bold text-slate-600 flex items-center gap-1" style={{ top: `calc(${tick.top} + 48px)`, transform: 'translateY(-50%)' }}>
                <span>{tick.val}</span>
                <div className="w-1 h-px bg-slate-800" />
              </div>
            ))}

            {/* X-Axis Label (Pushed lower with dedicated container) */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full text-center">
              <div className="text-[10px] font-black text-blue-500 tracking-[0.2em] uppercase">
                SURFACE TEMPERATURE (K)
              </div>
              <div className="text-[9px] text-slate-500 font-bold lowercase italic mt-0.5">
                ← hotter (blue) | cooler (red) →
              </div>
            </div>

            {/* X-Axis Values */}
            {[
              { val: "30,000", left: "0%" },
              { val: "20,000", left: "20%" },
              { val: "10,000", left: "40%" },
              { val: "6,000", left: "60%" },
              { val: "4,000", left: "80%" },
              { val: "2,500", left: "100%" }
            ].map((tick) => (
              <div key={tick.val} className="absolute -bottom-8 text-[8px] font-bold text-slate-600 flex flex-col items-center gap-0.5" style={{ left: `calc(${tick.left} + 48px)`, transform: 'translateX(-50%)' }}>
                <div className="w-px h-1 bg-slate-800" />
                <span>{tick.val}</span>
              </div>
            ))}

            {/* Internal Grid */}
            <div className="w-full h-full border-l-2 border-b-2 border-slate-700 relative">
              
              {/* Region Indicators - CORRECTED ROTATION FOR MAIN SEQUENCE */}
              <span className="absolute top-[40%] left-[30%] rotate-45 text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] pointer-events-none opacity-90">
                Main Sequence
              </span>
              <span className="absolute top-8 right-12 text-[12px] font-black text-slate-400 uppercase tracking-widest pointer-events-none opacity-90">
                Red Giants & Supergiants
              </span>
              <span className="absolute bottom-16 left-12 text-[12px] font-black text-slate-400 uppercase tracking-widest pointer-events-none opacity-90">
                White Dwarfs
              </span>

              {/* Interactive Stars */}
              {stars.map(star => (
                <button
                  key={star.name}
                  onClick={() => setSelectedStar(star)}
                  className={`absolute w-4 h-4 rounded-full transition-all duration-300 hover:scale-150 active:scale-95 shadow-lg ${star.color} ${selectedStar?.name === star.name ? 'ring-4 ring-white shadow-blue-500/50 scale-125 z-50' : 'z-10'}`}
                  style={{ left: `${star.x}%`, top: `${star.y}%` }}
                >
                  {selectedStar?.name === star.name && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black whitespace-nowrap shadow-2xl border-2 border-blue-500">
                      {star.name}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Controls - Separated from Axis labels */}
          <div className="flex gap-4 items-center bg-slate-900/30 p-4 rounded-3xl border border-slate-800/50">
            <div className="flex-1">
              <span className="text-[9px] font-black text-slate-500 uppercase block mb-0.5 tracking-tighter">Star Analysis Output</span>
              <p className="text-sm font-bold text-slate-300">
                {selectedStar ? `Analyzing ${selectedStar.name}: ${selectedStar.temp}K | Mag ${selectedStar.mag}` : "Select a star on the diagram."}
              </p>
            </div>
            <button 
              onClick={handleRecord}
              className="px-8 py-4 bg-white text-slate-950 font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-blue-50 active:scale-95 transition-all shadow-xl"
            >
              LOG RESULT
            </button>
            <button 
              onClick={() => {setResults([]); setSelectedStar(null); setRecordedData([]);}}
              className="p-4 bg-slate-800 rounded-2xl text-slate-500 hover:text-white transition-colors"
            >
              <RefreshCcw size={18}/>
            </button>
          </div>
        </div>

        {/* DATA LOGGING PANEL - OPTIMIZED COLUMN WIDTHS */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 h-full overflow-hidden">
          <div className="bg-white rounded-[2.5rem] shadow-2xl flex-1 flex flex-col overflow-hidden border border-slate-200">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="text-slate-900 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                <Database size={14} className="text-blue-600"/> OBSERVATION LOG
              </h3>
              <span className="text-[8px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase">Lab Data</span>
            </div>
            
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 sticky top-0 backdrop-blur-md">
                  <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="p-2 border-b w-[45%]">STAR / TYPE</th>
                    <th className="p-2 border-b w-[25%]">TEMP</th>
                    <th className="p-2 border-b w-[30%] text-right">MAG</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-slate-300 italic text-[10px] font-bold uppercase tracking-widest">
                        Waiting for data...
                      </td>
                    </tr>
                  ) : (
                    results.map(r => (
                      <tr key={r.id} className="animate-in slide-in-from-right-2 duration-300 hover:bg-blue-50/30">
                        <td className="p-2">
                          <span className="block font-black text-slate-800 text-[11px] tracking-tight">{r.name}</span>
                          <span className="text-[8px] font-bold text-slate-400 uppercase">{r.type}</span>
                        </td>
                        <td className="p-2 text-slate-500 font-bold text-[10px]">{r.temp}</td>
                        <td className="p-2 text-right font-black text-blue-600 text-base tabular-nums tracking-tighter">
                          {r.mag}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mastery Summary */}
          <div className="bg-blue-600 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden group shrink-0">
            <h4 className="font-black text-[10px] uppercase tracking-widest mb-1.5 flex items-center gap-2">
              <Info size={14}/> MASTERY NOTE
            </h4>
            <p className="text-blue-50 text-[12px] leading-snug font-bold uppercase tracking-tight relative z-10">
              The Absolute Magnitude scale is INVERTED: smaller numbers = MORE luminous. Temp is HOT (Left) to COOL (Right).
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Red-shift Simulation ---
const RedshiftSim = ({ setRecordedData, config }: any) => {
  const galaxies = config?.galaxies || [];
  const [selectedGalaxy, setSelectedGalaxy] = useState(galaxies[0]?.name || "");
  const [localRecordedData, setLocalRecordedData] = useState<any[]>([]);

  const currentGalaxy = galaxies.find((g: any) => g.name === selectedGalaxy) || galaxies[0];

  const logData = () => {
    const z = (currentGalaxy.velocity / 300000).toFixed(4); // z = v/c
    const newData = { 
      galaxy: currentGalaxy.name, 
      distance: currentGalaxy.distance, 
      velocity: currentGalaxy.velocity, 
      z: z 
    };
    if (!localRecordedData.find(d => d.galaxy === currentGalaxy.name)) {
      setLocalRecordedData(prev => [...prev, newData]);
      setRecordedData((prev: any[]) => [...prev, newData]);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex flex-1 flex-col lg:flex-row gap-4 min-h-[300px]">
        <div className="flex-[1.5] bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col p-8">
          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            {/* Spectrum Comparison */}
            <div className="w-full space-y-2">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reference Spectrum (Stationary)</div>
              <div className="h-8 w-full bg-gradient-to-r from-violet-500 via-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-lg relative">
                <div className="absolute left-[20%] top-0 bottom-0 w-0.5 bg-black/40" />
                <div className="absolute left-[40%] top-0 bottom-0 w-0.5 bg-black/40" />
                <div className="absolute left-[60%] top-0 bottom-0 w-0.5 bg-black/40" />
              </div>
            </div>

            <div className="w-full space-y-2">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Observed Spectrum ({currentGalaxy.name})</div>
              <motion.div 
                key={currentGalaxy.name}
                initial={{ x: 0 }}
                animate={{ x: (currentGalaxy.velocity / 35000) * 50 }} // Visual shift
                className="h-8 w-full bg-gradient-to-r from-violet-500 via-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-lg relative"
              >
                <div className="absolute left-[20%] top-0 bottom-0 w-0.5 bg-black/60" />
                <div className="absolute left-[40%] top-0 bottom-0 w-0.5 bg-black/60" />
                <div className="absolute left-[60%] top-0 bottom-0 w-0.5 bg-black/60" />
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 text-right">
            <div className="text-[10px] font-black text-slate-500 uppercase">Velocity Data</div>
            <div className="text-lg font-mono font-bold text-white">{currentGalaxy.velocity} km/s</div>
            <div className="text-xs text-slate-400">d = {currentGalaxy.distance} Mpc</div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-3 shadow-sm overflow-hidden min-h-[150px]">
          <SimpleTable 
            data={localRecordedData} 
            columns={[
              { key: 'galaxy', label: 'Galaxy' },
              { key: 'distance', label: 'Dist', unit: 'Mpc' },
              { key: 'velocity', label: 'Vel', unit: 'km/s' },
              { key: 'z', label: 'Red-shift' }
            ]} 
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex gap-2">
          {galaxies.map((g: any) => (
            <button
              key={g.name}
              onClick={() => setSelectedGalaxy(g.name)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedGalaxy === g.name 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => { setLocalRecordedData([]); setRecordedData([]); }}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all border border-slate-200"
            title="Reset Table"
          >
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={logData}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-red-600/20 text-sm"
          >
            <TableIcon size={18} /> MEASURE RED-SHIFT
          </button>
        </div>
      </div>
    </div>
  );
};

export const SimulationCanvas: React.FC<SimulationProps> = ({ type, config, simType }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [recordedData, setRecordedData] = useState<any[]>([]);
  const [timer, setTimer] = useState(0);

  // Physics Time Scale: 0.5 means 1s wall clock = 0.5s physics time
  const TIME_SCALE = 0.5;

  const renderSimulation = () => {
    const props = { isRunning, setIsRunning, recordedData, setRecordedData, timer, setTimer, TIME_SCALE, config };
    const activeType = simType || type;
    switch (activeType) {
      case 'trolleyRamp': return <TrolleyRamp {...props} />;
      case 'springStretch': return <SpringStretch {...props} />;
      case 'fallingCases': return <FallingCases {...props} />;
      case 'centerGravity': return <CenterGravity {...props} />;
      case 'ivTracer': return <IVTracer {...props} />;
      case 'lightSensor': return <LightSensor {...props} />;
      case 'thermalSensor': return <ThermalSensor {...props} />;
      case 'refractionBox': return <RefractionBox {...props} />;
      case 'semiCircleRefraction': return <SemiCircleRefraction {...props} />;
      case 'echoTimer': return <EchoTimer {...props} />;
      case 'rippleTank': return <RippleTank {...props} />;
      case 'insulationLab': return <InsulationLab {...props} />;
      case 'leslieCube': return <LeslieCube {...props} />;
      case 'shcLab': return <SHCLab {...props} />;
      case 'convectionBeaker': return <ConvectionBeaker {...props} />;
      case 'densityTank': return <DensityTank {...props} />;
      case 'boylesPiston': return <BoylesPiston {...props} />;
      case 'pressureKelvin': return <PressureKelvin {...props} />;
      case 'electromagnetLab': return <ElectromagnetLab {...props} />;
      case 'motorForce': return <MotorForce {...props} />;
      case 'inductionLab': return <InductionLab {...props} />;
      case 'transformerSim': return <TransformerSim {...props} />;
      case 'radioactivityLab': return <RadioactivityLab {...props} />;
      case 'halfLifeSim': return <HalfLifeSim {...props} />;
      case 'fissionSim': return <FissionSim {...props} />;
      case 'smokeDetectorSim': return <SmokeDetectorSim {...props} />;
      case 'stellarEvolution': return <StellarEvolution {...props} />;
      case 'orbitalLab': return <OrbitalLab {...props} />;
      case 'hrDiagram': return <HRDiagram {...props} />;
      case 'redshiftSim': return <RedshiftSim {...props} />;
      default: return <div className="p-8 text-center text-slate-400 italic">Simulation not found: {activeType}</div>;
    }
  };

  return (
    <div className="simulation-canvas-wrapper w-full max-w-5xl mx-auto p-4">
      {renderSimulation()}
    </div>
  );
};
