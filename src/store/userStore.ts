// src/store/userStore.ts

import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  nickname: string;
  jwt: string;
  setUser: (user: userProps) => void;
}

export const useUser = create<User>((set) => ({
  id: '',
  email: '',
  nickname: '',
  jwt: '',
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
