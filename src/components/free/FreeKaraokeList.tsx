import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import BASE_URL from "../../constants/base_url";
import useFetch from "../../hooks/useFetch";
import { FlashList } from "@shopify/flash-list";
import KaraokeTile from "../common/KaraokeTile";
import { KaraokeListItem } from "../../types/KaraokeListItemType";
import tw from "twrnc";

export default function FreeKaraokeList() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const { data, error, setData, isLoading } = useFetch(
    `${BASE_URL.getState().baseURL}/v2/free?page=1&limit=25`
  );

  const RenderKaraokeList = ({ item }: { item: KaraokeListItem }) => {
    return (
      <KaraokeTile freeScreen={true} title={item?.title} kid={item?.kid} />
    );
  };

  async function fetchMore() {
    setPage((prev) => prev + 1);
    const response = await fetch(`${BASE_URL}/v2/free?page=${page}&limit=25`);
    const newDate = await response.json();
    console.log(newDate);

    if (newDate.length >= 25) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }

    setData([...data, ...newDate]);
  }

  const HasMore = () => {
    if (hasMore) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return null;
    }
  };

  if (error) {
    return (
      <View style={tw`flex justify-center flex-1 items-center`}>
        <Text style={tw`font-bold text-lg`}>Something Went Wrong!</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={tw`flex justify-center flex-1 items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlashList
      data={data}
      estimatedItemSize={170}
      ListFooterComponent={() => <HasMore />}
      onEndReached={() => {
        fetchMore();
      }}
      renderItem={RenderKaraokeList}
    />
  );
}
