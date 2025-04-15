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
          title="Get Premium Now"
          price="Buy Now and get access to 8,000+ Karaoke"
          info={["8,000+ Karaoke", "Premium Support", "Change Tempo/Key"]}
          button={{
            title: "Buy Now",
            onPress: onPress,
            buttonStyle: tw`rounded-lg`,
          }}
          pricingStyle={tw`text-lg`}
        />
      </ScrollView>
    </>
  );
}
