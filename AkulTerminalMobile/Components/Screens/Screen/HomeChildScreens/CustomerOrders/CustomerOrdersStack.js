import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DocumentEditModal from '../../../../../Global/Components/Modals/DocumentEditModal';
import ProductsScanner from '../../../../../Global/UI/ProductsScanner';
import AddProducts from '../../../../../Global/Components/AddProducts';
import CustomerOrders from './Screens/CustomerOrders';
import CustomerOrder from './Screens/CustomerOrder';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import { useContext } from 'react';
import { useState } from 'react';
import { CustomerOrdersGlobalContext } from './CustomerOrdersGlobalState';
import Api from '../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnswerModal from '../../../../../Global/Components/Modals/AnswerModal';
import { useNavigation } from '@react-navigation/native';
import Product from '../Products/Product';
import AddPsPriceTypes from '../../../../../Global/Components/AddPsPriceTypes';
import DocumentNewModal from '../../../../../Global/Components/Modals/DocumentNewModal';
import MoreCohices from '../../../../../Global/Components/Modals/MoreCohices';
import CustomDangerButton from '../../../../../Global/UI/CustomDangerButton';
import TmpModal from '../../../../../Global/Components/Modals/TmpModal';
import Entypo from 'react-native-vector-icons/Entypo';

const Stack = createNativeStackNavigator();

const CustomerOrdersStack = () => {

    let navigation = useNavigation();

    const { customerOrder, setCustomerOrder, setCustomerOrdersListRender, setSaveButton } = useContext(CustomerOrdersGlobalContext);
    const [deleteModal, setDeleteModal] = useState(false);

    const [modalAnswer, setModalAnswer] = useState(false)
    const [tmps, setTmps] = useState([]);
    const [tmpModal, setTmpModal] = useState(false);

    const getDeleteDocument = async () => {
        setDeleteModal(true);
    }

    const deleteDocument = async () => {
        setDeleteModal(false)
        await Api(`customerorders/del.php?id=${customerOrder.Id}`, { token: await AsyncStorage.getItem('token') });
        setCustomerOrdersListRender(rel => rel + 1);
        setCustomerOrder(null)
        navigation.navigate('customerOrders');
        setSaveButton(false);
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

    const getShare = async () => {
        // let data = await getTemplates('demands');
        //  (data);
        // if (data[0]) {
            // setTmps(data);
        // }
        // setTmpModal(true);
    }

    return (
        <>
            <Stack.Navigator screenOptions={{
                headerBackVisible: false,
                headerTitleAlign: 'center',
                headerTintColor: CustomColors("dark").greyV2
            }}>
                <Stack.Screen options={{
                    title: "Sifariş"
                }} name='customerOrders' component={CustomerOrders} />
                <Stack.Screen options={{
                    title: "Sifariş",
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
                }} name='customerOrder' component={CustomerOrder} />
                <Stack.Screen options={{
                    title: "Sifariş"
                }} name='documentEditModal' component={DocumentEditModal} />
                <Stack.Screen options={{
                    title: "Sifariş"
                }} name='scanner' component={ProductsScanner} />
                <Stack.Screen options={{
                    title: "Sifariş"
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
            <MoreCohices modalVisible={modalAnswer} setModalVisible={setModalAnswer}>
                <CustomDangerButton text={'Sil'} width={'100%'} onPress={getDeleteDocument} />
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

export default CustomerOrdersStack

const styles = StyleSheet.create({})