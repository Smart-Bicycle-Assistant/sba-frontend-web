// src/store/userStore.ts

import { create } from "zustand";

interface User {
  id: string;
  email: string;
  nickname: string;
  jwt: string;
  setUser: (user: userProps) => void;
}

export const useUser = create<User>((set) => ({
  id: "",
  email: "",
  nickname: "",
  jwt: "",
  setUser: (user: userProps) => {
    set(() => ({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      jwt: user.jwt,
    }));
  },
}));

interface userProps {
  id: string;
  email: string;
  nickname: string;
  jwt: string;
}

interface Location {
  latitude: number;
  longitude: number;
  speed: number;
  setLocation: (loc: locationProps) => void;
}

interface locationProps {
  latitude: number;
  longitude: number;
  speed: number;
}

export const useUserLocation = create<Location>((set) => ({
  latitude: 37.28446289,
  longitude: 127.04426351,
  speed: 0,
  setLocation: (loc: locationProps) => {
    set(() => ({
      longitude: loc.longitude,
      latitude: loc.latitude,
      speed: loc.speed,
    }));
  },
}));

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
}

export const useRiding = create<Riding>((set) => ({
  packMode: false,
  targetSpeed: 0,
  rearDetection: false,
  setRiding: (mode: RidingProps) => {
    set(() => ({
      packMode: mode.packMode,
      targetSpeed: mode.targetSpeed,
      rearDetection: mode.rearDetection,
    }));
  },
}));
