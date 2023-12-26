import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "./Api";

const getTemplates = async (type) => {
    let list = [];
    const result = await Api('templates/get.php', {token: await AsyncStorage.getItem("token")});
    if (result.data.Body.List[0]) {
        let lists = [...result.data.Body.List]
        for (let index = 0; index < lists.length; index++)if (lists[index].Target == type) list.push(lists[index]);}
    return list;
}
export default getTemplates;