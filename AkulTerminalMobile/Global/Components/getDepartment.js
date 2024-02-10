import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "./Api";

const getDepartment = async (id, dont) => {
    let answer;
    const result = await Api('departments/get.php', {
        token: await AsyncStorage.getItem("token")
    })
    if (result.data.Body.List[0]) {
        let lists = [...result.data.Body.List];
        if (dont) {
            answer = {
                Id: lists[0].Id,
                Name: lists[0].Name
            }
        } else {
            lists.forEach((item, index) => {
                if (item.Id === id) {
                    answer = item.Name;
                }
            })
        }
    } else {
        answer = ""
    }

    return answer;
}

export default getDepartment;