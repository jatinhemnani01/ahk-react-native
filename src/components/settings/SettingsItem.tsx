import { View, Text } from "react-native";
import React from "react";
import { ListItem, Icon } from "@rneui/base";
import FadeAnimation from "../common/FadeAnimation";

interface SettingsItemProps {
  title: string;
  icon: string;
  type?: string;
  onPress?: () => void;
}

export default function SettingsItem({
  title,
  icon,
  type,
  onPress,
}: SettingsItemProps) {
  return (
    <View>
      <FadeAnimation animation="fadeInRight" duration={200} delay={100}>
        <ListItem onPress={onPress}>
          <Icon name={icon} color="grey" type={type || ""} />
          <ListItem.Content>
            <ListItem.Title>{title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron size={25} color={"black"} />
        </ListItem>
      </FadeAnimation>
    </View>
  );
}
