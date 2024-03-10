import AsyncStorage from "@react-native-async-storage/async-storage"
import Api from "./Api"

const getOwnerName = async (ownerId) => {
    const result = await Api('owners/get.php', { token: await AsyncStorage.getItem('token') })
    let list = [...result.data.Body.List];
    if (ownerId == null) {
        return list[0];
    } else {
        let index = list.findIndex(rel => rel.Id == ownerId);
        return list[index].Name
    }
}

export default getOwnerName;