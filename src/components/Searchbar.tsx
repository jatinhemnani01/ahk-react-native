import * as React from "react";
import { SearchBar } from "@rneui/base";
import { colors } from "../constants/colors";
import { View } from "react-native";

export default function Searchbar() {
  const [value, setValue] = React.useState("");
  return (
    <View>
    <SearchBar
      platform="android"
      loadingProps={{ color: colors.primary, size: 25 }}
      onChangeText={(newVal) => setValue(newVal)}
      onSubmitEditing={() => console.log(value)}
      placeholder="Search Song/Artist/Movie"
      placeholderTextColor="#888"
      showLoading={false}
      value={value}
    />
    </View>
  );
}
