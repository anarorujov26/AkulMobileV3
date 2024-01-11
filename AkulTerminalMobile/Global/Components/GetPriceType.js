import AsyncStorage from "@react-native-async-storage/async-storage"
import Api from "./Api"

const GetPriceType = async (id) => {
    let answer;
    const result = await Api('pricetypes/get.php', { token: await AsyncStorage.getItem("token") });
    if (id === 0) {
        answer = {
            Id: 0,
            Name: ""
        }
    } else {
        if (result.data.Body.List[0]) {
            let data = [...result.data.Body.List];
            for (let i = 0; i < data.length; i++) {
                if (data[i].Id == id) {
                    answer = data[i];
                }
            }
        } else {
            answer = {};
        }
    }

    return answer;
}

export default GetPriceType