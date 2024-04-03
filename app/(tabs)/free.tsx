import { View } from "react-native";
import { Text } from "@rneui/base";
import React from "react";
import tw from "twrnc";
import FreeKaraokeList from "../../src/components/free/FreeKaraokeList";

export default function Popular() {
  return (
    <View style={{ height: "100%" }}>
      <View style={tw`flex justify-center items-center m-2`}>
        <Text style={tw`text-xl text-gray-500 font-bold`}>Free Karaoke🔥</Text>
      </View>
      <FreeKaraokeList />
    </View>
  );
}
