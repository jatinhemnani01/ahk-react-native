import * as React from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import KaraokeList from "../components/home/KaraokeList";
import AllKaraokeList from "./AllKaraokeList";
import NewKaraoke from "./NewKaraoke";
import PopularKaraokeList from "../components/popular/PopularKaraokeList";
import { colors } from "../constants/colors";
import ArtistsList from "./ArtistsList";

const renderScene = SceneMap({
  new: NewKaraoke,
  all: ArtistsList,
  popular: PopularKaraokeList,
  list: AllKaraokeList,
});



export default function HomeTabs() {
  const layout = useWindowDimensions();

  const renderTabBar = (props:any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: colors.primary }}
    />
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "new", title: "New" },
    { key: "all", title: "Artists" },
    { key: "popular", title: "Popular" },
    { key: "list", title: "List" },
  ]);

  return (
    <TabView
      lazy={true}
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
