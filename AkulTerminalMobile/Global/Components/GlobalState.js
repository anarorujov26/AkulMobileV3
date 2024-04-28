import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import PricePermission from "./PricePermission";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {

    const [prefix, setPrefix] = useState("");
    const [prices, setPrices] = useState({ priceId: null, priceName: "Satış qiyməti" });
    const [loginTYPE, setLoginTYPE] = useState(null);
    const [listType, setListType] = useState(2);
    const [pageSetting, setPageSetting] = useState([
        {
            id: 1,
            answer: true,
        },
        {
            id: 2,
            answer: true,
        },
        {
            id: 3,
            answer: true,
        },
        {
            id: 4,
            answer: true,
        },
        {
            id: 5,
            answer: true,
        },
        {
            id: 6,
            answer: true,
        },
        {
            id: 7,
            answer: true,
        },
        {
            id: 8,
            answer: true
        },
        {
            id: 9,
            answer: true
        }
    ]);

    const getPT = async () => {
        if (await AsyncStorage.getItem("lt") !== null) {
            setListType(await AsyncStorage.getItem("lt"));
        }
        if (await AsyncStorage.getItem("type") !== null) {
            setLoginTYPE(JSON.parse(await AsyncStorage.getItem("type")));
        }
        if (await AsyncStorage.getItem("pricesType") !== null) {
            if (await PricePermission()) {
                setPrices(JSON.parse(await AsyncStorage.getItem("pricesType")));
            } else {
                setPrices({ priceId: null, priceName: "Satış qiyməti" });
            }
        }

        if (await AsyncStorage.getItem("pS") !== null) {
            setPageSetting(JSON.parse(await AsyncStorage.getItem("pS")))
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
                setListType,
                pageSetting,
                setPageSetting
            }
        }>
            {props.children}
        </GlobalContext.Provider>
    );

}