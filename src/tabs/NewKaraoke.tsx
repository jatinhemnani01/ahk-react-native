import { FlashList } from "@shopify/flash-list";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import tw from "twrnc";
import KaraokeTile from "../components/common/KaraokeTile";
import BASE_URL from "../constants/base_url";
import FloatingButton from "../components/common/FloatingButton";
import useFetch from "../hooks/useFetch";
import { KaraokeListItem } from "../types/KaraokeListItemType";
import { colors } from "../constants/colors";

export default function NewKaraoke() {
  const { data, error, isLoading } = useFetch(
    `${BASE_URL.getState().baseURL}/v2/new_karaoke`
  );

  const RenderKaraokeList = ({ item }: { item: KaraokeListItem }) => {
    return <KaraokeTile title={item?.title} kid={item?.kid} />;
  };

  if (isLoading) {
    return (
      <View style={tw`flex justify-center flex-1 items-center`}>
        <ActivityIndicator size={"large"} color={colors.primary} />
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
      />
    </>
  );
}
