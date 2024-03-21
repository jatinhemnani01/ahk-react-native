import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect } from "react";
import { ResizeMode, Video } from "expo-av";
import { useGlobalSearchParams } from "expo-router";
import tw from "twrnc";
import VideoSpeedControl from "../src/components/common/VideoSpeedControl";
import * as ScreenCapture from "expo-screen-capture";
import { rewardedInterstitial } from "../src/ads/interAd";
import forAllState from "../src/state/forAllState";
import isProStore from "../src/state/isPro";

export default function VideoPlayer() {
  ScreenCapture.usePreventScreenCapture();

  const isPro = isProStore((state) => state.isPro);
  const forAll = forAllState((state) => state.forAll);

  const params = useGlobalSearchParams();
  const [showControls, setShowControls] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const { id } = params;
  const ref = React.useRef(null);

  const [speed, setSpeed] = React.useState<number>(1);

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

  useEffect(() => {
    if (isPro) return;
    if (!forAll) return;
    rewardedInterstitial.load();

    return () => {
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
              uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
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
          />

          {loading && (
            <View style={tw`flex justify-center items-center`}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}

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
