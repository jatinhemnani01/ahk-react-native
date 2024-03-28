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
    return remoteConfig.fetch(300).then(() => {
      return remoteConfig.getValue("all").asBoolean();
    });
  }

  public async getBaseURL() {
    return remoteConfig.fetch(300).then(() => {
      return remoteConfig.getValue("base_url").asString();
    });
  }

  public async getImgURL() {
    return remoteConfig.fetch(300).then(() => {
      return remoteConfig.getValue("img").asString();
    });
  }
}
