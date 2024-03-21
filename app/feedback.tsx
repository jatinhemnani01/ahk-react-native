import {
  Alert,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button, Input, Text } from "@rneui/base";
import tw from "twrnc";
import BASE_URL from "../src/constants/base_url";

export default function Feedback() {
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [mobileError, setMobileError] = useState(true);

  function changeMobile(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    setMobile(e.nativeEvent.text);
    if (e.nativeEvent.text.length != 10) setMobileError(true);
    else setMobileError(false);
  }

  function changeMessage(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    setMessage(e.nativeEvent.text);
  }

  function handleSubmit() {
    fetch(`${BASE_URL.getState().baseURL}/feedback/add`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        mobile,
        message,
      }),
    }).finally(() => {
      setMobile("");
      setMessage("");
      setMobileError(true);
      Alert.alert("Feedback Submitted Successfully");
    });
  }

  return (
    <View style={tw`p-5`}>
      <Input
        keyboardType="phone-pad"
        label="Mobile No."
        onChange={changeMobile}
        value={mobile}
        errorMessage={mobileError ? "Invalid Mobile No." : ""}
      />
      <Input
        keyboardType="name-phone-pad"
        value={message}
        label="Feedback Message"
        onChange={changeMessage}
      />

      <Button onPress={handleSubmit} title={"Submit"} disabled={mobileError} />
    </View>
  );
}
