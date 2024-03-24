import { RewardedInterstitialAd } from "react-native-google-mobile-ads";

const adUnitId = "ca-app-pub-5153786927158690/1118738379";

export const rewardedInterstitial =
  RewardedInterstitialAd.createForAdRequest(adUnitId);
