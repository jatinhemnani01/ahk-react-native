import React from "react";
import { Avatar, Icon, ListItem } from "@rneui/base";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import kidExistsOnStorage from "../../storage/kidExistsOnStorage";
import { useLikedSongsList } from "../../state/likedSongsList";
import FadeAnimation from "./FadeAnimation";
import forAllState from "../../state/forAllState";
import isProStore from "../../state/isPro";

interface Props {
  kid: number;
  title: string;
  freeScreen?: boolean;
}

export default function KaraokeTile({ kid, title, freeScreen }: Props) {
  const isPro = isProStore((state) => state.isPro);
  const forAll = forAllState((state) => state.forAll);

  const [liked, setLiked] = React.useState(false);
  const addLikedSong = useLikedSongsList((state) => state.addLikedSong);

  async function handleLike() {
    if ((await AsyncStorage.getItem("liked")) === null) {
      await AsyncStorage.setItem("liked", JSON.stringify([]));
    }
    const kidExists = await kidExistsOnStorage(kid);
    const likedSongs = await AsyncStorage.getItem("liked");

    setLiked((prev) => !prev);
    try {
      const data = {
        kid: kid,
        title: title,
      };

      if (await kidExistsOnStorage(kid)) {
        setLiked(true);
      } else {
        const likedSongs = await AsyncStorage.getItem("liked");
        if (likedSongs) {
          const parsedData = JSON.parse(likedSongs);
          parsedData.unshift(data);
          await AsyncStorage.setItem("liked", JSON.stringify(parsedData));
          addLikedSong(title, kid);
          return;
        }
      }
    } catch (error) {}
  }

  function changeScreen(name: string) {
    if (isPro) {
      router.navigate(name);
    } else if (forAll) {
      router.navigate(name);
    } else if (freeScreen) {
      router.navigate(name);
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
          <Avatar
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
          />
          <ListItem.Content>
            <ListItem.Title style={{ textTransform: "capitalize" }}>
              {title}
            </ListItem.Title>
          </ListItem.Content>
          {/* <ListItem.Chevron size={25} color={"black"} /> */}
          <Icon
            name={"heart"}
            onPress={handleLike}
            type={liked ? "font-awesome" : "feather"}
            color={liked ? "red" : "black"}
          />
        </ListItem>
      </FadeAnimation>
    </>
  );
}
