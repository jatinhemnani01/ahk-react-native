import { Icon } from "@rneui/base";
import { Tabs } from "expo-router/tabs";
import { View, Text } from "react-native";
import { colors } from "../../src/constants/colors";
import { router } from "expo-router";
import { updateSubscription } from "../../src/subscription/getSubscription";
import { useEffect } from "react";
import { MobileAds } from "react-native-google-mobile-ads";
import BannerAdComp from "../../src/ads/BannerAdComp";

export default function TabLayout() {
  const MoreComp = () => {
    return (
      <Icon
        onPress={() => router.navigate("settings")}
        name="more-vertical"
        type="feather"
        color={"white"}
        size={25}
        style={{ marginRight: 10 }}
      />
    );
  };

  useEffect(() => {
    MobileAds().initialize();
    const timeout = setTimeout(() => {
      updateSubscription();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Tabs backBehavior="history">
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerTitleAlign: "center",
            tabBarLabelStyle: { fontSize: 15, color: "black" },
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: colors.primary },
            headerRight: MoreComp,
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Icon name="home" color={focused ? colors.primary : "grey"} />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="free"
          options={{
            title: "Free",
            headerTitleAlign: "center",
            tabBarLabelStyle: { fontSize: 15, color: "black" },
            headerTitleStyle: { color: "white" },
            headerRight: MoreComp,
            headerStyle: { backgroundColor: colors.primary },
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Icon
                    name="headphones"
                    type="feather"
                    color={focused ? colors.primary : "grey"}
                  />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerTitleAlign: "center",
            tabBarLabelStyle: { fontSize: 15, color: "black" },
            headerTitleStyle: { color: "white" },
            headerRight: MoreComp,
            headerStyle: { backgroundColor: colors.primary },
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Icon
                    name="search"
                    color={focused ? colors.primary : "grey"}
                  />
                </View>
              );
            },
          }}
        />

        <Tabs.Screen
          name="favourite"
          options={{
            title: "Favourite",
            headerTitleAlign: "center",
            tabBarLabelStyle: { fontSize: 15, color: "black" },
            headerTitleStyle: { color: "white" },
            headerRight: MoreComp,
            headerStyle: { backgroundColor: colors.primary },
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Icon
                    name="heart"
                    type="font-awesome"
                    size={20}
                    color={focused ? colors.primary : "grey"}
                  />
                </View>
              );
            },
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerTitleAlign: "center",
            tabBarLabelStyle: { fontSize: 15, color: "black" },
            headerTitleStyle: { color: "white" },
            headerRight: MoreComp,
            headerStyle: { backgroundColor: colors.primary },
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Icon
                    name="person"
                    size={30}
                    color={focused ? colors.primary : "grey"}
                  />
                </View>
              );
            },
          }}
        />
      </Tabs>
      <BannerAdComp />
    </>
  );
}
