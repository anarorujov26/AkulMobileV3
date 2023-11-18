import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomPrimaryButton from '../../../../Global/UI/CustomPrimaryButton'
import CustomTextInput from '../../../../Global/UI/CustomTextInput'
import { ConvertFixedTable } from '../../../../Global/Components/ConvertFixedTable'
import CustomerModal from '../../../../Global/Components/Modals/CustomerModal'
import { OrdersGlobalContext } from '../../OrdersGlobalState'
import PositionsList from '../../../../Global/UI/PositionsList'
import { GlobalContext } from './../../../../Global/Components/GlobalState';
import { FlatList } from 'react-native';

const OrderDocumentPage = ({ navigation }) => {

  const { listType } = useContext(GlobalContext);

  const { order, setOrder, saveButton, setSaveButton } = useContext(OrdersGlobalContext)
  const [customer, setCustomer] = useState(false);

  return (
    <View style={{ flex: 1,alignItems:'center' }}>
      <TouchableOpacity onPress={() => { setCustomer(true) }}>
        <CustomTextInput editable={false} text={'Müştəri'} width={'100%'} value={order.CustomerName} end={true} endText={<AntDesign name='right' size={15} />} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', marginTop: 10, marginBottom: 10 }}>
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("scanner", {
            location: "documentNewModal",
            state: order,
            setState: setOrder,
            setButton: setSaveButton,
            type: 'ct'
          })
        }} width={'10%'} text={<AntDesign name='scan1' size={20} />} />
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("addPS", {
            location: "documentNewModal",
            state: order,
            setState: setOrder,
            setButton: setSaveButton,
            type: 'ct'
          })
        }} width={'70%'} text={'Məhsul əlavə et'} />
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("productsCreate", {
            id: null
          })
        }} width={'10%'} text={<AntDesign name='plus' size={20} />} />
      </View>
      <FlatList
        data={order.Positions}
        renderItem={({ item, index }) => (
          <PositionsList type={'ct'} key={item.Id} location={"documentEditModal"} setButton={setSaveButton} element={item} setState={setOrder} state={order} index={index} name={item.ProductName} totalPrice={ConvertFixedTable(Number(ConvertFixedTable(item.Price)) * Number(ConvertFixedTable(item.Quantity)))} priceandquantity={`${ConvertFixedTable(Number(item.Quantity))} əd x ${ConvertFixedTable(Number(item.Price))}`} navigation={navigation} />
        )}
      />
      {saveButton &&
        <View style={{ margin: 30 }} />
      }
      <CustomerModal save={setSaveButton} modalVisible={customer} setModalVisible={setCustomer} state={setOrder} nameType={'CustomerName'} idType={'CustomerId'} />
    </View>
  )
}

export default OrderDocumentPage

const styles = StyleSheet.create({})