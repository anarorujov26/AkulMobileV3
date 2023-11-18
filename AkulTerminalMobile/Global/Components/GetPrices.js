import AsyncStorage from "@react-native-async-storage/async-storage";

const GetPrices = async () => {
    let pricesOBJ = JSON.parse(await AsyncStorage.getItem("pricesType"))
    if (pricesOBJ == null) {
        return { priceId: null, priceName: "Satış qiyməti" }
    } else {
        return pricesOBJ;
    }
}

export default GetPrices;