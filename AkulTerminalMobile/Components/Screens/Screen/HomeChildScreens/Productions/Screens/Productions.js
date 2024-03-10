import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Api from '../../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from '@ant-design/react-native';
import CustomColors from '../../../../../../Global/Colors/CustomColors';
import SearchBar from '../../../../../../Global/UI/SearchBar';
import DocumentList from '../../../../../../Global/UI/DocumentList';
import { ConvertFixedTable } from '../../../../../../Global/Components/ConvertFixedTable';
import NewFab from './../../../../../../Global/Components/NewFab';
import { ProductionsGlobalContext } from '../ProductionsGlobalState';

const Productions = ({ navigation }) => {

  const [productionsData, setProductionsData] = useState([]);

  const { productionListRender,
    setProductionListRender } = useContext(ProductionsGlobalContext);

  const getCOMP = async () => {
    let obj = {
      dr: 1,
      sr: "Moment",
      pg: 0,
      lm: 100,
      token: await AsyncStorage.getItem("token")
    }
    const result = await Api('productions/get.php', obj);

    if (result.data.Headers.ResponseStatus != "0") {
      alert(result.data.Body);
    } else {
      setProductionsData([...result.data.Body.List]);
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
              <ActivityIndicator text='Yüklənir...' size={50} color={CustomColors.primaryV3} />
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

export default Productions

const styles = StyleSheet.create({})