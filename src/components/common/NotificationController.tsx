import React, { useEffect } from "react";
import { Alert, PermissionsAndroid } from "react-native";
import messaging from "@react-native-firebase/messaging";

function NotificationController() {
  async function requestUserPermission() {
    // PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    // );

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }

  useEffect(() => {
    requestUserPermission();

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {});

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage,
      );
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        remoteMessage?.notification?.title!,
        remoteMessage?.notification?.body!,
      );
    });

    return unsubscribe;
  }, []);

  return null;
}

export default NotificationController;
