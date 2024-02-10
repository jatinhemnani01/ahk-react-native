import { useRouter } from "expo-router";
import { View, Text, Button } from "react-native";
export default function AppLayout() {
  const router = useRouter();
  return (
    <View>
      <Text>ASASA</Text>
      <Button
        title="Video"
        onPress={() => router.push({ pathname: "/video", params: { id: 2 } })}
      />
    </View>
  );
}
