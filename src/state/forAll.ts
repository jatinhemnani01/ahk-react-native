import { create } from "zustand";
import { forAllRemoteConfig } from "../firebase/forAllRemoteConfig";

interface forAllStateInt {
  forAll: boolean | Promise<boolean>;
}

export const forAllState = create<forAllStateInt>((set) => ({
  forAll: forAllRemoteConfig
}));
