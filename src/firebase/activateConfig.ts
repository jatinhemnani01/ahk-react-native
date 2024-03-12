import { firebase } from "@react-native-firebase/remote-config";

export const remoteConfig = firebase.remoteConfig();

export async function activateConfig() {
  await remoteConfig.fetch(0);
  await remoteConfig.fetchAndActivate();
}

