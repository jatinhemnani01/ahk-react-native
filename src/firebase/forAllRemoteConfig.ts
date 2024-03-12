import { firebase } from "@react-native-firebase/remote-config";

const remoteConfig = firebase.remoteConfig();

export const forAllRemoteConfig = remoteConfig
  .fetch()
  .then(() => remoteConfig.fetchAndActivate())
  .then(() => {
    const ok = remoteConfig.getValue("for_all");
    if (ok.asBoolean() === true) {
      return true;
    } else {
      return false;
    }
  });
