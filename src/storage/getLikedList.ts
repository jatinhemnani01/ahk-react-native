import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getLikedList() {
  const likedSongs = await AsyncStorage.getItem("liked");
  if (likedSongs) {
    return JSON.parse(likedSongs);
  } else {
    return [];
  }
}
