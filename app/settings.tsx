import { Linking, View } from "react-native";
import React from "react";
import SettingsItem from "../src/components/settings/SettingsItem";
import { router } from "expo-router";

export default function Settings() {
  function openURL(url: string) {
    // Linking.openURL(
    //   "https://play.google.com/store/apps/details?id=com.ahkkaraoke.app"
    // );
    Linking.openURL(url);
  }

  function changeScreen(name: string) {
    router.navigate(name);
  }

  return (
    <>
      <View style={{ backgroundColor: "white", height: "100%" }}>
        <SettingsItem
          onPress={() =>
            openURL(
              "https://play.google.com/store/apps/details?id=com.ahkkaraoke.app"
            )
          }
          title="Rate Us"
          icon="star"
        />
        <SettingsItem
          onPress={() => changeScreen("/feedback")}
          title="Feedback"
          icon="forum"
        />
        <SettingsItem
          onPress={() => changeScreen("/songRequest")}
          title="Song Request"
          icon="plus"
          type="feather"
        />
        <SettingsItem
          onPress={() => openURL("")}
          title="Privacy Policy"
          icon="shield"
        />
        <SettingsItem
          onPress={() => openURL("")}
          title="Contact Us"
          icon="people"
        />
        <SettingsItem
          onPress={() => changeScreen("/userID")}
          title="User ID"
          icon="hash"
          type="feather"
        />
      </View>
    </>
  );
}
