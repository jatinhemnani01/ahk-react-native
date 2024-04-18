import { View, ActivityIndicator } from "react-native";
import { Text } from "@rneui/base";
import { AlphabetList } from "react-native-section-alphabet-list";
import React, { useEffect, useState } from "react";

export default function AllKaraokeList() {
  const [list, setList] = useState([]);


  async function getList() {
    const data = await fetch(
      "https://pub-c2824179ee6f40abab7b9d770b4a7354.r2.dev/karaoke.json"
    ).then((res) => res.json());
    setList(
      data?.map((item: any) => {
        return {
          key: item?.kid,
          value: item?.title,
        };
      })
    );
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <View style={{ padding: 10 }}>
      {list.length !== 0 && (
        <AlphabetList
          data={list}
          indexLetterStyle={{
            color: "blue",
            fontSize: 15,
          }}
        />
      )}
    </View>
  );
}
