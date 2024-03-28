import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import eventEmitter from './../../eventEmitter';

const Api2 = async (link, obj) => {
    const publicMode = await AsyncStorage.getItem("apiLocation");
    const result = await axios.post(`https://api.akul.az/1.0/online/` + link, obj);

    if (result.data.Headers.ResponseStatus == "104") {
        eventEmitter.emit('showModalEvent');
    }

    return result;
}

export default Api2;