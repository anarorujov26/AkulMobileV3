import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Demands from './Screens/Demands';
import Demand from './Screens/Demand';
import DocumentEditModal from '../../../../../Global/Components/Modals/DocumentEditModal';
import ProductsScanner from '../../../../../Global/UI/ProductsScanner';
import AddProducts from '../../../../../Global/Components/AddProducts';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { DemandsGlobalContext } from './DemandsGlobalState';
import { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Api from '../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnswerModal from '../../../../../Global/Components/Modals/AnswerModal';
import Product from '../Products/Product';
import AddPsPriceTypes from '../../../../../Global/Components/AddPsPriceTypes';
import DocumentNewModal from '../../../../../Global/Components/Modals/DocumentNewModal';
import Payments from '../../../../../Global/Components/Payments';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

const DemandsStack = () => {

    let navigation = useNavigation();

    const { demand, setDemand, setDemandListRender, setSaveButton } = useContext(DemandsGlobalContext);
    const [deleteModal, setDeleteModal] = useState(false);
    const [paymentModal, setPaymentModal] = useState(false);

    const getDeleteDocument = async () => {
        setDeleteModal(true)
    }

    const deleteDocument = async () => {
        setDeleteModal(false)
        Api(`demandreturns/del.php?id=${demand.Id}`, { token: await AsyncStorage.getItem('token') });
        setDemandListRender(rel => rel + 1);
        navigation.navigate('demands');
        setDemand(null);
        setSaveButton(false)
    }

    return (
        <>
            <Stack.Navigator screenOptions={{
                headerBackVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: CustomColors.connectedPrimary
            }}>
                <Stack.Screen options={{
                    title: "Satış iadə"
                }} name='demands' component={Demands} />
                <Stack.Screen options={{
                    title: "Satış iadə",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={getDeleteDocument}
                            accessibilityRole="button"
                            style={[styles.topTabButton]}
                        >
                            <MaterialIcons name='delete-outline' size={25} color={'red'} />
                        </TouchableOpacity>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => [
                                setPaymentModal(true)
                            ]}
                            accessibilityRole="button"
                            style={[styles.topTabButton]}
                        >
                            <MaterialCommunityIcons name='hand-coin' size={25} color={CustomColors.primary} />
                        </TouchableOpacity>
                    )
                }} name='demand' component={Demand} />
                <Stack.Screen options={{
                    title: "Satış iadə"
                }} name='documentEditModal' component={DocumentEditModal} />
                <Stack.Screen options={{
                    title: "Satış iadə"
                }} name='scanner' component={ProductsScanner} />
                <Stack.Screen options={{
                    title: "Satış iadə"
                }} name='addPS' component={AddProducts} />
                <Stack.Screen options={{
                    title: "Məhsul"
                }} name='productsCreate' component={Product} />
                <Stack.Screen options={{
                    title: "Qiymət növü"
                }} name='priceTypes' component={AddPsPriceTypes} />
                <Stack.Screen options={{
                    title: "Alış"
                }} name='documentNewModal' component={DocumentNewModal} />
            </Stack.Navigator>
            <AnswerModal modalVisible={deleteModal} setModalVisible={setDeleteModal} oneButton={'Sil'} twoButton={'Dəvam et'} text={'Silməyə əminsiniz?'} pressContinue={() => { setDeleteModal(false) }} pressExit={deleteDocument} />
            <Payments type={'demandreturns'} setInfo={setDemand} listRender={setDemandListRender} pT={'outs'} save={setSaveButton} info={demand} modalVisible={paymentModal} setModalVisible={setPaymentModal} />
        </>
    )
}

export default DemandsStack

const styles = StyleSheet.create({})