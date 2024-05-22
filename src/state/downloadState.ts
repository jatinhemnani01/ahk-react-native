import { create } from "zustand";

interface downloadInt {
  download: string;
}

const downloadState = create<downloadInt>((set) => ({
  download: "https://ahkaraoke.vercel.app/#",
}));

export default downloadState;
