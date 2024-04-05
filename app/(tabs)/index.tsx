import { Pressable, View, Text } from "react-native";
import tw from "twrnc";
import { router } from "expo-router";
import KaraokeList from "../../src/components/home/KaraokeList";
import BASE_URL from "../../src/constants/base_url";
import BannerAdComp from "../../src/ads/BannerAdComp";
import inAppMessaging from "@react-native-firebase/in-app-messaging";
import { useEffect } from "react";

export default function Home() {
  const baseURL = BASE_URL((state) => state.baseURL);

  async function loadInAppMessaging() {
    await inAppMessaging().setMessagesDisplaySuppressed(false);
  }

  useEffect(() => {
    loadInAppMessaging();
  }, []);

  return (
    <>
      <View style={{ height: "100%" }}>
        <BannerAdComp />
        <Pressable
          onPress={() => router.navigate("/popular")}
          style={tw`flex flex-row justify-center m-2`}
        >
          <Text style={tw`text-lg text-blue-500 font-semibold`}>
            Click Here To See Popular Karaoke
          </Text>
        </Pressable>

        {baseURL === "" ? null : <KaraokeList />}
      </View>
    </>
  );
}
