import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomColors from '../../Colors/CustomColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomPrimaryButton from '../../UI/CustomPrimaryButton';
import CustomTextInput from '../../UI/CustomTextInput';
import RetioDiscount from '../RetioDiscount';
import EnteredDiscount from '../EnteredDiscount';
import InspectionPositions from './../InspectionPositions';
import { ConvertFixedTable } from '../ConvertFixedTable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Api from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import PricePermission from '../PricePermission';
import GetUnits from './../../UI/GetUnits';
import UnitsModal from './UnitsModal';
import getAmountDiscount from '../getAmountDiscount';

const DocumentEditModal = ({ route, navigation }) => {

  const [pricePermission, setPricePermission] = useState(true);

  const { data, setState, state, type, setButton, pageName } = route.params;
  const [isLoading, setIsLoading] = useState(false)

  const [product, setProduct] = useState(null);

  const getInfo = async () => {
    setPricePermission(await PricePermission());
    let stateData = [...state.Positions]
    let productOBJ = { ...data };


    const answer = InspectionPositions(stateData, productOBJ.ProductId || productOBJ.Id);


    if (answer.result) {
      productOBJ = state.Positions[answer.index]
      productOBJ.SalePrice = productOBJ.SalePrice ? ConvertFixedTable(Number(productOBJ.SalePrice)) : 0;
      productOBJ.Price = ConvertFixedTable(Number(productOBJ.Price))
      productOBJ.Quantity = ConvertFixedTable(Number(productOBJ.Quantity))
      productOBJ.Discount = ConvertFixedTable(Number(RetioDiscount(productOBJ.BasicPrice, productOBJ.Price)));
    } else {
      productOBJ.ProductId = productOBJ.Id

      productOBJ.Quantity = 1;
      productOBJ.Discount = 0;
      if (type == "Buy" || type == "BuySupply") {
        productOBJ.BasicPrice = ConvertFixedTable(Number(productOBJ.BuyPrice));
        productOBJ.Price = ConvertFixedTable(Number(productOBJ.BuyPrice));

      } else {
        productOBJ.BasicPrice = ConvertFixedTable(Number(productOBJ.Price));
        productOBJ.Price = ConvertFixedTable(Number(productOBJ.Price));
      }
    }

    setProduct(productOBJ);
  }

  const getSaveInfo = async () => {
    setIsLoading(true);
    let data = { ...state }
    if (pageName == "Demand" && ConvertFixedTable(product.MinPrice) > ConvertFixedTable(product.Price)) {
      alert("Qiymət Minimal Qiymətdən aşağı ola bilməz!")
      setIsLoading(false)
      return null;
    }
    const answer = InspectionPositions(state.Positions, product.Id || product.ProductId);


    if (answer.result) {
      data.Positions[answer.index] = product;
    } else {
      data.Positions.push(product);
    }


    if (type != "BuySupply" && type != "Buy") {
      let documentBasicAmount = 0;
      let amount = Number(data.Amount);
      let ps = [...data.Positions];
      for (let i = 0; i < ps.length; i++) {
        documentBasicAmount += Number(ps[i].BasicPrice) * Number(ps[i].Quantity);
      }

      data.Discount = documentBasicAmount - amount;

      data.AmountDiscount = await getAmountDiscount(data)
      
    }

    setIsLoading(false);
    setButton(true)
    setState(data);
    navigation.goBack();
  }

  const getPriceDIS = () => {
    setProduct(rel => ({ ...rel, ['Discount']: RetioDiscount(ConvertFixedTable(Number(product.BasicPrice)), ConvertFixedTable(Number(product.Price))) }))
  }

  const getDisPRI = () => {
    setProduct(rel => ({ ...rel, ['Price']: EnteredDiscount(ConvertFixedTable(Number(product.BasicPrice)), ConvertFixedTable(Number(product.Discount))) }))
  }

  const getDirPRIdublicat = (dis) => {
    setProduct(rel => ({ ...rel, ['Price']: EnteredDiscount(ConvertFixedTable(Number(product.BasicPrice)), ConvertFixedTable(Number(dis))) }))
  }

  const getPriceDISdublicat = (e) => {
    setProduct(rel => ({ ...rel, ['Discount']: RetioDiscount(ConvertFixedTable(Number(product.BasicPrice)), ConvertFixedTable(Number(e))) }))
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

  const getBash = async () => {
    let productData = { ...product };
    let postOBJ = {
      sendObj: [
        {
          ProductId: productData.ProductId,
          SellPrice: productData.SalePrice,
          BuyPrice: productData.BasicPrice
        }
      ],
      token: await AsyncStorage.getItem("token")
    }
    const result = await Api("products/bashpositions.php", postOBJ)
    if (result.data.Headers.ResponseStatus == "0") {
      successAlert();
    } else {
      alert(result.data.Body);
    }
  }

  useEffect(() => {
    getInfo();
  }, [])

  const successAlert = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Satış qiyməti dəyişdirildi!',
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      ToastAndroid.SHORT,
      200,
      50
    )
  }


  return (
    product == null ?

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={50} color={CustomColors.primary} />
      </View>
      :

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.container}>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <Text style={styles.name}>{product.Name || product.ProductName}</Text>
            <TouchableOpacity onPress={getDelete} style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name='delete-outline' size={25} color={CustomColors.danger} />
            </TouchableOpacity>
          </View>
          {
            product.BarCode &&
            <Text style={{ color: 'black', fontSize: 16 }}>{product.BarCode}</Text>
          }
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '100%', height: 1, backgroundColor: 'grey', borderRadius: 10 }} />
          </View>

          {
            type !== "ct" &&
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
              <Text style={{ color: 'black', fontSize: 16 }}>{'Anbar qalığı'}</Text>
              <Text style={{ color: 'black', fontSize: 16 }}>{ConvertFixedTable(product.StockQuantity)}</Text>
            </View>
          }
          {
            type !== "Buy" && type !== "BuySupply" && type !== "ct" &&
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
              <Text style={{ color: 'black', fontSize: 16 }}>{'Min.Qiymət'}</Text>
              <Text style={{ color: 'black', fontSize: 16 }}>{ConvertFixedTable(product.MinPrice)}</Text>
            </View>
          }
          <View style={{ margin: 20 }} />
          {
            type == "BuySupply" &&
            <CustomTextInput editable={pricePermission} onSubmitEditing={getBash} addStyleInput={{ fontSize: 20, color: CustomColors.connectedPrimary }} keyboardType={"numeric"} value={String(product.SalePrice)} text={'Satış qiyməti'} width={'100%'} onChangeText={(e) => { setProduct(rel => ({ ...rel, ['SalePrice']: e.replace(',', '.') })) }} addStyle={{ borderRadius: 0, borderBottomWidth: 1 }} />
          }

          <UnitsModal type={type} data={data} setProduct={setProduct} product={product} />

          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            {
              type !== "ct" &&
              <CustomTextInput editable={pricePermission} addStyleInput={{ fontSize: 20, color: CustomColors.connectedPrimary }} keyboardType={"numeric"} value={String(product.Discount)} onBlur={getDisPRI} text={'Endirim%'} width={'100%'} onChangeText={(e) => {
                getDirPRIdublicat(e.replace(',', '.'));
                setProduct(rel => ({
                  ...rel, ['Discount']: e.replace(',', '.')
                }));
              }} addStyle={{ borderRadius: 0, borderBottomWidth: 1 }} />
            }
            <CustomTextInput editable={type == "Buy" || type == "BuySupply" ? true : pricePermission} addStyleInput={{ fontSize: 20, color: CustomColors.connectedPrimary }} keyboardType={"numeric"} value={String(product.Price)} onBlur={getPriceDIS} text={type == "Buy" || type == "BuySupply" ? 'Alış Qiyməti' : 'Satış Qiymət'} width={'100%'} addStyle={{ borderRadius: 0, borderBottomWidth: 1 }} onChangeText={(e) => {
              getPriceDISdublicat(e);
              setProduct(rel => ({ ...rel, ['Price']: e.replace(',', '.') }))

            }} />
            <View style={{ margin: 10 }} ></View>
            <Text style={{ color: 'grey', fontSize: 15, textAlign: 'center' }}>{'Miqdar'}</Text>
            <View style={styles.bottomContainerItem}>
              <TouchableOpacity onPress={() => { setProduct(rel => ({ ...rel, ['Quantity']: ConvertFixedTable(Number(product.Quantity)) - 1 })); }}>
                <AntDesign color={CustomColors.primary} size={70} name='minussquare' />
              </TouchableOpacity>
              <TextInput keyboardType='numeric' value={String(product.Quantity)} style={[styles.input, { textAlign: 'center', width: '50%' }]} onChangeText={(e) => {
                setProduct(rel => ({ ...rel, ['Quantity']: e.replace(',', '.') }));
              }} />
              <TouchableOpacity onPress={() => { setProduct(rel => ({ ...rel, ['Quantity']: ConvertFixedTable(Number(product.Quantity)) + 1 })); }}>
                <AntDesign color={CustomColors.primary} size={70} name='plussquare' />
              </TouchableOpacity>
            </View>
            <View style={{ margin: 15 }} />
            <CustomPrimaryButton disabled={isLoading} isLoading={isLoading} onPress={getSaveInfo} text={'Təsdiq et'} width={'100%'} addStyle={{ borderRadius: 5 }} />
            <View style={{ margin: 5 }} />
          </View>
        </View>
      </View>
  )
}

export default DocumentEditModal

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
    fontWeight: 'bold',
    width: '90%',
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
    color: CustomColors.primary
  }
})