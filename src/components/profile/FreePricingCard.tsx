import { ScrollView } from "react-native";
import React from "react";
import { PricingCard } from "@rneui/base";
import { colors } from "../../constants/colors";
import tw from "twrnc";

export default function FreePricingCard({ onPress }: { onPress: () => void }) {
  return (
    <>
      <ScrollView>
        <PricingCard
          containerStyle={tw`rounded-xl`}
          color={colors.primary}
          title="Free"
          price="$0"
          info={["Free Karaoke", "Basic Support", "Change Speed/Scale"]}
          button={{
            title: "Buy Now",
            onPress: onPress,
            buttonStyle: tw`rounded-lg`,
          }}
        />
      </ScrollView>
    </>
  );
}
