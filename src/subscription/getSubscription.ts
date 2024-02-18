import Purchases from "react-native-purchases";
import isProStore from "../state/isPro";

function isEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}

export async function updateSubscription() {
  const customerInfo = await Purchases.getCustomerInfo();
  const entitlements = customerInfo.entitlements.active;

  if (!isEmpty(entitlements)) {
    isProStore.setState({ isPro: true });
    return true;
  } else {
    isProStore.setState({ isPro: false });
    return false;
  }
}
