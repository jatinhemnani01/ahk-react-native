import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import tw from "twrnc";
// import { LinearGradient } from "expo-linear-gradient"; // optional gradient ring

type Artist = {
  id: string | number;
  name: string;
  image_url: string;
};

type Props = {
  artists: Artist[];
  onArtistPress?: (artist: Artist) => void;
  onShowAllPress?: () => void;
  avatarSize?: number; // default 80
};

export default function HorizontalArtistList({
  artists,
  onArtistPress,
  onShowAllPress,
  avatarSize = 80,
}: Props) {
  const hasMore = artists.length > 7;
  const displayArtists = hasMore ? artists.slice(0, 7) : artists;

  const renderArtist = ({ item }: { item: Artist }) => (
    <TouchableOpacity
      onPress={() => onArtistPress && onArtistPress(item)}
      activeOpacity={0.8}
      style={tw`items-center mr-5`}
    >
      {/* Optional gradient border (uncomment if needed)
      <LinearGradient
        colors={["#ff9a9e", "#fad0c4"]}
        style={{
          padding: 2,
          borderRadius: (avatarSize + 8) / 2,
        }}
      > */}
      <View
        style={tw.style("rounded-full overflow-hidden bg-white shadow-md", {
          width: avatarSize,
          height: avatarSize,
          elevation: 3,
        })}
      >
        <Image
          source={{ uri: item.image_url }}
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          }}
          contentFit="cover"
        />
      </View>
      {/* </LinearGradient> */}

      <Text
        numberOfLines={1}
        style={tw`mt-2 text-sm text-center text-gray-900 font-semibold w-20`}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={tw`py-4`}>
      <FlatList
        data={displayArtists}
        horizontal
        keyExtractor={(item) => String(item.id)}
        renderItem={renderArtist}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`px-4`}
        ListFooterComponent={
          hasMore ? (
            <TouchableOpacity
              onPress={onShowAllPress}
              activeOpacity={0.8}
              style={tw`items-center justify-center mr-5`}
            >
              <View
                style={tw.style(
                  "rounded-full border border-gray-300 justify-center items-center bg-gray-100 shadow-sm",
                  {
                    width: avatarSize,
                    height: avatarSize,
                  }
                )}
              >
                <Text style={tw`text-base text-gray-700 font-medium`}>All</Text>
              </View>
              <Text
                style={tw`mt-2 text-sm text-center text-gray-900 font-semibold`}
              >
                Show All
              </Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
}
