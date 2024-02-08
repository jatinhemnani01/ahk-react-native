import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Purchases, { LOG_LEVEL } from "react-native-purchases";

export default function App() {
  useEffect(() => {
    async function setupPurchases() {
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
      if (Platform.OS === "android") {
        Purchases.configure({ apiKey: "goog_gGxArHKrmaNHKqOSVLLiPWnlwYL" });
        console.log(await Purchases.getOfferings());
        console.log(await Purchases.isConfigured());
      }
    }
    setupPurchases();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Opasasas up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
