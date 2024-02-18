import { ScrollView } from "react-native";
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
            "10,000+ Karaoke",
            "24x7 Support",
            "Change Speed/Scale",
            "No Ads",
          ]}
          button={{
            title: "Contact Us",
            buttonStyle: tw`rounded-lg`,
          }}
          pricingStyle={tw`text-xl`}
        />
      </ScrollView>
    </>
  );
}
