import { firebase } from "@react-native-firebase/remote-config";

const remoteConfig = firebase.remoteConfig();

export class RemoteConfigService {
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

  public async getBaseURL() {
    return remoteConfig.fetch(1).then(() => {
      return remoteConfig.getValue("base_url").asString();
    });
  }
}
