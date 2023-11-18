import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SupplysGlobalContext } from '../../SupplysGlobaState';
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment/moment';
import MyDatePicker from '../../../../../../../Global/UI/MyDatePicker';
import CustomTextare from '../../../../../../../Global/UI/CustomTextare';
import DocumentInItems from './../../../../../../../Global/Components/DocumentInItems';

const SupplyAppointmentPage = () => {

  const { supply, setSupply, saveButton, setSaveButton } = useContext(SupplysGlobalContext);
  const [datePicker, setDatePicker] = useState(false);

  return (
    <ScrollView>
      <CustomTextInput placeholder="..." text={'№'} width={'100%'} value={supply.Name} addStyle={{ borderRadius: 0 }} onChangeText={(e) => {
        setSupply(rel => ({ ...rel, ['Name']: e }));
        if (!saveButton) setSaveButton(true)
      }} />
      <Pressable onPress={() => {
        setDatePicker(true)
      }}>
        <CustomTextInput placeholder="..." editable={false} text={'Tarix'} width={'100%'} value={moment(supply.Moment).format("YYYY-MM-DD")} end={true} endText={<AntDesign name='right' size={15} />} />
      </Pressable>
      <CustomTextInput placeholder="..." editable={false} text={'Keçirilib'} width={'100%'} addStyle={{ borderRadius: 0 }} end={true} endText={
        <Switch
          value={supply.Status == 1 ? true : false}
          onValueChange={(e) => {
            if (supply.Status == 1) {
              setSupply(rel => ({ ...rel, ['Status']: 0 }))
            } else {
              setSupply(rel => ({ ...rel, ['Status']: 1 }))
            }
            if (!saveButton) setSaveButton(true)
          }}
        />} />
      <CustomTextare placeholder="..." multiline={true} numberOfLines={4} text={"Şərh"} width={'100%'} value={supply.Description} onChangeText={(e) => {
        setSupply(rel => ({ ...rel, ['Description']: e }));
        if (!saveButton) setSaveButton(true)
      }} addStyle={{ borderRadius: 0 }} />
      <DocumentInItems data={supply} itemOne={'title'} itemTwo={'value'} />
      <MyDatePicker setState={setSaveButton} date={supply.Moment == "" ? new Date() : new Date(moment(supply.Moment).format('YYYY-MM-DD'))} setDate={setSupply} type={'Moment'} open={datePicker} setOpen={setDatePicker} />
    </ScrollView>
  )
}

export default SupplyAppointmentPage

const styles = StyleSheet.create({})