import { create } from "zustand";

interface isProStoreInt {
  isPro: boolean;
  toPro: () => void;
  toFree: () => void;
}

const isProStore = create<isProStoreInt>((set) => ({
  isPro: false,
  toPro: () => set({ isPro: true }),
  toFree: () => set({ isPro: false }),
}));

export default isProStore;
