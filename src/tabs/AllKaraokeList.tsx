import { View, ActivityIndicator, Dimensions, Alert } from "react-native";
import { Button, Text } from "@rneui/base";
import { AlphabetList } from "react-native-section-alphabet-list";
import React, { useEffect, useState } from "react";
import { checkList, clearList, getListLocal, saveList } from "../storage/listStorage";
import { colors } from "../constants/colors";

export default function AllKaraokeList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getList() {
    setLoading(true);

    if (await checkList()) {
      console.log("loading from local storage");
      const data = await getListLocal();
      if (data) {
        setList(data);
        setLoading(false);
      }
    } else {
      console.log("loading remote");

      try {
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
        // saving list in local storage
        const jsonList = data?.map((item: any) => {
          return {
            key: item?.kid,
            value: item?.title,
          };
        });
        saveList(JSON.stringify(jsonList));
      } catch (error) {
        Alert.alert("Something Went Wrong! Try again after few minutes");
      } finally {
        setLoading(false);
      }
    }
  }

  function refreshList(){
    clearList()
    getList()
  }

  useEffect(() => {
    getList();
  }, []);

  if (loading) {
    return <ActivityIndicator size={"large"} color={colors.primary} />;
  }

  return (
    <View>
      <Button type="outline" onPress={refreshList}>Click Here To Refresh</Button>
      {list.length !== 0 && (
        <AlphabetList
          data={list}
          indexLetterStyle={{
            color: "blue",
            fontSize: 15,
            display: "flex",
            gap: 10,
          }}
          indexContainerStyle={{
            marginRight: 10,
          }}
        />
      )}
    </View>
  );
}
