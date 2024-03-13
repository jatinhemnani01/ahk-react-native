import { Stack } from "expo-router";
import { colors } from "../src/constants/colors";
import { useEffect } from "react";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import { Platform } from "react-native";
import { updateSubscription } from "../src/subscription/getSubscription";
import isProStore from "../src/state/isPro";
import { getAnalytics } from "@react-native-firebase/analytics";
import { ForAll } from "../src/firebase/forAll";

export default function RootLayout() {
  const forAll = new ForAll();
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
    getAnalytics();
    update();
    forAll.getBaseURL().then((url) => console.log(url));
  }, []);

  const isPro = isProStore((state) => state.isPro);

  return (
    <>
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
