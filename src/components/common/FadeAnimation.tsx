import React from "react";
import { View } from "react-native-animatable";

interface Props {
  children: React.ReactNode;
}

export default function FadeAnimation({ children }: Props) {
  return (
    <View
      easing={"ease-in"}
      animation={"fadeInLeft"}
      duration={500}
      delay={200}
    >
      {children}
    </View>
  );
}
