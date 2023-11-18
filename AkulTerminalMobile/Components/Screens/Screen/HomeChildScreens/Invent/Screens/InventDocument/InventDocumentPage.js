import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomPrimaryButton from '../../../../../../../Global/UI/CustomPrimaryButton'
import PositionsList from '../../../../../../../Global/UI/PositionsList';
import { ConvertFixedTable } from '../../../../../../../Global/Components/ConvertFixedTable'
import CustomerModal from '../../../../../../../Global/Components/Modals/CustomerModal';
import StockModal from '../../../../../../../Global/Components/Modals/StockModal';
import EnteredDiscount from '../../../../../../../Global/Components/EnteredDiscount';
import RetioDiscount from '../../../../../../../Global/Components/RetioDiscount';
import { InventGlobalContext } from '../../InventGlobalState'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FlatList } from 'react-native'
import { GlobalContext } from '../../../../../../../Global/Components/GlobalState'

const InventDocumentPage = ({ navigation }) => {

  const { listType } = useContext(GlobalContext);

  const { invent, setInvent, saveButton, setSaveButton } = useContext(InventGlobalContext)
  const [customer, setCustomer] = useState(false);
  const [stock, setStock] = useState(false);


  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity onPress={() => { setStock(true) }}>
        <CustomTextInput editable={false} text={'Anbar'} width={'100%'} value={invent.StockName} end={true} endText={<AntDesign name='right' size={15} />} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', marginTop: 10, marginBottom: 10 }}>
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("inventScanner", {
            location: "documentNewModal",
            state: invent,
            setState: setInvent,
            setButton: setSaveButton,
            type: 'Sale'
          })
        }} width={'10%'} text={<AntDesign name='scan1' size={20} />} />
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("inventAddProducts", {
            location: "documentNewModal",
            state: invent,
            setState: setInvent,
            setButton: setSaveButton,
            type: 'Sale',
          })
        }} width={'80%'} text={'Məhsul əlavə et'} />
      </View>
      <View style={{flex:1,width:'100%'}}>
        <FlatList data={invent.Positions} renderItem={({ item, index }) => (
          <PositionsList type={'Sale'} key={item.Id} location={"documentEditModal"} setButton={setSaveButton} element={item} setState={setInvent} state={invent} index={index} name={item.Name} barcode={<Text>{item.BarCode} <Ionicons name={'cube-outline'} size={15} color={'black'} /> {item.StockBalance == null ? 0 : item.StockBalance}</Text>} totalPrice={ConvertFixedTable(Number(ConvertFixedTable(item.Price)) * Number(ConvertFixedTable(item.Quantity)))} priceandquantity={`${ConvertFixedTable(Number(item.Quantity))} əd x ${ConvertFixedTable(Number(item.Price))}`} navigation={navigation} />
        )} numColumns={listType} />
      </View>

      {saveButton &&
        <View style={{ margin: 30 }} />
      }
      <StockModal data={invent} save={setSaveButton} answer={true} modalVisible={stock} setModalVisible={setStock} state={setInvent} idType={'StockId'} nameType={'StockName'} />
    </View>
  )
}

export default InventDocumentPage

const styles = StyleSheet.create({})