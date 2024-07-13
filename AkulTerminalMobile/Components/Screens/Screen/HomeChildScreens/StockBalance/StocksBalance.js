import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Api from '../../../../../Global/Components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ProductsList from '../Products/ProductUI/ProductsList'
import { ConvertFixedTable } from '../../../../../Global/Components/ConvertFixedTable'
import CustomColors from '../../../../../Global/Colors/CustomColors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DocumentList from '../../../../../Global/UI/DocumentList'
import SearchBar from './../../../../../Global/UI/SearchBar';
import FilterModal from './../../../../../Global/FilterModal';
const StocksBalance = () => {

    const [stocks, setStocks] = useState([]);
    const [stockInfo, setStockInfo] = useState(null);
    const [search, setSearch] = useState("");
    const [filterModal, setFilterModal] = useState(false);

    const [prObj, setPrObj] = useState({
        dr: 0,
        sr: "Quantity",
        pg: 0,
        zeros: 3,
        ar: 0,
        lm: 100,
        showc: true,
        showh: false,
        quick: ""
    })

    const responseStocksBalance = async () => {
        let obj = { ...prObj };
        obj.token = await AsyncStorage.getItem("token");
        const result = await Api('stockbalance/get.php', obj)
        console.log(result);
        if (result.data.Headers.ResponseStatus == "0") {
            setStocks(result.data.Body.List);
            setStockInfo(result.data.Body);
        }
    }
    const responseStackBalanceFastSearch = async () => {
        let obj = { ...prObj };
        obj.token = await AsyncStorage.getItem("token")
        obj.quick = search;
        const result = await Api("stockbalance/get.php", obj);
        if (result.data.Headers.ResponseStatus == '0') {
            setStocks(result.data.Body.List);
            setStockInfo(result.data.Body);
        }
    }

    useEffect(() => {
        let time;

        if (search == "") {
            responseStocksBalance();
        } else {
            time = setTimeout(() => {
                responseStackBalanceFastSearch();
            }, 400);
        }

        return () => clearTimeout(time);
    }, [search])

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            {
                stockInfo != null &&
                <Text style={{ padding: 5, backgroundColor: 'white', color: "#909090", width: '100%', textAlign: "center" }}>Ümumi qalıq {ConvertFixedTable(stockInfo.QuantitySum)}₼   |   Cəm maya {ConvertFixedTable(stockInfo.CostSum)}₼   |   Cəm satış {ConvertFixedTable(stockInfo.SaleSum)}₼</Text>
            }
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <SearchBar width={'85%'} text={'Axtarış'} addStyle={{ borderRadius: 0 }} onChangeText={(e) => { setSearch(e) }} vl={search} setVL={setSearch} />
                <TouchableOpacity onPress={() => {
                    setFilterModal(true)
                }} style={{ width: '15%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name={'filter'} color={'black'} size={25} />
                </TouchableOpacity>
            </View>
            {
                stocks[0] ?

                    <FlatList data={stocks} renderItem={({ item, index }) => {
                        return (
                            <DocumentList index={index} customername={item.ProductName}
                                moment={
                                    <Text>
                                        {item.BarCode}
                                        <Ionicons name={'cube-outline'} size={13} color={item.Quantity < 0 ? 'red' : 'green'} /> <Text style={{ color: "black" }}>{item.Quantity == null ? 0 : ConvertFixedTable(item.Quantity)}</Text>
                                    </Text>}
                                name={item.CustomerName} amountTwo={ConvertFixedTable(item.SumCostPrice)} amount={ConvertFixedTable(item.SumSalePrice)} />
                        )
                    }} />
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                        <ActivityIndicator size={50} color={CustomColors("dark").primary} />
                    </View>
            }
            <FilterModal setSumma={setStockInfo} products={true} stock={true} setState={setStocks} obj={prObj} api={'stockbalance/get.php'} modalVisible={filterModal} setModalVisible={setFilterModal} group={true} customer={true} customerName={'Təchizatçı'} ar={true} />
        </View>
    )
}

export default StocksBalance

const styles = StyleSheet.create({})