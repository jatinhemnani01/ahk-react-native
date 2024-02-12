import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";
import { ResizeMode, Video } from "expo-av";
import { useGlobalSearchParams } from "expo-router";
import tw from "twrnc";
import VideoSpeedControl from "../src/components/VideoSpeedControl";

export default function VideoPlayer() {
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

  const handleSpeedChange = (text: string) => {
    const numericValue = parseFloat(text);
    if (!isNaN(numericValue)) {
      setSpeed(numericValue);
    }
  };

  const toggleControls = useCallback(() => {
    setShowControls((showControls) => !showControls);
  }, []);

  return (
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

        <VideoSpeedControl
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          speed={speed}
        />
      </TouchableOpacity>
    </View>
  );
}
