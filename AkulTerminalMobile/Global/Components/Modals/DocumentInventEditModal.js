import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomColors from '../../Colors/CustomColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomPrimaryButton from '../../UI/CustomPrimaryButton';
import CustomTextInput from '../../UI/CustomTextInput';
import InspectionPositions from './../InspectionPositions';
import { ConvertFixedTable } from '../ConvertFixedTable';
import DifferenceFunction from './../../../Components/Screens/Screen/HomeChildScreens/Invent/DifferenceFunction';
import CustomDangerButton from '../../UI/CustomDangerButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GlobalContext } from '../GlobalState';
import PricePermission from '../PricePermission';

const DocumentInventEditModal = ({ route, navigation }) => {

  const [pricePermission, setPricePermission] = useState(true);

  const { data, setState, state, setButton } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const [product, setProduct] = useState(null);

  const getInfo = async () => {

    setPricePermission(await PricePermission());

    let stateData = [...state.Positions]
    let productOBJ = { ...data };
    const answer = InspectionPositions(stateData, productOBJ.ProductId || productOBJ.Id);


    if (answer.result) {
      productOBJ = state.Positions[answer.index]
      productOBJ.Price = ConvertFixedTable(Number(productOBJ.Price))
      productOBJ.Quantity = ConvertFixedTable(Number(productOBJ.Quantity))
      getStockBalance(productOBJ, ConvertFixedTable(Number(productOBJ.Quantity)))
    } else {
      productOBJ.ProductId = productOBJ.Id
      productOBJ.Quantity = 1;
      productOBJ.BasicPrice = ConvertFixedTable(Number(productOBJ.Price));
      productOBJ.Price = ConvertFixedTable(Number(productOBJ.Price));
      productOBJ.Difference = DifferenceFunction(productOBJ.StockBalance == null ? 0 : productOBJ.StockBalance, productOBJ.Quantity);
      getStockBalance(productOBJ, 1)
    }
    setProduct(productOBJ);
  }

  const getSaveInfo = async () => {
    setIsLoading(true);
    let data = { ...state }

    const answer = InspectionPositions(state.Positions, product.Id || product.ProductId);
    if (answer.result) {
      data.Positions[answer.index] = product;
    } else {
      data.Positions.push(product);
    }
    setIsLoading(false);
    setButton(true)
    setState(data);
    navigation.goBack();
  }

  const getStockBalance = (product, vl) => {
    let answer = DifferenceFunction(product.StockBalance == null ? 0 : product.StockBalance, vl);
    setProduct(rel => ({ ...rel, ['Difference']: answer }));
  }

  const getDelete = () => {
    let data = { ...state };
    let productOBJ = { ...product };
    for (let index = 0; index < data.Positions.length; index++) {
      if (data.Positions[index].ProductId == productOBJ.ProductId) {
        data.Positions.splice(index, 1);
      }
    }

    setState(data);
    navigation.goBack();
    setButton(true)
  }

  useEffect(() => {
    getInfo();
  }, [])

  return (
    product == null ?

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={50} color={CustomColors("dark").primary} />
      </View>
      :

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.container}>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <Text style={styles.name}>{product.Name}</Text>
            <TouchableOpacity onPress={getDelete} style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name='delete-outline' size={25} color={CustomColors("dark").danger} />
            </TouchableOpacity>
          </View>
          <Text style={{ color: 'black', fontSize: 16 }}>{product.BarCode}</Text>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '100%', height: 1, backgroundColor: 'grey', borderRadius: 10 }} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>{'Satış Qiymət'}</Text>
            <Text style={{ color: 'black', fontSize: 16 }}>{product.Price}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'black', fontSize: 16 }}>{'Anbar qalıqı'}</Text>
            <Text style={{ color: 'black', fontSize: 16 }}>{product.StockBalance == null ? 0 : product.StockBalance}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
            <Text style={{ color: 'black', fontSize: 16 }}>{'Fərq'}</Text>
            <Text style={{ color: 'black', fontSize: 16 }}>{ConvertFixedTable(Number(product.Difference))}</Text>
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <CustomTextInput editable={pricePermission} keyboardType={"numeric"} value={String(product.Price)} text={'Satış Qiymət'} width={'100%'} addStyle={{ borderRadius: 0, borderBottomWidth: 1 }} onChangeText={(e) => { setProduct(rel => ({ ...rel, ['Price']: e.replace(',', '.') })) }} />
            <View style={{ margin: 10 }} ></View>
            <Text style={{ color: 'grey', fontSize: 15, textAlign: 'center' }}>{'Faktiki qalıq'}</Text>
            <View style={styles.bottomContainerItem}>
              <TouchableOpacity onPress={() => { setProduct(rel => ({ ...rel, ['Quantity']: ConvertFixedTable(Number(product.Quantity)) - 1 })); getStockBalance(product,Number(product.Quantity) - 1); }}>
                <AntDesign color={CustomColors("dark").primary} size={70} name='minussquare' />
              </TouchableOpacity>
              <TextInput keyboardType='numeric' value={String(product.Quantity)} style={[styles.input, { textAlign: 'center', width: '50%' }]} onChangeText={(e) => {
                setProduct(rel => ({ ...rel, ['Quantity']: e.replace(',', '.') }));
                getStockBalance(product,e);
              }} />
              <TouchableOpacity onPress={() => { setProduct(rel => ({ ...rel, ['Quantity']: ConvertFixedTable(Number(product.Quantity)) + 1 })); getStockBalance(product,Number(product.Quantity) + 1) }}>
                <AntDesign color={CustomColors("dark").primary} size={70} name='plussquare' />
              </TouchableOpacity>
            </View>
            <View style={{ margin: 15 }} />
            <CustomPrimaryButton disabled={isLoading} isLoading={isLoading} onPress={getSaveInfo} text={'Təsdiq et'} width={'100%'} addStyle={{ borderRadius: 5 }} />
            <View style={{ margin: 5 }} />
            <View style={{ margin: 5 }} />
          </View>
        </View>

      </View>
  )
}

export default DocumentInventEditModal

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    height: '100%',
    padding: 10,
  },
  name: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold'
  },
  bottomContainerItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'white',
    width: 100,
    justifyContent: 'center',
    fontSize: 20,
    height: 60, marginTop: 4,
    borderBottomWidth: 1,
    color: CustomColors("dark").primary
  }
})