import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Api from '../../../../../../Global/Components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomColors from '../../../../../../Global/Colors/CustomColors'
import DocumentList from '../../../../../../Global/UI/DocumentList';
import { ConvertFixedTable } from '../../../../../../Global/Components/ConvertFixedTable'
import NewFab from '../../../../../../Global/Components/NewFab';
import { DemandsGlobalContext } from '../DemandsGlobalState'
import CustomPrimaryButton from '../../../../../../Global/UI/CustomPrimaryButton'
import DocumentSearch from '../../../../../../Global/Components/DocumentSearch'
import { FlatList } from 'react-native'

const Demands = ({ navigation }) => {

  const { demandListRender } = useContext(DemandsGlobalContext);
  const [demands, setDemands] = useState([]);
  const [search, setSearch] = useState("");

  const getDemands = async () => {
    let obj = {
      dr: 1,
      sr: "Moment",
      pg: 0,
      lm: 100,
      token: await AsyncStorage.getItem("token")
    }
    const result = await Api("demands/get.php", obj);
    if (result.data.Headers.ResponseStatus !== "0") {
      navigation.goBack();
    }
    if (result.data.Body.List[0]) {
      setDemands(result.data.Body.List);
    } else {
      setDemands(null);
    }
  }

  useEffect(() => {
    getDemands();
  }, [])

  useEffect(() => {
    if (demandListRender > 0) {
      getDemands();
    }
  }, [demandListRender])

  return (

    <View style={{ flex: 1, alignItems: 'center' }}>
      <DocumentSearch
      apiObject={{
        api:"demands/get.php",
        products:true,
        stock:true,
        customer:true,
        customerName:"Müştəri",
        customerGroup:true,
        momentFirst:true,
        momentEnd:true
      }}
        getData={getDemands} placeholder={'Sənəd nömrəsi ilə axtarış...'} search={search} setSearch={setSearch} setData={setDemands} apiAdress={'demands/get.php'} />
        {
          demands == null ?
            <View style={{ alignItems: 'center', marginTop: 20, width: '100%' }}>
              <CustomPrimaryButton text={'Yeniləyin'} width={'80%'} onPress={getDemands} />
            </View>
            :
            !demands[0] ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color={CustomColors.primary} />
              </View>
              :
              <FlatList data={demands} renderItem={({ item, index }) => (
                <DocumentList key={item.Id} index={index} customername={item.CustomerName} moment={item.Moment} name={item.Name} navigation={navigation} location={'demand'} id={item.Id} amount={ConvertFixedTable(Number(item.Amount))} />
              )} />

        }
      <NewFab press={() => {
        navigation.navigate('demand', { id: null })
      }} />
    </View>
  )
}

export default Demands

const styles = StyleSheet.create({})