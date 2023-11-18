import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Api from '../../../../../../Global/Components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomColors from '../../../../../../Global/Colors/CustomColors'
import DocumentList from '../../../../../../Global/UI/DocumentList';
import { ConvertFixedTable } from '../../../../../../Global/Components/ConvertFixedTable'
import NewFab from '../../../../../../Global/Components/NewFab';
import CustomPrimaryButton from '../../../../../../Global/UI/CustomPrimaryButton'
import DocumentSearch from '../../../../../../Global/Components/DocumentSearch'
import { FlatList } from 'react-native'
import { SalesGlobalContext } from '../SalesGlobalState'

const Sales = ({ navigation }) => {

    const [sales, setSales] = useState([]);
    const [search, setSearch] = useState("");

    const getSales = async () => {
        let obj = {
            dr: 1,
            sr: "Moment",
            pg: 0,
            lm: 100,
            token: await AsyncStorage.getItem("token")
        }
        const result = await Api("sales/get.php", obj);
        if (result.data.Headers.ResponseStatus !== "0") {
            navigation.goBack();
        }
        if (result.data.Body.List[0]) {
            setSales(result.data.Body.List);
        } else {
            setSales(null);
        }
    }

    useEffect(() => {
        getSales();
    }, [])

    return (

        <View style={{ flex: 1, alignItems: 'center' }}>
            <DocumentSearch
                getData={getSales} placeholder={'Sənəd nömrəsi ilə axtarış...'} search={search} setSearch={setSearch} setData={setSales} apiAdress={'sales/get.php'} />
            {
                sales == null ?
                    <View style={{ alignItems: 'center', marginTop: 20, width: '100%' }}>
                        <CustomPrimaryButton text={'Yeniləyin'} width={'80%'} onPress={getSales} />
                    </View>
                    :
                    !sales[0] ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={50} color={CustomColors.primary} />
                        </View>
                        :
                        <FlatList data={sales} renderItem={({ item, index }) => (
                            <DocumentList key={item.Id} index={index} customername={item.SalePointName} moment={item.Moment} name={item.CustomerName} navigation={navigation} location={'sale'} id={item.Id} amount={ConvertFixedTable(Number(item.Amount))} />
                        )} />

            }
        </View>
    )
}

export default Sales

const styles = StyleSheet.create({})