import { View, Text } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Favourite() {
  async function getLikedSongs() {
    const data = await AsyncStorage.getItem("liked");
    console.log(data);
  }

  useEffect(() => {
    getLikedSongs();
  }, []);

  return (
    <View>
      <Text>favourite</Text>
    </View>
  );
}
