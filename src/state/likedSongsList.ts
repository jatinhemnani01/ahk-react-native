import { create } from "zustand";
import getLikedList from "../storage/getLikedList";

type LikedSongsList = {
  likedSongs: string[];
  addLikedSong: (song: string) => void;
  removeLikedSong: (song: string) => void;
};

export const useLikedSongsList = create<LikedSongsList>((set) => ({
  likedSongs: [],
  addLikedSong: (song) =>
    set((state) => ({ likedSongs: [...state.likedSongs, song] })),
  removeLikedSong: (song) =>
    set((state) => ({
      likedSongs: state.likedSongs.filter((s) => s !== song),
    })),
}));

(async () => {
  const data = await getLikedList();
  useLikedSongsList.setState({ likedSongs: data });
})();
