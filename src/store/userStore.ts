// src/store/userStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  nickname: string;
  isLoggedIn: boolean;
  setUser: (user: userProps) => void;
  setLoggedIn: () => void;
  setLoggedOut: () => void;
}

export const useUser = create<User>((set) => ({
  id: '',
  email: '',
  nickname: '',
  isLoggedIn: false,
  setUser: (user: userProps) => {
    set(() => ({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    }));
  },
  setLoggedIn: () => set(() => ({ isLoggedIn: true })),
  setLoggedOut: () => set(() => ({ isLoggedIn: false })),
}));

interface userProps {
  id: string;
  email: string;
  nickname: string;
}

interface MainBike {
  main: number;
  setMain: (main: number) => void;
}

export const useMainBike = create<MainBike>()(
  devtools((set) => ({
    main: 0,
    setMain: (bicycleId: number) => {
      set(() => ({ main: bicycleId }));
    },
  }))
);
