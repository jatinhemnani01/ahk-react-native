import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function kidExistsOnStorage(kid: number) {
  const likedSongs = await AsyncStorage.getItem("liked");
  if (likedSongs) {
    const data = JSON.parse(likedSongs);
    return data.some((song: { kid: number }) => song.kid === kid);
  }
  return false;
}
