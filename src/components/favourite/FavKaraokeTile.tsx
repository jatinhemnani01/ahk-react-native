import React from "react";
import { Avatar, Icon, ListItem } from "@rneui/base";
import { router } from "expo-router";
import removeLiked from "../../storage/removeLiked";
import { useLikedSongsList } from "../../state/likedSongsList";
import FadeAnimation from "../common/FadeAnimation";
import forAllState from "../../state/forAllState";
import isProStore from "../../state/isPro";
import imgUrlState from "../../state/imgUrlState";

interface Props {
  kid: number;
  title: string;
}

export default function FavKaraokeTile({ kid, title }: Props) {
  const isPro = isProStore((state) => state.isPro);
  const forAll = forAllState((state) => state.forAll);
  const imgUrl = imgUrlState((state) => state.url);

  const [liked, setLiked] = React.useState(false);
  const removeLikedSongs = useLikedSongsList((state) => state.removeLikedSong);

  async function handleLike() {
    setLiked((prev) => !prev);
    removeLiked(kid);
    removeLikedSongs(kid);
  }

  function changeScreen(name: string) {
    if (isPro) {
      router.navigate({ pathname: name, params: { kid: kid, title: title } });
    } else if (forAll) {
      router.navigate({ pathname: name, params: { kid: kid, title: title } });
    } else {
      router.navigate("/purchase");
    }
  }

  return (
    <>
      <FadeAnimation>
        <ListItem
          onPress={() => changeScreen("/video")}
          bottomDivider
          containerStyle={{ backgroundColor: "#ecf0f1" }}
        >
          <Avatar rounded source={{ uri: imgUrl }} />
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
      </FadeAnimation>
    </>
  );
}
