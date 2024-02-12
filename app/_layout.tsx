import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "../src/constants/colors";

export default function AppLayout() {
  return (
    <>
      <StatusBar style="light"  />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="video"
          options={{
            animation: "ios",
            title: "Video",
            headerStyle: { backgroundColor: colors.primary },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="free"
          options={{
            animation: "ios",
            title: "Free Karaoke",
            headerStyle: { backgroundColor: colors.primary },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
          }}
        />
      </Stack>
    </>
  );
}
