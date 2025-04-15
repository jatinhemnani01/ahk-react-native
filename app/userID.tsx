import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Purchases from "react-native-purchases";
import { Button, Text } from "@rneui/base";
import tw from "twrnc";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";

export default function UserID() {
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    async function userId() {
      const id = await Purchases.getAppUserID();
      setUserID(id);
    }

    userId();
  }, []);

  async function copyToClipboard() {
    await Clipboard.setStringAsync(userID);
    Toast.show({
      text1: "Copied To Clipboard",
      autoHide: true,
      swipeable: true,
      type: "success",
      position: "bottom",
    });
  }

  return (
    <View style={tw`p-2 flex justify-center items-center flex-1 gap-5`}>
      <Text style={tw`font-bold`}>{userID ?? ""}</Text>
      <Button type="solid" title="Copy ID" onPress={copyToClipboard} />
    </View>
  );
}
