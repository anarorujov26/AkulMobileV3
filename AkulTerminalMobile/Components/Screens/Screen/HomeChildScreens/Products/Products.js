import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SearchBar from '../../../../../Global/UI/SearchBar'
import CustomColors from '../../../../../Global/Colors/CustomColors';
import Api from './../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductsList from './ProductUI/ProductsList';
import { ConvertFixedTable } from './../../../../../Global/Components/ConvertFixedTable';
import CustomPrimaryButton from './../../../../../Global/UI/CustomPrimaryButton';
import CustomTextInput from './../../../../../Global/UI/CustomTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewFab from './../../../../../Global/Components/NewFab';
import { FlatList } from 'react-native';
import { GlobalContext } from '../../../../../Global/Components/GlobalState';

const Products = ({ navigation }) => {

  const { listType } = useContext(GlobalContext);

  const [rendersFromProducts, setRendersFromProducts] = useState(0);
  const [search_value, setSearch_value] = useState("");
  const [products, setProducts] = useState([]);
  const [maxPG, setMaxPG] = useState(null);
  const [pg, setPg] = useState(1)

  const getProducts = async () => {
    let obj = {
      ar: 0,
      dr: 0,
      fast: "",
      gp: "",
      lm: 100,
      pg: pg - 1,
      sr: "Name",
      token: await AsyncStorage.getItem('token')
    }
    const result = await Api('products/get.php', obj);
    if (result.data.Headers.ResponseStatus !== "0") {
      navigation.goBack();
    }
    let count = result.data.Body.Count;
    let totalPGCount = Math.ceil(count / 100);
    setMaxPG(totalPGCount);
    setProducts(result.data.Body.List);
  }

  const getProductsSearch = async () => {
    let obj = {
      ar: 0,
      dr: 1,
      fast: search_value,
      gp: "",
      lm: 100,
      pg: pg - 1,
      token: await AsyncStorage.getItem('token')
    }
    const result = await Api('products/getfast.php', obj)
    if (result.data.Body.List[0]) {
      setProducts(result.data.Body.List);
      let count = result.data.Body.Count;
      let totalPGCount = Math.ceil(count / 100);
      setMaxPG(totalPGCount);
    } else {
      setProducts(null)
    }
  }

  useEffect(() => {
    let timer;
    setPg(1);
    if (search_value == "") {
      getProducts();
    } else {
      timer = setTimeout(() => {
        getProductsSearch();
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [search_value])

  useEffect(() => {
    if (rendersFromProducts > 0) {
      if (search_value == "") {
        getProducts();
      } else {
        getProductsSearch();
      }
    }
  }, [rendersFromProducts])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <SearchBar width={'100%'} text={'Axtarış'} onChangeText={(e) => { setSearch_value(e) }} vl={search_value} setVL={setSearch_value} />
      {
        products == null ?
          <CustomPrimaryButton text={'Siyahını yeniləyin'} width={'100%'} addStyle={{ marginTop: 10, borderRadius: 0 }} onPress={getProducts} />
          :
          products[0] ?
            <>
              <View style={{ flex: 1, width: '100%' }}>
                <FlatList
                  data={products}
                  renderItem={({ item, index }) => (
                    <ProductsList
                      location={"product"}
                      renderState={setRendersFromProducts}
                      element={item}
                      id={item.Id}
                      navigation={navigation}
                      index={item.Name}
                      key={item.Id}
                      name={item.Name}
                      barcode={
                        <Text>
                          {item.BarCode}
                          <Ionicons name={'cube-outline'} size={13} color={item.StockBalance < 0 ? 'red' : 'green'} /> {item.StockBalance == null ? 0 : item.StockBalance}
                        </Text>
                      }
                      price={ConvertFixedTable(item.Price)}
                      customername={item.CustomerName}
                    />
                  )}
                  keyExtractor={item => item.Id}
                  numColumns={listType}
                />
              </View>



              <CustomTextInput keyboardType={"numeric"} text={`${maxPG}/${pg}`} width={'100%'} value={String(pg)} onSubmitEditing={() => {
                if (maxPG < pg || 1 > pg) {
                  alert('Yazdığınız hissə mövcut deyil!')
                } else {
                  if (search_value == "") {
                    getProducts();
                  } else {
                    getProductsSearch();
                  }
                }
              }} onChangeText={(e) => {
                setPg(e);
              }} placeholder={'...'} addStyle={{ borderRadius: 0 }} />
            </>
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={50} color={CustomColors.primary} />
            </View>

      }
      <NewFab press={() => {
        navigation.navigate('product', {
          id: null,
          type: 'products',
          renderList: setRendersFromProducts
        })
      }} />
    </View>
  )
}

export default Products

const styles = StyleSheet.create({
  flatListContainer: {
    justifyContent: 'space-between',
  },
})