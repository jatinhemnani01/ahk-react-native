import AsyncStorage from "@react-native-async-storage/async-storage";

export default function removeLiked(kid: number) {
  return new Promise(async (resolve, reject) => {
    try {
      const likedSongs = await AsyncStorage.getItem("liked");
      if (likedSongs) {
        const parsedData = JSON.parse(likedSongs);
        const newData = parsedData.filter((item: any) => item.kid !== kid);
        await AsyncStorage.setItem("liked", JSON.stringify(newData));
        resolve(true);
      }
    } catch (error) {
      reject(false);
    }
  });
}
