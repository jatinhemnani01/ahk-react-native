import { create } from "zustand";

interface forAllInt {
  forAll: boolean;
}

const forAllState = create<forAllInt>((set) => ({
  forAll: false,
}));

export default forAllState;
