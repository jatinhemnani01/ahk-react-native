import { create } from "zustand";

interface forAllInt {
  forAll: boolean;
}

const forAllState = create<forAllInt>((set) => ({
  forAll: true,
}));

export default forAllState;
