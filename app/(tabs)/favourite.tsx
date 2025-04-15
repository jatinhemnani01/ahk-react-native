import { View } from "react-native";
import React, { useEffect } from "react";
import { useLikedSongsList } from "../../src/state/likedSongsList";
import { FlashList } from "@shopify/flash-list";
import FavKaraokeTile from "../../src/components/favourite/FavKaraokeTile";
import analytics from "@react-native-firebase/analytics";

export default function Favourite() {
  const likedSongs = useLikedSongsList((state) => state.likedSongs);

  // const [likedSongs, setLikedSongs] = React.useState(
  //   getLikedList().then((data) => data)
  // );

  const RenderKaraokeList = ({ item }: { item: any }) => {
    return <FavKaraokeTile title={item?.title} kid={item?.kid} />;
  };

  useEffect(() => {
    analytics().logScreenView({
      screen_name: "Favourite",
      screen_class: "Favourite",
    });
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <FlashList
        estimatedItemSize={170}
        renderItem={RenderKaraokeList}
        data={likedSongs}
      />
    </View>
  );
}
