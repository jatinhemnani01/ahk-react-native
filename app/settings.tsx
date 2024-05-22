import { Linking, Platform, View } from "react-native";
import React from "react";
import SettingsItem from "../src/components/settings/SettingsItem";
import { router } from "expo-router";
import isProStore from "../src/state/isPro";

export default function Settings() {
  const isPro = isProStore((state) => state.isPro);

  function openURL(url: string) {
    Linking.openURL(url);
  }

  function changeScreen(name: string) {
    router.navigate(name);
  }

  return (
    <>
      <View style={{ backgroundColor: "white", height: "100%" }}>
        <SettingsItem
          onPress={() => openURL("https://onelink.to/te5v7d")}
          title="Rate Us"
          icon="star"
        />
        <SettingsItem
          onPress={() => openURL("whatsapp://send?phone=+918962210828")}
          title="Contact Us"
          icon="logo-whatsapp"
          type="ionicon"
        />
        <SettingsItem
          onPress={() => changeScreen("/feedback")}
          title="Feedback"
          icon="forum"
        />

        {isPro && (
          <SettingsItem
            onPress={() => changeScreen("/songRequest")}
            title="Song Request"
            icon="plus"
            type="feather"
          />
        )}

        <SettingsItem
          onPress={() => changeScreen("/userID")}
          title="User ID"
          icon="hash"
          type="feather"
        />
        <SettingsItem
          onPress={() =>
            openURL(
              "https://gist.github.com/jatinhemnani01/88a6c53fb57dbd499caa7d2ac6762036"
            )
          }
          title="Privacy Policy"
          icon="shield"
        />
        <SettingsItem
          onPress={() =>
            openURL(
              "https://gist.github.com/jatinhemnani01/47c46acd79e034421def5a92acfd703b"
            )
          }
          title="Terms Of Use (EULA)"
          icon="shield"
        />
      </View>
    </>
  );
}
