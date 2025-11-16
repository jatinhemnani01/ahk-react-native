import React from "react";
import { View, TouchableOpacity, Linking, Platform } from "react-native";
import { ListItem, Icon } from "@rneui/base";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import kidExistsOnStorage from "../../storage/kidExistsOnStorage";
import { useLikedSongsList } from "../../state/likedSongsList";
import FadeAnimation from "./FadeAnimation";
import forAllState from "../../state/forAllState";
import isProStore from "../../state/isPro";
import imgUrlState from "../../state/imgUrlState";
import downloadState from "../../state/downloadState";
import Toast from "react-native-toast-message";
import { Image } from "expo-image";
import tw from "twrnc";

interface Props {
  kid: number;
  title: string;
  freeScreen?: boolean;
}

const blurHash = "eSE^8V0_EdWU$l0_-DxHj[S11E-Dspj[R*}cEdNZays:NZoLoMj[ay";

export default function KaraokeTile({ kid, title, freeScreen }: Props) {
  const isPro = isProStore((state: any) => state.isPro);
  const forAll = forAllState((state: any) => state.forAll);
  const imgUrl = imgUrlState((state: any) => state.url);
  const download = downloadState((state: any) => state.download);
  const addLikedSong = useLikedSongsList((state: any) => state.addLikedSong);
  const isIos = Platform.OS === "ios";

  async function handleLike() {
    if ((await AsyncStorage.getItem("liked")) === null) {
      await AsyncStorage.setItem("liked", JSON.stringify([]));
    }

    try {
      const data = { kid, title };
      if (!(await kidExistsOnStorage(kid))) {
        const likedSongs = await AsyncStorage.getItem("liked");
        if (likedSongs) {
          const parsed = JSON.parse(likedSongs);
          parsed.unshift(data);
          await AsyncStorage.setItem("liked", JSON.stringify(parsed));
          addLikedSong(title, kid);
        }
      }

      Toast.show({
        type: "success",
        text1: "Added to Liked Songs 💖",
        position: "bottom",
        visibilityTime: 1500,
      });
    } catch (err) {
      console.log("Error liking song:", err);
    }
  }

  function changeScreen(name: string) {
    if (isPro || forAll || freeScreen) {
      router.navigate({ pathname: name, params: { kid, title } });
    } else {
      router.navigate("/purchase");
    }
  }

  function handleDownload() {
    Linking.openURL(`${download}/karaoke/${kid}`);
  }

  return (
    <FadeAnimation>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => changeScreen("/video-pip")}
        style={tw`mx-4 my-2`}
      >
        <ListItem
          containerStyle={[
            tw`bg-white rounded-2xl py-3 px-4`,
            {
              shadowColor: "#000",
              shadowOpacity: 0.12,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },
              elevation: 4,
            },
          ]}
        >
          {/* Left: Image */}
          <View
            style={[
              tw`items-center justify-center`,
              { width: 54, height: 54 },
            ]}
          >
            <Icon name="play" type="feather" size={28} color="blue" />
          </View>

          {/* Middle: Full title */}
          <ListItem.Content>
            <ListItem.Title
              style={tw`text-lg font-semibold text-gray-900 flex-wrap`}
            >
              {title}
            </ListItem.Title>
          </ListItem.Content>

          {/* Right: Icons */}
          <View style={tw`flex-row items-center`}>
            {!isIos && (
              <TouchableOpacity
                onPress={handleDownload}
                style={tw`mr-4 p-1.5 rounded-full bg-blue-50`}
              >
                <Icon
                  name="download"
                  type="feather"
                  color="#007AFF"
                  size={20}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={handleLike}
              style={tw`p-1.5 rounded-full bg-pink-50`}
            >
              <Icon name="heart" type="feather" color="#E63946" size={20} />
            </TouchableOpacity>
          </View>
        </ListItem>
      </TouchableOpacity>
    </FadeAnimation>
  );
}
