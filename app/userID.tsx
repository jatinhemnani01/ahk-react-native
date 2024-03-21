import { ToastAndroid, View } from "react-native";
import React, { useEffect, useState } from "react";
import Purchases from "react-native-purchases";
import { Button, Text } from "@rneui/base";
import tw from "twrnc";

export default function UserID() {
  const [userID, setUserID] = useState<string>("");

  useEffect(() => {
    async function userId() {
      const id = await Purchases.getAppUserID();
      setUserID(id);
    }

    userId();
  }, []);

  function copyToClipboard() {
    ToastAndroid.show("Copied to clipboard", ToastAndroid.LONG);
  }

  return (
    <View style={tw`p-2 flex justify-center items-center flex-1 gap-5`}>
      <Text style={tw`font-bold text-md`}>{userID ?? ""}</Text>
      <Button type="solid" title="Copy ID" onPress={copyToClipboard} />
    </View>
  );
}
