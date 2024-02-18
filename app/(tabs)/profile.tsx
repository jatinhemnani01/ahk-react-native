import { PricingCard } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View } from "react-native";
import RevenueCatUI from "react-native-purchases-ui";
import { colors } from "../../src/constants/colors";
import tw from "twrnc";

export default function profile() {
  function buy() {
    RevenueCatUI.presentPaywall();
  }

  return (
    <>
      <View style={tw`flex justify-center flex-row flex-1 items-center`}>
        <ScrollView>
          <PricingCard
            containerStyle={tw`rounded-xl`}
            color={colors.primary}
            title="Free"
            price="$0"
            info={["Free Karaoke", "Basic Support", "Change Speed/Scale"]}
            button={{
              title: "Buy Now",
              onPress: buy,
              buttonStyle: tw`rounded-lg`,
            }}
          />
        </ScrollView>
        <StatusBar style="light" />
      </View>
    </>
  );
}
