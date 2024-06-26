import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../../../../../../Global/Components/Api';
import SearchBar from '../../../../../../../Global/UI/SearchBar';
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput';
import { ConvertFixedTable } from '../../../../../../../Global/Components/ConvertFixedTable';
import CustomColors from '../../../../../../../Global/Colors/CustomColors';
import { TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../../../../../Global/Components/GlobalState';
import PriceTypeProses from '../../../../../../../Global/Components/PriceTypeProses';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import ImageModal from '../../../../../../../Global/Components/ImageModal';
import AddCardProducts from './../../../../../../../Global/Components/AddCardProducts';
import { DemandsGlobalContext } from '../../DemandsGlobalState';

const windowWidth = Dimensions.get('window').width;
const cardWidth = windowWidth / 2 - 20;

const AddDemandProducts = ({ route, navigation }) => {

  const { prices, listType } = useContext(GlobalContext);
  const { customerInfo } = useContext(DemandsGlobalContext);
  const { location, state, setState, setButton, type, pageName } = route.params

  const [units, setUnits] = useState(null);


  const [search_value, setSearch_value] = useState(null);
  const [products, setProducts] = useState(null);
  const [maxPG, setMaxPG] = useState(null);
  const [pg, setPg] = useState(1)
  const [pItem, setPItem] = useState({});
  const [imageModal, setImageModal] = useState(false);

  const getProductsSearch = async () => {

    console.log(search_value);

    let obj = {
      ar: 0,
      dr: 1,
      fast: search_value == null ? "" : search_value.trim(),
      gp: "",
      lm: 30,
      pg: pg - 1,
      token: await AsyncStorage.getItem('token')
    }

    if (type !== "Buy" && type !== "BuySupply") {
      if (prices.priceId !== null) {
        obj.pricetype = prices.priceId;
      }
    }

    if (customerInfo != null) {
      obj.pricetype = customerInfo.PriceTypeId;
      console.log(customerInfo);
    }

    const result = await Api('products/getfast.php', obj);
    setUnits(result.data.Body.ProductUnits);

    if (result.data.Body.List[0]) {
      setProducts(result.data.Body.List);
      let count = result.data.Body.Count;
      let totalPGCount = Math.ceil(count / 30);
      setMaxPG(totalPGCount);
    } else {
      setProducts(null)
    }
  }

  let getModal = (item) => {

    let product = { ...item };
    let unitsList = { ...units };


    product.units = unitsList[product.Id];
    for (let i = 0; i < unitsList[product.Id].length; i++) {
      let unit = unitsList[product.Id][i];
      if (Number(product.UnitId) == Number(unit.Id)) {
        product.UnitName = unit.Name
        product.UnitTitle = unit.Title
      }
    }

    if (type !== "Buy" && type !== "BuySupply") {
      if (prices.priceId !== null) {
        product.Price = product[PriceTypeProses(prices.priceId)];
      }
    }

    navigation.navigate(location, { data: product, setState, state, type, setButton, pageName })
  }

  useEffect(() => {
    getProductsSearch();
  }, [])

  useEffect(() => {
    if (search_value == null) return;
    setPg(1);
    let timer = setTimeout(() => {
      if (search_value.length != 0) {
        if (search_value.trim().length == 0) return;
        getProductsSearch();
      } else {
        getProductsSearch();
      }
      getProductsSearch();
    }, 500);
    return () => clearTimeout(timer);
  }, [search_value])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <SearchBar width={'100%'} text={'Axtarış'} onChangeText={(e) => { setSearch_value(e) }} placeholder={'...'} vl={search_value} setVL={setSearch_value} />
      {
        products == null ?
          <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={50} color={CustomColors("dark").primary} />
          </View>
          :
          products[0] ?
            <View style={{ flex: 1, width: '100%' }}>
              <FlatList data={products} renderItem={({ item, index }) => (
                listType == 1 ?

                  <TouchableOpacity onLongPress={() => {
                    item.Pic ?
                      (setImageModal(true),
                        setPItem(item))
                      :
                      alert("Bu məhsulda şəkil yoxdur!")
                  }} style={styles.listContainer} onPress={() => { getModal(item) }}>
                    <View style={styles.listFirs}>
                      <View style={styles.listFirsContainer}>
                        {
                          item.Pic ?
                            <Image style={styles.avatar} source={{ uri: item.Pic }} />
                            :
                            <View style={[styles.avatar, { backgroundColor: CustomColors("dark").primary }]}>
                              <Text style={styles.avatarName}>{item.Name.slice(0, 2)}</Text>
                            </View>
                        }
                      </View>
                      <View style={styles.listCenterContiner}>
                        <Text style={styles.name}>{item.Name}</Text>
                        <Text style={styles.barcode}>{item.BarCode}</Text>
                        <Text style={styles.customerName}>{item.CustomerName}</Text>
                      </View>
                    </View>
                    <View style={styles.listEndContainer}>
                      <Text style={styles.price}>{ConvertFixedTable(Number(type == "Buy" || type == "BuySupply" ? item.BuyPrice : prices.priceId == null ? item.Price : item[PriceTypeProses(prices.priceId)]))}₼</Text>
                      {
                        item.StockBalance !== null &&
                        <Text style={styles.stock}>{ConvertFixedTable(Number(item.StockBalance))}</Text>
                      }
                    </View>
                  </TouchableOpacity>

                  :

                  <AddCardProducts name={item.Name} price={ConvertFixedTable(type == "Buy" || type == "BuySupply" ? item.BuyPrice : prices.priceId == null ? item.Price : item[PriceTypeProses(prices.priceId)])} pic={item.Pic} press={() => getModal(item)} />
              )} numColumns={listType} keyExtractor={item => item.Id} />

              <CustomTextInput keyboardType={"numeric"} text={`${maxPG}/${pg}`} width={'100%'} value={String(pg)} onSubmitEditing={() => {
                if (maxPG < pg || 1 > pg) {
                  alert('Yazdığınız hissə mövcut deyil!')
                } else {
                  getProductsSearch();
                }
              }} onChangeText={(e) => {
                setPg(e);
              }} placeholder={'...'} addStyle={{ borderRadius: 0 }} />
            </View>
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={50} color={CustomColors("dark").primary} />
            </View>
      }
      <ImageModal imageModal={imageModal} setImageModal={setImageModal} name={pItem.Name} price={pItem.Price} pic={pItem.Pic} />
    </View>
  )
}

export default AddDemandProducts

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
  },
  listContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    marginTop: 3
  },
  listFirs: {
    flexDirection: 'row',
    width: '80%',
  },
  listFirsContainer: {
    justifyContent: 'center',
    marginRight: 10
  },
  listCenterContiner: {
    justifyContent: 'center'
  },
  listEndContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10
  },
  avatarName: {
    fontSize: 20,
    color: 'white',
  },
  name: {
    color: 'black',
    fontWeight: '600',
  },
  barcode: {
    fontSize: 13,
  },
  customerName: {
    color: CustomColors("dark").connectedPrimary
  },
  price: {
    color: 'black',
  },
  container: {
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  image: {
    width: cardWidth,
    height: cardWidth,
    resizeMode: 'cover',
  },
  text: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    bottom: 0,
    paddingLeft: 5
  }
})