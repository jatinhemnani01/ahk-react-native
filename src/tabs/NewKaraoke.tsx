import { FlashList } from "@shopify/flash-list";
import React, { useState, useCallback, useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { Skeleton } from "@rneui/base";
import KaraokeTile from "../components/common/KaraokeTile";
import BASE_URL from "../constants/base_url";
import FloatingButton from "../components/common/FloatingButton";
import useFetch from "../hooks/useFetch";
import { KaraokeListItem } from "../types/KaraokeListItemType";
import { colors } from "../constants/colors";
import HorizontalArtistList from "../components/common/ArtistsHorizontalList";
import { router } from "expo-router";

export default function NewKaraoke() {
  const { data, error, isLoading, setData } = useFetch(
    `${BASE_URL.getState().baseURL}/v2/new_karaoke`
  );

  const [refreshing, setRefreshing] = useState(false);
  const [artists, setArtists] = useState<any>([]);
  const [isLoadingArtists, setIsLoadingArtists] = useState(false);
  const [errorArtists, setErrorArtists] = useState(false);

  async function fetchArtists() {
    setErrorArtists(false);
    setIsLoadingArtists(true);
    try {
      const response = await fetch(
        `${BASE_URL.getState().baseURL}/artists/all`
      );
      const artistsData = await response.json();
      setArtists(artistsData?.data);
    } catch (err) {
      setErrorArtists(true);
      console.error("Error fetching artists:", err);
    } finally {
      setIsLoadingArtists(false);
    }
  }

  useEffect(() => {
    fetchArtists();
  }, []);

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
        ListHeaderComponent={
          <View style={tw`px-4 mt-2 mb-3`}>
            {/* Modern Featured Artists header */}
            <View style={tw`flex-row items-center justify-between mb-2`}>
              <Text style={tw`text-xl font-bold text-gray-900 tracking-tight`}>
                Featured Artists
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => console.log("View All Artists")}
              >
                <Text style={tw`text-sm font-semibold text-blue-500`}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            {isLoadingArtists ? (
              <View style={tw`flex-row`}>
                {[...Array(7)].map((_, i) => (
                  <Skeleton
                    key={i}
                    animation="wave"
                    width={80}
                    height={80}
                    circle
                    style={tw`mr-4`}
                  />
                ))}
              </View>
            ) : (
              <HorizontalArtistList
                artists={artists}
                onArtistPress={(artist) => {
                  router.navigate({
                    pathname: "/artist",
                    params: { name: artist.name, image: artist.image_url },
                  });
                }}
              />
            )}
          </View>
        }
      />
    </View>
  );
}
