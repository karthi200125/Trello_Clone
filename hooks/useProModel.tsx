import { create } from 'zustand';

type ProModel = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useProModal = create<ProModel>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default useProModal;
