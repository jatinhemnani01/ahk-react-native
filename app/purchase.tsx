import { View } from "react-native";
import { Button, Text } from "@rneui/base";
import React from "react";
import tw from "twrnc";
import { router } from "expo-router";

export default function Purchase() {
  return (
    <View style={tw`flex flex-1 justify-center items-center`}>
      <Text style={tw`text-sm font-bold`}>
        This Karaoke is only available for premium users.
      </Text>
      <Button
        title={"Buy Now"}
        type="clear"
        onPress={() => {
          router.navigate("/profile");
        }}
      />
    </View>
  );
}
