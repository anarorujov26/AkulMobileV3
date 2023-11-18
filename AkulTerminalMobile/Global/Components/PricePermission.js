import AsyncStorage from "@react-native-async-storage/async-storage"
import Api from "./Api";

const PricePermission = async () => {

    const result = await Api('permissions/get.php', {
        token: await AsyncStorage.getItem("token")
    })
    if (result.data.Body.Permissions != null) {
        let answer;
        if(result.data.Body.Permissions.price){
            let obj = result.data.Body.Permissions.price
            answer = obj.U == "0" ? true : false
        }else{
            answer = true
        }

        return answer
    } else {
        return true
    }
}

export default PricePermission