import { create } from "zustand";

interface Riding {
  packMode: boolean;
  targetSpeed: number | null;
  rearDetection: boolean;
  setRiding: (mode: RidingProps) => void;
}

interface RidingProps {
  packMode: boolean;
  targetSpeed: number | null;
  rearDetection: boolean;
  destination: boolean;
}

export const useRidingStore = create<Riding>((set) => ({
  packMode: false,
  targetSpeed: 0,
  rearDetection: false,
  setRiding: (mode: RidingProps) => {
    set(() => ({
      packMode: mode.packMode,
      targetSpeed: mode.targetSpeed,
      rearDetection: mode.rearDetection,
      destination: mode.destination,
    }));
  },
}));
