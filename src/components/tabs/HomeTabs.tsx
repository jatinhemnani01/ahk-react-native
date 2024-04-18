import * as React from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import KaraokeList from "../home/KaraokeList";
import AllKaraokeList from "../list/AllKaraokeList";

const FirstRoute = () => (
  <View style={{ flex: 1 }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: AllKaraokeList,
});

export default function HomeTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "second", title: "Second" },
    { key: "first", title: "New" },
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
