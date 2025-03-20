import { Platform } from "react-native";

export function isIOS() {
  if (Platform.OS === "ios") {
    return true;
  } else {
    return false;
  }
}
