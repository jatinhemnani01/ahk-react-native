import { firebase } from "@react-native-firebase/remote-config";

const remoteConfig = firebase.remoteConfig();

export class RemoteConfigService {
  constructor() {
    this.init();
  }

  public async init() {
    await remoteConfig.fetchAndActivate();
    await remoteConfig.setConfigSettings({
      minimumFetchIntervalMillis: 600000,
    });
  }

  public async getEverything() {
    try {
      return await remoteConfig.fetchAndActivate().then(() => {
        const all = remoteConfig.getAll();
        return {
          all: all?.["all"].asBoolean(),
          base_url: all?.["base_url"].asString(),
          img: all?.["img"].asString(),
          download: all?.["download"].asString(),
        };
      });
    } catch (error) {
      return {
        all: false,
        base_url:
          "https://thf4yzhfcjpde5ausggkraw26e0pnnzd.lambda-url.ap-south-1.on.aws",
        img: "https://pub-c2824179ee6f40abab7b9d770b4a7354.r2.dev/AHK.png",
        download: "https://ahkaraoke.vercel.app/#",
      };
    }
  }

  public async getForAllConfig() {
    try {
      return await remoteConfig.fetch(300).then(() => {
        return remoteConfig.getValue("all").asBoolean();
      });
    } catch (error) {
      return false;
    }
  }

  public async getBaseURL() {
    try {
      return await remoteConfig.fetch(300).then(() => {
        return remoteConfig.getValue("base_url").asString();
      });
    } catch (error) {
      return "https://thf4yzhfcjpde5ausggkraw26e0pnnzd.lambda-url.ap-south-1.on.aws";
    }
  }

  public async getImgURL() {
    try {
      return await remoteConfig.fetch(1).then(() => {
        return remoteConfig.getValue("img").asString();
      });
    } catch (error) {
      return "https://ahkaraoke-admin.vercel.app/image.jpg";
    }
  }
}
