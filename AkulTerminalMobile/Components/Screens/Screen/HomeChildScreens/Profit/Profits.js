import { View, Text, StyleSheet, ActivityIndicator, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Api from '../../../../../Global/Components/Api'
import CustomColors from '../../../../../Global/Colors/CustomColors';
import { ConvertFixedTable } from '../../../../../Global/Components/ConvertFixedTable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Accordion, List } from '@ant-design/react-native';
import DocumentSearch from '../../../../../Global/Components/DocumentSearch';

const Profits = () => {

    const [profit, setProfit] = useState(null);

    const [activeSections, setActiveSections] = useState([2, 0]);
    const [search, setSearch] = useState("");

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
                <ActivityIndicator size={50} color={CustomColors("dark").primary} />
            </View>
            :
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <DocumentSearch
                    apiObject={{
                        momentFirst: true,
                        momentEnd: true
                    }}
                    getData={getInfo} placeholder={'Sənəd nömrəsi ilə axtarış...'} search={search} setSearch={setSearch} setData={setProfit} apiAdress={'profit/get.php'} />

                <View style={styles.listItem}>
                    <Text style={{ color: 'black', fontSize: 20 }}>Satış dövrüyyəsi</Text>
                    <Text style={{ color: 'black', fontSize: 20 }}>{ConvertFixedTable(profit.SaleSum)}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={{ color: 'black', fontSize: 20 }}>Mayası</Text>
                    <Text style={{ color: 'black', fontSize: 20 }}>{ConvertFixedTable(profit.CostSum)}</Text>
                </View>

                <View style={styles.listItem}>
                    <Text style={{ color: 'black', fontSize: 20 }}>Dövrüyyə mənfəəti</Text>
                    <Text style={{ color: 'black', fontSize: 20 }}>{ConvertFixedTable(profit.TurnoverProfit)}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={{ color: 'black', fontSize: 20 }}>Təmiz mənfəət</Text>
                    <Text style={{ color: 'black', fontSize: 20 }}>{ConvertFixedTable(profit.NetProfit)}</Text>
                </View>
                <Accordion style={{ backgroundColor: 'white' }} onChange={onChange} activeSections={activeSections}>
                    <Accordion.Panel header="Xərclər (toplam)">
                        <List>
                            {
                                profit.SpendItems ?
                                    [...profit.SpendItems].map((element, index) => (
                                        <List.Item extra={ConvertFixedTable(element.Amount)}>{element.Name}</List.Item>
                                    ))
                                    :
                                    ''
                            }
                        </List>
                    </Accordion.Panel>
                </Accordion>

            </View>
    )
}


const styles = StyleSheet.create({
    listItem: {
        backgroundColor: '#ececec',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 10
    }
})

export default Profits
