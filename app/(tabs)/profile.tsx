import React, { useEffect } from "react";
import { Alert, Platform, View, ScrollView, SafeAreaView, TouchableOpacity, Linking } from "react-native";
import { router } from "expo-router";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";
import tw from "twrnc";
import { updateSubscription } from "../../src/subscription/getSubscription";
import isProStore from "../../src/state/isPro";
import FreePricingCard from "../../src/components/profile/FreePricingCard";
import PremiumPricingCard from "../../src/components/profile/PremiumPricingCard";
import analytics from "@react-native-firebase/analytics";
import { Text, Icon } from "@rneui/themed";

export default function Profile() {
  const isPro = isProStore((state: any) => state.isPro);
  const toPro = isProStore((state: any) => state.toPro);
  const toFree = isProStore((state: any) => state.toFree);
  const isIos = Platform.OS === "ios";

  async function displayPaywall() {
    if (isIos) {
      Alert.alert(
        "Subscription",
        "• Payment will be charged to iTunes Account at confirmation of purchase \n • Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period. \n Cancel anytime Settings > Apple ID one day before renewal date"
      );
    }

    const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall();
    if (paywallResult === PAYWALL_RESULT.PURCHASED) {
      toPro();
      console.log("User purchased");
      Alert.alert(
        "Success!",
        "Purchase Successful! Thank you for your purchase!"
      );
      analytics().logEvent("yes_purchase");
    } else if (paywallResult === PAYWALL_RESULT.RESTORED) {
      // isProStore.setState({ isPro: true });

      toPro();
      Alert.alert(
        "Success!",
        "Restore Successful! Thank you for your purchase!"
      );
    } else {
      toFree();
      console.log("User did not purchase");
      analytics().logEvent("no_purchase");
    }
    await updateSubscription();
  }

  const RenderPricingCard = () => {
    if (isPro) {
      return <PremiumPricingCard />;
    } else {
      return <FreePricingCard onPress={displayPaywall} />;
    }
  };

  const handleUserIdPress = () => {
    router.push("/userID");
  };

  const handleAccountSettingsPress = () => {
    router.push("/settings");
  };

  const handleHelpSupportPress = () => {
    // Replace with your WhatsApp number or group invite link
    Linking.openURL("whatsapp://send?phone=+918962210828");
  };

  useEffect(() => {
    analytics().logScreenView({
      screen_name: "Profile",
      screen_class: "Profile",
    });
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <ScrollView contentContainerStyle={tw`flex-grow`}>
        <View style={tw`px-4 py-6`}>
          <Text style={tw`text-3xl font-bold text-gray-800 mb-2`}>
            Your Profile
          </Text>
          <Text style={tw`text-gray-600 mb-6`}>
            Manage your subscription and account settings
          </Text>
        </View>

        <View style={tw`px-4 mb-6`}>
          <View style={tw`bg-white rounded-xl shadow-md p-6`}>
            <View style={tw`flex-row items-center mb-4`}>
              <Icon
                name={isPro ? "star" : "user"}
                type="font-awesome"
                color={isPro ? "#FFD700" : "#4A5568"}
                size={24}
              />
              <Text style={tw`ml-3 text-xl font-semibold text-gray-800`}>
                {isPro ? "Premium Member" : "Free Member"}
              </Text>
            </View>
            <Text style={tw`text-gray-600 mb-4`}>
              {isPro
                ? "Enjoy all premium features and content"
                : "Upgrade to access premium features"}
            </Text>
            <RenderPricingCard />
          </View>
        </View>

        <View style={tw`px-4 mb-6`}>
          <Text style={tw`text-xl font-semibold text-gray-800 mb-4`}>
            Quick Actions
          </Text>
          <View style={tw`bg-white rounded-xl shadow-md p-4`}>
            <TouchableOpacity
              onPress={handleUserIdPress}
              style={tw`flex-row items-center justify-between py-3 border-b border-gray-200`}
            >
              <Text style={tw`text-gray-700`}>User ID</Text>
              <Icon name="chevron-right" type="feather" color="#4A5568" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAccountSettingsPress}
              style={tw`flex-row items-center justify-between py-3 border-b border-gray-200`}
            >
              <Text style={tw`text-gray-700`}>Account Settings</Text>
              <Icon name="chevron-right" type="feather" color="#4A5568" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleHelpSupportPress}
              style={tw`flex-row items-center justify-between py-3`}
            >
              <Text style={tw`text-gray-700`}>Help & Support</Text>
              <Icon name="chevron-right" type="feather" color="#4A5568" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
