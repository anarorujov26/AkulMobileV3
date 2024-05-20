import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomPrimaryButton from '../../../../../../../Global/UI/CustomPrimaryButton'
import PositionsList from '../../../../../../../Global/UI/PositionsList';
import { ConvertFixedTable } from '../../../../../../../Global/Components/ConvertFixedTable'
import CustomerModal from '../../../../../../../Global/Components/Modals/CustomerModal';
import StockModal from '../../../../../../../Global/Components/Modals/StockModal';
import { DemandsGlobalContext } from '../../DemandsGlobalState'
import Api from '../../../../../../../Global/Components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DemandDocumentPage = ({ navigation }) => {

  const { demand, setDemand, saveButton, setSaveButton, debtQuantity, customerInfo, setCustomerInfo } = useContext(DemandsGlobalContext)
  const [customer, setCustomer] = useState(false);
  const [stock, setStock] = useState(false);

  const getCustomerInfoApi = async () => {
    let demandData = { ...demand };
    if (demandData.CustomerId == "") return;

    let obj = {
      id: demandData.CustomerId,
      token: await AsyncStorage.getItem("token")
    }

    const result = await Api('customers/getdata.php', obj)
    const customer = result.data.Body.CustomerData;
    setCustomerInfo(customer);

    if (demandData.Positions[0]) {

      let sendApiJson = {
        products: [],
        pricetype: customer.PriceTypeId,
        token: await AsyncStorage.getItem("token")
      }

      for (let index = 0; index < demandData.Positions.length; index++) {
        sendApiJson.products.push(demandData.Positions[index].ProductId)
      }

      const result = await Api('products/getproductsrate.php', sendApiJson);

      if (result.data.Headers.ResponseStatus == "0") {

        let newPriceFromProducts = result.data.Body.List
        for (let index = 0; index < newPriceFromProducts.length; index++) {
          for (let indexProduct = 0; indexProduct < demandData.Positions.length; indexProduct++) {
            if (newPriceFromProducts[index].ProductId == demandData.Positions[indexProduct].ProductId) {
              demandData.Positions[indexProduct].BasicPrice = ConvertFixedTable(newPriceFromProducts[index].Price);
              demandData.Positions[indexProduct].Price = ConvertFixedTable(newPriceFromProducts[index].Price);
              let discountPrice = (newPriceFromProducts[index].Price / 100) * ConvertFixedTable(customer.Discount);
              demandData.Positions[index].Price = demandData.Positions[index].Price - discountPrice;
            }
          }
        }

      }

      setDemand(demandData);

    }

  }

  useEffect(() => {
    getCustomerInfoApi();
  }, [demand.CustomerId])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity onPress={() => { setCustomer(true) }}>
        <CustomTextInput editable={false} text={'Müştəri'} width={'100%'} value={demand.CustomerName} end={true} endText={<AntDesign name='right' size={15} />} />
      </TouchableOpacity>
      <Text style={{
        color: "red",
        textAlign: 'right',
        width: '100%',
        paddingRight: 10
      }}>Qalıq borc: <Text style={{ color: 'black' }}>{debtQuantity}</Text></Text>
      <TouchableOpacity onPress={() => { setStock(true) }}>
        <CustomTextInput editable={false} text={'Anbar'} width={'100%'} value={demand.StockName} end={true} endText={<AntDesign name='right' size={15} />} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', marginTop: 10, marginBottom: 10 }}>
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("scanner", {
            location: "documentNewModal",
            state: demand,
            setState: setDemand,
            setButton: setSaveButton,
            type: 'Sale',
            pageName: "Demand"
          })
        }} width={'10%'} text={<AntDesign name='scan1' size={20} />} />
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("addPS", {
            location: "documentNewModal",
            state: demand,
            setState: setDemand,
            setButton: setSaveButton,
            type: 'Sale',
            pageName: "Demand"
          })
        }} width={'70%'} text={'Məhsul əlavə et'} />
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("productsCreate", {
            id: null
          })
        }} width={'10%'} text={<AntDesign name='plus' size={20} />} />
      </View>
      <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
        <FlatList data={demand.Positions} renderItem={({ item, index }) => (
          <PositionsList type={'Sale'} key={item.Id} pageName={'Demand'} location={"documentEditModal"} setButton={setSaveButton} element={item} setState={setDemand} state={demand} index={index} name={item.Name} barcode={`${item.BarCode}`} totalPrice={ConvertFixedTable(Number(ConvertFixedTable(item.Price)) * Number(ConvertFixedTable(item.Quantity)))} priceandquantity={`${ConvertFixedTable(Number(item.Quantity))} əd x ${ConvertFixedTable(Number(item.Price))}`} navigation={navigation} />
        )} />
      </View>
      {saveButton &&
        <View style={{ margin: 30 }} />
      }

      <CustomerModal save={setSaveButton} modalVisible={customer} setModalVisible={setCustomer} state={setDemand} nameType={'CustomerName'} idType={'CustomerId'} />
      <StockModal data={demand} save={setSaveButton} modalVisible={stock} setModalVisible={setStock} state={setDemand} idType={'StockId'} nameType={'StockName'} />
    </View>
  )
}

export default DemandDocumentPage