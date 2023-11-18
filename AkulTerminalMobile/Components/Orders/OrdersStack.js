import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useContext } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { OrdersGlobalContext } from './OrdersGlobalState';
import Orders from './Screens/Orders';
import Order from './Screens/Order';
import DocumentEditModal from '../../Global/Components/Modals/DocumentEditModal';
import DocumentNewModal from '../../Global/Components/Modals/DocumentNewModal';
import ProductsScanner from '../../Global/UI/ProductsScanner';
import AddProducts from '../../Global/Components/AddProducts';
import Product from '../Screens/Screen/HomeChildScreens/Products/Product';
import AddPsPriceTypes from '../../Global/Components/AddPsPriceTypes';
import AnswerModal from '../../Global/Components/Modals/AnswerModal';
import CustomColors from '../../Global/Colors/CustomColors';
import Api from '../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../Screens/Screen/Profile';

const Stack = createNativeStackNavigator();

const OrdersStack = () => {

    const navigation = useNavigation();

    const { order, setOrder, setOrdersListRender, setSaveButton } = useContext(OrdersGlobalContext);
    const [deleteModal, setDeleteModal] = useState(false);

    const getSetting = () => {
        navigation.navigate("profile")
    }

    const getDeleteDocument = async () => {
        setDeleteModal(true)
    }

    const deleteDocument = async () => {
        setDeleteModal(false)
        await Api(`tmpsales/del.php?id=${order.Id}`, { token: await AsyncStorage.getItem('token') });
        setOrdersListRender(rel => rel + 1);
        setOrder(null)
        setSaveButton(false)
        navigation.goBack();
    }

    return (
        <>
            <Stack.Navigator screenOptions={{
                headerTitleAlign: 'center',
                headerBackVisible: false,
                headerTintColor: CustomColors.connectedPrimary

            }}>
                <Stack.Screen options={{
                    title: "Pərakəndə sifariş",
                    headerLeft:()=>(
                        <TouchableOpacity onPress={getSetting}>
                            <MaterialIcons name='settings' size={23} color={CustomColors.primary}/>
                        </TouchableOpacity>
                    )
                }} name='catalogs' component={Orders} />
                <Stack.Screen options={{
                    title: "Pərakəndə sifariş",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={getDeleteDocument}
                            accessibilityRole="button"
                            style={[styles.topTabButton]}
                        >
                            <MaterialIcons name='delete-outline' size={25} color={'red'} />
                        </TouchableOpacity>
                    )
                }} name='order' component={Order} />
                <Stack.Screen options={{
                    title: "Pərakəndə sifariş"
                }} name='documentEditModal' component={DocumentEditModal} />
                <Stack.Screen options={{
                    title: "Pərakəndə sifariş"
                }} name='documentNewModal' component={DocumentNewModal} />
                <Stack.Screen options={{
                    title: "Pərakəndə sifariş"
                }} name='scanner' component={ProductsScanner} />
                <Stack.Screen options={{
                    title: "Pərakəndə sifariş"
                }} name='addPS' component={AddProducts} />
                <Stack.Screen name='productsCreate' component={Product} options={{
                    title: "Məhsul"
                }} />
                <Stack.Screen name='profile' component={Profile} options={{
                    title: "Setting"
                }} />
                <Stack.Screen options={{ title: "Qiymet növü" }} name='priceTypes' component={AddPsPriceTypes} />
            </Stack.Navigator>
            <AnswerModal modalVisible={deleteModal} setModalVisible={setDeleteModal} oneButton={'Sil'} twoButton={'Dəvam et'} text={'Silməyə əminsiniz?'} pressContinue={() => { setDeleteModal(false) }} pressExit={deleteDocument} />
        </>
    )
}

export default OrdersStack

const styles = StyleSheet.create({})