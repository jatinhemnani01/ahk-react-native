import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import BASE_URL from "../../constants/base_url";
import searchInput from "../../state/searchInput";
import useFetch from "../../hooks/useFetch";
import { FlashList } from "@shopify/flash-list";
import KaraokeTile from "../common/KaraokeTile";
import { KaraokeListItem } from "../../types/KaraokeListItemType";
import tw from "twrnc";

export default function SearchKaraokeList() {
  const [page, setPage] = useState(1);

  const searchValue = searchInput((state) => state.value);

  const { data, error, setData } = useFetch(
    `${BASE_URL}/v2/search?page=1&limit=25&q=`
  );

  const RenderKaraokeList = ({ item }: { item: KaraokeListItem }) => {
    return <KaraokeTile title={item?.title} kid={item?.kid} />;
  };

  async function fetchMore() {
    setPage((prev) => prev + 1);
    const response = await fetch(
      `${BASE_URL}/v2/search?page=${page}&limit=25&q=${searchValue}`
    );
    const newDate = await response.json();
    setData([...data, ...newDate]);
  }

  if (error) {
    return (
      <View style={tw`flex justify-center flex-1 items-center`}>
        <Text style={tw`font-bold text-lg`}>Something Went Wrong!</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={data}
      estimatedItemSize={170}
      renderItem={RenderKaraokeList}
      ListFooterComponent={() => (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      onEndReached={() => {
        fetchMore();
      }}
    />
  );
}
