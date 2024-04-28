import { Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment/moment';
import MyDatePicker from '../../../../../../../Global/UI/MyDatePicker';
import CustomTextare from '../../../../../../../Global/UI/CustomTextare';
import { GlobalContext } from '../../../../../../../Global/Components/GlobalState';
import { MovesGlobalContext } from '../../MovesGlobalState';
import DocumentInItems from '../../../../../../../Global/Components/DocumentInItems';
import DocumentPhotoComponent from '../../../../../../../Global/Components/DocumentsPhotoComponent';

const MoveAppointmentPage = ({ navigation }) => {

  const { prices } = useContext(GlobalContext);
  const { move, setMove, saveButton, setSaveButton,setMoveListRender } = useContext(MovesGlobalContext);
  const [datePicker, setDatePicker] = useState(false);

  return (
    <View style={{flex:1}}>
      <CustomTextInput placeholder="..." text={'№'} width={'100%'} value={move.Name} addStyle={{ borderRadius: 0 }} onChangeText={(e) => {
        setMove(rel => ({ ...rel, ['Name']: e }));
        if (!saveButton) setSaveButton(true)
      }} />
      <Pressable onPress={() => {
        setDatePicker(true)
      }}>
        <CustomTextInput placeholder="..." editable={false} text={'Tarix'} width={'100%'} value={moment(move.Moment).format("YYYY-MM-DD")} end={true} endText={<AntDesign name='right' size={15} />} />
      </Pressable>
      <CustomTextInput placeholder="..." editable={false} text={'Keçirilib'} width={'100%'} addStyle={{ borderRadius: 0 }} end={true} endText={
        <Switch
          value={move.Status == 1 ? true : false}
          onValueChange={(e) => {
            if (move.Status == 1) {
              setMove(rel => ({ ...rel, ['Status']: 0 }))
            } else {
              setMove(rel => ({ ...rel, ['Status']: 1 }))
            }
            if (!saveButton) setSaveButton(true)
          }}
        />} />
      <CustomTextare placeholder="..." multiline={true} numberOfLines={4} text={"Şərh"} width={'100%'} value={move.Description} onChangeText={(e) => {
        setMove(rel => ({ ...rel, ['Description']: e }));
        if (!saveButton) setSaveButton(true)
      }} addStyle={{ borderRadius: 0 }} />
      <Pressable onPress={() => {
        navigation.navigate("priceTypes", {
          data: move,
          setData: setMove,
          setButton: setSaveButton
        })
      }}>
        <CustomTextInput placeholder="..." editable={false} text={'Qiymət növü'} width={'100%'} value={prices.priceName} end={true} endText={<AntDesign name='right' size={15} />} />
      </Pressable>
      <DocumentInItems data={move} itemOne={'title'} itemTwo={'value'}/>  
      <MyDatePicker setState={setSaveButton} date={move.Moment == "" ? new Date() : new Date(moment(move.Moment).format('YYYY-MM-DD'))} setDate={setMove} type={'Moment'} open={datePicker} setOpen={setDatePicker} />
      {
        move.Id != null ?
        <DocumentPhotoComponent type={'move'} data={move} renderItem={setMoveListRender}/>
        :
        ''
      }
    </View>
  )
}

export default MoveAppointmentPage

const styles = StyleSheet.create({})