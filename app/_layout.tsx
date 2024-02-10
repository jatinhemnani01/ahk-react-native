import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AppLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="video" />
        <Stack.Screen
          name="free"
          options={{
            animation: "ios",
          }}
        />
      </Stack>
    </>
  );
}
