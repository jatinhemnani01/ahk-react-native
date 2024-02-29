import { View, Text } from "react-native";
import React from "react";
import getLikedList from "../../src/storage/getLikedList";
import { Button } from "@rneui/base";
import { useLikedSongsList } from "../../src/state/likedSongsList";

export default function Favourite() {
  const likedSongs = useLikedSongsList((state) => state.likedSongs);

  // const [likedSongs, setLikedSongs] = React.useState(
  //   getLikedList().then((data) => data)
  // );

  return (
    <View>
      <Text>{JSON.stringify(likedSongs)}</Text>
      {/* <Button
        onPress={() => {
          getLikedList().then((data) => {
            setLikedSongs(data);
          });
        }}
      >
        Remove
      </Button> */}
    </View>
  );
}
