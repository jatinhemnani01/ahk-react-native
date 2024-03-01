import { View } from "react-native";
import React from "react";
import SettingsItem from "../src/components/settings/SettingsItem";

export default function Settings() {
  return (
    <>
      <View style={{ backgroundColor: "white", height: "100%" }}>
        <SettingsItem title="Feedback" icon="forum" />
        <SettingsItem title="Privacy Policy" icon="shield" />
        <SettingsItem title="Contact Us" icon="people" />
      </View>
    </>
  );
}
