import { View, Text, Platform } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import React from "react";
import forAllState from "../state/forAllState";
import isProStore from "../state/isPro";

function BannerAdComp() {
  const isPro = isProStore((state) => state.isPro);
  const forAll = forAllState((state) => state.forAll);
  const android = "ca-app-pub-5153786927158690/1601135861";
  const ios = "ca-app-pub-5153786927158690/4936385809";
  const adId = Platform.OS === "android" ? android : ios;

  const Ad = () => {
    if (isPro) return null;
    if (!forAll) return null;

    return (
      <BannerAd size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} unitId={adId} />
    );
  };

  return (
    <View>
      <Ad />
    </View>
  );
}

export default React.memo(BannerAdComp);
