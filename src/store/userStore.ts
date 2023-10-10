// src/store/userStore.ts

import create from "zustand";

interface User {
  id: string;
  email: string;
  nickname: string;
  setUser: (user: userProps) => void;
}

export const useUser = create<User>((set) => ({
  id: "",
  email: "",
  nickname: "",
  setUser: (user: userProps) => {
    set((state) => ({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    }));
  },
}));

interface userProps {
  id: string;
  email: string;
  nickname: string;
}

interface Location {
  latitude: number | null;
  longitude: number | null;
  setLocation: (loc: locationProps) => void;
}

interface locationProps {
  latitude: number;
  longitude: number;
}

export const useLocation = create<Location>((set) => ({
  latitude: null,
  longitude: null,
  setLocation: (loc: locationProps) => {
    set((state) => ({
      longitude: loc.longitude,
      latitude: loc.latitude,
    }));
  },
}));
