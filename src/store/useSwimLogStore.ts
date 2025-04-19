// 수영일기 작성 페이지

import { create } from 'zustand';

interface SwimLog {
  date: string;
  time: { start: number; end: number };
  pool: string;
  lane: number;
  intensity: string;
  distance: number;
  heartRate?: { avg?: number; max?: number };
  pace?: { minute?: number; seconds?: number };
  calories?: number;
}

// (Todo)
interface SwimLogStore {
  log: SwimLog;
  setLog: (log: Partial<SwimLog>) => void;
}

export const useSwimLogStore = create<SwimLogStore>((set) => ({
  log: {
    date: '',
    time: { start: 0, end: 0 },
    pool: '',
    lane: 25,
    intensity: '',
    distance: 0,
    heartRate: { avg: 0, max: 0 },
    pace: { minute: 0, seconds: 0 },
    calories: 0,
  },
  setLog: (log) =>
    set((state) => ({
      log: { ...state.log, ...log },
    })),
}));
