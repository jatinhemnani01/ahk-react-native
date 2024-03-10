import { firebase } from "@react-native-firebase/remote-config";

const remoteConfig = firebase.remoteConfig();

function getBaseURL() {
  let baseURL = "";
  remoteConfig
    .fetch(60)
    .then(() => {
      remoteConfig.fetchAndActivate();
    })
    .then(() => {
      const ok = remoteConfig.getValue("base_url");
      if (ok.asString() !== "") {
        baseURL = ok.asString();
      } else {
        baseURL = "";
      }
      console.log(ok);
    });

  return baseURL;
}

const BASE_URL = "http://192.168.29.87:5000";
// const BASE_URL = getBaseURL();

export default BASE_URL;
