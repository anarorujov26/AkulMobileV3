import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "./Api";

const getStockName = async (stockId) => {
    let answer = null;
    const result = await Api('stocks/get.php', { pg: 0, lm: 1000000, token: await AsyncStorage.getItem('token') })
    let data = [...result.data.Body.List];
    for(let index = 0;index < data.length;index++){
        if(data[index].Id == stockId){
            answer = data[index].Name;
        }
    }

    return answer;
}

export default getStockName;