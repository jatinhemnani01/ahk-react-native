import { View, Text, ActivityIndicator } from "react-native";
import React, { useState, useCallback } from "react";
import BASE_URL from "../../constants/base_url";
import useFetch from "../../hooks/useFetch";
import { FlashList } from "@shopify/flash-list";
import KaraokeTile from "../common/KaraokeTile";
import { KaraokeListItem } from "../../types/KaraokeListItemType";
import tw from "twrnc";
import FloatingButton from "../common/FloatingButton";

export default function FreeKaraokeList() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { data, error, setData, isLoading } = useFetch(
    `${BASE_URL.getState().baseURL}/v2/free?page=1&limit=25`
  );

  const RenderKaraokeList = ({ item }: { item: KaraokeListItem }) => {
    return (
      <KaraokeTile freeScreen={true} title={item?.title} kid={item?.kid} />
    );
  };

  // 🚀 Load more when scrolling to the bottom
  async function fetchMore() {
    if (!hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);

    const response = await fetch(
      `${BASE_URL.getState().baseURL}/v2/free?page=${nextPage}&limit=25`
    );
    const newData = await response.json();

    setHasMore(newData.length >= 25);
    setData([...data, ...newData]);
  }

  // 🌀 Pull-to-refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    try {
      const response = await fetch(
        `${BASE_URL.getState().baseURL}/v2/free?page=1&limit=25`
      );
      const freshData = await response.json();
      setData(freshData);
      setHasMore(true);
    } catch (err) {
      console.error("Refresh error:", err);
    } finally {
      setRefreshing(false);
    }
  }, [setData]);

  const HasMore = () =>
    hasMore ? <ActivityIndicator size="large" color="#0000ff" /> : null;

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
    <>
      <FloatingButton />
      {data && (
        <FlashList
          data={data}
          estimatedItemSize={170}
          renderItem={RenderKaraokeList}
          ListFooterComponent={HasMore}
          onEndReached={fetchMore}
          refreshing={refreshing} 
          onRefresh={onRefresh}   
        />
      )}
    </>
  );
}
