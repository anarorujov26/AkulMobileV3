import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Invents from './Screens/Invents';
import Invent from './Screens/Invent';
import InventAddProducts from '../../../../../Global/Components/InventAddProducts';
import DocumentInventEditModal from './../../../../../Global/Components/Modals/DocumentInventEditModal';
import InventScanner from './Screens/InventScanner';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import { TouchableOpacity } from 'react-native';
import Api from '../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { InventGlobalContext } from './InventGlobalState';
import { useState } from 'react';
import AnswerModal from '../../../../../Global/Components/Modals/AnswerModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DocumentInventNewModal from '../../../../../Global/Components/Modals/DocumentInventNewModal';
import AddPsPriceTypes from '../../../../../Global/Components/AddPsPriceTypes';


const Stack = createNativeStackNavigator();

const InventStack = () => {

  const { invent, setInvent, setInventListRender, setSaveButton } = useContext(InventGlobalContext);
  const [deleteModal, setDeleteModal] = useState(false);

  let navigation = useNavigation();

  const getDeleteDocument = async () => {
    setDeleteModal(true)
  }

  const deleteDocument = async () => {
    setDeleteModal(false)
    await Api(`inventories/del.php?id=${invent.Id}`, { token: await AsyncStorage.getItem("token") });
    setInventListRender(rel => rel + 1);
    navigation.navigate('invents');
    setInvent(null)
    setSaveButton(false)
  }

  return (
    <>
      <Stack.Navigator screenOptions={{
        headerBackVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: CustomColors.connectedPrimary

      }}>
        <Stack.Screen options={{ title: "İnventarizasiya" }} name='invents' component={Invents} />
        <Stack.Screen options={{
          title: "İnventarizasiya", headerRight: () => (
            <TouchableOpacity
              onPress={getDeleteDocument}
              accessibilityRole="button"
              style={[styles.topTabButton]}
            >
              <MaterialIcons name='delete-outline' size={25} color={CustomColors.danger} />
            </TouchableOpacity>
          )
        }} name='invent' component={Invent} />
        <Stack.Screen options={{ title: "İnventarizasiya" }} name='inventScanner' component={InventScanner} />
        <Stack.Screen options={{ title: "İnventarizasiya" }} name='documentEditModal' component={DocumentInventEditModal} />
        <Stack.Screen options={{ title: "İnventarizasiya" }} name='documentNewModal' component={DocumentInventNewModal} />
        <Stack.Screen options={{ title: "İnventarizasiya" }} name='inventAddProducts' component={InventAddProducts} />
        <Stack.Screen options={{ title: "Qiymet növü" }} name='priceTypes' component={AddPsPriceTypes} />
      </Stack.Navigator>
      <AnswerModal modalVisible={deleteModal} setModalVisible={setDeleteModal} oneButton={'Sil'} twoButton={'Dəvam et'} text={'Silməyə əminsiniz?'} pressContinue={() => { setDeleteModal(false) }} pressExit={deleteDocument} />
    </>
  )
}

export default InventStack

const styles = StyleSheet.create({})