import { create } from "zustand";
import getLikedList from "../storage/getLikedList";

type LikedSongsList = {
  likedSongs: any[];
  addLikedSong: (title: string, kid: number) => void;
  removeLikedSong: (song: string) => void;
};

export const useLikedSongsList = create<LikedSongsList>((set) => ({
  likedSongs: [],
  addLikedSong: (title, kid) => {
    set((state) => ({ likedSongs: [{ title, kid }, ...state.likedSongs] }));
  },
  removeLikedSong: (song) =>
    set((state) => ({
      likedSongs: state.likedSongs.filter((s) => s !== song),
    })),
}));

(async () => {
  const data = await getLikedList();
  useLikedSongsList.setState({ likedSongs: data });
})();
