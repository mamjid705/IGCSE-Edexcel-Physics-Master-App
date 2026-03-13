export interface Question {
  q: string;
  options: string[];
  correct: number;
}

export interface StructuredQuestion {
  marks: number;
  q: string;
  a: string;
}

export interface GraphPoint {
  x: number;
  y: number;
}

export interface StrategistQuestion {
  id: number;
  topic: string;
  type?: string;
  drawType?: string;
  simType?: string;
  config?: any;
  circuitType?: 'series' | 'parallel';
  question: string;
  image?: string;
  graphData?: GraphPoint[];
  energyData?: { useful: number; wasted: number };
  usefulEnergy?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  markScheme: string[];
  hint: string;
}

export interface Chapter {
  id: number;
  name: string;
  icon: string;
}

export type ViewType = 'dashboard' | 'foundation' | 'builder' | 'strategist' | 'master';

export interface AppState {
  xp: number;
  streak: number;
  isPremium: boolean;
  history: Record<number, boolean>;
}
