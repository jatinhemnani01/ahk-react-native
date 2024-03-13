import { firebase } from "@react-native-firebase/remote-config";

const remoteConfig = firebase.remoteConfig();

export class ForAll {
  constructor() {
    this.init();
  }

  public async init() {
    await remoteConfig.fetchAndActivate();
  }

  public async getForAllConfig() {
    return remoteConfig.fetch(1).then(() => {
      return remoteConfig.getValue("all").asBoolean();
    });
  }
}
