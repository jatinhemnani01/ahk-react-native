import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

interface VideoSpeedControlProps {
  speed: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

export default function VideoSpeedControl({
  handleDecrement,
  handleIncrement,
  speed,
}: VideoSpeedControlProps) {
  return (
    <View>
      <View style={styles.buttonsContainer}>
        <Button title="+" onPress={handleIncrement} />
        <Button title="-" onPress={handleDecrement} />
      </View>
      <Text>Speed: {speed.toFixed(2).toString()}</Text>
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
