// src/store/userStore.ts
import { create } from 'zustand';

interface Modal {
  alertModal: boolean;
  setAlertModal: (state: boolean) => void;
}

export const useModalStore = create<Modal>((set) => ({
  alertModal: false,
  setAlertModal: (state: boolean) => {
    set(() => ({
      alertModal: state,
    }));
  },
}));
