import { Alert, View } from "react-native";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";
import tw from "twrnc";
import { updateSubscription } from "../../src/subscription/getSubscription";
import isProStore from "../../src/state/isPro";
import FreePricingCard from "../../src/components/profile/FreePricingCard";
import PremiumPricingCard from "../../src/components/profile/PremiumPricingCard";

export default function profile() {
  const isPro = isProStore((state) => state.isPro);
  const toPro = isProStore((state) => state.toPro);
  const toFree = isProStore((state) => state.toFree);

  async function displayPaywall() {
    const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall();
    if (paywallResult === PAYWALL_RESULT.PURCHASED) {
      toPro();
      console.log("User purchased");
      Alert.alert(
        "Success!",
        "Purchase Successful! Thank you for your purchase!"
      );
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

  return (
    <>
      <View style={tw`flex justify-center flex-row flex-1 items-center`}>
        <RenderPricingCard />
      </View>
    </>
  );
}
