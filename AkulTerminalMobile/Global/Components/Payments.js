import { ActivityIndicator, Modal, StyleSheet, Switch, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomColors from '../Colors/CustomColors';
import CustomTextInput from '../UI/CustomTextInput';
import { ConvertFixedTable } from './ConvertFixedTable';
import moment from 'moment';
import Api from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountsModal from './Modals/AccountsModal';
import CustomSuccessSaveButton from '../UI/CustomSuccessSaveButton';
import { CustomToLowerCase } from './CustomToLowerCase';

const Payments = ({ navigation, route, type, pT, info, setInfo, listRender, modalVisible, setModalVisible, save }) => {

  const [paymentType, setPaymentType] = useState(false);
  const [listData, setListData] = useState([]);
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState(false);
  const [linkData, setLinkData] = useState(null);
  const [saveButton, setSaveButton] = useState(false);
  const [accountModal, setAccountModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {

    let data = { ...info };
    data.token = await AsyncStorage.getItem("token");
    let objInfoApi = CustomToLowerCase(data);
    if (objInfoApi.name == "") {
      const infoPutNweName = await Api(`${type}/newname.php`, {
        n: "",
        token: await AsyncStorage.getItem("token")
      })
      if (infoPutNweName.data.Headers.ResponseStatus == "0") {
        obj.name = infoPutNweName.data.Body.ResponseService;
      } else {
        alert(infoPutNweName.data.Body);
      }
    }
    objInfoApi.token = await AsyncStorage.getItem("token");

    const infoPut = await Api(`${type}/put.php`, objInfoApi);
    if (infoPut.data.Headers.ResponseStatus == "0") {
      save(false);
      listRender(rel => rel + 1);
      let getInfo = await Api(`${type}/get.php`, {
        id: info.Id,
        token:await AsyncStorage.getItem("token")
      })
      if(getInfo.data.Body.List[0]){
        setInfo(rel => ({...rel,['Amount']:getInfo.data.Body.List[0].Amount}))
      }

      let obj = {
        doctype: type,
        id: info.Id,
        token: await AsyncStorage.getItem("token")
      }
      let o = {
        amount: 0,
        cashid: null,
        customerid: info.CustomerId,
        link: info.Id,
        moment: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        name: "",
        spenditem: '2232d344-142b-44f3-b2b8-ea4c5add0b31',
        status: true,
        token: await AsyncStorage.getItem("token")
      }

      setLinkData(o);

      const result = await Api('links/get.php', obj);
      if (result.data.Headers.ResponseStatus == "0") {
        setListData(result.data.Body.List)
      }
    }


  }

  const getOperationPS = async () => {
    setPrice(String(ConvertFixedTable(info.Amount)));
  }

  const getSave = async () => {
    setIsLoading(true);
    let data = { ...linkData };
    data.amount = price;
    delete data.cashname;
    let apiO = `${paymentType ? 'invoice' : 'payment'}${pT}`;
    const newname = await Api(`${apiO}/newname.php`, {
      token: await AsyncStorage.getItem('token')
    });
    data.name = newname.data.Body.ResponseService;
    const datas = await Api(`${apiO}/put.php`, data);
    if (datas.data.Headers.ResponseStatus == '0') {
      getData();
      setSaveButton(false);
      successAlert();
    } else {
      alert(datas.data.Body);
    }
    setIsLoading(false)
  }

  const successAlert = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Ödəniş uğurla icra olundu!',
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      ToastAndroid.SHORT,
      200,
      50
    )
  }

  useEffect(() => {
    if (modalVisible) {
      getData();
    } else {
      setPrice("0");
      setPaymentType(false);
      setTotalPrice(false);
      setSaveButton(false);
    }
  }, [modalVisible])

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {
            info !== null
              && info.Id ?
              <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
                <View style={{ width: '100%', backgroundColor: "#E8E8E8", height: 50, justifyContent: 'space-between', padding: 5, alignItems: 'center', flexDirection: 'row' }}>
                  <Text style={{ color: "#B0B0B0", fontSize: 15, fontWeight: 'bold' }}>Mədaxil {paymentType ? 'nağd' : 'nağdsız'}</Text>
                  <Switch
                    trackColor={{ false: '#767577', true: CustomColors.primary }}
                    thumbColor={paymentType ? CustomColors.primaryV2 : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(e) => {
                      setPaymentType(e);
                      if (!saveButton) {
                        setSaveButton(true)
                      }
                    }}
                    value={paymentType}
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, width: '100%', height: 50, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: "#bcbcbc" }}>
                  <Text style={{ color: "#606060", fontWeight: 'bold' }}>Tam ödəniş</Text>
                  <Switch
                    trackColor={{ false: '#767577', true: CustomColors.primary }}
                    thumbColor={totalPrice ? CustomColors.primaryV2 : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(e) => {
                      setTotalPrice(e)
                      if (e) { getOperationPS() } else { setPrice("0") }
                      if (!saveButton) {
                        setSaveButton(true)
                      }
                    }}
                    value={totalPrice}
                  />
                </View>
                {
                  paymentType &&
                  <TouchableOpacity onPress={() => {
                    setAccountModal(true)
                  }} style={{ width: '100%' }}>
                    <CustomTextInput keyboardType={'numeric'} addStyle={{ marginTop: 1, borderBottomWidth: 0.5, borderColor: "#bcbcbc" }} editable={false} value={info.cashid ? info.cashname : 'hesab'} text={"Hesab"} width={'100%'} />
                  </TouchableOpacity>
                }
                <CustomTextInput keyboardType={'numeric'} addStyle={{ marginTop: 1, borderBottomWidth: 0.5, borderColor: "#bcbcbc" }} onChangeText={(e) => {
                  setPrice(e);
                  if (!saveButton) setSaveButton(true)
                }} value={price} text={"Məbləğ"} width={'100%'} />


                <View style={{ marginTop: 40 }}>
                  <Text style={{ fontSize: 20, color: '#dcdcdc', fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Əlaqəli sənədlər</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: "black", fontWeight: 'bold' }}>Ad</Text>
                    </View>
                    <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: "black", fontWeight: 'bold' }}>Məbləğ</Text>
                    </View>
                    <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: "black", fontWeight: 'bold' }}>Tarix</Text>
                    </View>
                  </View>
                  {
                    listData.map((element, index) => (
                      <View key={element.Id} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 13 }}>
                        <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ color: "black" }}>{element.Name}</Text>
                        </View>
                        <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ color: "black" }}>{ConvertFixedTable(element.Amount)}</Text>
                        </View>
                        <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ color: "black" }}>{moment(element.Moment).format("YYYY-MM-DD")}</Text>
                        </View>
                      </View>
                    ))
                  }
                </View>
              </View>
              :
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: CustomColors.primaryV2 }}>Sənəd yaradılmayıb!</Text>
              </View>
          }
        </View>
      </View>
      {
        saveButton &&
        <CustomSuccessSaveButton onPress={getSave} isLoading={isLoading} setIsLoading={setIsLoading} text={'Yadda Saxla'} width={'100%'} addStyle={{
          borderRadius: 0
        }} />
      }
      <AccountsModal save={setSaveButton} modalVisible={accountModal} setModalVisible={setAccountModal} idType={'cashid'} nameType={'cashname'} state={setLinkData} />
    </Modal>
  )
}

export default Payments

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  listItem: {
    padding: 10,
    width: 100,
  }
})