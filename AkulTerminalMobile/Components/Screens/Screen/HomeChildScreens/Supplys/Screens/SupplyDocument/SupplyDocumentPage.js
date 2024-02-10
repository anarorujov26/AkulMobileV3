import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput'
import { SupplysGlobalContext } from '../../SupplysGlobaState'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomPrimaryButton from '../../../../../../../Global/UI/CustomPrimaryButton'
import PositionsList from '../../../../../../../Global/UI/PositionsList';
import { ConvertFixedTable } from '../../../../../../../Global/Components/ConvertFixedTable'
import CustomerModal from '../../../../../../../Global/Components/Modals/CustomerModal';
import StockModal from '../../../../../../../Global/Components/Modals/StockModal';
import { FlatList } from 'react-native'
import { GlobalContext } from '../../../../../../../Global/Components/GlobalState'

const SupplyDocumentPage = ({ navigation }) => {

  const { listType } = useContext(GlobalContext);

  const { supply, setSupply, saveButton, setSaveButton, debtQuantity } = useContext(SupplysGlobalContext)
  const [customer, setCustomer] = useState(false);
  const [stock, setStock] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity onPress={() => { setCustomer(true) }}>
        <CustomTextInput editable={false} text={'Təchizatçı'} width={'100%'} value={supply.CustomerName} end={true} endText={<AntDesign name='right' size={15} />} />
      </TouchableOpacity>
      <Text style={{
        color:"red",
        textAlign:'right',
        width:'100%',
        paddingRight:10
      }}>Qalıq borc: <Text style={{color:'black'}}>{debtQuantity}</Text></Text>
      <TouchableOpacity onPress={() => { setStock(true) }}>
        <CustomTextInput editable={false} text={'Anbar'} width={'100%'} value={supply.StockName} end={true} endText={<AntDesign name='right' size={15} />} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', marginTop: 10, marginBottom: 10 }}>
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("scanner", {
            location: "documentNewModal",
            state: supply,
            setState: setSupply,
            setButton: setSaveButton,
            type: 'BuySupply'
          })
        }} width={'10%'} text={<AntDesign name='scan1' size={20} />} />
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("addPS", {
            location: "documentNewModal",
            state: supply,
            setState: setSupply,
            setButton: setSaveButton,
            type: 'BuySupply'
          })
        }} width={'70%'} text={'Məhsul əlavə et'} />
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("productsCreate", {
            id: null
          })
        }} width={'10%'} text={<AntDesign name='plus' size={20} />} />
      </View>

      <View style={{ flex: 1, width: '100%' }}>
        <FlatList data={supply.Positions} renderItem={({ item, index }) => (
          <PositionsList type={'BuySupply'} location={"documentEditModal"} setButton={setSaveButton} element={item} setState={setSupply} state={supply} index={index} name={item.Name} barcode={`${item.BarCode}`} totalPrice={ConvertFixedTable(Number(ConvertFixedTable(item.Price)) * Number(ConvertFixedTable(item.Quantity)))} priceandquantity={`${ConvertFixedTable(Number(item.Quantity))} ${item.UnitName} x ${ConvertFixedTable(Number(item.Price))}`} navigation={navigation} />
        )} keyExtractor={item => item.Id} />
      </View>

      {saveButton &&
        <View style={{ margin: 30 }} />
      }
      <CustomerModal save={setSaveButton} modalVisible={customer} setModalVisible={setCustomer} state={setSupply} nameType={'CustomerName'} idType={'CustomerId'} />
      <StockModal data={supply} save={setSaveButton} modalVisible={stock} setModalVisible={setStock} state={setSupply} idType={'StockId'} nameType={'StockName'} />
    </View>
  )
}

export default SupplyDocumentPage

const styles = StyleSheet.create({})