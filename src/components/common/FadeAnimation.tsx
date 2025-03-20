import React from "react";
import { View } from "react-native-animatable";

interface Props {
  children: React.ReactNode;
  animation?: string;
  duration?: number;
  delay?: number;
}

export default function FadeAnimation({
  children,
  animation,
  duration,
  delay,
}: Props) {
  return (
    <View
      easing={"ease-in"}
      animation={animation || "fadeInUp"}
      duration={duration || 500}
      delay={delay || 200}
    >
      {children}
    </View>
  );
}
