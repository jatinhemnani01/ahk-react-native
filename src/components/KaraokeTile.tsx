import { View, Text } from "react-native";
import React from "react";
import { Avatar, ListItem } from "@rneui/base";

interface Props {
  title: string;
}

export default function KaraokeTile() {
  return (
    <>
      <ListItem bottomDivider containerStyle={{ backgroundColor: "#ecf0f1" }}>
        <Avatar
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
        />
        <ListItem.Content>
          <ListItem.Title>John Doe</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron size={25} color={"black"} />
      </ListItem>
    </>
  );
}
