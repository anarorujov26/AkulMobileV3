import { Pressable, StyleSheet, Switch, Text, View, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment/moment';
import MyDatePicker from '../../../../../../../Global/UI/MyDatePicker';
import CustomTextare from '../../../../../../../Global/UI/CustomTextare';
import { InventGlobalContext } from '../../InventGlobalState';
import { GlobalContext } from '../../../../../../../Global/Components/GlobalState';
import DocumentInItems from './../../../../../../../Global/Components/DocumentInItems';

const InventAppointmentPage = ({ navigation }) => {

  const { invent, setInvent, saveButton, setSaveButton, setMissing, missing } = useContext(InventGlobalContext);
  const [datePicker, setDatePicker] = useState(false);
  const { prices, setPrices } = useContext(GlobalContext);

  return (
    <ScrollView>
      <CustomTextInput placeholder="..." text={'№'} width={'100%'} value={invent.Name} addStyle={{ borderRadius: 0 }} onChangeText={(e) => {
        setInvent(rel => ({ ...rel, ['Name']: e }));
        if (!saveButton) setSaveButton(true)
      }} />
      <Pressable onPress={() => {
        setDatePicker(true)
      }}>
        <CustomTextInput placeholder="..." editable={false} text={'Tarix'} width={'100%'} value={moment(invent.Moment).format("YYYY-MM-DD")} end={true} endText={<AntDesign name='right' size={15} />} />
      </Pressable>
      <CustomTextInput placeholder="..." editable={false} text={'Keçirilib'} width={'100%'} addStyle={{ borderRadius: 0 }} end={true} endText={
        <Switch
          value={invent.Status == 1 ? true : false}
          onValueChange={(e) => {
            if (invent.Status == 1) {
              setInvent(rel => ({ ...rel, ['Status']: 0 }))
            } else {
              setInvent(rel => ({ ...rel, ['Status']: 1 }))
            }
            if (!saveButton) setSaveButton(true)
          }}
        />} />
      <CustomTextare placeholder="..." multiline={true} numberOfLines={4} text={"Şərh"} width={'100%'} value={invent.Description} onChangeText={(e) => {
        setInvent(rel => ({ ...rel, ['Description']: e }));
        if (!saveButton) setSaveButton(true)
      }} addStyle={{ borderRadius: 0 }} />
      <Pressable onPress={() => {
        navigation.navigate("priceTypes", {
          data: invent,
          setData: setInvent,
          setButton: setSaveButton
        })
      }}>
        <CustomTextInput placeholder="..." editable={false} text={'Qiymət növü'} width={'100%'} value={prices.priceName} end={true} endText={<AntDesign name='right' size={15} />} />
      </Pressable>
      {
        invent.Id && <CustomTextInput placeholder="..." editable={false} text={'Qalığı sıfırla'} width={'100%'} addStyle={{ borderRadius: 0 }} end={true} endText={
          <Switch
            value={missing}
            onValueChange={(e) => {
              setMissing(e);
            }}
          />} />
      }
      <DocumentInItems data={invent} itemOne={'title'} itemTwo={'value'} />
      <MyDatePicker setState={setSaveButton} date={invent.Moment == "" ? new Date() : new Date(moment(invent.Moment).format('YYYY-MM-DD'))} setDate={setInvent} type={'Moment'} open={datePicker} setOpen={setDatePicker} />
    </ScrollView>
  )
}

export default InventAppointmentPage

const styles = StyleSheet.create({})