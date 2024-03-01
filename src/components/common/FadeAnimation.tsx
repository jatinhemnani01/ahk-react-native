import React from "react";
import { View } from "react-native-animatable";

interface Props {
  children: React.ReactNode;
  animation?: string;
}

export default function FadeAnimation({ children, animation }: Props) {
  return (
    <View
      easing={"ease-in"}
      animation={animation || "fadeInLeft"}
      duration={500}
      delay={200}
    >
      {children}
    </View>
  );
}
