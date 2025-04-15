import { useVideoPlayer, VideoView } from "expo-video";
import { View, Alert, ScrollView, Text, ActivityIndicator } from "react-native";
import tw from "twrnc";
import VideoSpeedControl from "../src/components/common/VideoSpeedControl";
import { useEffect, useState } from "react";
import BASE_URL from "../src/constants/base_url";
import { useGlobalSearchParams } from "expo-router";
import * as ScreenCapture from "expo-screen-capture";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import analytics from "@react-native-firebase/analytics";

export default function VideoScreen() {
  ScreenCapture.usePreventScreenCapture();
  const [speed, setSpeed] = useState(1);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [pitchSpeed, setPitchSpeed] = useState(1);

  const params = useGlobalSearchParams();
  const { kid, title } = params;

  const player = useVideoPlayer(url, (player) => {
    player.loop = true;
    player.play();
  });

  function handleIncrement() {
    player.playbackRate = speed + 0.01;
    setSpeed((prevSpeed: number) => prevSpeed + 0.01);
  }

  function handleDecrement() {
    player.playbackRate = speed - 0.01;
    setSpeed((prevSpeed: number) => prevSpeed - 0.01);
  }

  function handleReset() {
    player.playbackRate = 1;
    setSpeed(1);
  }

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

  const ShowControls = () => {
    return (
      <View>
        <VideoSpeedControl
          handleReset={handleReset}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          speed={speed}
          title="Change Tempo/Key"
        />
        <VideoSpeedControl
          handleReset={() => {
            player.playbackRate = 1;
            setPitchSpeed(1);
          }}
          handleDecrement={() => {
            player.playbackRate = pitchSpeed - 0.01;
            setPitchSpeed((prev) => prev - 0.01);
          }}
          handleIncrement={() => {
            player.playbackRate = pitchSpeed + 0.01;
            setPitchSpeed((prev) => prev + 0.01);
          }}
          speed={pitchSpeed}
          title="Change Pitch"
        />
      </View>
    );
  };

  useEffect(() => {
    activateKeepAwakeAsync("video");
    fetchSingleVideo();

    analytics().logScreenView({
      screen_name: "VideoScreen",
      screen_class: "VideoScreen",
    });

    return () => {
      deactivateKeepAwake("video");
    };
  }, []);

  return loading ? (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={tw`mt-4 text-lg`}>Loading...</Text>
    </View>
  ) : (
    <ScrollView style={tw`flex`}>
      <VideoView
        style={{ width: "100%", height: 300 }}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        contentFit="cover"
      />
      <View style={tw`p-4 mb-10`}>
        <>
          <View style={tw`mb-4`}>
            <Text style={tw`text-lg font-bold text-center`}>{title}</Text>
          </View>

          <ShowControls />
          <View style={tw`flex justify-center items-center`}></View>
        </>
      </View>
    </ScrollView>
  );
}
