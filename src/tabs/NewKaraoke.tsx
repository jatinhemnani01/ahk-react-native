import { FlashList } from "@shopify/flash-list";
import React, { useState, useCallback } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import tw from "twrnc";
import KaraokeTile from "../components/common/KaraokeTile";
import BASE_URL from "../constants/base_url";
import FloatingButton from "../components/common/FloatingButton";
import useFetch from "../hooks/useFetch";
import { KaraokeListItem } from "../types/KaraokeListItemType";
import { colors } from "../constants/colors";

export default function NewKaraoke() {
  const { data, error, isLoading, setData } = useFetch(
    `${BASE_URL.getState().baseURL}/v2/new_karaoke`
  );

  const [refreshing, setRefreshing] = useState(false);

  const RenderKaraokeList = ({ item }: { item: KaraokeListItem }) => {
    return <KaraokeTile title={item?.title} kid={item?.kid} />;
  };

  // 🌀 Pull-to-refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    console.log("Refreshing...");
    
    try {
      const response = await fetch(
        `${BASE_URL.getState().baseURL}/v2/new_karaoke`
      );
      const freshData = await response.json();
      setData(freshData);
      console.log(freshData);
      
    } catch (err) {
      console.error("Refresh error:", err);
    } finally {
      setRefreshing(false);
    }
  }, [setData]);

  if (isLoading) {
    return (
      <View style={tw`flex justify-center flex-1 items-center`}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex justify-center flex-1 items-center`}>
        <Text style={tw`font-bold text-lg`}>Something Went Wrong!</Text>
      </View>
    );
  }

  return (
    <>
      <FloatingButton />
      <FlashList
        data={data}
        estimatedItemSize={170}
        renderItem={RenderKaraokeList}
        refreshing={refreshing} // 👈 shows pull-to-refresh loader
        onRefresh={onRefresh}   // 👈 refresh function
      />
    </>
  );
}
