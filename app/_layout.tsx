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
import Toast from "react-native-toast-message";
import downloadState from "../src/state/downloadState";
import { initialize } from "react-native-clarity";
import { isIOS } from "../src/utils/isIOS";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";

export default function RootLayout() {
  const remoteConfigService = new RemoteConfigService();

  // CLARITY INSTALLATION

  async function fetchEverything() {
    const everything = await remoteConfigService.getEverything();
    BASE_URL.setState({ baseURL: everything.base_url });
    imgUrlState.setState({ url: everything.img });
    forAllState.setState({ forAll: everything.all });
    downloadState.setState({ download: everything.download });
  }

  async function requestTracking() {
    if (isIOS()) {
      (async () => {
        const { status } = await requestTrackingPermissionsAsync();
        if (status === "granted") {
          console.log("Yay! I have user permission to track data");
          getAnalytics();
        } else {
          console.log("No permission to track data");
        }
      })();
    } else {
      getAnalytics();
    }
  }

  useEffect(() => {
    // Fetching remote config
    fetchEverything();

    // Requesting tracking permissions
    requestTracking();

    // Timeout to set status bar style
    const timeout = setTimeout(() => {
      setStatusBarStyle("light");
    }, 3000);

    // Function to setup purchases
    async function setupPurchases() {
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
      if (Platform.OS === "android") {
        Purchases.configure({ apiKey: "goog_gGxArHKrmaNHKqOSVLLiPWnlwYL" });
      } else if (Platform.OS === "ios") {
        Purchases.configure({ apiKey: "appl_LANOZzqgWzjTgPaWbEueJiEofgr" });
      }
    }
    setupPurchases();

    // Function to get analytics
    getAnalytics();

    if (!isIOS()) {
      initialize("mfmfyodmu0");
    }

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
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "Home" }}
        />

        {screens.map((screen, i) => {
          return (
            <Stack.Screen
              key={i}
              name={screen.name}
              options={{
                animation: "ios_from_right",
                title: screen.title,
                headerStyle: { backgroundColor: colors.primary },
                headerTitleStyle: { color: "white" },
                headerTintColor: "white",
              }}
            />
          );
        })}
      </Stack>
      <Toast />
    </>
  );
}
