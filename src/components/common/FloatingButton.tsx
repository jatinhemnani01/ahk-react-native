import React from "react";
import { SpeedDial } from "@rneui/themed";
import { colors } from "../../constants/colors";
import { Linking } from "react-native";
import { Link, router } from "expo-router";

export default () => {
  const [open, setOpen] = React.useState(false);

  function openURL(url: string) {
    Linking.openURL(url);
  }

  function changeScreen(name: string) {
    router.navigate(name);
  }

  return (
    <SpeedDial
      style={{ zIndex: 1000 }}
      color={colors.primary}
      isOpen={open}
      icon={{ name: "activity", color: "white", type: "feather" }}
      openIcon={{ name: "close", color: "#fff" }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
    >
      <SpeedDial.Action
        icon={{ name: "star", color: "#fff", type: "feather" }}
        color={colors.primary}
        title="Rate Us"
        onPress={() =>
          openURL(
            "https://play.google.com/store/apps/details?id=com.ahkkaraoke.app"
          )
        }
      />
      <SpeedDial.Action
        icon={{ name: "bell", color: "#fff", type: "feather" }}
        color={colors.primary}
        title="Enable Notifications"
        onPress={() => Linking.openSettings()}
      />
      <SpeedDial.Action
        icon={{ name: "settings", color: "#fff", type: "feather" }}
        title="Settings"
        color={colors.primary}
        onPress={() => changeScreen("/settings")}
      />
      <SpeedDial.Action
        icon={{ name: "logo-whatsapp", color: "#fff", type: "ionicon" }}
        color={colors.primary}
        title="Contact Us"
        onPress={() => openURL("whatsapp://send?phone=+918962210828")}
      />
      <SpeedDial.Action
        icon={{ name: "hash", color: "#fff", type: "feather" }}
        color={colors.primary}
        title="User ID"
        onPress={() => changeScreen("/userID")}
      />
    </SpeedDial>
  );
};
