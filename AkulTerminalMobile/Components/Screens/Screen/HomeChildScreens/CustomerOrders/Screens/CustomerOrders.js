import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Api from '../../../../../../Global/Components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomColors from '../../../../../../Global/Colors/CustomColors'
import DocumentList from '../../../../../../Global/UI/DocumentList';
import { ConvertFixedTable } from '../../../../../../Global/Components/ConvertFixedTable'
import NewFab from '../../../../../../Global/Components/NewFab';
import { CustomerOrdersGlobalContext } from './../CustomerOrdersGlobalState';
import DocumentSearch from '../../../../../../Global/Components/DocumentSearch'
import CustomPrimaryButton from '../../../../../../Global/UI/CustomPrimaryButton'
import { FlatList } from 'react-native'
import DocumentDateFilter from '../../../../../../Global/UI/DocumentDateFilter'
import GetRowProsessing from './../../../../../../Global/Components/GetRowProsessing';

const CustomerOrders = ({ navigation }) => {

  const { customerOrdersListRender } = useContext(CustomerOrdersGlobalContext);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [search, setSearch] = useState("");

  const getCustomerOrders = async () => {
    let obj = {
      dr: 1,
      sr: "Moment",
      pg: 0,
      lm: 100,
      token: await AsyncStorage.getItem("token")
    }
    const result = await Api("customerorders/get.php", obj);
    if (result.data.Headers.ResponseStatus !== "0") {
      navigation.goBack();
    }
    if (result.data.Body.List[0]) {
      setCustomerOrders(result.data.Body.List);
    } else {
      setCustomerOrders(null)
    }
  }

  useEffect(() => {
    getCustomerOrders();
  }, [])

  useEffect(() => {
    if (customerOrdersListRender > 0) {
      getCustomerOrders();
    }
  }, [customerOrdersListRender])

  return (

    <View style={{ flex: 1, alignItems: 'center' }}>
      <GetRowProsessing firstWidth={'90%'} endWidth={'10%'} firstContent={
        <DocumentDateFilter info={setCustomerOrders} api={'customerorders/get.php'} obj={{
          dr: 1,
          sr: "Moment",
          pg: 0,
          lm: 100,
        }} />
      } endContent={
        <DocumentSearch apiObject={{
          api: "customerorders/get.php",
          products: true,
          stock: true,
          owner: true,
          momentFirst: true,
          momentEnd: true
        }} getData={getCustomerOrders} placeholder={'Sənəd nömrəsi ilə axtarış...'} search={search} setSearch={setSearch} setData={setCustomerOrders} apiAdress={'customerorders/get.php'} />
      } />


      {
        customerOrders == null ?
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <CustomPrimaryButton text={'Yeniləyin'} width={'80%'} onPress={getCustomerOrders} />
          </View>
          :
          !customerOrders[0] ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={50} color={CustomColors("dark").primary} />
            </View>
            :
            <FlatList data={customerOrders} renderItem={({ item, index }) => (
              <DocumentList key={item.Id} index={index} customername={item.CustomerName} moment={item.Moment} name={item.Name} navigation={navigation} location={'customerOrder'} id={item.Id} amount={ConvertFixedTable(Number(item.Amount))} />
            )} />
      }
      <NewFab press={() => {
        navigation.navigate('customerOrder', { id: null })
      }} />
    </View>
  )
}

export default CustomerOrders

const styles = StyleSheet.create({})