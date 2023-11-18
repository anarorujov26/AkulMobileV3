import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {

    const [prefix, setPrefix] = useState("");
    const [prices, setPrices] = useState({ priceId: null, priceName: "Satış qiyməti" });
    const [loginTYPE, setLoginTYPE] = useState(null);
    const [listType, setListType] = useState(2);

    const getPT = async () => {
        if (await AsyncStorage.getItem("lt") !== null) {
            setListType(await AsyncStorage.getItem("lt"));
        }
        if (await AsyncStorage.getItem("type") !== null) {
            setLoginTYPE(JSON.parse(await AsyncStorage.getItem("type")));
        }
        if (await AsyncStorage.getItem("pricesType") !== null) {
            setPrices(JSON.parse(await AsyncStorage.getItem("pricesType")));
        }
    }

    useEffect(() => {
        getPT();
    }, [])

    return (
        <GlobalContext.Provider value={
            {
                prefix,
                setPrefix,
                prices,
                setPrices,
                loginTYPE,
                setLoginTYPE,
                listType,
                setListType
            }
        }>
            {props.children}
        </GlobalContext.Provider>
    );

}