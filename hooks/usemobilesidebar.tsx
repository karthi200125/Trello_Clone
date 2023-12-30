import { create } from 'zustand'

type MobileSiderbarStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const UseMobileSidebar = create<MobileSiderbarStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default UseMobileSidebar