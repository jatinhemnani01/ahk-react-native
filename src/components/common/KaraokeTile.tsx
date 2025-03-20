import React from "react";
import { Avatar, Icon, ListItem } from "@rneui/base";
import { View, TouchableOpacity } from "react-native";
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
import { Linking, Platform } from "react-native";
import tw from 'twrnc'; // Make sure this import is correct for your project

interface Props {
  kid: number;
  title: string;
  freeScreen?: boolean;
}

export default function KaraokeTile({ kid, title, freeScreen }: Props) {
  const isPro = isProStore((state: any) => state.isPro);
  const forAll = forAllState((state: any) => state.forAll);
  const imgUrl = imgUrlState((state: any) => state.url);
  const download = downloadState((state: any) => state.download);
  const isIos = Platform.OS === "ios";

  const addLikedSong = useLikedSongsList((state: any) => state.addLikedSong);

  async function handleLike() {
    if ((await AsyncStorage.getItem("liked")) === null) {
      await AsyncStorage.setItem("liked", JSON.stringify([]));
    }

    try {
      const data = {
        kid: kid,
        title: title,
      };

      if (await kidExistsOnStorage(kid)) {
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
    } catch (error) {
    } finally {
      Toast.show({
        type: "success",
        text1: "Added To Liked Songs",
        position: "bottom",
        visibilityTime: 1500,
      });
    }
  }

  function changeScreen(name: string) {
    if (isPro) {
      router.navigate({ pathname: name, params: { kid: kid, title: title } });
    } else if (forAll) {
      router.navigate({ pathname: name, params: { kid: kid, title: title } });
    } else if (freeScreen) {
      router.navigate({ pathname: name, params: { kid: kid, title: title } });
    } else {
      router.navigate("/purchase");
    }
  }

  function handleDownload() {
    Linking.openURL(`${download}/karaoke/${kid}`);
  }

  return (
    <FadeAnimation>
      <TouchableOpacity onPress={() => changeScreen("/video")}>
        <ListItem containerStyle={tw`bg-white rounded-xl my-2 mx-4 py-3 px-4 shadow-md`}>
          <Avatar 
            rounded 
            source={{ uri: imgUrl }} 
            size="medium" 
            containerStyle={tw`border-2 border-blue-400`}
          />
          <ListItem.Content>
            <ListItem.Title style={tw`text-base font-bold text-gray-800 capitalize`}>
              {title}
            </ListItem.Title>
          </ListItem.Content>
          <View style={tw`flex-row items-center`}>
            {!isIos && (
              <TouchableOpacity onPress={handleDownload} style={tw`mr-4`}>
                <Icon
                  name="download"
                  type="feather"
                  color="#3498db"
                  size={22}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleLike}>
              <Icon
                name="heart"
                type="feather"
                color="#e74c3c"
                size={22}
              />
            </TouchableOpacity>
          </View>
        </ListItem>
      </TouchableOpacity>
    </FadeAnimation>
  );
}
