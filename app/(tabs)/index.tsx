import { Pressable, View, Text, ScrollView } from "react-native";
import KaraokeTile from "../../src/components/common/KaraokeTile";
import tw from "twrnc";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import isProStore from "../../src/state/isPro";
export default function AppLayout() {
  const isPro = isProStore((state) => state.isPro);

  return (
    <>
      <StatusBar style="light" />
      <ScrollView>
        <View>
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
        </View>
        <KaraokeTile />
        <KaraokeTile />
        <KaraokeTile />
        <KaraokeTile />
        <KaraokeTile />
        <KaraokeTile />
        <KaraokeTile />
        <KaraokeTile />
        <KaraokeTile />
        <KaraokeTile />
        <KaraokeTile />
        <KaraokeTile />
        <KaraokeTile />
      </ScrollView>
    </>
  );
}
