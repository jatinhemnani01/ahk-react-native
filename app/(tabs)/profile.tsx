import { Alert, Platform, View } from "react-native";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";
import tw from "twrnc";
import { updateSubscription } from "../../src/subscription/getSubscription";
import isProStore from "../../src/state/isPro";
import FreePricingCard from "../../src/components/profile/FreePricingCard";
import PremiumPricingCard from "../../src/components/profile/PremiumPricingCard";
import { useEffect } from "react";
import analytics from "@react-native-firebase/analytics";

export default function profile() {
  const isPro = isProStore((state) => state.isPro);
  const toPro = isProStore((state) => state.toPro);
  const toFree = isProStore((state) => state.toFree);
  const isIos = Platform.OS === "ios";

  async function displayPaywall() {
    if (isIos) {
      Alert.alert(
        "Subscription",
        "• Payment will be charged to iTunes Account at confirmation of purchase \n • Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period. \n Cancel anytime Settings > Apple ID one day before renewal date"
      );
    }

    const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall();
    if (paywallResult === PAYWALL_RESULT.PURCHASED) {
      toPro();
      console.log("User purchased");
      Alert.alert(
        "Success!",
        "Purchase Successful! Thank you for your purchase!"
      );
      analytics().logEvent("yes_purchase");
    } else if (paywallResult === PAYWALL_RESULT.RESTORED) {
      // isProStore.setState({ isPro: true });

      toPro();
      Alert.alert(
        "Success!",
        "Restore Successful! Thank you for your purchase!"
      );
    } else {
      toFree();
      console.log("User did not purchase");
      analytics().logEvent("no_purchase");
    }
    await updateSubscription();
  }

  const RenderPricingCard = () => {
    if (isPro) {
      return <PremiumPricingCard />;
    } else {
      return <FreePricingCard onPress={displayPaywall} />;
    }
  };

  useEffect(() => {
    analytics().logScreenView({
      screen_name: "Profile",
      screen_class: "Profile",
    });
  }, []);

  return (
    <>
      <View style={tw`flex justify-center flex-row flex-1 items-center`}>
        <RenderPricingCard />
      </View>
    </>
  );
}
