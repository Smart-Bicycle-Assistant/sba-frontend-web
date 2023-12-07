import { create } from 'zustand';

interface Modal {
  alertModal: boolean;
  confirmModal: boolean;
  setAlertModal: (state: boolean) => void;
  setConfirmModal: (state: boolean) => void;
}

export const useModalStore = create<Modal>((set) => ({
  alertModal: false,
  confirmModal: false,
  setAlertModal: (state: boolean) => {
    set(() => ({
      alertModal: state,
    }));
  },
  setConfirmModal: (state: boolean) => {
    set(() => ({
      confirmModal: state,
    }));
  },
}));
