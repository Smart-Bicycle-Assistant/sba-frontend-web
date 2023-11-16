import { create } from 'zustand';

interface Token {
  jwt: string;
  setToken: (token: string) => void;
}

export const useToken = create<Token>((set) => ({
  jwt: '',
  setToken: (token: string) => set(() => ({ jwt: token })),
}));
