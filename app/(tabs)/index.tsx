import { Pressable, View, Text } from "react-native";
import KaraokeTile from "../../src/components/KaraokeTile";
import tw from "twrnc";
import { router } from "expo-router";
export default function AppLayout() {
  return (
    <View>
      <View>
        <Pressable
          onPress={() => router.navigate("/free")}
          style={tw`flex flex-row justify-center m-2`}
        >
          <Text style={tw`text-lg text-blue-500 font-semibold`}>
            Explore Free Karaoke
          </Text>
        </Pressable>
      </View>
      <KaraokeTile />
    </View>
  );
}
