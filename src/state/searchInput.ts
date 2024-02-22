import { create } from "zustand";

interface searchInputInterface {
  value: string;
  updateSearch: (search: string) => void;
}

const searchInput = create<searchInputInterface>((set) => ({
  value: "",
  updateSearch: (search) => set({ value: search }),
}));

export default searchInput;
