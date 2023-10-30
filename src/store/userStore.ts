// src/store/userStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserProps {
  id: string;
  email: string;
  nickname: string;
}

interface UserActions extends UserProps {
  setUser: (user: UserProps) => void;
}

export const useUserStore = create<UserActions>()(
  devtools((set) => ({
    id: '',
    email: '',
    nickname: '',
    setUser: (user: UserProps) => {
      set(() => ({
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      }));
    },
  }))
);

interface Location {
  latitude: number | null;
  longitude: number | null;
  setLocation: (loc: locationProps) => void;
}

interface locationProps {
  latitude: number;
  longitude: number;
}

export const useLocationStore = create<Location>((set) => ({
  latitude: null,
  longitude: null,
  setLocation: (loc: locationProps) => {
    set(() => ({
      longitude: loc.longitude,
      latitude: loc.latitude,
    }));
  },
}));
