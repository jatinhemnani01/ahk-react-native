import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import tw from "twrnc";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../constants/base_url";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HORIZONTAL_PADDING = 16 * 2; // tw`p-4` left+right
const ITEM_HORIZONTAL_MARGIN = 8; // spacing between items (we'll use margin on each side)

export default function ArtistsList() {
  const { data, isLoading, error } = useFetch(
    `${BASE_URL.getState().baseURL}/artists/all`
  );

  const artistsArray = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.data)) return data.data;
    return [];
  }, [data]);

  const categorized = useMemo(() => {
    const map = new Map();
    for (const artist of artistsArray) {
      const ct = artist.category_type;
      const name = artist.category ?? artist.category_name ?? `Category ${ct}`;
      if (!map.has(ct)) map.set(ct, { category_type: ct, category_name: name, artists: [] });
      map.get(ct).artists.push(artist);
    }
    return Array.from(map.values()).sort((a, b) => Number(a.category_type) - Number(b.category_type));
  }, [artistsArray]);

  // Decide best-fit columns by a target min size (you can tweak TARGET_MIN)
  const TARGET_MIN = 72; // minimum avatar size you'd like
  const availableWidth = SCREEN_WIDTH - HORIZONTAL_PADDING;
  const maxColumns = Math.floor(availableWidth / (TARGET_MIN + ITEM_HORIZONTAL_MARGIN * 2)) || 1;
  const columns = Math.min(Math.max(maxColumns, 1), 6); // clamp between 1 and 6
  // now compute exact item size so columns fill the row exactly
  const totalMargins = columns * ITEM_HORIZONTAL_MARGIN * 2; // left+right margin per item
  const exactItemSize = Math.floor((availableWidth - totalMargins) / columns);

  if (isLoading)
    return (
      <View style={tw`p-4 items-center`}>
        <Text style={tw`text-base text-gray-700`}>Loading artists…</Text>
      </View>
    );

  if (error)
    return (
      <View style={tw`p-4`}>
        <Text style={tw`text-red-500`}>Error loading artists.</Text>
        <Text>{String(error)}</Text>
      </View>
    );

  return (
    // give parent flex so it can take whole screen when used in full-screen layouts
    <ScrollView style={tw`flex-1 p-4`} contentContainerStyle={tw`pb-6`}>
      {categorized.length === 0 ? (
        <Text style={tw`text-center text-gray-500 mt-4`}>No artists found.</Text>
      ) : (
        categorized.map((group) => (
          <View key={String(group.category_type)} style={tw`mb-8`}>
            <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>
              {group.category_name}
            </Text>

            {/* Avatar Grid - items sized to fill full width */}
            <View style={tw`flex-row flex-wrap`}>
              {group.artists.map((artist:any) => {
                const key = String(artist.id ?? `${group.category_type}-${artist.name}`);
                const imgUri = artist.image_url || artist.image || "https://via.placeholder.com/150";

                return (
                  <TouchableOpacity
                    key={key}
                    style={{
                      width: exactItemSize,
                      marginHorizontal: ITEM_HORIZONTAL_MARGIN,
                      marginBottom: ITEM_HORIZONTAL_MARGIN * 1.5,
                      alignItems: "center",
                    }}
                    onPress={() => console.log("Tapped artist:", artist.name)}
                  >
                    <Image
                      source={{ uri: imgUri }}
                      style={{
                        width: exactItemSize,
                        height: exactItemSize,
                        borderRadius: exactItemSize / 2,
                        backgroundColor: "#e5e7eb",
                      }}
                      contentFit="cover"
                    />
                    <Text numberOfLines={2} style={tw`mt-1 text-xs text-center text-gray-700 w-full`}>
                      {artist.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}
