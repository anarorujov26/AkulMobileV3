import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Api from '../../../../../../Global/Components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomColors from '../../../../../../Global/Colors/CustomColors'
import DocumentList from '../../../../../../Global/UI/DocumentList';
import { ConvertFixedTable } from '../../../../../../Global/Components/ConvertFixedTable'
import NewFab from '../../../../../../Global/Components/NewFab';
import { SupplysGlobalContext } from '../SupplysGlobaState'
import CustomPrimaryButton from '../../../../../../Global/UI/CustomPrimaryButton'
import DocumentSearch from '../../../../../../Global/Components/DocumentSearch'
import { FlatList } from 'react-native'
import DocumentDateFilter from './../../../../../../Global/UI/DocumentDateFilter';
import GetRowProsessing from '../../../../../../Global/Components/GetRowProsessing'

const Supplys = ({ navigation }) => {

    const { supplyListRender } = useContext(SupplysGlobalContext);
    const [supplys, setSupplys] = useState([]);
    const [search, setSearch] = useState("");

    const getSupplys = async () => {
        let obj = {
            dr: 1,
            sr: "Moment",
            pg: 0,
            lm: 100,
            token: await AsyncStorage.getItem("token")
        }
        const result = await Api("supplyreturns/get.php", obj);
        if (result.data.Headers.ResponseStatus !== "0") {
            navigation.goBack();
        }
        if (result.data.Body.List[0]) {
            setSupplys(result.data.Body.List);
        } else {
            setSupplys(null);
        }
    }

    useEffect(() => {
        getSupplys();
    }, [])

    useEffect(() => {
        if (supplyListRender > 0) {
            getSupplys();
        }
    }, [supplyListRender])

    return (

        <View style={{ flex: 1, alignItems: 'center' }}>
            <GetRowProsessing
                firstWidth={'90%'}
                firstContent={
                    <DocumentDateFilter info={setSupplys} api={'supplyreturns/get.php'} obj={{
                        dr: 1,
                        sr: "Moment",
                        pg: 0,
                        lm: 100,
                    }} />
                }
                endWidth={'10%'}
                endContent={
                    <DocumentSearch apiObject={{
                        api: "supplyreturns/get.php",
                        products: true,
                        stock: true,
                        customer: true,
                        customerName: "Təchizatçı",
                        momentFirst: true,
                        momentEnd: true
                    }} getData={getSupplys} placeholder={'Sənəd nömrəsi ilə axtarış...'} search={search} setSearch={setSearch} setData={setSupplys} apiAdress={'supplyreturns/get.php'} />
                }
            />


            {
                supplys == null ?
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <CustomPrimaryButton text={'Yeniləyin'} width={'80%'} onPress={getSupplys} />
                    </View>
                    :
                    !supplys[0] ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={50} color={CustomColors("dark").primary} />
                        </View>
                        :
                        <FlatList data={supplys} renderItem={({ item, index }) => (
                            <DocumentList key={item.Id} index={index} customername={item.CustomerName} moment={item.Moment} name={item.Name} navigation={navigation} location={'supply'} id={item.Id} amount={ConvertFixedTable(Number(item.Amount))} />
                        )} />

            }
            <NewFab press={() => {
                navigation.navigate('supply', { id: null })
            }} />
        </View>
    )
}

export default Supplys

const styles = StyleSheet.create({})