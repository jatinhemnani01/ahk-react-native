import { create } from "zustand";

interface baseUrlInt {
  baseURL: string;
}

const BASE_URL = create<baseUrlInt>((set) => ({
  baseURL: "",
}));

// const BASE_URL = "http://192.168.29.87:5000";
// const BASE_URL = getBaseURL();

export default BASE_URL;
