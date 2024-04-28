import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment/moment';
import MyDatePicker from '../../../../../../../Global/UI/MyDatePicker';
import CustomTextare from '../../../../../../../Global/UI/CustomTextare';
import { DemandsGlobalContext } from '../../DemandsGlobalState';
import { GlobalContext } from '../../../../../../../Global/Components/GlobalState';
import DocumentInItems from '../../../../../../../Global/Components/DocumentInItems';
import DocumentPhotoComponent from '../../../../../../../Global/Components/DocumentsPhotoComponent';

const DemandAppointmentPage = ({ navigation }) => {

  const { prices } = useContext(GlobalContext);
  const { demand, setDemand, saveButton, setSaveButton, setDemandListRender } = useContext(DemandsGlobalContext);
  const [datePicker, setDatePicker] = useState(false);

  return (
    <ScrollView>
      <CustomTextInput placeholder="..." text={'№'} width={'100%'} value={demand.Name} addStyle={{ borderRadius: 0 }} onChangeText={(e) => {
        setDemand(rel => ({ ...rel, ['Name']: e }));
        if (!saveButton) setSaveButton(true)
      }} />
      <Pressable onPress={() => {
        setDatePicker(true)
      }}>
        <CustomTextInput placeholder="..." editable={false} text={'Tarix'} width={'100%'} value={moment(demand.Moment).format("YYYY-MM-DD")} end={true} endText={<AntDesign name='right' size={15} />} />
      </Pressable>
      <CustomTextInput placeholder="..." editable={false} text={'Keçirilib'} width={'100%'} addStyle={{ borderRadius: 0 }} end={true} endText={
        <Switch
          value={demand.Status == 1 ? true : false}
          onValueChange={(e) => {
            if (demand.Status == 1) {
              setDemand(rel => ({ ...rel, ['Status']: 0 }))
            } else {
              setDemand(rel => ({ ...rel, ['Status']: 1 }))
            }
            if (!saveButton) setSaveButton(true)
          }}
        />} />
      <CustomTextare placeholder="..." multiline={true} numberOfLines={4} text={"Şərh"} width={'100%'} value={demand.Description} onChangeText={(e) => {
        setDemand(rel => ({ ...rel, ['Description']: e }));
        if (!saveButton) setSaveButton(true)
      }} addStyle={{ borderRadius: 0 }} />
      <Pressable onPress={() => {
        navigation.navigate("priceTypes", {
          data: demand,
          setData: setDemand,
          setButton: setSaveButton
        })
      }}>
        <CustomTextInput placeholder="..." editable={false} text={'Qiymət növü'} width={'100%'} value={prices.priceName} end={true} endText={<AntDesign name='right' size={15} />} />
      </Pressable>
      <DocumentInItems data={demand} itemOne={'title'} itemTwo={'value'} />
      <MyDatePicker setState={setSaveButton} date={demand.Moment == "" ? new Date() : new Date(moment(demand.Moment).format('YYYY-MM-DD'))} setDate={setDemand} type={'Moment'} open={datePicker} setOpen={setDatePicker} />
      {
        demand.Id != null ?
        <DocumentPhotoComponent type={'demandReturn'} data={demand} renderItem={setDemandListRender} />
        :
        ''
      }
    </ScrollView>
  )
}

export default DemandAppointmentPage

const styles = StyleSheet.create({})