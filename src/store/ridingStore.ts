import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Riding {
  packMode: boolean;
  targetSpeed: number | null;
  rearDetection: boolean;
  destination: boolean;
  setPackMode: (mode: boolean) => void;
  setTargetSpeed: (speed: number) => void;
  setRearDetection: (mode: boolean) => void;
  setRiding: (mode: RidingProps) => void;
}

interface RidingProps {
  packMode: boolean;
  targetSpeed: number | null;
  rearDetection: boolean;
  destination: boolean;
}

export const useRidingStore = create<Riding>()(
  devtools((set) => ({
    packMode: false,
    targetSpeed: 0,
    rearDetection: false,
    destination: false,
    setPackMode: (mode: boolean) => {
      set(() => ({
        packMode: mode,
      }));
    },
    setTargetSpeed: (speed: number) => {
      set(() => ({
        targetSpeed: speed,
      }));
    },
    setRearDetection: (mode: boolean) => {
      set(() => ({
        rearDetection: mode,
      }));
    },
    setRiding: (mode: RidingProps) => {
      set(() => ({
        packMode: mode.packMode,
        targetSpeed: mode.targetSpeed,
        rearDetection: mode.rearDetection,
        destination: mode.destination,
      }));
    },
  }))
);
