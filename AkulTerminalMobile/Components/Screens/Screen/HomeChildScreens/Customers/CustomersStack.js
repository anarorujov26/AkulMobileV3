import { FlatList, Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CustomColors from '../../../../../Global/Colors/CustomColors';
import AnswerModal from '../../../../../Global/Components/Modals/AnswerModal';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Customers from './Screens/Customers';
import Customer from './Screens/Customer';
import { CustomersGlobalContext } from './CustomersGlobalState';
import Api from '../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const CustomersStack = () => {

  let navigation = useNavigation();
  const [deleteModal, setDeleteModal] = useState(false);
  const { customer, setCustomer, setCustomersListRender, setSaveButton } = useContext(CustomersGlobalContext);

  const getDeleteDocument = async () => {
    setDeleteModal(true)
  }

  const deleteDocument = async () => {
    setDeleteModal(false)
    const result = await Api(`customers/del.php?id=${customer.Id}`, { token: await AsyncStorage.getItem('token') });
    if(result.data.Headers.ResponseStatus == '0'){
      setCustomersListRender(rel => rel + 1);
      navigation.navigate('customers');
      setCustomer(null);
      setSaveButton(false)
    }else{
      alert(result.data.Body)
    }
    
  }

  return (
    <>
      <Stack.Navigator screenOptions={{
        headerBackVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: CustomColors.greyV2
      }}>
        <Stack.Screen options={{
          title: "Tərəf-Müqabilləri"
        }} name='customers' component={Customers} />
        <Stack.Screen options={{
          title: "Tərəf-Müqabil",
          headerRight: () => (
            <TouchableOpacity
              onPress={getDeleteDocument}
              accessibilityRole="button"
              style={[styles.topTabButton]}
            >
              <MaterialIcons name='delete' size={25} color={CustomColors.danger} />
            </TouchableOpacity>
          ),
        }} name='customer' component={Customer} />
      </Stack.Navigator>
      <AnswerModal modalVisible={deleteModal} setModalVisible={setDeleteModal} oneButton={'Sil'} twoButton={'Dəvam et'} text={'Silməyə əminsiniz?'} pressContinue={() => { setDeleteModal(false) }} pressExit={deleteDocument} />
    </>
  )
}

export default CustomersStack

const styles = StyleSheet.create({})
