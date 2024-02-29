import { View, Text } from "react-native";
import React from "react";
import { ListItem, Icon } from "@rneui/base";
import { StatusBar } from "expo-status-bar";

export default function Settings() {
  return (
    <>
       
      <View>
        <ListItem>
          <Icon name="forum" color="grey" />
          <ListItem.Content>
            <ListItem.Title>Feedback</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron size={25} color={"black"} />
        </ListItem>
        <ListItem>
          <Icon
            name="trash-can-outline"
            type="material-community"
            color="grey"
          />
          <ListItem.Content>
            <ListItem.Title>Trash</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron size={25} color={"black"} />
        </ListItem>
      </View>
    </>
  );
}
