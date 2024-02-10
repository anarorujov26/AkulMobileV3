import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "./Api";

const getSalePoint = async (id) => {

    let answer;
    const result = await Api('salepoints/get.php', {
        token: await AsyncStorage.getItem("token")
    })

    if (result.data.Body.List[0]) {
        let lists = [...result.data.Body.List];
        lists.forEach((item, index) => {
            if (item.Id === id) {
                answer = item.Name;
            }
        })
    } else {
        answer = ""
    }

    return answer
}

export default getSalePoint;