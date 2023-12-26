import { Pressable, StyleSheet, View } from 'react-native'
import React, { useContext, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment/moment';
import { OrdersGlobalContext } from '../../OrdersGlobalState';
import CustomTextInput from '../../../../Global/UI/CustomTextInput';
import { GlobalContext } from '../../../../Global/Components/GlobalState';

const OrderAppointmentPage = ({ navigation }) => {

  const { prices } = useContext(GlobalContext);
  const { order, setOrder, saveButton, setSaveButton } = useContext(OrdersGlobalContext);
  return (
    <View>
      <CustomTextInput placeholder="..." text={'№'} width={'100%'} value={order.Name} addStyle={{ borderRadius: 0 }} onChangeText={(e) => {
        setOrder(rel => ({ ...rel, ['Name']: e }));
        if (!saveButton) setSaveButton(true)
      }} />
      <Pressable onPress={() => {
        navigation.navigate("priceTypes", {
          data: order,
          setData: setOrder,
          setButton: setSaveButton
        })
      }}>
        <CustomTextInput placeholder="..." editable={false} text={'Qiymət növü'} width={'100%'} value={prices.priceName} end={true} endText={<AntDesign name='right' size={15} />} />
      </Pressable>
    </View>
  )
}

export default OrderAppointmentPage

const styles = StyleSheet.create({})