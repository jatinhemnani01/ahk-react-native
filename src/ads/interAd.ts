import {
  RewardedInterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = TestIds.REWARDED_INTERSTITIAL;

export const rewardedInterstitial =
  RewardedInterstitialAd.createForAdRequest(adUnitId);
