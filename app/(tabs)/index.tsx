import { Pressable, View, Text } from "react-native";
import tw from "twrnc";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import isProStore from "../../src/state/isPro";
import KaraokeList from "../../src/components/home/KaraokeList";

export default function Home() {
  const isPro = isProStore((state) => state.isPro);

  return (
    <>
      <StatusBar style="light" />
      <View style={{ height: "100%" }}>
        {!isPro && (
          <Pressable
            onPress={() => router.navigate("/free")}
            style={tw`flex flex-row justify-center m-2`}
          >
            <Text style={tw`text-lg text-blue-500 font-semibold`}>
              Explore Free Karaoke
            </Text>
          </Pressable>
        )}

        <KaraokeList />
      </View>
    </>
  );
}
