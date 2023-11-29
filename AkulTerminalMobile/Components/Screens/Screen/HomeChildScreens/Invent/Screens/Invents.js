import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Api from '../../../../../../Global/Components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomColors from '../../../../../../Global/Colors/CustomColors'
import DocumentList from '../../../../../../Global/UI/DocumentList'
import NewFab from '../../../../../../Global/Components/NewFab'
import { useContext } from 'react'
import { InventGlobalContext } from '../InventGlobalState'
import CustomPrimaryButton from '../../../../../../Global/UI/CustomPrimaryButton'
import DocumentSearch from '../../../../../../Global/Components/DocumentSearch'
import { FlatList } from 'react-native'

const Invents = ({ navigation }) => {

  const { inventListRender } = useContext(InventGlobalContext);
  const [invents, setInvents] = useState([]);
  const [search, setSearch] = useState("");

  const getInventData = async () => {
    let obj = {
      dr: 1,
      sr: "Moment",
      pg: 0,
      lm: 100,
      token: await AsyncStorage.getItem("token")
    }
    const result = await Api("inventories/get.php", obj)
    if (result.data.Headers.ResponseStatus !== "0") {
      navigation.goBack();
    }
    if (result.data.Body.List[0]) {
      setInvents(result.data.Body.List)
    } else {
      setInvents(null)
    }
  }

  useEffect(() => {
    getInventData();
  }, [])

  useEffect(() => {
    if (inventListRender > 0) {
      setInvents([]);
      getInventData();
    }
  }, [inventListRender])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <DocumentSearch apiObject={{
        api:"inventories/get.php",
        products:true,
        stock:true,
        owner:true,
        momentFirst:true,
        momentEnd:true
      }} getData={getInventData} placeholder={'Sənəd nömrəsi ilə axtarış...'} search={search} setSearch={setSearch} setData={setInvents} apiAdress={'inventories/get.php'} />
      {
        invents == null ?
          <View style={{ alignItems: 'center', marginTop: 20, width: '100%' }}>
            <CustomPrimaryButton text={'Yeniləyin'} width={'80%'} onPress={getInventData} />
          </View>
          :
          invents[0]
            ?
            <FlatList data={invents} renderItem={({ item, index }) => (
              <DocumentList key={item.Id} navigation={navigation} location={"invent"} id={item.Id} index={index} customername={item.StockName} moment={item.Moment} name={item.Name} amount={item.Amount} />
            )} />
            :
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size={40} color={CustomColors.primary} />
            </View>
      }
      <NewFab press={() => {
        navigation.navigate('invent', { id: null })
      }} />
    </View>
  )
}

export default Invents

const styles = StyleSheet.create({})