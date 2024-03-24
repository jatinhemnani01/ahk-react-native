import { View, Text } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import React from "react";
import forAllState from "../state/forAllState";
import isProStore from "../state/isPro";

export default function BannerAdComp() {
  const isPro = isProStore((state) => state.isPro);
  const forAll = forAllState((state) => state.forAll);

  const Ad = () => {
    if (isPro) return null;
    if (!forAll) return null;

    return (
      <BannerAd
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        unitId={"ca-app-pub-5153786927158690/1601135861"}
      />
    );
  };

  return (
    <View>
      <Ad />
    </View>
  );
}
