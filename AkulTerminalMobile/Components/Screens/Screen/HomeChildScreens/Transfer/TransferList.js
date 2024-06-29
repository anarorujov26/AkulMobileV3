import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DocumentList from '../../../../../Global/UI/DocumentList'
import { ConvertFixedTable } from '../../../../../Global/Components/ConvertFixedTable'
import Api from '../../../../../Global/Components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomColors from '../../../../../Global/Colors/CustomColors'
import NewFab from '../../../../../Global/Components/NewFab'

const TransferList = ({ navigation }) => {

  const [transfer, setTransfers] = useState([]);
  const [rendersFromTransfers, setRendersFromTransfers] = useState(0);

  const getTransfers = async () => {
    let obj = {
      dr: 1,
      sr: "Moment",
      pg: 0,
      lm: 100,
      token: await AsyncStorage.getItem("token")
    }
    const result = await Api('cashtransactions/get.php', obj);
    if (result.data.Body.List[0]) {
      setTransfers(result.data.Body.List);
    } else {
      setTransfers(null);
    }
  }

  useEffect(() => {
    getTransfers();
  }, [])

  useEffect(() => {
    if (rendersFromTransfers >= 1) {
      getTransfers();
    }
  }, [rendersFromTransfers])

  return (
    <View style={{ flex: 1 }}>
      {
        transfer == null ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: "black", fontWeight: "bold" }}>Transfer list boşdur...</Text>
          </View>
          :
          transfer[0] ?
            <FlatList data={transfer} renderItem={({ item, index }) => (
              <DocumentList key={item.Id} index={index} customername={item.CashFromName} moment={item.CashToName} name={item.Name} navigation={navigation} location={'transferitem'} id={item.Id} amount={ConvertFixedTable(Number(item.Amount))} />
            )} />
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={50} color={CustomColors('light').primary} />
            </View>
      }
      <NewFab press={() => {
        navigation.navigate('transferitem', {
          id: null,
          type: 'transferitem',
          renderList: setRendersFromTransfers
        })
      }} />
    </View>
  )
}

export default TransferList

const styles = StyleSheet.create({})