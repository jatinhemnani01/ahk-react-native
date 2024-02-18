import { Button } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import RevenueCatUI from "react-native-purchases-ui";

export default function profile() {
  function buy() {
    RevenueCatUI.presentPaywall();
  }

  useEffect(() => {
    async function setupPurchases() {
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
      if (Platform.OS === "android") {
        Purchases.configure({ apiKey: "goog_gGxArHKrmaNHKqOSVLLiPWnlwYL" });
        RevenueCatUI.presentPaywall();
      }
    }
    setupPurchases();
  }, []);

  return <Button title={"Buy Now"} onPress={buy} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
