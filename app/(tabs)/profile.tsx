import { PricingCard } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View } from "react-native";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";
import { colors } from "../../src/constants/colors";
import tw from "twrnc";
import { updateSubscription } from "../../src/subscription/getSubscription";
import isProStore from "../../src/state/isPro";
import { useEffect } from "react";
import FreePricingCard from "../../src/components/profile/FreePricingCard";
import PremiumPricingCard from "../../src/components/profile/PremiumPricingCard";

export default function profile() {
  const isPro = isProStore.getState().isPro;

  async function displayPaywall() {
    const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall();
    if (paywallResult === PAYWALL_RESULT.PURCHASED) {
      console.log("User purchased");
    } else if (paywallResult === PAYWALL_RESULT.RESTORED) {
      console.log("User restored");
    } else {
      console.log("User did not purchase");
    }
  }

  function checkPro() {
    updateSubscription();
    console.log(isPro);
  }

  useEffect(() => {
    checkPro();
  }, [isPro]);

  return (
    <>
      <View style={tw`flex justify-center flex-row flex-1 items-center`}>
        {/* <FreePricingCard onPress={displayPaywall} /> */}
        <PremiumPricingCard />
        <StatusBar style="light" />
      </View>
    </>
  );
}
