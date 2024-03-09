import { Stack } from "expo-router";
import { colors } from "../src/constants/colors";
import { useEffect } from "react";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import { Platform, StatusBar } from "react-native";
import { updateSubscription } from "../src/subscription/getSubscription";
import isProStore from "../src/state/isPro";

export default function RootLayout() {
  useEffect(() => {
    async function setupPurchases() {
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
      if (Platform.OS === "android") {
        Purchases.configure({ apiKey: "goog_gGxArHKrmaNHKqOSVLLiPWnlwYL" });
      }
    }
    setupPurchases();

    async function update() {
      await updateSubscription();
    }

    update();
  }, []);

  const isPro = isProStore((state) => state.isPro);

  return (
    <>
      <StatusBar barStyle={"light-content"} animated />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="video"
          options={{
            animation: "ios",
            title: "Video",
            headerStyle: { backgroundColor: colors.primary },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="free"
          options={{
            animation: "ios",
            title: "Free Karaoke",
            headerStyle: { backgroundColor: colors.primary },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="settings"
          options={{
            animation: "ios",
            title: "Settings",
            headerStyle: { backgroundColor: colors.primary },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
          }}
        />
      </Stack>
    </>
  );
}
