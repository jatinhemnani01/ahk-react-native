import { View, Text } from "react-native";
import React from "react";
import { useGlobalSearchParams } from "expo-router";

export default function Video() {
  const params = useGlobalSearchParams();
  const { id } = params;
  return (
    <View>
      <Text>video {id}</Text>
    </View>
  );
}
