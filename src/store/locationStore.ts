import { create } from 'zustand';

interface Location {
  latitude: number;
  longitude: number;
  speed: number;
  maxSpeed: number;
  setMaxSpeed: (speed: number) => void;
  setLocation: (loc: locationProps) => void;
}

interface locationProps {
  latitude: number;
  longitude: number;
  speed: number;
}

export const useLocationStore = create<Location>((set) => ({
  latitude: 37.28446289,
  longitude: 127.04426351,
  speed: 0,
  maxSpeed: 0,
  setLocation: (loc: locationProps) => {
    set(() => ({
      longitude: loc.longitude,
      latitude: loc.latitude,
      speed: loc.speed,
    }));
  },
  setMaxSpeed: (speed: number) => {
    set((state) => ({
      maxSpeed: state.maxSpeed < speed ? speed : state.maxSpeed,
    }));
  },
}));
