import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  count: number;
  inc: (clicks: number) => void;
};

export const useClickStore = create<Store>()(
  persist(
    (set) => ({
      count: 0,
      inc: (clicks) => set(() => ({ count: clicks })),
    }),
    { name: "click-store" }
  )
);
