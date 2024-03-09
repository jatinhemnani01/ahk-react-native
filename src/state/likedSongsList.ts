import { create } from "zustand";
import getLikedList from "../storage/getLikedList";

type LikedSongsList = {
  likedSongs: any[];
  addLikedSong: (title: string, kid: number) => void;
  removeLikedSong: (kid: number) => void;
};

export const useLikedSongsList = create<LikedSongsList>((set) => ({
  likedSongs: [],
  addLikedSong: (title, kid) => {
    set((state) => ({ likedSongs: [{ title, kid }, ...state.likedSongs] }));
  },
  removeLikedSong: (kid) => {
    set((state) => ({
      likedSongs: state.likedSongs.filter((song) => {
        return song.kid !== kid;
      }),
    }));
  },
}));

(async () => {
  const data = await getLikedList();
  useLikedSongsList.setState({ likedSongs: data });
})();
