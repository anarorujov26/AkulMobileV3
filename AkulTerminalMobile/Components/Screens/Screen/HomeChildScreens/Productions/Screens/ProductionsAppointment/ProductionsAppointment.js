import { StyleSheet, Text, TouchableOpacity, TurboModuleRegistry, View } from 'react-native'
import React, { useContext, useEffect, useState, useSyncExternalStore } from 'react'
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput'
import { ProductionsGlobalContext } from '../../ProductionsGlobalState'
import OwnerModal from './../../../../../../../Global/Components/Modals/OwnerModal';
import DepratmentModal from './../../../../../../../Global/Components/Modals/DepratmentModal';
import MyDatePicker from './../../../../../../../Global/UI/MyDatePicker';
import moment from 'moment';
import { Checkbox, Switch } from '@ant-design/react-native';

const ProductionsAppointment = () => {

  const {
    production,
    setProduction,
    saveButton,
    setSaveButton,
    productionListRender,
    setProductionListRender,
    compositions,
    setCompositions,
    comEdit,
    setComEdit,
    comClose,
    setComClose,
  } = useContext(ProductionsGlobalContext);

  const [ownerModal, setOwnerModal] = useState(false);
  const [departmentModal, setDepartmentModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);



  const setInput = (a, x) => {

  }
  useEffect(() => {
    console.log(production);
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {
        production !== null &&
        <>
          <CustomTextInput onChangeText={(e) => { setProduction(rel => ({...rel,['Name']:e})),setSaveButton(true) }} value={String(production.Name)} text={"İstehsalat №"} width={'100%'} />
          <TouchableOpacity onPress={() => {
            setDateModal(true);
            setSaveButton(true)
          }}>
            <CustomTextInput editable={false} onChangeText={(e) => { setInput('Moment', e) }} value={String(production.Moment)} text={"Tarix"} width={'100%'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setOwnerModal(true);
            setSaveButton(true)
          }}>
            <CustomTextInput editable={false} onChangeText={(e) => { setInput('OwnerId', e) }} value={String(production.OwnerName)} text={"Cavabdeh"} width={'100%'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            setDepartmentModal(true);
            setSaveButton(true)
          }}>
            <CustomTextInput editable={false} onChangeText={(e) => { setInput('DepartmentId', e) }} value={String(production.DepartmentName)} text={"Şöbə"} width={'100%'} />
          </TouchableOpacity>

          <CustomTextInput placeholder="" editable={false} text={'Keçrilib'} width={'100%'} addStyle={{ borderRadius: 0 }} end={true} endText={
            <Checkbox
              checked={production.Status == 1 ? true : false}
              onChange={(e) => {
                setProduction(rel => ({ ...rel, ['Status']: e.target.checked ? 1 : 0}))
                setSaveButton(true)
              }}
            >
            </Checkbox>} />

          <CustomTextInput placeholder="" editable={false} text={'Tərkibi Müdəxilə'} width={'100%'} addStyle={{ borderRadius: 0 }} end={true} endText={
            <Checkbox
              checked={comEdit}
              defaultChecked={comEdit}
              onChange={(e) => {
                setComEdit(e.target.checked);
              }}
            >
            </Checkbox>} />
          <CustomTextInput placeholder="" editable={false} text={'Tərkibi Bağla'} width={'100%'} addStyle={{ borderRadius: 0 }} end={true} endText={
            <Checkbox
              checked={comClose}
              onChange={(e) => {
                setComClose(e.target.checked);
              }}
            >
            </Checkbox>} />

        </>
      }

      <OwnerModal modalVisible={ownerModal} setModalVisible={setOwnerModal} idType={'OwnerId'} nameType={"OwnerName"} state={setProduction} save={setSaveButton} />
      <DepratmentModal modalVisible={departmentModal} setModalVisible={setDepartmentModal} idType={'DepartmentId'} nameType={'DepartmentName'} save={setSaveButton} state={setProduction} />
      <MyDatePicker setState={setSaveButton} date={production.Moment == "" ? new Date() : new Date(moment(production.Moment).format('YYYY-MM-DD'))} setDate={setProduction} type={'Moment'} open={dateModal} setOpen={setDateModal} />
    </View>
  )
}

export default ProductionsAppointment

const styles = StyleSheet.create({})