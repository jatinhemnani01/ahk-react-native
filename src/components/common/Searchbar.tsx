import * as React from "react";
import { SearchBar } from "@rneui/base";
import { colors } from "../../constants/colors";
import { View, Text } from "react-native";
import searchInput from "../../state/searchInput";

export default function Searchbar() {
  const value = searchInput((state) => state.value);
  const updateSearch = searchInput((state) => state.updateSearch);

  return (
    <View>
      <SearchBar
        platform="android"
        loadingProps={{ color: colors.primary, size: 25 }}
        onChangeText={(newVal) => updateSearch(newVal)}
        onSubmitEditing={(e) => updateSearch(e.nativeEvent.text)}
        placeholder="Search Song/Artist/Movie"
        placeholderTextColor="#888"
        showLoading={false}
        value={value}
      />
    </View>
  );
}
