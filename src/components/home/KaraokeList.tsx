import { View, Text, ActivityIndicator, RefreshControl } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import BASE_URL from "../../constants/base_url";
import useFetch from "../../hooks/useFetch";
import { FlashList } from "@shopify/flash-list";
import KaraokeTile from "../common/KaraokeTile";
import { KaraokeListItem } from "../../types/KaraokeListItemType";
import tw from "twrnc";
import FloatingButton from "../common/FloatingButton";
import analytics from "@react-native-firebase/analytics";

export default function KaraokeList() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { data, error, setData, } = useFetch(
    `${BASE_URL.getState().baseURL}/v2/all?page=1&limit=25`
  );

  const RenderKaraokeList = ({ item }: { item: KaraokeListItem }) => {
    return <KaraokeTile title={item?.title} kid={item?.kid} />;
  };

  async function fetchMore() {
    if (!hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const response = await fetch(
        `${BASE_URL.getState().baseURL}/v2/all?page=${nextPage}&limit=25`
      );
      const newData = await response.json();

      if (newData.length >= 25) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }

      setData((prev: KaraokeListItem[]) => [...prev, ...newData]);
    } catch (err) {
      console.error("Error fetching more data:", err);
    }
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch(
        `${BASE_URL.getState().baseURL}/v2/all?page=1&limit=25`
      );
      const refreshedData = await response.json();
      setData(refreshedData);
      setPage(1);
      setHasMore(true);
    } catch (err) {
      console.error("Error refreshing:", err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const HasMore = () => {
    if (hasMore) {
      return (
        <View style={tw`py-4`}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
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

  useEffect(() => {
    analytics().logScreenView({
      screen_class: "AllKaraoke",
      screen_name: "AllKaraoke",
    });
  }, []);

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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </>
  );
}
