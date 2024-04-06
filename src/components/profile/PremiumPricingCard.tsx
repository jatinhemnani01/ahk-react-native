import { Linking, ScrollView } from "react-native";
import React from "react";
import { PricingCard } from "@rneui/base";
import { colors } from "../../constants/colors";
import tw from "twrnc";

export default function PremiumPricingCard() {
  return (
    <>
      <ScrollView>
        <PricingCard
          containerStyle={tw`rounded-xl`}
          color={colors.primary}
          title="Premium"
          price="All Features Unlocked"
          info={[
            "8,000+ Karaoke",
            "Premium Support",
            "Change Pitch/Tempo/Key",
            "No Ads",
          ]}
          button={{
            title: "Contact Us",
            buttonStyle: tw`rounded-lg`,
            onPress: () => {
              Linking.openURL("whatsapp://send?phone=+918962210828");
            },
          }}
          pricingStyle={tw`text-xl`}
        />
      </ScrollView>
    </>
  );
}
