import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Linking, Platform } from "react-native";
import { Overlay, Icon } from "@rneui/themed";
import { Button } from "@rneui/base";
import tw from "twrnc";
import { Image } from "expo-image";
import DeviceInfo from "react-native-device-info";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../constants/base_url";
import * as Animatable from "react-native-animatable";

const UpdateOverlay = () => {
  const [visible, setVisible] = useState(false);

  const { data, error, isLoading } = useFetch(
    `${BASE_URL.getState().baseURL}/version/latest`
  );

  const handleUpdate = () => {
    Linking.openURL("https://onelink.to/te5v7d");
  };

  const checkVersion = () => {
    setTimeout(() => {
      const currentVersion = DeviceInfo.getVersion();
      if (data?.version && data.version !== currentVersion) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }, 2000);
  };

  useEffect(() => {
    // run when data is received
    if (!error && data) {
      checkVersion();
    }
  }, [data]);

  return (
    <>
      {visible && (
        <Overlay
          isVisible={visible}
          overlayStyle={{
            borderRadius: 24,
            padding: 24,
            width: "90%",
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 6,
            elevation: 8,
          }}
        >
          <Animatable.View
            animation="fadeInUp"
            easing="ease-in-out"
            duration={600}
            delay={100}
            style={tw`items-center`}
          >
            <Image
              source={{
                uri: "https://pub-c2824179ee6f40abab7b9d770b4a7354.r2.dev/icon.png",
              }}
              style={tw`w-24 h-24 mb-4 rounded-xl`}
            />

            <Text style={tw`text-2xl font-semibold text-gray-900 mb-2 text-center`}>
              Update Available 🚀
            </Text>

            <Text style={tw`text-base text-center text-gray-600 mb-6`}>
              A new version of the app is ready with exciting features and bug fixes.
              Please update now for the best experience!
            </Text>

            <TouchableOpacity
              onPress={handleUpdate}
              style={tw`w-full mb-3 rounded-full overflow-hidden`}
            >
              <Button
                radius="lg"
                buttonStyle={tw`bg-blue-600 py-3`}
                containerStyle={tw`w-full`}
                onPress={handleUpdate}
                iconRight
                icon={
                  <Icon
                    name={Platform.OS === "ios" ? "apple" : "play-circle"}
                    type={Platform.OS === "ios" ? "" : "feather"}
                    color="white"
                    size={22}
                    style={tw`ml-1`}
                  />
                }
                titleStyle={tw`text-white text-lg font-semibold`}
              >
                Update Now
              </Button>
            </TouchableOpacity>
          </Animatable.View>
        </Overlay>
      )}
    </>
  );
};

export default UpdateOverlay;
