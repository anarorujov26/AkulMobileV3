import AsyncStorage from "@react-native-async-storage/async-storage"
import Api from "./Api";

const SettingPermission = async () => {

    const result = await Api('permissions/get.php', {
        token: await AsyncStorage.getItem("token")
    })
    if (result.data.Body.Permissions !== null) {
        let answer;
        if(result.data.Body.Permissions.settingPage){
            let obj = result.data.Body.Permissions.settingPage
            answer = obj.U == "0" ? true : false
        }else{
            answer = true
        }

        return answer
    } else {
        return true
    }
}

export default SettingPermission