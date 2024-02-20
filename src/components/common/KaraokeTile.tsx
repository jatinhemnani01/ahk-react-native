import { View, Text } from "react-native";
import React from "react";
import { Avatar, ListItem } from "@rneui/base";
import { router } from "expo-router";

interface Props {
  kid: number;
  title: string;
}

export default function KaraokeTile({ kid, title }: Props) {
  return (
    <>
      <ListItem
        onPress={() => router.navigate("/video")}
        bottomDivider
        containerStyle={{ backgroundColor: "#ecf0f1" }}
      >
        <Avatar
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
        />
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron size={25} color={"black"} />
      </ListItem>
    </>
  );
}
