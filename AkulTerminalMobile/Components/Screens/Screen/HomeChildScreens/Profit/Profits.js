import { View, Text, StyleSheet, ActivityIndicator, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Api from '../../../../../Global/Components/Api'
import { FlatList } from 'react-native';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import { ConvertFixedTable } from '../../../../../Global/Components/ConvertFixedTable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PStatusList from './../../../../../Global/Components/PStatusList';

const Profits = () => {

    const [profit, setProfit] = useState(null);

    const getInfo = async () => {
        let obj = {
            dr: 1,
            pg: 0,
            lm: 100,
            docNumber: "maya",
            token: await AsyncStorage.getItem("token")
        }
        const result = await Api('profit/get.php', obj);
        setProfit(result.data.Body);
    }

    useEffect(() => {
        getInfo();
    }, [])
    return (
        profit == null ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color={CustomColors.primary} />
            </View>
            :
            <View style={{ flex: 1 }}>
                <PStatusList index={0} item={'Satış dövrüyyəsi'} itemTwo={ConvertFixedTable(profit.SaleSum)} />
                <PStatusList index={1} item={'Mayası'} itemTwo={ConvertFixedTable(profit.CostSum)} />
                <PStatusList index={2} item={'Dövrüyyə mənfəəti'} itemTwo={ConvertFixedTable(profit.TurnoverProfit)} />
                <PStatusList index={3} item={'Xərclər (toplam)'} itemTwo={ConvertFixedTable(profit.SpendItemsSum)} />
                <FlatList data={profit.SpendItems} renderItem={({ item, index }) => (
                    <PStatusList index={3} item={item.Name} itemTwo={ConvertFixedTable(item.Amount)} />
                )} />
                <PStatusList index={5} item={'Təmiz mənfəət'} itemTwo={ConvertFixedTable(profit.NetProfit)} />
            </View>
    )
}




export default Profits
