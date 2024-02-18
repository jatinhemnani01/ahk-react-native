import { Stack } from "expo-router";
import { colors } from "../src/constants/colors";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
    <StatusBar style="light" />
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
