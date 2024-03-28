import { create } from "zustand";

interface imgUrlInt {
  url: string;
}

const imgUrlState = create<imgUrlInt>((set) => ({
  url: "https://ahkaraoke-admin.vercel.app/image.jpg",
}));

export default imgUrlState;
