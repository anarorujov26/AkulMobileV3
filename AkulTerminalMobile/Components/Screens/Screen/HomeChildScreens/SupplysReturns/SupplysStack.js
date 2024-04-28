import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Supplys from './Screens/Supplys';
import Supply from './Screens/Supply';
import DocumentEditModal from '../../../../../Global/Components/Modals/DocumentEditModal';
import ProductsScanner from '../../../../../Global/UI/ProductsScanner';
import AddProducts from '../../../../../Global/Components/AddProducts';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SupplysGlobalContext } from './SupplysGlobaState';
import AnswerModal from '../../../../../Global/Components/Modals/AnswerModal';
import { useContext } from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../../../../Global/Components/Api';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Product from '../Products/Product';
import DocumentNewModal from '../../../../../Global/Components/Modals/DocumentNewModal';
import Payments from '../../../../../Global/Components/Payments';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MoreCohices from '../../../../../Global/Components/Modals/MoreCohices';
import CustomDangerButton from '../../../../../Global/UI/CustomDangerButton';
import CustomSuccessButton from '../../../../../Global/UI/CustomSuccessButton';
import TmpModal from '../../../../../Global/Components/Modals/TmpModal';
import ProductCreateCOMP from '../../../../../Global/Components/ProductCreateCOMP';

const Stack = createNativeStackNavigator();

const SupplysStack = () => {

  const navigation = useNavigation();

  const [modalAnswer, setModalAnswer] = useState(false)
  const [tmps, setTmps] = useState([]);
  const [tmpModal, setTmpModal] = useState(false);


  const [paymentModal, setPaymentModal] = useState(false);

  const { supply, setSupply, setSupplyListRender, setSaveButton } = useContext(SupplysGlobalContext);
  const [deleteModal, setDeleteModal] = useState(false);

  const getDeleteDocument = async () => {
    setDeleteModal(true)
  }

  const deleteDocument = async () => {
    setDeleteModal(false)
    await Api(`supplyreturns/del.php?id=${supply.Id}`, { token: await AsyncStorage.getItem('token') });
    setSupplyListRender(rel => rel + 1);
    navigation.navigate('supplys');
    setSupply(null);
    setSaveButton(false)
  }

  const getShare = async () => {
    // let data = await getTemplates('demands');
    //  (data);
    // if (data[0]) {
    //     setTmps(data);
    // }
    // setTmpModal(true);
}

const getPrintTMP = async (tId) => {
    // let obj = {
    //     Id: demand.Id,
    //     TemplateId: tId,
    //     token: await AsyncStorage.getItem("token")
    // }
    //  (obj);
    // const result = await axios.post('https://api.akul.az/1.0/dev/controllers/demands/print.php', obj);
    // navigation.navigate("share", {
    //     html: result.data,
    //     id: demand.Id
    // })
}

  return (
    <>
      <Stack.Navigator screenOptions={{
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerTintColor: CustomColors("dark").greyV2

      }}>
        <Stack.Screen options={{
          title: "Alış iadə"
        }} name='supplys' component={Supplys} />
        <Stack.Screen options={{
          title: "Alış iadə",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                setModalAnswer(true)
              }}
              accessibilityRole="button"
              style={[styles.topTabButton]}
            >
              <MaterialIcons name='format-list-bulleted' size={25} color={CustomColors("dark").primary} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={getShare}
              accessibilityRole="button"
              style={[styles.topTabButton]}
            >
              <Entypo name='share' size={25} color={CustomColors("dark").primary} />
            </TouchableOpacity>
          )
        }} name='supply' component={Supply} />
        <Stack.Screen options={{
          title: "Alış iadə"
        }} name='documentEditModal' component={DocumentEditModal} />
        <Stack.Screen options={{
          title: "Alış"
        }} name='documentNewModal' component={DocumentNewModal} />
        <Stack.Screen options={{
          title: "Alış iadə"
        }} name='scanner' component={ProductsScanner} />
        <Stack.Screen options={{
          title: "Alış iadə"
        }} name='addPS' component={AddProducts} />
        <Stack.Screen name='productsCreate' component={ProductCreateCOMP} options={{
          title: 'Məhsul'
        }} />
      </Stack.Navigator>
      <AnswerModal modalVisible={deleteModal} setModalVisible={setDeleteModal} oneButton={'Sil'} twoButton={'Dəvam et'} text={'Silməyə əminsiniz?'} pressContinue={() => { setDeleteModal(false) }} pressExit={deleteDocument} />
      <Payments type={'supplyreturns'} setInfo={setSupply} listRender={setSupplyListRender} pT={'ins'} save={setSaveButton} info={supply} modalVisible={paymentModal} setModalVisible={setPaymentModal} />
      <MoreCohices modalVisible={modalAnswer} setModalVisible={setModalAnswer}>
        <CustomDangerButton text={'Sil'} width={'100%'} onPress={getDeleteDocument} />
        <View style={{ margin: 10 }} />
        <CustomSuccessButton text={"Ödəniş"} width={'100%'} onPress={() => {
          setPaymentModal(true)
        }} />
      </MoreCohices>
      {
        tmps[0] &&
        <TmpModal modalVisible={tmpModal} setModalVisible={setTmpModal}>
          <FlatList data={tmps} renderItem={({ item, index }) => (
            <TouchableOpacity style={{ width: 200, justifyContent: 'center', alignItems: 'flex-start', marginTop: 20 }} onPress={() => {
              setTmpModal(false);
              getPrintTMP(item.Id);
            }}>
              <Text style={{ color: '#0264b1', fontSize: 20 }}>{item.Name}</Text>
            </TouchableOpacity>
          )} />
        </TmpModal>
      }
    </>
  )
}

export default SupplysStack

const styles = StyleSheet.create({})