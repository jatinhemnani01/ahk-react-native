import { Platform } from "react-native";
import { RewardedInterstitialAd } from "react-native-google-mobile-ads";

const adUnitIdAndroid = "ca-app-pub-5153786927158690/1118738379";
const adUnitIdIOS = "ca-app-pub-5153786927158690/7353244701";

export const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(
  Platform.OS === "android" ? adUnitIdAndroid : adUnitIdIOS
);
