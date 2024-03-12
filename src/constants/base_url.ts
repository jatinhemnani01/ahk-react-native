import { firebase } from "@react-native-firebase/remote-config";

const remoteConfig = firebase.remoteConfig();

async function getBaseURL() {
  const ok = remoteConfig
    .fetch()
    .then(() => remoteConfig.fetchAndActivate())
    .then(() => {
      return remoteConfig.getString("base_url");
    });
  return ok;
}

const BASE_URL = "http://192.168.29.87:5000";
// const BASE_URL = getBaseURL();

export default BASE_URL;
