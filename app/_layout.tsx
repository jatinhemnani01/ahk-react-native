import { Stack } from "expo-router";
import { colors } from "../src/constants/colors";
import { useEffect } from "react";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import { Platform } from "react-native";
import isProStore from "../src/state/isPro";
import { getAnalytics } from "@react-native-firebase/analytics";
import forAllState from "../src/state/forAllState";
import { RemoteConfigService } from "../src/firebase/remoteConfig";
import BASE_URL from "../src/constants/base_url";
import imgUrlState from "../src/state/imgUrlState";
import { screens } from "../src/constants/screens";
import { setStatusBarStyle } from "expo-status-bar";
import NotificationController from "../src/components/common/NotificationController";

export default function RootLayout() {
  const remoteConfigService = new RemoteConfigService();

  async function fetchEverything() {
    const everything = await remoteConfigService.getEverything();
    BASE_URL.setState({ baseURL: everything.base_url });
    imgUrlState.setState({ url: everything.img });
    forAllState.setState({ forAll: everything.all });
  }

  useEffect(() => {
    // Fetching remote config
    fetchEverything();

    // Function to update subscription

    // Timeout to set status bar style
    const timeout = setTimeout(() => {
      setStatusBarStyle("light");
    }, 3000);

    // Function to setup purchases
    async function setupPurchases() {
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
      if (Platform.OS === "android") {
        Purchases.configure({ apiKey: "goog_gGxArHKrmaNHKqOSVLLiPWnlwYL" });
      }
    }
    setupPurchases();

    // Function to get analytics
    getAnalytics();

    // Cleanup function
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const isPro = isProStore((state) => state.isPro);

  return (
    <>
      <NotificationController />
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
