import { StyleSheet, View } from 'react-native'
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Product from '../Products/Product';
import DocumentNewModal from './../../../../../Global/Components/Modals/DocumentNewModal';
import axios from 'axios';
import RNPrint from 'react-native-print';

const Stack = createNativeStackNavigator();

const SupplysStack = () => {

  const navigation = useNavigation();

  const { supply, setSupply, setSupplyListRender, setSaveButton } = useContext(SupplysGlobalContext);
  const [deleteModal, setDeleteModal] = useState(false);

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

  const getPrint = async () => {

    // const result = await axios.get('https://dev.akul.az/invoice?0d639344-d981-457c-9a30-b874489f94d2#supplies');

    // const jobName = await RNPrint.print({
    //   html:result.data,
    //   fileName: 'PrintDocument',
    // });

    // console.log(jobName)

  }

  const getPdf = async () => {

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
          headerLeft: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={getPrint}
                accessibilityRole="button"
                style={[styles.topTabButton]}
              >
                <AntDesign name='printer' size={25} color={CustomColors.primary} />
              </TouchableOpacity>
              <View style={{ margin: 10 }} />
              <TouchableOpacity
                onPress={getPdf}
                accessibilityRole="button"
                style={[styles.topTabButton]}
              >
                <AntDesign name='pdffile1' size={25} color={CustomColors.primary} />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={getDeleteDocument}
              accessibilityRole="button"
              style={[styles.topTabButton]}
            >
              <MaterialIcons name='delete-outline' size={25} color={'red'} />
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
    </>
  )
}

export default SupplysStack

const styles = StyleSheet.create({})