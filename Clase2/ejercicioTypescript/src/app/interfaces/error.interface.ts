export interface ErrorPoint {
  id: number;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  errorType: string;
  description: string;
  line: number;
  file: string;
  resolved: boolean;
  x: number; // Para posición en la gráfica
  y: number; // Para posición en la gráfica
}

export interface ErrorTrajectory {
  errorId: number;
  points: ErrorPoint[];
  relationships: number[]; // IDs de errores relacionados
}

export interface ErrorVisualizationData {
  trajectories: ErrorTrajectory[];
  criticalPoints: ErrorPoint[];
  relationships: Array<{
    from: number;
    to: number;
    type: 'causes' | 'related' | 'blocks';
  }>;
}