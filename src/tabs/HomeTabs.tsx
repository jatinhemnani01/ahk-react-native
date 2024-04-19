import * as React from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import KaraokeList from "../components/home/KaraokeList";
import AllKaraokeList from "./AllKaraokeList";
import NewKaraoke from "./NewKaraoke";

const FirstRoute = () => <View style={{ flex: 1 }} />;

const renderScene = SceneMap({
  new: NewKaraoke,
  list: AllKaraokeList,
});

export default function HomeTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "new", title: "New" },
    { key: "list", title: "List" },
  ]);

  return (
    <TabView
      lazy={true}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
