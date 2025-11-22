import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import tw from "twrnc";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../constants/base_url";
import * as Animatable from "react-native-animatable";
import { Skeleton } from "@rneui/base";
import { router } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HORIZONTAL_PADDING = 16 * 2; // tw`p-4` left+right
const ITEM_HORIZONTAL_MARGIN = 8; // spacing between items (we'll use margin on each side)

export default function ArtistsList(): JSX.Element {
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [animateKey, setAnimateKey] = useState(0); // bump to retrigger keyed animations

  const requestUrl = useMemo(
    () => `${BASE_URL.getState().baseURL}/artists/all?_=${refreshKey}`,
    [refreshKey]
  );

  const { data, isLoading, error } = useFetch(requestUrl);

  useEffect(() => {
    if (!isLoading && refreshing) {
      setRefreshing(false);
    }
  }, [isLoading, refreshing]);

  useEffect(() => {
    setAnimateKey((k) => k + 1);
  }, [refreshKey]);

  const artistsArray = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray((data as any).data)) return (data as any).data;
    return [];
  }, [data]);

  const categorized = useMemo(() => {
    const map = new Map<
      number,
      { category_type: number; category_name: string; artists: any[] }
    >();
    for (const artist of artistsArray as any[]) {
      const ct = artist.category_type;
      const name = artist.category ?? artist.category_name ?? `Category ${ct}`;
      if (!map.has(ct))
        map.set(ct, { category_type: ct, category_name: name, artists: [] });
      map.get(ct)!.artists.push(artist);
    }
    return Array.from(map.values()).sort(
      (a, b) => Number(a.category_type) - Number(b.category_type)
    );
  }, [artistsArray]);

  // Decide best-fit columns by a target min size (you can tweak TARGET_MIN)
  const TARGET_MIN = 72; // minimum avatar size you'd like
  const availableWidth = SCREEN_WIDTH - HORIZONTAL_PADDING;
  const maxColumns =
    Math.floor(availableWidth / (TARGET_MIN + ITEM_HORIZONTAL_MARGIN * 2)) || 1;
  const columns = Math.min(Math.max(maxColumns, 1), 6); // clamp between 1 and 6
  // now compute exact item size so columns fill the row exactly
  const totalMargins = columns * ITEM_HORIZONTAL_MARGIN * 2; // left+right margin per item
  const exactItemSize = Math.floor((availableWidth - totalMargins) / columns);

  // pull-to-refresh handler
  const onRefresh = () => {
    setRefreshing(true);
    setRefreshKey((k) => k + 1);
  };

  // ---------- Loading skeleton components ----------
  const AvatarGridSkeleton: React.FC<{ count?: number }> = ({ count = 12 }) => {
    const rows: JSX.Element[] = [];
    const perRow = columns;
    for (let r = 0; r < Math.ceil(count / perRow); r++) {
      const rowItems: JSX.Element[] = [];
      for (let c = 0; c < perRow; c++) {
        const idx = r * perRow + c;
        if (idx >= count) break;
        rowItems.push(
          <View
            key={`cell-${r}-${c}`}
            style={{
              width: exactItemSize,
              marginHorizontal: ITEM_HORIZONTAL_MARGIN,
              marginBottom: ITEM_HORIZONTAL_MARGIN * 1.5,
              alignItems: "center",
            }}
          >
            <Skeleton
              animation="wave"
              width={exactItemSize}
              height={exactItemSize}
              style={{ borderRadius: exactItemSize / 2 }}
            />
            <Skeleton
              animation="wave"
              width={Math.floor(exactItemSize * 0.7)}
              height={12}
              style={{ marginTop: 8, borderRadius: 6 }}
            />
          </View>
        );
      }
      rows.push(
        <View
          key={`row-${r}`}
          style={{ flexDirection: "row", justifyContent: "flex-start" }}
        >
          {rowItems}
        </View>
      );
    }
    return <View style={{ marginTop: 8 }}>{rows}</View>;
  };

  const LoadingSkeleton: React.FC = () => {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 88,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Skeleton
              width={140}
              height={32}
              style={{ borderRadius: 8 }}
              animation="wave"
            />
            <Skeleton
              width={40}
              height={32}
              style={{ borderRadius: 8 }}
              animation="wave"
            />
          </View>

          {/* Tabs */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 18,
              paddingHorizontal: 4,
            }}
          >
            <Skeleton
              width={70}
              height={28}
              style={{ borderRadius: 20 }}
              animation="wave"
            />
            <Skeleton
              width={90}
              height={28}
              style={{ borderRadius: 20 }}
              animation="wave"
            />
            <Skeleton
              width={80}
              height={28}
              style={{ borderRadius: 20 }}
              animation="wave"
            />
            <Skeleton
              width={50}
              height={28}
              style={{ borderRadius: 20 }}
              animation="wave"
            />
          </View>

          {/* Multiple sections */}
          <View style={{ marginBottom: 22 }}>
            <Skeleton
              width={220}
              height={22}
              style={{ borderRadius: 6 }}
              animation="wave"
            />
            <AvatarGridSkeleton count={12} />
          </View>

          <View style={{ marginBottom: 22 }}>
            <Skeleton
              width={200}
              height={22}
              style={{ borderRadius: 6 }}
              animation="wave"
            />
            <AvatarGridSkeleton count={9} />
          </View>

          <View style={{ marginBottom: 22 }}>
            <Skeleton
              width={180}
              height={22}
              style={{ borderRadius: 6 }}
              animation="wave"
            />
            <AvatarGridSkeleton count={6} />
          </View>
        </ScrollView>

        {/* Bottom Tab Bar Skeleton */}
        <View style={styles.bottomBar}>
          <View style={styles.bottomIcons}>
            {[...Array(5)].map((_, i) => (
              <View key={`bt-${i}`} style={styles.bottomItem}>
                <Skeleton
                  width={28}
                  height={28}
                  style={{ borderRadius: 28 / 2 }}
                  animation="wave"
                />
                <Skeleton
                  width={36}
                  height={8}
                  style={{ marginTop: 6, borderRadius: 4 }}
                  animation="wave"
                />
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  };

  // ---------- End skeletons ----------

  if (isLoading && !refreshing) {
    return <LoadingSkeleton />;
  }

  if (error)
    return (
      <View style={tw`p-4`}>
        <Text style={tw`text-red-500`}>Error loading artists.</Text>
        <Text>{String(error)}</Text>
      </View>
    );

  return (
    <ScrollView
      style={tw`flex-1 p-4`}
      contentContainerStyle={tw`pb-6`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {categorized.length === 0 ? (
        <Text style={tw`text-center text-gray-500 mt-4`}>
          No artists found.
        </Text>
      ) : (
        categorized.map((group, groupIndex) => {
          const groupKey = `${group.category_type}-${animateKey}`;

          return (
            <Animatable.View
              key={groupKey}
              animation="fadeInDown"
              duration={450}
              delay={groupIndex * 80}
              useNativeDriver
              style={tw`mb-8`}
            >
              <Text style={tw`text-lg font-bold text-gray-800 mb-3`}>
                {group.category_name}
              </Text>

              {/* Avatar Grid - items sized to fill full width */}
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {group.artists.map((artist: any, idx: number) => {
                  const key = String(
                    artist.id ??
                      `${group.category_type}-${artist.name}-${animateKey}-${idx}`
                  );
                  const imgUri =
                    artist.image_url ||
                    artist.image ||
                    "https://via.placeholder.com/150";

                  // stagger delay per item (small)
                  const itemDelay =
                    (idx % columns) * 60 + Math.floor(idx / columns) * 40;

                  return (
                    <Animatable.View
                      key={key}
                      animation="fadeInUp"
                      duration={500}
                      delay={100 + itemDelay}
                      useNativeDriver
                      style={{
                        width: exactItemSize,
                        marginHorizontal: ITEM_HORIZONTAL_MARGIN,
                        marginBottom: ITEM_HORIZONTAL_MARGIN * 1.5,
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          router.push(
                            `/artist?name=${encodeURIComponent(artist.name)}`
                          )
                        }
                        activeOpacity={0.8}
                        // constrain touchable to avoid children overflow
                        style={{ width: exactItemSize, alignItems: "center" }}
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

                        {/* Constrain label width and truncate if too long */}
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={{
                            marginTop: 6,
                            fontSize: 12,
                            lineHeight: 16,
                            textAlign: "center",
                            width: exactItemSize,
                            paddingHorizontal: 4,
                            color: "#374151",
                          }}
                        >
                          {artist.name}
                        </Text>
                      </TouchableOpacity>
                    </Animatable.View>
                  );
                })}
              </View>
            </Animatable.View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 72,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#eee",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  bottomIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 24,
  },
  bottomItem: {
    alignItems: "center",
    width: 56,
  },
});
