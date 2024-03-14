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

export default function RootLayout() {

  const [loaded,setLoaded] = useState(false)

  const baseURL= BASE_URL((state) => state.baseURL);
  const remoteConfigService = new RemoteConfigService();

  async function fetchForAll() {
    const forAllRes = await remoteConfigService.getForAllConfig();
    forAllState.setState({ forAll: forAllRes });
  }

  async function fetchBaseURL() {
    setLoaded(true)
    const baseURLRes = await remoteConfigService.getBaseURL();
    BASE_URL.setState({ baseURL: baseURLRes });
    setLoaded(false)
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
  }, [loaded]);

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
