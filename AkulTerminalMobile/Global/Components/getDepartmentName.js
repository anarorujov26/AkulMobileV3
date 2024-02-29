import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "./Api";

const getDepartmentName = async (dpId) => {
    const result = await Api('departments/get.php', { token: await AsyncStorage.getItem('token') })
    let list = [...result.data.Body.List];
    let index = list.findIndex(rel => rel.Id == dpId);
    return list[index].Name;
}

export default getDepartmentName;