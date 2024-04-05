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
import imgUrlState from "../src/state/imgUrlState";
import { screens } from "../src/constants/screens";
import { setStatusBarStyle } from "expo-status-bar";
import messaging from "@react-native-firebase/messaging";
import inAppMessaging from "@react-native-firebase/in-app-messaging";
import { PermissionsAndroid } from "react-native";

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

  async function fetchImgURL() {
    const imgUrl = await remoteConfigService.getImgURL();
    imgUrlState.setState({ url: imgUrl });
  }

  // Request Notification Permission
  async function requestUserPermission() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }

  // In App Messaging
  async function firebaseInAppMessage() {
    messaging().requestPermission()
  .then(() => messaging().getToken())
  .then(token => {
    console.log('FCM Installation ID:', token);
  });
    await inAppMessaging().setMessagesDisplaySuppressed(false);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatusBarStyle("light");
    }, 3000);

    // FETCHING BASE URL
    // fetchBaseURL();

    // IN APP MESSAGING
    firebaseInAppMessage();

    // calling requestUserPermission
    requestUserPermission();

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
    fetchImgURL();
    fetchForAll();

    return () => {
      clearTimeout(timeout);
    };
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
