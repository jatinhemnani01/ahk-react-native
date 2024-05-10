import {
  View,
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ResizeMode, Video } from "expo-av";
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
import VideoPlayer from "expo-video-player";
import {
  AdEventType,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";
import { setStatusBarHidden } from "expo-status-bar";

export default function VideoPlayers() {
  ScreenCapture.usePreventScreenCapture();

  const params = useGlobalSearchParams();
  const { kid, title } = params;

  const isPro = isProStore((state) => state.isPro);
  const forAll = forAllState((state) => state.forAll);

  const [showControls, setShowControls] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [speed, setSpeed] = React.useState<number>(1);
  const [url, setUrl] = React.useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [videoHeigh, setVideoHeight] = useState(300);
  const screenHeight = Dimensions.get("window").height;

  const ref = React.useRef<Video>(null) as React.MutableRefObject<Video>;

  const handleIncrement = () => {
    setSpeed((prevSpeed: number) => prevSpeed + 0.01);
  };

  const handleDecrement = () => {
    setSpeed((prevSpeed: number) => prevSpeed - 0.01);
  };

  const handleReset = () => {
    setSpeed(1);
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

  // ENTER FULLSCREEN
  function enterFullscreen() {
    setVideoHeight(screenHeight - 200);
    setIsFullScreen(true);
    ref?.current?.playAsync();
  }

  // EXIT FULLSCREEN
  function exitFullscreen() {
    setVideoHeight(300);
    setIsFullScreen(false);
    ref?.current?.playAsync();
  }

  const Title = () => {
    return (
      <View style={tw`flex justify-center flex-1`}>
        <Text style={tw`font-bold text-white text-lg`} />
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

    return () => {
      deactivateKeepAwake("video");

      if (isPro) return;
      if (!forAll) return;

      // if (rewardedInterstitial.loaded) {
      //   rewardedInterstitial.show();
      // } else {
      //   console.log("Ad not loaded");
      // }
    };
  }, []);

  useEffect(() => {
    if (isPro) return;
    if (!forAll) return;
    // rewardedInterstitial.load();
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        //code
        setStatusBarHidden(true);
        rewardedInterstitial.show();
        ref?.current?.pauseAsync();
      }
    );
    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setStatusBarHidden(false);
        ref?.current?.playAsync();
      }
    );

    const unsubscribeError = rewardedInterstitial.addAdEventListener(
      AdEventType.ERROR,
      () => {
        ref?.current?.playAsync();
      }
    );

    // Start loading the rewarded interstitial ad straight away
    rewardedInterstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      if (isPro) return;
      if (!forAll) return;
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeError();
    };
  }, []);

  return (
    <>
      <SafeAreaView>
        {/* <TouchableOpacity onPress={toggleControls} activeOpacity={1}>
          <Video
            source={{
              uri: url,
            }}
            style={{ width: "100%", height: 300 }}
            useNativeControls={true}
            resizeMode={ResizeMode.CONTAIN}
            ref={ref}
            shouldPlay
            rate={speed}
            isMuted={false}
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
        </TouchableOpacity> */}
        <VideoPlayer
          videoProps={{
            style: {
              width: "100%",
              height: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            },
            ref: ref,
            shouldPlay: true,
            resizeMode: ResizeMode.CONTAIN,
            source: { uri: url },
            rate: speed,
            onLoadStart: () => setLoading(true),
            onReadyForDisplay: () => setLoading(false),
          }}
          style={{ height: videoHeigh }}
          header={<Title />}
          fullscreen={{
            visible: true,
            enterFullscreen: () => enterFullscreen(),
            exitFullscreen: () => exitFullscreen(),
            inFullscreen: isFullScreen,
          }}
        />

        {loading && (
          <View style={tw`flex justify-center items-center m-5`}>
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
      </SafeAreaView>
    </>
  );
}
