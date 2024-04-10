import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import {
  ResizeMode,
  Video,
  VideoFullscreenUpdate,
  VideoFullscreenUpdateEvent,
} from "expo-av";
import { useGlobalSearchParams } from "expo-router";
import tw from "twrnc";
import VideoSpeedControl from "../src/components/common/VideoSpeedControl";
import * as ScreenCapture from "expo-screen-capture";
import { rewardedInterstitial } from "../src/ads/interAd";
import forAllState from "../src/state/forAllState";
import isProStore from "../src/state/isPro";
import BASE_URL from "../src/constants/base_url";
import { Text } from "@rneui/base";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import analytics from "@react-native-firebase/analytics";
import * as ScreenOrientation from "expo-screen-orientation";

export default function VideoPlayer() {
  ScreenCapture.usePreventScreenCapture();

  const params = useGlobalSearchParams();
  const { kid, title } = params;

  const isPro = isProStore((state) => state.isPro);
  const forAll = forAllState((state) => state.forAll);

  const [showControls, setShowControls] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [speed, setSpeed] = React.useState<number>(1);
  const [url, setUrl] = React.useState("");

  const ref = React.useRef(null);

  const handleIncrement = () => {
    setSpeed((prevSpeed: number) => prevSpeed + 0.01);
  };

  const handleDecrement = () => {
    setSpeed((prevSpeed: number) => prevSpeed - 0.01);
  };

  const handleReset = () => {
    setSpeed(1);
  };

  const toggleControls = useCallback(() => {
    setShowControls((showControls) => !showControls);
  }, []);

  const onFullscreenUpdate = async ({
    fullscreenUpdate,
  }: VideoFullscreenUpdateEvent) => {
    if (Platform.OS === "android") {
      if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_PRESENT) {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
      } else if (
        fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS
      ) {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
      }
    }
  };

  function fetchSingleVideo() {
    setLoading(true);
    fetch(`${BASE_URL.getState().baseURL}/v2/single?id=${kid}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.url) {
          setUrl(res.url);
        }
      })
      .catch((err) => {
        Alert.alert("Error", "An error occurred while fetching video");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const Title = () => {
    return (
      <View style={tw`flex justify-center items-center m-3`}>
        <Text style={tw`font-bold capitalize text-lg text-center`}>
          {title}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    // KEEP SCREEN AWAKE
    activateKeepAwakeAsync("video");

    // FETCHING VIDEO URL
    fetchSingleVideo();

    analytics().logScreenView({
      screen_name: "Video Player",
      screen_class: "VideoPlayer",
    });

    if (isPro) return;
    if (!forAll) return;
    rewardedInterstitial.load();

    return () => {
      deactivateKeepAwake("video");
      if (isPro) return;
      if (!forAll) return;

      if (rewardedInterstitial.loaded) {
        rewardedInterstitial.show();
      } else {
        console.log("Ad not loaded");
      }
    };
  }, []);

  return (
    <>
      <View>
        <TouchableOpacity onPress={toggleControls} activeOpacity={1}>
          <Video
            source={{
              uri: url,
            }}
            style={{ width: "100%", height: 300 }}
            useNativeControls={showControls}
            resizeMode={ResizeMode.CONTAIN}
            ref={ref}
            isLooping
            shouldPlay
            rate={speed}
            onLoadStart={() => setLoading(true)}
            onReadyForDisplay={() => setLoading(false)}
            onFullscreenUpdate={onFullscreenUpdate}
          />

          {loading && (
            <View style={tw`flex justify-center items-center`}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}

          {!loading && <Title />}

          {!loading && (
            <VideoSpeedControl
              handleReset={handleReset}
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              speed={speed}
            />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
