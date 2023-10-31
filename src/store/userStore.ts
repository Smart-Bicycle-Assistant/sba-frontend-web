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

export const useLocation = create<Location>((set) => ({
  latitude: 37.785634,
  longitude: -122.184,
  speed: 1,
  setLocation: (loc: locationProps) => {
    set(() => ({
      longitude: loc.longitude,
      latitude: loc.latitude,
      speed: loc.speed,
    }));
  },
}));
