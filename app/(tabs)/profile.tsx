import { Button, PricingCard } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, ScrollView, View } from "react-native";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import RevenueCatUI from "react-native-purchases-ui";
import { colors } from "../../src/constants/colors";
import tw from "twrnc";

export default function profile() {
  function buy() {
    RevenueCatUI.presentPaywall();
  }

  useEffect(() => {
    async function setupPurchases() {
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
      if (Platform.OS === "android") {
        Purchases.configure({ apiKey: "goog_gGxArHKrmaNHKqOSVLLiPWnlwYL" });
      }
    }
    setupPurchases();
  }, []);

  return (
    <>
      <View style={tw`flex justify-center flex-row flex-1 items-center`}>
        <ScrollView>
          <PricingCard
            containerStyle={tw`rounded-xl`}
            color={colors.primary}
            title="Free"
            price="$0"
            info={["Free Karaoke", "Basic Support", "Change Speed/Scale"]}
            button={{
              title: "Buy Now",
              onPress: buy,
              buttonStyle: tw`rounded-lg`,
            }}
          />
        </ScrollView>
        <StatusBar style="light" />
      </View>
    </>
  );
}
