import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "./Api";

const modificationsGroup = async (pM, type) => {

    let obj = {
        token: await AsyncStorage.getItem('token')
    }

    if(type !== null){
        obj.target = type
    }

    const result = await Api("modificationgroup/get.php", obj)

    let m = result.data.Body;

    if (m && pM) {
        let modifications = [...m];
        let productModifications = { ...pM };
        let newModifications = [];

        modifications.forEach((element, index) => {
            if (productModifications[element.Column] !== null) {
                newModifications.push({
                    column: element.Column,
                    type: element.Type,
                    value: productModifications[element.Column],
                    title: element.Title
                })
            }
        })

        return newModifications;
    } else {
        return [];
    }
}

export default modificationsGroup