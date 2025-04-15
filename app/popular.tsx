import { View } from "react-native";
import { Text } from "@rneui/base";
import React, { useEffect } from "react";
import PopularKaraokeList from "../src/components/popular/PopularKaraokeList";
import tw from "twrnc";
import analytics from "@react-native-firebase/analytics";

export default function Popular() {
  useEffect(() => {
    analytics().logScreenView({
      screen_name: "Popular Karaoke",
      screen_class: "Popular",
    });
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <View style={tw`flex justify-center items-center m-2`}>
        <Text style={tw`text-xl text-gray-500 font-bold`}>
          Popular Karaoke🔥
        </Text>
      </View>
      <PopularKaraokeList />
    </View>
  );
}
