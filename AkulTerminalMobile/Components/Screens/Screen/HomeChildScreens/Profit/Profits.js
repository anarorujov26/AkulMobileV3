import { View, Text, StyleSheet, ActivityIndicator, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Api from '../../../../../Global/Components/Api'
import { FlatList } from 'react-native';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import { ConvertFixedTable } from '../../../../../Global/Components/ConvertFixedTable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PStatusList from './../../../../../Global/Components/PStatusList';
import Item from '@ant-design/react-native/lib/list/ListItem';
import { Accordion, List } from '@ant-design/react-native';

const Profits = () => {

    const [profit, setProfit] = useState(null);

    const [activeSections, setActiveSections] = useState([2, 0]);

    const onChange = (updatedActiveSections) => {
        setActiveSections(updatedActiveSections);
    };

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
                <Item extra={ConvertFixedTable(profit.SaleSum)} arrow="empty">
                    Satış dövrüyyəsi
                </Item>
                <Item extra={ConvertFixedTable(profit.CostSum)} arrow="empty">
                    Mayası
                </Item>
                <Item extra={ConvertFixedTable(profit.TurnoverProfit)} arrow="empty">
                    Dövrüyyə mənfəəti
                </Item>
                <Accordion style={{ backgroundColor: 'white' }} onChange={onChange} activeSections={activeSections}>
                    <Accordion.Panel header="Xərclər (toplam)">
                        <List>
                            {
                                profit.SpendItems.map((element, index) => (
                                    <List.Item extra={ConvertFixedTable(element.Amount)}>{element.Name}</List.Item>
                                ))
                            }

                        </List>
                    </Accordion.Panel>
                </Accordion>
                <Item extra={ConvertFixedTable(profit.NetProfit)} arrow="empty">
                    Təmiz mənfəət
                </Item>
            </View>
    )
}




export default Profits
