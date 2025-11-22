import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, ActivityIndicator } from "react-native";
import { SearchBar, Text } from "@rneui/base";
import { FlashList } from "@shopify/flash-list";
import tw from "twrnc";
import analytics from "@react-native-firebase/analytics";
import KaraokeTile from "../src/components/common/KaraokeTile";
import BASE_URL from "../src/constants/base_url";
import { colors } from "../src/constants/colors";
import useFetch from "../src/hooks/useFetch";
import { KaraokeListItem } from "../src/types/KaraokeListItemType";
import { useGlobalSearchParams } from "expo-router";

export default function Artist() {
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const params = useGlobalSearchParams();
  const [page, setPage] = useState(1);

  const { data, error, setData, isLoading } = useFetch(
    `${BASE_URL.getState().baseURL}/v2/search?page=1&limit=25&q=${params?.name}`
  );
  

  const RenderKaraokeList = ({ item }: { item: KaraokeListItem }) => {
    return <KaraokeTile title={item?.title} kid={item?.kid} />;
  };



  async function fetchMore() {
    setPage((prev) => prev + 1);
    const response = await fetch(
      `${BASE_URL.getState().baseURL}/v2/search?page=${page}&limit=25&q=${
        params?.name
      }`
    );
    const newData = await response.json();
    if (newData.length >= 25) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    setData([...data, ...newData]);
  }

  const HasMore = () => {
    if (hasMore) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return null;
    }
  };

  const ShowEmpty = () => {
    return (
      <View style={tw`flex justify-center flex-1 items-center`}>
        <Text style={tw`text-lg text-gray-500 font-semibold`}>
          No results found
        </Text>
      </View>
    );
  };

  useEffect(() => {
    analytics().logScreenView({
      screen_name: "Search",
      screen_class: "Search",
    });
  }, []);



  return (
    <>
      <View style={{ height: "100%" }}>
        {isEmpty && <ShowEmpty />}

        {error && (
          <View style={tw`flex justify-center flex-1 items-center`}>
            <Text style={tw`text-lg text-gray-500 font-semibold`}>
              Error fetching data
            </Text>
          </View>
        )}

        {isLoading ? (
          <View style={tw`flex justify-center flex-1 items-center`}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlashList
            data={data}
            estimatedItemSize={170}
            renderItem={RenderKaraokeList}
            ListFooterComponent={() => <HasMore />}
            onEndReached={() => {
              fetchMore();
            }}
          />
        )}
      </View>
    </>
  );
}
