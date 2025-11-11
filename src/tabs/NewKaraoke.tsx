import { FlashList } from "@shopify/flash-list";
import React, { useState, useCallback, useEffect } from "react";
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

  const RenderKaraokeList = ({ item }: { item: KaraokeListItem }) => (
    <KaraokeTile title={item?.title} kid={item?.kid} />
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch(
        `${BASE_URL.getState().baseURL}/v2/new_karaoke`
      );
      const freshData = await response.json();
      setData(freshData);
    } catch (err) {
      console.error("Refresh error:", err);
    } finally {
      setRefreshing(false);
    }
  }, [setData]);

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`font-bold text-lg`}>Something Went Wrong!</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <FloatingButton />

      <FlashList
        data={data}
        estimatedItemSize={170}
        renderItem={RenderKaraokeList}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
