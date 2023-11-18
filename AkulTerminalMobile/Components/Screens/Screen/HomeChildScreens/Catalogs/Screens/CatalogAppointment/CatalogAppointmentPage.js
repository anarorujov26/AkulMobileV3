import { Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment/moment';
import MyDatePicker from '../../../../../../../Global/UI/MyDatePicker';
import CustomTextare from '../../../../../../../Global/UI/CustomTextare';
import { CatalogsGlobalContext } from '../../CatalogsGlobalState';
import { GlobalContext } from '../../../../../../../Global/Components/GlobalState';

const CatalogAppointmentPage = ({navigation}) => {

  const { prices } = useContext(GlobalContext);
  const { catalog, setCatalog, saveButton, setSaveButton } = useContext(CatalogsGlobalContext);
  const [datePicker, setDatePicker] = useState(false);

  return (
    <View>
      <CustomTextInput placeholder="..." text={'№'} width={'100%'} value={catalog.Name} addStyle={{ borderRadius: 0 }} onChangeText={(e) => {
        setCatalog(rel => ({ ...rel, ['Name']: e }));
        if (!saveButton) setSaveButton(true)
      }} />
      <Pressable onPress={() => {
        setDatePicker(true)
      }}>
        <CustomTextInput placeholder="..." editable={false} text={'Tarix'} width={'100%'} value={moment(catalog.Moment).format("YYYY-MM-DD")} end={true} endText={<AntDesign name='right' size={15} />} />
      </Pressable>
      <CustomTextInput placeholder="..." editable={false} text={'Keçirilib'} width={'100%'} addStyle={{ borderRadius: 0 }} end={true} endText={
        <Switch
          value={catalog.Status == 1 ? true : false}
          onValueChange={(e) => {
            if (catalog.Status == 1) {
              setCatalog(rel => ({ ...rel, ['Status']: 0 }))
            } else {
              setCatalog(rel => ({ ...rel, ['Status']: 1 }))
            }
            if (!saveButton) setSaveButton(true)
          }}
        />} />
      <CustomTextare placeholder="..." multiline={true} numberOfLines={4} text={"Şərh"} width={'100%'} value={catalog.Description} onChangeText={(e) => {
        setCatalog(rel => ({ ...rel, ['Description']: e }));
        if (!saveButton) setSaveButton(true)
      }} addStyle={{ borderRadius: 0 }} />
      <Pressable onPress={() => {
        navigation.navigate("priceTypes", {
          data: catalog,
          setData: setCatalog,
          setButton: setSaveButton
        })
      }}>
        <CustomTextInput placeholder="..." editable={false} text={'Qiymət növü'} width={'100%'} value={prices.priceName} end={true} endText={<AntDesign name='right' size={15} />} />
      </Pressable>
      <MyDatePicker setState={setSaveButton} date={catalog.Moment == "" ? new Date() : new Date(moment(catalog.Moment).format('YYYY-MM-DD'))} setDate={setCatalog} type={'Moment'} open={datePicker} setOpen={setDatePicker} />
    </View>
  )
}

export default CatalogAppointmentPage

const styles = StyleSheet.create({})