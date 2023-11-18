import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useContext } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { CatalogsGlobalContext } from './CatalogsGlobalState';
import DocumentEditModal from './../../../../../Global/Components/Modals/DocumentEditModal';
import DocumentNewModal from './../../../../../Global/Components/Modals/DocumentNewModal';
import ProductsScanner from './../../../../../Global/UI/ProductsScanner';
import AddProducts from './../../../../../Global/Components/AddProducts';
import Product from './../Products/Product';
import Catalog from './Screens/Catalog';
import Catalogs from './Screens/Catalogs';
import AnswerModal from './../../../../../Global/Components/Modals/AnswerModal';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import AddPsPriceTypes from './../../../../../Global/Components/AddPsPriceTypes';

const Stack = createNativeStackNavigator();

const CatalogsStack = () => {

  const navigation = useNavigation();

  const { catalog, setCatalog, setCatalogListRender, setSaveButton } = useContext(CatalogsGlobalContext);
  const [deleteModal, setDeleteModal] = useState(false);

  const getDeleteDocument = async () => {
    setDeleteModal(true)
  }

  const deleteDocument = async () => {
    setDeleteModal(false)
    // await Api(`supplies/del.php?id=${supply.Id}`, { token: await AsyncStorage.getItem('token') });
    setCatalogListRender(rel => rel + 1);
    setCatalog(null)
    setSaveButton(false)
    navigation.navigate('supplys');
  }

  return (
    <>
      <Stack.Navigator screenOptions={{
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerTintColor: CustomColors.connectedPrimary

      }}>
        <Stack.Screen options={{
          title: "Kataloq"
        }} name='catalogs' component={Catalogs} />
        <Stack.Screen options={{
          title: "Kataloq",
          headerRight: () => (
            <TouchableOpacity
              onPress={getDeleteDocument}
              accessibilityRole="button"
              style={[styles.topTabButton]}
            >
              <MaterialIcons name='delete-outline' size={25} color={'red'} />
            </TouchableOpacity>
          )
        }} name='catalog' component={Catalog} />
        <Stack.Screen options={{
          title: "Kataloq"
        }} name='documentEditModal' component={DocumentEditModal} />
        <Stack.Screen options={{
          title: "Kataloq"
        }} name='documentNewModal' component={DocumentNewModal} />
        <Stack.Screen options={{
          title: "Kataloq"
        }} name='scanner' component={ProductsScanner} />
        <Stack.Screen options={{
          title: "Kataloq"
        }} name='addPS' component={AddProducts} />
        <Stack.Screen name='productsCreate' component={Product} options={{
          title: "Məhsul"
        }} />
        <Stack.Screen options={{title:"Qiymet növü"}} name='priceTypes' component={AddPsPriceTypes} />
      </Stack.Navigator>
      <AnswerModal modalVisible={deleteModal} setModalVisible={setDeleteModal} oneButton={'Sil'} twoButton={'Dəvam et'} text={'Silməyə əminsiniz?'} pressContinue={() => { setDeleteModal(false) }} pressExit={deleteDocument} />
    </>
  )
}

export default CatalogsStack

const styles = StyleSheet.create({})