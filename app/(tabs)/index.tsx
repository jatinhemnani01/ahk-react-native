import { Pressable, View, Text, ScrollView, Button } from "react-native";
import KaraokeTile from "../../src/components/common/KaraokeTile";
import tw from "twrnc";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import isProStore from "../../src/state/isPro";
import useFetch from "../../src/hooks/useFetch";
import { FlashList } from "@shopify/flash-list";
import BASE_URL from "../../src/constants/base_url";
import KaraokeList from "../../src/components/home/KaraokeList";
export default function AppLayout() {
  const isPro = isProStore((state) => state.isPro);
  const { data, error, isLoading, setData } = useFetch(
    `${BASE_URL}/v2/all?page=1&limit=10`
  );

  return (
    <>
      <StatusBar style="light" />
      <KaraokeList />
      {/* <ScrollView>
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
          <KaraokeList />
      </ScrollView> */}
    </>
  );
}
