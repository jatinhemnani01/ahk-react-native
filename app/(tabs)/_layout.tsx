import { Tabs } from "expo-router/tabs";
export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitleAlign: "center",
          tabBarLabelStyle: { fontSize: 15 },
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "#2E3AE5" },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerTitleAlign: "center",
          tabBarLabelStyle: { fontSize: 15 },
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "#2E3AE5" },
        }}
      />
      <Tabs.Screen
        name="popular"
        options={{
          title: "Popular",
          headerTitleAlign: "center",
          tabBarLabelStyle: { fontSize: 15 },
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "#2E3AE5" },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitleAlign: "center",
          tabBarLabelStyle: { fontSize: 15 },
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "#2E3AE5" },
        }}
      />
    </Tabs>
  );
}
