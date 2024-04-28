import { Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment/moment';
import MyDatePicker from '../../../../../../../Global/UI/MyDatePicker';
import CustomTextare from '../../../../../../../Global/UI/CustomTextare';
import { CustomerOrdersGlobalContext } from '../../CustomerOrdersGlobalState';
import OrderTypeModal from './../../../../../../../Global/Components/Modals/OrderTypeModal';
import { GlobalContext } from '../../../../../../../Global/Components/GlobalState';
import DocumentInItems from '../../../../../../../Global/Components/DocumentInItems';
import DocumentPhotoComponent from '../../../../../../../Global/Components/DocumentsPhotoComponent';

const CustomerOrdersAppointmentPage = ({ navigation }) => {

  const { prices } = useContext(GlobalContext);
  const { customerOrder, setCustomerOrder, saveButton, setSaveButton,setCustomerOrdersListRender } = useContext(CustomerOrdersGlobalContext);
  const [datePicker, setDatePicker] = useState(false);
  const [orderType, setOrderType] = useState(false);

  return (
    <View style={{flex:1}}>
      <CustomTextInput placeholder="..." text={'№'} width={'100%'} value={customerOrder.Name} addStyle={{ borderRadius: 0 }} onChangeText={(e) => {
        setCustomerOrder(rel => ({ ...rel, ['Name']: e }));
        if (!saveButton) setSaveButton(true)
      }} />
      <Pressable onPress={() => {
        setDatePicker(true)
      }}>
        <CustomTextInput placeholder="..." editable={false} text={'Tarix'} width={'100%'} value={moment(customerOrder.Moment).format("YYYY-MM-DD")} end={true} endText={<AntDesign name='right' size={15} />} />
      </Pressable>
      <CustomTextInput placeholder="..." editable={false} text={'Keçirilib'} width={'100%'} addStyle={{ borderRadius: 0 }} end={true} endText={
        <Switch
          value={customerOrder.Status == 1 ? true : false}
          onValueChange={(e) => {
            if (customerOrder.Status == 1) {
              setCustomerOrder(rel => ({ ...rel, ['Status']: 0 }))
            } else {
              setCustomerOrder(rel => ({ ...rel, ['Status']: 1 }))
            }
            if (!saveButton) setSaveButton(true)
          }}
        />} />
      <CustomTextare placeholder="..." multiline={true} numberOfLines={4} text={"Şərh"} width={'100%'} value={customerOrder.Description} onChangeText={(e) => {
        setCustomerOrder(rel => ({ ...rel, ['Description']: e }));
        if (!saveButton) setSaveButton(true)
      }} addStyle={{ borderRadius: 0 }} />
      <Pressable onPress={() => {
        setOrderType(true)
      }}>
        <CustomTextInput placeholder="..." editable={false} text={'Sifariş növü'} width={'100%'} value={customerOrder.PaymentMethod == "cash" ? "Nağd" : "Köçürmə"} end={true} endText={<AntDesign name='right' size={15} />} />
      </Pressable>
      <Pressable onPress={() => {
        navigation.navigate("priceTypes", {
          data: customerOrder,
          setData: setCustomerOrder,
          setButton: setSaveButton
        })
      }}>
        <CustomTextInput placeholder="..." editable={false} text={'Qiymət növü'} width={'100%'} value={prices.priceName} end={true} endText={<AntDesign name='right' size={15} />} />
      </Pressable>
      <DocumentInItems data={customerOrder} itemOne={'title'} itemTwo={'value'}/>
      <MyDatePicker setState={setSaveButton} date={customerOrder.Moment == "" ? new Date() : new Date(moment(customerOrder.Moment).format('YYYY-MM-DD'))} setDate={setCustomerOrder} type={'Moment'} open={datePicker} setOpen={setDatePicker} />
      <OrderTypeModal setButton={setSaveButton} setData={setCustomerOrder} type={'PaymentMethod'} modalVisible={orderType} setModalVisible={setOrderType} />
     {
      customerOrder.Id != null ?
      <DocumentPhotoComponent type={'customerorders'} data={customerOrder} renderItem={setCustomerOrder}/>
      :
      ''
     }
    </View>
  )
}

export default CustomerOrdersAppointmentPage

const styles = StyleSheet.create({})