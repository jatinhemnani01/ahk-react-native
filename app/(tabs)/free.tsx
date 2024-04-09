import { View } from "react-native";
import { Text } from "@rneui/base";
import React, { useEffect } from "react";
import tw from "twrnc";
import FreeKaraokeList from "../../src/components/free/FreeKaraokeList";
import analytics from "@react-native-firebase/analytics";

export default function Popular() {
  useEffect(() => {
    analytics().logScreenView({
      screen_name: "Free Karaoke",
      screen_class: "FreeKaraoke",
    });
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <View style={tw`flex justify-center items-center m-2`}>
        <Text style={tw`text-xl text-gray-500 font-bold`}>Free Karaoke🔥</Text>
      </View>
      <FreeKaraokeList />
    </View>
  );
}
