import { Icon } from "@rneui/base";
import { Tabs } from "expo-router/tabs";
import { View } from "react-native";
import { colors } from "../../src/constants/colors";
export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitleAlign: "center",
          tabBarLabelStyle: { fontSize: 15, color: "black" },
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: colors.primary },
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
                <Icon name="search" color={focused ? colors.primary : "grey"} />
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
                <Icon name="person" color={focused ? colors.primary : "grey"} />
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
}
