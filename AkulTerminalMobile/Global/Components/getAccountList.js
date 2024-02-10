import AsyncStorage from "@react-native-async-storage/async-storage";

const getAccountList = async () => {
    if (await AsyncStorage.getItem("accountList") == null) return null;
    return JSON.parse(await AsyncStorage.getItem("accountList"));
}

export default getAccountList;