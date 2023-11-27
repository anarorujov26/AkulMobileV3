import { ActivityIndicator, BackHandler, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Api from '../../../../../Global/Components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomColors from '../../../../../Global/Colors/CustomColors'
import CustomTextInput from './../../../../../Global/UI/CustomTextInput';
import { ConvertFixedTable } from '../../../../../Global/Components/ConvertFixedTable'
import GroupModal from './../../../../../Global/Components/Modals/GroupModal';
import { CustomToLowerCase } from './../../../../../Global/Components/CustomToLowerCase';
import { useFocusEffect } from '@react-navigation/native'
import BackModal from './../../../../../Global/Components/Modals/BackModal';
import CustomerModal from '../../../../../Global/Components/Modals/CustomerModal'
import PriceTypeProsessing from './PriceTypeProsessing';
import CustomSuccessSaveButton from './../../../../../Global/UI/CustomSuccessSaveButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PricePermission from '../../../../../Global/Components/PricePermission'
import modificationsGroup from './../../../../../Global/Components/modificationsGroup';
import DocumentInItems from '../../../../../Global/Components/DocumentInItems'
import axios from 'axios'
import RNPrint from 'react-native-print'

const Product = ({ route, navigation }) => {

  const [pricePermission, setPricePermission] = useState(true);

  const { type, renderList } = route.params;

  const [pricesList, setPricesList] = useState([]);

  const [product, setProduct] = useState(null);
  const { id } = route.params
  const [group, setGroup] = useState(false);
  const [customers, setCustomers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveButton, setSaveButton] = useState(false);
  const [dontBackModal, setDontBackModal] = useState(false);
  const [productModificationsAnswer, setProductModificationsAnswer] = useState(false);

  const [pricesTypes, setPricesTYpes] = useState(false);

  const getProductData = async (productId) => {
    setPricePermission(await PricePermission());

    if (productId == null) {
      let obj = {
        GroupId: "",
        GroupName: "",
        Name: "",
        IsminQuantity: 1,
        BarCode: "",
        Modifications: [],
        Prices: [],
        IsArch: 0,
        IsWeight: false,
        BuyPrice: 0,
        MinPrice: 0,
        Price: 0,
        CustomerName: "",
        CustomerId: "",
        ArtCode: "",
        Description: ""
      }

      setProduct(obj);
    } else {
      const result = await Api('products/get.php', {
        id: productId,
        token: await AsyncStorage.getItem('token')
      })

      if (result.data.Headers.ResponseStatus !== "0") {
        navigation.goBack();
      }

      let obj = result.data.Body.List[0]
      obj.BuyPrice = ConvertFixedTable(obj.BuyPrice);
      obj.MinPrice = ConvertFixedTable(obj.MinPrice);
      obj.Price = ConvertFixedTable(obj.Price);
      if (obj.Prices[0]) {
        const result = await Api('pricetypes/get.php', {
          token: await AsyncStorage.getItem("token")
        })
        obj.Prices.forEach((element, index) => {
          obj.Prices[index].Price = ConvertFixedTable(Number(element.Price));
        });
        obj = PriceTypeProsessing(obj, result.data.Body.List)
      }

      obj.Modifications = await modificationsGroup(result.data.Body.List[0].Modifications[0], null);
      setProduct(obj);
    }
  }

  const setInput = (name, value) => {
    setProduct(rel => ({ ...rel, [name]: value }));
    if (!saveButton) {
      setSaveButton(true)
    }
  }

  const getSaveProsessing = async () => {
    if (product.Name == "" || product.GroupId == "") {
      alert("Vacib xanaları doldurun!")
    } else {
      setIsLoading(true);
      let obj = CustomToLowerCase({ ...product });
      if (pricesList[0]) {
        obj.prices = [];
        pricesList.forEach((element, index) => {
          if (element.PriceNumber) {
            obj.prices.push({ PriceType: element.Id, Price: element.PriceNumber })
          }
        })
      }
      if (product.BarCode == "") {
        const result = await Api('barcode/get.php', {
          token: await AsyncStorage.getItem("token"),
          w: 0,
        })
        obj.barcode = result.data.Body;
      }
      obj.token = await AsyncStorage.getItem("token");
      const result = await Api('products/put.php', obj);
      if (result.data.Headers.ResponseStatus == "0") {
        setProduct(null);
        getProductData(result.data.Body.ResponseService);
        setSaveButton(false)
        successAlert();
        if (type == "products") {
          renderList(4 + 4);
        } else {
          navigation.goBack();
        }

      } else {
        alert(result.data.Body);
      }

      setIsLoading(false);
    }
  }

  const successAlert = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Əməliyyat uğurla icra olundu!',
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      ToastAndroid.SHORT,
      200,
      50
    )
  }

  const getExit = () => {
    setSaveButton(false);
    navigation.goBack();
  }

  const getPricesData = async () => {
    const result = await Api('pricetypes/get.php', {
      token: await AsyncStorage.getItem("token")
    })

    if (result.data.Body.List[0]) {
      setPricesList(result.data.Body.List);
    }
  }

  const getPRINT = async () => {
    let obj = {
      token: await AsyncStorage.getItem('token'),
      TemplateId: 1,
      List: [
        {
          Price: ConvertFixedTable(product.Price),
          ProductId: product.Id,
          Quantity: 1
        }
      ]
    }

    const result = await axios.post('https://api.akul.az/1.0/dev/controllers/products/pricelist.php', obj);
    try {
      // URL'den HTML içeriği indir
      // const response = await fetch('https://api.akul.az/1.0/online/controllers/printing/print.php?t=f8c8a1108261d76fd6ef5d6d4abd8097&tp=demands&i=0784b92f-7497-4333-8b21-81c495a8b28f&tm=demands');
      // const htmlContent = await response.text();
      // İndirilen HTML içeriğini yazdır

      const jobName = await RNPrint.print({
        html: result.data,
        fileName: 'PrintDocument',
      });

      console.log(`Printing job ${jobName} started`);
    } catch (error) {
      console.error('Error printing:', error);
    }
  }

  useEffect(() => {
    getProductData(id);
  }, [id])

  useEffect(() => {
    if (pricesTypes) {
      getPricesData();
    }
  }, [pricesTypes])


  useFocusEffect(

    useCallback(() => {
      const onBackPress = async () => {
        navigation.setParams({ shouldGoToSpecificPage: false });
        saveButton ? setDontBackModal(true) : (navigation.goBack());
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [saveButton]))

  return (
    product == null ?
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={50} color={CustomColors.primary} />
      </View>
      :
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={getPRINT} style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5
        }}>
          <AntDesign name='printer' color={CustomColors.primary} size={40} />
        </TouchableOpacity>
        <ScrollView>
          <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-start' }}>
            <View style={{ width: '100%' }}>
              <View style={{ margin: 5 }} />

              <CustomTextInput onChangeText={(e) => { setInput('Name', e) }} value={String(product.Name)} text={"Ad"} width={'100%'} />
              <View style={{ margin: 0.5 }} />
              <CustomTextInput onChangeText={(e) => { setInput('BarCode', e) }} value={String(product.BarCode)} text={"Barkod"} width={'100%'} />
              <View style={{ margin: 0.5 }} />
              <TouchableOpacity onPress={() => { setGroup(true) }}>
                <CustomTextInput editable={false} value={String(product.GroupName)} text={"Qrup"} width={'100%'} />
              </TouchableOpacity>
              <View style={{ margin: 5 }} />

            </View>
            <View style={{ width: '100%' }}>
              <View style={{ margin: 5 }} />

              <CustomTextInput keyboardType='numeric' onChangeText={(e) => {
                if (!saveButton) {
                  setSaveButton(true)
                }
                setProduct(rel => ({
                  ...rel, ['BuyPrice']: e.replace(',', '.'),
                }))
              }} value={String(product.BuyPrice)} text={"Alış qiymət"} width={'100%'} />
              <View style={{ margin: 0.5 }} />
              <CustomTextInput keyboardType='numeric' onChangeText={(e) => {
                if (!saveButton) {
                  setSaveButton(true)
                }
                setProduct(rel => ({ ...rel, ['MinPrice']: e.replace(',', '.') }))
              }} value={String(product.MinPrice)} text={"Min.qiymət"} width={'100%'} />
              <View style={{ margin: 0.5 }} />
              <CustomTextInput editable={pricePermission} keyboardType='numeric' onChangeText={(e) => {
                if (!saveButton) {
                  setSaveButton(true)
                }
                setProduct(rel => ({ ...rel, ['Price']: e.replace(",", '.') }))
              }} value={String(product.Price)} text={"Satış qiymət"} width={'100%'} />
              <View style={{ margin: 5 }} />
            </View>
            <View style={{ width: '100%' }}>
              <View style={{ margin: 5 }} />

              <TouchableOpacity onPress={() => { setCustomers(true) }}>
                <CustomTextInput editable={false} value={String(product.CustomerName)} text={"Təchizatçı"} width={'100%'} />
              </TouchableOpacity>
              <View style={{ margin: 0.5 }} />
              <CustomTextInput onChangeText={(e) => setInput('ArtCode', e)} value={String(product.ArtCode)} text={"Artkod"} width={'100%'} />
              <View style={{ margin: 0.5 }} />
              <CustomTextInput onChangeText={(e) => setInput('Description', e)} value={String(product.Description)} text={"Şərh"} width={'100%'} />
              <View style={{ margin: 5 }} />

            </View>
            <View style={{ width: '100%' }}>
              <View style={{ margin: 5 }} />
              {
                product.Prices.map((element, index) => (
                  <>
                    <View style={{ margin: 0.5 }} />
                    <CustomTextInput editable={pricePermission} keyboardType={'numeric'} onChangeText={(e) => {
                      let prObj = { ...product };
                      prObj.Prices[index].Price = e.replace(',', '.');
                      setProduct(prObj);
                      setSaveButton(true)
                    }} value={String(element.Price)} text={element.PriceName} width={'100%'} />
                  </>


                ))
              }
              <View style={{ margin: 5 }} />

            </View>
            {
              !product.Id &&
              <View style={{ width: '100%' }}>
                {
                  pricePermission && !pricesTypes ?
                    <TouchableOpacity onPress={() => {
                      setPricesTYpes(true);
                    }} style={styles.pricesContainer}>
                      <AntDesign name='right' size={20} color={CustomColors.primary} />
                      <Text style={{ color: CustomColors.primary }}>  Qiymət növləri</Text>
                    </TouchableOpacity>
                    :
                    <>
                      <TouchableOpacity onPress={() => {
                        setPricesTYpes(false);
                      }} style={styles.pricesContainer}>
                        <AntDesign name='down' size={20} color={CustomColors.primary} />
                        <Text style={{ color: CustomColors.primary }}>  Qiymət növləri</Text>
                      </TouchableOpacity>
                      {
                        pricesList[0] ?
                          <>
                            {
                              pricesList.map((element, index) => (
                                <>
                                  <View style={{ margin: 0.5 }} />
                                  <CustomTextInput editable={pricePermission} key={element.Id} keyboardType={'numeric'} onChangeText={(e) => {
                                    setPricesList(rel => {
                                      let data = [...rel];
                                      data[index].PriceNumber = e;
                                      return data;
                                    })
                                  }} value={pricesList[index].PriceNumber ? pricesList[index].PriceNumber : ""} text={element.Name} width={'100%'} />
                                </>
                              ))
                            }
                          </>
                          :
                          <View style={{ alignItems: 'center' }}>
                            <ActivityIndicator size={20} color={CustomColors.primary} />
                          </View>
                      }
                    </>
                }
              </View>
            }

            {
              id !== null &&
              <DocumentInItems data={product} itemOne={'title'} itemTwo={'value'} />

            }

          </View>

          <View style={{ margin: 40 }} />

          <GroupModal save={setSaveButton} modalVisible={group} idType={'GroupId'} nameType={'GroupName'} state={setProduct} setModalVisible={setGroup} />
          <CustomerModal save={setSaveButton} modalVisible={customers} setModalVisible={setCustomers} state={setProduct} idType={'CustomerId'} nameType={'CustomerName'} />
          <BackModal modalVisible={dontBackModal} setModalVisible={setDontBackModal} pressExit={getExit} pressContinue={() => { setDontBackModal(false) }} />
        </ScrollView>
        {
          saveButton &&
          <>
            <View style={{ width: '100%', alignItems: 'center', position: 'absolute', bottom: 10 }}>
              <CustomSuccessSaveButton disabled={isLoading} isLoading={isLoading} setIsLoading={setIsLoading} onPress={getSaveProsessing} text={'Yadda Saxla'} width={'95%'} />
            </View>
          </>
        }

      </View>
  )
}

export default Product

const styles = StyleSheet.create({
  pricesContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10
  }
})