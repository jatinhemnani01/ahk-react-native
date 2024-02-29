import { View, Text } from "react-native";
import React from "react";
import getLikedList from "../../src/storage/getLikedList";
import { Button } from "@rneui/base";
import { useLikedSongsList } from "../../src/state/likedSongsList";
import { FlashList } from "@shopify/flash-list";
import { KaraokeListItem } from "../../src/types/KaraokeListItemType";
import FavKaraokeTile from "../../src/components/favourite/FavKaraokeTile";

export default function Favourite() {
  const likedSongs = useLikedSongsList((state) => state.likedSongs);

  // const [likedSongs, setLikedSongs] = React.useState(
  //   getLikedList().then((data) => data)
  // );

  const RenderKaraokeList = ({ item }: { item: any }) => {
    return <FavKaraokeTile title={item?.title} kid={item?.kid} />;
  };

  return (
    <View style={{ height: "100%" }}>
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

      <FlashList
        estimatedItemSize={170}
        renderItem={RenderKaraokeList}
        data={likedSongs}
      />
    </View>
  );
}
