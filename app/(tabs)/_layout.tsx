import { Icon } from "@rneui/base";
import { Tabs } from "expo-router/tabs";
import { View } from "react-native";
import { colors } from "../../src/constants/colors";
import { router } from "expo-router";
export default function TabLayout() {
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
            headerRight: () => {
              return (
                <Icon
                  onPress={() => router.navigate("settings")}
                  name="menu"
                  color={"white"}
                  size={25}
                  style={{ marginRight: 20 }}
                />
              );
            },
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
          name="search"
          options={{
            title: "Search",
            headerTitleAlign: "center",
            tabBarLabelStyle: { fontSize: 15, color: "black" },
            headerTitleStyle: { color: "white" },
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
          name="popular"
          options={{
            title: "Popular",
            headerTitleAlign: "center",
            tabBarLabelStyle: { fontSize: 15, color: "black" },
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: colors.primary },
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Icon
                    name="fire"
                    type="font-awesome-5"
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
            headerStyle: { backgroundColor: colors.primary },
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Icon
                    name="person"
                    color={focused ? colors.primary : "grey"}
                  />
                </View>
              );
            },
          }}
        />
      </Tabs>
    </>
  );
}
