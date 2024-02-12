import { View, Text } from "react-native";
import { Icon, Button, color } from "@rneui/base";
import React from "react";
import tw from "twrnc";
import { colors } from "../constants/colors";

interface VideoSpeedControlProps {
  speed: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleReset: () => void;
}

export default function VideoSpeedControl({
  handleDecrement,
  handleIncrement,
  handleReset,
  speed,
}: VideoSpeedControlProps) {
  return (
    <View style={tw`flex justify-center items-center mt-10`}>
      <Text style={tw`font-semibold mb-5 text-xl`}>
        Change Scale/Tempo/Speed
      </Text>
      <View style={tw`flex flex-row gap-2 justify-center items-center`}>
        <Button onPress={handleIncrement} radius={"xl"} color={colors.primary}>
          <Icon name="plus" color={"white"} size={20} type="font-awesome" />
        </Button>
        <Text style={tw`font-bold text-xl`}>{speed.toFixed(2).toString()}</Text>
        <Button onPress={handleDecrement} radius={"xl"} color={colors.primary}>
          <Icon name="minus" color={"white"} size={20} type="font-awesome" />
        </Button>
      </View>
      <Button onPress={handleReset} radius={"xl"} color={colors.primary}>
        <Icon color={"white"} name="rotate-right" />
      </Button>
    </View>
  );
}
