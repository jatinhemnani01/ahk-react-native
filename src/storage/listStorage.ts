import AsyncStorage from "@react-native-async-storage/async-storage";

export async function checkList() {
  const data = await AsyncStorage.getItem("list");
  if (data) {
    return true;
  } else {
    return false;
  }
}

export async function saveList(list: string) {
  await AsyncStorage.setItem("list", list);
}

// interface Item {
//   value: string;
//   key: string;
// }

export async function getListLocal(): Promise<any> {
  const data = await AsyncStorage.getItem("list");
  if (data) {
    return JSON.parse(data);
  } else {
    return null;
  }
}

export async function clearList() {
  try {
    await AsyncStorage.removeItem("list");
  } catch (error) {
    throw Error("Something went wrong");
  }
}
