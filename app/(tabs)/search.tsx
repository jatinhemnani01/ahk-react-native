import { View, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SearchBar, Text } from "@rneui/base";
import { colors } from "../../src/constants/colors";
import KaraokeTile from "../../src/components/common/KaraokeTile";
import BASE_URL from "../../src/constants/base_url";
import useFetch from "../../src/hooks/useFetch";
import { KaraokeListItem } from "../../src/types/KaraokeListItemType";
import { FlashList } from "@shopify/flash-list";
import tw from "twrnc"

export default function Search() {
  const [searchValue, updateSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [page, setPage] = useState(1);

  const { data, error, setData } = useFetch(
    `${BASE_URL}/v2/search?page=1&limit=25&q=`
  );

  console.log(data.length);

  const RenderKaraokeList = ({ item }: { item: KaraokeListItem }) => {
    return <KaraokeTile title={item?.title} kid={item?.kid} />;
  };

  async function fetchSearch() {
    setIsEmpty(false);
    setLoading(true);
    setPage(1);
    const response = await fetch(
      `${BASE_URL}/v2/search?page=1&limit=25&q=${searchValue}`
    );
    const newData = await response.json();

    if (newData.length >= 25) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }

    if (newData.length === 0) {
      setIsEmpty(true);
    }

    setData(newData);
    setLoading(false);
  }

  async function fetchMore() {
    setPage((prev) => prev + 1);
    const response = await fetch(
      `${BASE_URL}/v2/search?page=${page}&limit=25&q=${searchValue}`
    );
    const newDate = await response.json();
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

  const ShowEmpty = () => {
    return (
      <View style={tw`flex justify-center flex-1 items-center`}>
        <Text style={tw`text-lg text-gray-500 font-semibold`}>No results found</Text>
      </View>
    );
  };

  return (
    <View style={{ height: "100%" }}>
      <View>
        <SearchBar
          platform="android"
          loadingProps={{ color: colors.primary, size: 25 }}
          onChangeText={(newVal) => updateSearch(newVal)}
          onSubmitEditing={fetchSearch}
          placeholder="Search Song/Artist/Movie"
          placeholderTextColor="#888"
          showLoading={loading}
          value={searchValue}
        />
      </View>

      {isEmpty && <ShowEmpty />}

      <FlashList
        data={data}
        estimatedItemSize={170}
        renderItem={RenderKaraokeList}
        ListFooterComponent={() => <HasMore />}
        onEndReached={() => {
          fetchMore();
        }}
      />
    </View>
  );
}
