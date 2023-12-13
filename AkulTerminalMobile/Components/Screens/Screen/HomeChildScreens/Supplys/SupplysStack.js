import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Supplys from './Screens/Supplys';
import Supply from './Screens/Supply';
import DocumentEditModal from '../../../../../Global/Components/Modals/DocumentEditModal';
import ProductsScanner from '../../../../../Global/UI/ProductsScanner';
import AddProducts from '../../../../../Global/Components/AddProducts';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import { SupplysGlobalContext } from './SupplysGlobaState';
import AnswerModal from '../../../../../Global/Components/Modals/AnswerModal';
import { useContext } from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../../../../Global/Components/Api';
import { TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import Product from '../Products/Product';
import DocumentNewModal from './../../../../../Global/Components/Modals/DocumentNewModal';
import Payments from '../../../../../Global/Components/Payments';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Stack = createNativeStackNavigator();

const countries = ["Egypt", "Canada", "Australia", "Ireland"]

const SupplysStack = () => {

  const navigation = useNavigation();

  const { supply, setSupply, setSupplyListRender, setSaveButton } = useContext(SupplysGlobalContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectionModal, setSelectionModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);

  const getDeleteDocument = async () => {
    setDeleteModal(true)
  }

  const deleteDocument = async () => {
    setDeleteModal(false)
    await Api(`supplies/del.php?id=${supply.Id}`, { token: await AsyncStorage.getItem('token') });
    setSupplyListRender(rel => rel + 1);
    setSupply(null)
    setSaveButton(false)
    navigation.navigate('supplys');
  }

  const getPYMT = async () => {
    setPaymentModal(true)
  }

  return (
    <>
      <Stack.Navigator screenOptions={{
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerTintColor: CustomColors.connectedPrimary

      }}>
        <Stack.Screen options={{
          title: "Alış"
        }} name='supplys' component={Supplys} />
        <Stack.Screen options={{
          title: "Alış",
          headerRight: () => (
            <TouchableOpacity
              onPress={getDeleteDocument}
              accessibilityRole="button"
              style={[styles.topTabButton]}
            >
              <MaterialCommunityIcons name='delete' size={25} color={CustomColors.primary} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={()=>[
                setPaymentModal(true)
              ]}
              accessibilityRole="button"
              style={[styles.topTabButton]}
            >
              <MaterialCommunityIcons name='hand-coin' size={25} color={CustomColors.primary} />
            </TouchableOpacity>
          )
        }} name='supply' component={Supply} />
        <Stack.Screen options={{
          title: "Alış"
        }} name='documentEditModal' component={DocumentEditModal} />
        <Stack.Screen options={{
          title: "Alış"
        }} name='documentNewModal' component={DocumentNewModal} />
        <Stack.Screen options={{
          title: "Alış"
        }} name='scanner' component={ProductsScanner} />
        <Stack.Screen options={{
          title: "Alış"
        }} name='addPS' component={AddProducts} />
        <Stack.Screen name='productsCreate' component={Product} options={{
          title: "Məhsul"
        }} />
      </Stack.Navigator>
      <AnswerModal modalVisible={deleteModal} setModalVisible={setDeleteModal} oneButton={'Sil'} twoButton={'Dəvam et'} text={'Silməyə əminsiniz?'} pressContinue={() => { setDeleteModal(false) }} pressExit={deleteDocument} />
      <Payments type={'supplies'} setInfo={setSupply} listRender={setSupplyListRender} pT={'outs'} save={setSaveButton} info={supply} modalVisible={paymentModal} setModalVisible={setPaymentModal} />
    </>
  )
}

export default SupplysStack

const styles = StyleSheet.create({})