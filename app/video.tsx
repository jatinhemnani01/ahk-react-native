import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";
import React from "react";
import { ResizeMode, Video } from "expo-av";
import { useGlobalSearchParams } from "expo-router";
import tw from "twrnc";

export default function VideoPlayer() {
  const params = useGlobalSearchParams();
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

  return (
    <View>
      <Video
        source={{
          uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        style={{ width: "100%", height: 300 }}
        useNativeControls
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

      <View style={styles.buttonsContainer}>
        <Button title="+" onPress={handleIncrement} />
        <Button title="-" onPress={handleDecrement} />
      </View>
      <Text>Speed: {speed.toFixed(2).toString()}</Text>
      {/* <TextInput
        style={styles.input}
        value={speed.toFixed(2).toString()}
        onChangeText={handleSpeedChange}
        keyboardType="numeric"
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    minWidth: 80,
  },
});
