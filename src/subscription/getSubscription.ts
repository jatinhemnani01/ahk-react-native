import Purchases from "react-native-purchases";

function isEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}

export async function getSubscription() {
  const customerInfo = await Purchases.getCustomerInfo();
  const entitlements = customerInfo.entitlements.active;

  if (!isEmpty(entitlements)) {
    return true;
  } else {
    return false;
  }
}
