import BASE_URL from "../../src/constants/base_url";
import inAppMessaging from "@react-native-firebase/in-app-messaging";
import { useEffect } from "react";
import analytics from "@react-native-firebase/analytics";
import HomeTabs from "../../src/tabs/HomeTabs";

export default function Home() {
  const baseURL = BASE_URL((state) => state.baseURL);

  async function loadInAppMessaging() {
    await inAppMessaging().setMessagesDisplaySuppressed(false);
  }

  useEffect(() => {
    loadInAppMessaging();
    analytics().logScreenView({
      screen_name: "Home",
      screen_class: "Home",
    });
  }, []);

  return (
    <>
      <HomeTabs />
    </>
  );
}
