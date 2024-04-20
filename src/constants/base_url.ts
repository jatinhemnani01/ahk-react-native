import { create } from "zustand";

interface baseUrlInt {
  baseURL: string;
}

const BASE_URL = create<baseUrlInt>((set) => ({
  // baseURL: "http://192.168.29.87:5000",
  baseURL:
    "https://thf4yzhfcjpde5ausggkraw26e0pnnzd.lambda-url.ap-south-1.on.aws",
}));

// const BASE_URL = "http://192.168.29.87:5000";
// const BASE_URL = getBaseURL();

export default BASE_URL;
