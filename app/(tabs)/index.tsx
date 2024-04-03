import { Pressable, View, Text } from "react-native";
import tw from "twrnc";
import { router } from "expo-router";
import isProStore from "../../src/state/isPro";
import KaraokeList from "../../src/components/home/KaraokeList";
import BASE_URL from "../../src/constants/base_url";
import BannerAdComp from "../../src/ads/BannerAdComp";

export default function Home() {
  const isPro = isProStore((state) => state.isPro);
  const baseURL = BASE_URL((state) => state.baseURL);

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
