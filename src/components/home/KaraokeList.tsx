import {
  View,
  Text, ActivityIndicator
} from "react-native";
import React from "react";
import BASE_URL from "../../constants/base_url";
import useFetch from "../../hooks/useFetch";
import { FlashList } from "@shopify/flash-list";
import KaraokeTile from "../common/KaraokeTile";
import { KaraokeListItem } from "../../types/KaraokeListItemType";
import tw from "twrnc";

export default function KaraokeList() {
  const { data, error, setData } = useFetch(
    `${BASE_URL}/v2/alla?page=1&limit=10`
  );

  const RenderKaraokeList = ({ item }: { item: KaraokeListItem }) => {
    return <KaraokeTile title={item?.kid.toString()} kid={item?.kid} />;
  };

  async function fetchMore() {
    const response = await fetch(`${BASE_URL}/v2/all?page=2&limit=10`);
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
      estimatedItemSize={1000}
      renderItem={RenderKaraokeList}
      ListFooterComponent={() => (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      onEndReached={() => {
        fetchMore();
        console.log("end");
      }}
    />
  );
}
