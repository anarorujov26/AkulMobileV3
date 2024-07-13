import { ActivityIndicator, Pressable, StyleSheet, Text, ToastAndroid, TurboModuleRegistry, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../../../../Global/Components/Api';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import CustomTextInput from '../../../../../Global/UI/CustomTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import MyDatePicker from '../../../../../Global/UI/MyDatePicker';
import AccountsModal from '../../../../../Global/Components/Modals/AccountsModal';
import { ConvertFixedTable } from '../../../../../Global/Components/ConvertFixedTable';
import CustomSuccessSaveButton from '../../../../../Global/UI/CustomSuccessSaveButton';
import { CustomToLowerCase } from './../../../../../Global/Components/CustomToLowerCase';

const item = ({ navigation, route }) => {

  let { id, renderList } = route.params;
  const [thisId, setThisId] = useState(id);
  const [item, setItem] = useState(null);
  const [saveButton, setSaveButton] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [fromModal, setFromModal] = useState(false);
  const [toModal, setToModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getItem = async () => {
    if (thisId == null) {
      let obj = {
        Amount: 0,
        CashFromId: "",
        CashFromName: "",
        CashToId: "",
        CashToName: "",
        Moment: new Date(),
        Name: "",
        Status: true,
        Token: await AsyncStorage.getItem("token")
      }

      setItem(obj);

    } else {
      let obj = {
        id: thisId,
        token: await AsyncStorage.getItem("token")
      }
      let result = await Api("cashtransactions/get.php", obj)
      if (result.data.Body.List[0]) {
        let requestItem = { ...result.data.Body.List[0] };
        requestItem.Token = await AsyncStorage.getItem('token')
        requestItem.Amount = String(ConvertFixedTable(Number(requestItem.Amount)));
        setItem(requestItem)
      } else {
        setItem(null);
      }
    }
  }

  const handleSaveProsessing = async () => {
    setIsLoading(true)
    let infos = { ...item };

    if (thisId == null) {
      let newNameObj = {
        n: "",
        token: await AsyncStorage.getItem("token")
      }
      let newName = await Api('cashtransactions/newname.php', newNameObj)
      let name = newName.data.Body.ResponseService;
      infos.Name = name;
      setItem(rel => ({ ...rel, ['Name']: name }));
    }
    infos.Moment = moment(infos.Moment).format("YYYY-MM-DD hh:mm:ss");
    infos.Amount = infos.Amount == "" ? 0 : infos.Amount;


    let keysToLower = CustomToLowerCase(infos);

    let saveResponse = await Api('cashtransactions/put.php', keysToLower);
    if (saveResponse.data.Headers.ResponseStatus == "0") {
      successAlert();
      if (renderList) {
        renderList(rel => rel + 1);
      }
      setSaveButton(false);
      setThisId(saveResponse.data.Headers.ResponseService);
    } else {
      alert(saveResponse.data.Body);
    }
    setIsLoading(false);
  }

  const successAlert = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Əməliyyat uğurla icra olundu!',
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      ToastAndroid.SHORT,
      200,
      50
    )
  }
  
  useEffect(() => {
    getItem();
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {
        item == null ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={50} color={CustomColors("dark").primary} />
          </View>
          :
          <View style={{ flex: 1, alignItems: 'center' }}>
            <CustomTextInput onChangeText={(e) => {
              setItem(prev => ({ ...prev, ['Name']: e }));
            }} placeholder="..." text={'№'} width={'100%'} value={item.Name} addStyle={{ borderRadius: 0 }} />
            <Pressable onPress={() => {
              setDatePicker(true);
            }}>
              <CustomTextInput placeholder="..." editable={false} text={'Tarix'} width={'100%'} value={moment(item.Moment).format("YYYY-MM-DD")} end={true} endText={<AntDesign name='right' size={15} />} />
            </Pressable>

            <CustomTextInput keyboardType={'Numeric'} onChangeText={(e) => {
              setItem(prev => ({ ...prev, ['Amount']: e.replace(',', '.') }));
            }} placeholder="..." text={'Məbləğ'} width={'100%'} value={item.Amount} addStyle={{ borderRadius: 0 }} />

            <Pressable onPress={() => {
              setFromModal(true);
            }}>
              <CustomTextInput placeholder="..." editable={false} text={'Hesabdan'} width={'100%'} value={item.CashFromName} end={true} endText={<AntDesign name='right' size={15} />} />
            </Pressable>

            <Pressable onPress={() => {
              setToModal(true);
            }}>
              <CustomTextInput placeholder="..." editable={false} text={'Hesaba'} width={'100%'} value={item.CashToName} end={true} endText={<AntDesign name='right' size={15} />} />
            </Pressable>

            <AccountsModal save={setSaveButton} idType={'CashFromId'} nameType={'CashFromName'} modalVisible={fromModal} setModalVisible={setFromModal} state={setItem} />
            <AccountsModal save={setSaveButton} idType={'CashToId'} nameType={'CashToName'} modalVisible={toModal} setModalVisible={setToModal} state={setItem} />
            <MyDatePicker setState={setSaveButton} date={item.Moment == "" ? new Date() : new Date(moment(item.Moment).format('YYYY-MM-DD'))} setDate={setItem} type={'Moment'} open={datePicker} setOpen={setDatePicker} />

            {
              saveButton ?
                <CustomSuccessSaveButton onPress={handleSaveProsessing} addStyle={{
                  width: 100000,
                }} isLoading={isLoading} setIsLoading={setIsLoading} text={thisId ? "Yadda Saxla" : 'Transfer et'} />
                :
                ''
            }
          </View>
      }


    </View>
  )
}

export default item

const styles = StyleSheet.create({})