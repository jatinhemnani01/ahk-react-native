import React from "react";
import { Avatar, Icon, ListItem } from "@rneui/base";
import { router } from "expo-router";
import removeLiked from "../../storage/removeLiked";
import { useLikedSongsList } from "../../state/likedSongsList";

interface Props {
  kid: number;
  title: string;
}

export default function FavKaraokeTile({ kid, title }: Props) {
  const [liked, setLiked] = React.useState(false);
  const removeLikedSongs = useLikedSongsList((state) => state.removeLikedSong);

  async function handleLike() {
    setLiked((prev) => !prev);
    removeLiked(kid);
    removeLikedSongs(kid);
  }

  return (
    <>
      <ListItem
        onPress={() => router.navigate("/video")}
        bottomDivider
        containerStyle={{ backgroundColor: "#ecf0f1" }}
      >
        <Avatar
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
        />
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
        </ListItem.Content>
        <Icon
          name={"trash"}
          onPress={handleLike}
          type={"feather"}
          color={"black"}
        />
      </ListItem>
    </>
  );
}
