import { View, Text, ScrollView, Dimensions, FlatList } from "react-native";
import React from "react";
import BASE_URL from "../../constants/base_url";
import useFetch from "../../hooks/useFetch";
import { FlashList } from "@shopify/flash-list";
import KaraokeTile from "../common/KaraokeTile";
import { KaraokeListItem } from "../../types/KaraokeListItemType";

export default function KaraokeList() {
  const { data, error, isLoading, setData } = useFetch(
    `${BASE_URL}/v2/all?page=1&limit=10`
  );

  const RenderKaraokeList = ({ item }: { item: KaraokeListItem }) => {
    return <KaraokeTile title={item?.kid.toString()} kid={item?.kid} />;
  };

  async function fetchMore() {
    const response = await fetch(`${BASE_URL}/v2/all?page=2&limit=10`);
    const newDate = await response.json();
    setData([...data, ...newDate]);
  }

  return (
      <FlashList
        data={data}
        estimatedItemSize={300}
        renderItem={RenderKaraokeList}
        ListFooterComponent={() => <Text>Loading More...</Text>}
        onEndReached={() => {
          fetchMore()
          console.log("end");
          
        }}
      />
  );
}
