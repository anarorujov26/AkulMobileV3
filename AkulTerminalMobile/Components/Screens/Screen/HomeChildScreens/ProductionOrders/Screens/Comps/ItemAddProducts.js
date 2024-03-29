import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Api from '../../../../../../../Global/Components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Item from './Item'
import { ProductionOrdersGlobalContext } from '../../ProductionOrdersGlobalState'

const ItemAddProducts = ({ navigation }) => {

  const [products, setProducts] = useState([]);
  const {
    production,
    setProduction,
  } = useContext(ProductionOrdersGlobalContext);

  
  const getProducts = async () => {
    let obj = {
      dr: 0,
      sr: "Name",
      pg: 0,
      gp: "",
      lm: 100,
      ar: 0,
      token: await AsyncStorage.getItem("token"),
      fast: "",
      ismanufacture: true
    }
    const result = await Api('products/get.php', obj);
    setProducts(result.data.Body.List);
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {
        products[0] &&

        <FlatList data={products} renderItem={({ item, index }) => (
          <Item data={production} setData={setProduction} item={item} navigation={navigation} location="itemEditableNew" name={item.Name} barcode={item.BarCode} quantity={null} />
        )} />
      }
    </View>
  )
}

export default ItemAddProducts

const styles = StyleSheet.create({})