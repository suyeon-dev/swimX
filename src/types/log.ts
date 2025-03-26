export interface SwimLog {
  date: string;
  time: { start: number; end: number };
  pool: string;
  lane: number;
  intensity: string;
  distance: number;
  heartRate: { avg: number; max: number };
  pace: { minute: number; seconds: number };
  calories: number;
}
