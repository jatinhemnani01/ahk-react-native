import { View } from "react-native";
import { Text } from "@rneui/base";
import React, { useEffect } from "react";
import tw from "twrnc";
import FreeKaraokeList from "../../src/components/free/FreeKaraokeList";
import analytics from "@react-native-firebase/analytics";
import isProStore from "../../src/state/isPro";
import forAllState from "../../src/state/forAllState";
import { rewardedInterstitial } from "../../src/ads/interAd";
import {
  AdEventType,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";
import { setStatusBarHidden } from "expo-status-bar";

export default function Free() {
  const isPro = isProStore((state) => state.isPro);
  const forAll = forAllState((state) => state.forAll);

  useEffect(() => {
    analytics().logScreenView({
      screen_name: "Free Karaoke",
      screen_class: "FreeKaraoke",
    });
  }, []);

  useEffect(() => {
    if (isPro) return;
    if (!forAll) return;
    // rewardedInterstitial.load();
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        //code
        setStatusBarHidden(true);
        rewardedInterstitial.show();
      }
    );
    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setStatusBarHidden(false);
      }
    );

    // Start loading the rewarded interstitial ad straight away
    rewardedInterstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      if (isPro) return;
      if (!forAll) return;
      unsubscribeLoaded();
      unsubscribeEarned();
    };
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
