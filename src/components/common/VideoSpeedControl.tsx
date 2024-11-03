import { View, Text } from "react-native";
import { Icon, Button } from "@rneui/base";
import React from "react";
import tw from "twrnc";
import { colors } from "../../constants/colors";

interface VideoSpeedControlProps {
  speed: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleReset: () => void;
  title:string;
}

export default function VideoSpeedControl({
  handleDecrement,
  handleIncrement,
  handleReset,
  title,
  speed,
}: VideoSpeedControlProps) {
  return (
    <View style={tw`flex justify-center items-center mt-10 p-5 bg-white rounded-lg shadow-lg m-5 rounded-xl`}>
      <Text style={tw`font-semibold mb-4 text-2xl text-gray-800`}>{title}</Text>
      <View style={tw`flex flex-row items-center justify-center gap-5`}>
        <Button 
          onPress={handleIncrement} 
          radius={"xl"} 
          buttonStyle={tw`bg-blue-500`} 
          titleStyle={tw`text-white`}
        >
          <Icon name="plus" color={"white"} size={20} type="font-awesome" />
        </Button>
        <Text style={tw`font-bold text-2xl text-gray-800`}>{speed.toFixed(2).toString()}</Text>
        <Button 
          onPress={handleDecrement} 
          radius={"xl"} 
          buttonStyle={tw`bg-red-500`} 
          titleStyle={tw`text-white`}
        >
          <Icon name="minus" color={"white"} size={20} type="font-awesome" />
        </Button>
      </View>
      <Button 
        onPress={handleReset} 
        radius={"xl"} 
        buttonStyle={tw`bg-gray-300 mt-4`} 
        titleStyle={tw`text-black`}
      >
        <Icon color={"black"} name="rotate-right" />
      </Button>
    </View>
  );
}
