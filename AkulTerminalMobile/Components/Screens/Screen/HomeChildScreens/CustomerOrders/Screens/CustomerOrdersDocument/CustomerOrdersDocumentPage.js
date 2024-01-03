import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomPrimaryButton from '../../../../../../../Global/UI/CustomPrimaryButton'
import PositionsList from '../../../../../../../Global/UI/PositionsList';
import { ConvertFixedTable } from '../../../../../../../Global/Components/ConvertFixedTable'
import CustomerModal from '../../../../../../../Global/Components/Modals/CustomerModal';
import StockModal from '../../../../../../../Global/Components/Modals/StockModal';
import { CustomerOrdersGlobalContext } from '../../CustomerOrdersGlobalState'
import { GlobalContext } from '../../../../../../../Global/Components/GlobalState'

const CustomerOrdersDocumentPage = ({ navigation }) => {

  const { listType } = useContext(GlobalContext);
  const { customerOrder, setCustomerOrder, saveButton, setSaveButton,debtQuantity } = useContext(CustomerOrdersGlobalContext)
  const [customer, setCustomer] = useState(false);
  const [stock, setStock] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity onPress={() => { setCustomer(true) }}>
        <CustomTextInput editable={false} text={'Müştəri'} width={'100%'} value={customerOrder.CustomerName} end={true} endText={<AntDesign name='right' size={15} />} />
      </TouchableOpacity>
      <Text style={{
        color: "red",
        textAlign: 'right',
        width: '100%',
        paddingRight: 10
      }}>Qalıq borc: <Text style={{ color: 'black' }}>{debtQuantity}</Text></Text>
      <TouchableOpacity onPress={() => { setStock(true) }}>
        <CustomTextInput editable={false} text={'Anbar'} width={'100%'} value={customerOrder.StockName} end={true} endText={<AntDesign name='right' size={15} />} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', marginTop: 10, marginBottom: 10 }}>
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("scanner", {
            location: "documentNewModal",
            state: customerOrder,
            setState: setCustomerOrder,
            setButton: setSaveButton,
            type: 'Sale'
          })
        }} width={'10%'} text={<AntDesign name='scan1' size={20} />} />
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("addPS", {
            location: "documentNewModal",
            state: customerOrder,
            setState: setCustomerOrder,
            setButton: setSaveButton,
            type: 'Sale'
          })
        }} width={'70%'} text={'Məhsul əlavə et'} />
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("productsCreate", {
            id: null
          })
        }} width={'10%'} text={<AntDesign name='plus' size={20} />} />
      </View>
      <View style={{flex:1,width:'100%'}}>
        <FlatList data={customerOrder.Positions} renderItem={({ item, index }) => (
          <PositionsList type={'Sale'} key={item.Id} location={"documentEditModal"} setButton={setSaveButton} element={item} setState={setCustomerOrder} state={customerOrder} index={index} name={item.Name} barcode={`${item.BarCode}`} totalPrice={ConvertFixedTable(Number(ConvertFixedTable(item.Price)) * Number(ConvertFixedTable(item.Quantity)))} priceandquantity={`${ConvertFixedTable(Number(item.Quantity))} əd x ${ConvertFixedTable(Number(item.Price))}`} navigation={navigation} />
        )}/>
      </View>

      {saveButton &&
        <View style={{ margin: 30 }} />
      }
      <CustomerModal save={setSaveButton} modalVisible={customer} setModalVisible={setCustomer} state={setCustomerOrder} nameType={'CustomerName'} idType={'CustomerId'} />
      <StockModal data={customerOrder} save={setSaveButton} modalVisible={stock} setModalVisible={setStock} state={setCustomerOrder} idType={'StockId'} nameType={'StockName'} />
    </View>
  )
}

export default CustomerOrdersDocumentPage

const styles = StyleSheet.create({})