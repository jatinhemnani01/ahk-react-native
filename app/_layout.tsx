import { Stack } from "expo-router";
import { colors } from "../src/constants/colors";
import { useEffect, useState } from "react";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import { Platform } from "react-native";
import { updateSubscription } from "../src/subscription/getSubscription";
import isProStore from "../src/state/isPro";
import { getAnalytics } from "@react-native-firebase/analytics";
import forAllState from "../src/state/forAllState";
import { RemoteConfigService } from "../src/firebase/remoteConfig";
import BASE_URL from "../src/constants/base_url";
import { screens } from "../src/constants/screens";

export default function RootLayout() {
  const remoteConfigService = new RemoteConfigService();

  async function fetchForAll() {
    const forAllRes = await remoteConfigService.getForAllConfig();
    forAllState.setState({ forAll: forAllRes });
  }

  async function fetchBaseURL() {
    const baseURLRes = await remoteConfigService.getBaseURL();
    BASE_URL.setState({ baseURL: baseURLRes });
  }

  useEffect(() => {
    fetchBaseURL();
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
    fetchForAll();
  }, []);

  const isPro = isProStore((state) => state.isPro);

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {screens.map((screen, i) => {
          return (
            <Stack.Screen
              key={i}
              name={screen.name}
              options={{
                animation: "ios",
                title: screen.title,
                headerStyle: { backgroundColor: colors.primary },
                headerTitleStyle: { color: "white" },
                headerTintColor: "white",
              }}
            />
          );
        })}
      </Stack>
    </>
  );
}
