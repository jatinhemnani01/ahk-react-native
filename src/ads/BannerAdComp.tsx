import { View, Text } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import React from "react";

export default function BannerAdComp() {
  return (
    <View>
      <BannerAd size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} unitId={TestIds.BANNER} />
    </View>
  );
}
