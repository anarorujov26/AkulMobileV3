import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Api from '../../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from '@ant-design/react-native';
import CustomColors from '../../../../../../Global/Colors/CustomColors';
import DocumentList from '../../../../../../Global/UI/DocumentList';
import { ConvertFixedTable } from '../../../../../../Global/Components/ConvertFixedTable';
import NewFab from './../../../../../../Global/Components/NewFab';
import GetRowProsessing from './../../../../../../Global/Components/GetRowProsessing';
import DocumentDateFilter from './../../../../../../Global/UI/DocumentDateFilter';
import DocumentSearch from './../../../../../../Global/Components/DocumentSearch';
import { ProductionOrdersGlobalContext } from '../ProductionOrdersGlobalState';

const ProductionOrders = ({ navigation }) => {

  const [productionsData, setProductionsData] = useState([]);
  const [summa, setSumma] = useState({});
  const [search, setSearch] = useState("");

  const { productionListRender,
    setProductionListRender } = useContext(ProductionOrdersGlobalContext);

  const getCOMP = async () => {
    let obj = {
      dr: 1,
      sr: "Moment",
      pg: 0,
      lm: 100,
      token: await AsyncStorage.getItem("token")
    }

    const result = await Api('productionorders/get.php', obj);

    if (result.data.Headers.ResponseStatus != "0") {
      alert(result.data.Body);
    } else {
      setProductionsData([...result.data.Body.List]);
      setSumma({ ...result.data.Body });
    }
  }

  useEffect(() => {
    getCOMP();
  }, [])

  useEffect(() => {
    if (productionListRender > 0) {
      getCOMP();
    }
  }, [productionListRender])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <GetRowProsessing firstWidth={'90%'} firstContent={
        <DocumentDateFilter body={true} setBody={setSumma} info={setProductionsData} api={'productionorders/get.php'} obj={{
          dr: 1,
          sr: "Moment",
          pg: 0,
          lm: 100,
        }} />
      } endWidth={'10%'} endContent={
        <DocumentSearch
          apiObject={{
            api: "productionorders/get.php",
            products: true,
            stock: true,
            momentFirst: true,
            momentEnd: true,
            owner: true,
            setSumma
          }}
          getData={getCOMP} placeholder={'Sənəd nömrəsi ilə axtarış...'} search={search} setSearch={setSearch} setData={setProductionsData} apiAdress={'productions/get.php'} />
      } />
      <Text style={{ padding: 5, backgroundColor: 'white', color: "#909090", width: '100%', textAlign: "center" }}>Cəm məbləğ {ConvertFixedTable(summa.AllSum)}₼</Text>
      {
        productionsData !== null ?
          productionsData[0] ?
            <View style={{ flex: 1, alignItems: 'center' }}>
              <FlatList data={productionsData} renderItem={({ item, index }) => (
                <DocumentList key={item.Id} index={index} customername={item.ProductName} moment={item.Moment} name={item.Name} navigation={navigation} location={'production'} id={item.Id} amount={ConvertFixedTable(Number(item.Amount))} />
              )} />
            </View>
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator text='Yüklənir...' size={50} color={CustomColors("dark").primaryV3} />
            </View>
          :
          <View>
            <Text>Melumat gelmedi!</Text>
          </View>
      }

      <NewFab press={() => {
        navigation.navigate("production", { id: null });
      }} />
    </View>
  )
}

export default ProductionOrders

const styles = StyleSheet.create({})