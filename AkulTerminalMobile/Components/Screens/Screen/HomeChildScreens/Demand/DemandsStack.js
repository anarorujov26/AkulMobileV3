import { Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Demands from './Screens/Demands';
import Demand from './Screens/Demand';
import DocumentEditModal from '../../../../../Global/Components/Modals/DocumentEditModal';
import ProductsScanner from '../../../../../Global/UI/ProductsScanner';
import AddProducts from '../../../../../Global/Components/AddProducts';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import AnswerModal from '../../../../../Global/Components/Modals/AnswerModal';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { DemandsGlobalContext } from './DemandsGlobalState';
import { useState } from 'react';
import Api from '../../../../../Global/Components/Api';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Product from '../Products/Product';
import AddPsPriceTypes from '../../../../../Global/Components/AddPsPriceTypes';
import DocumentNewModal from '../../../../../Global/Components/Modals/DocumentNewModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Payments from '../../../../../Global/Components/Payments';
import MoreCohices from './../../../../../Global/Components/Modals/MoreCohices';
import CustomDangerButton from '../../../../../Global/UI/CustomDangerButton';
import CustomSuccessButton from './../../../../../Global/UI/CustomSuccessButton';
import Entypo from 'react-native-vector-icons/Entypo';

const Stack = createNativeStackNavigator();

const DemandsStack = () => {

    const [modalAnswer,setModalAnswer]=useState(false)

    let navigation = useNavigation();

    const [paymentModal,setPaymentModal]=useState(false);
    const { demand, setDemand, setDemandListRender, setSaveButton } = useContext(DemandsGlobalContext);
    const [deleteModal, setDeleteModal] = useState(false);

    const getDeleteDocument = async () => {
        setDeleteModal(true)
    }

    const deleteDocument = async () => {
        setDeleteModal(false)
        await Api(`demands/del.php?id=${demand.Id}`, { token: await AsyncStorage.getItem('token') });
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
                    title: "Satış"
                }} name='demands' component={Demands} />
                <Stack.Screen options={{
                    title: "Satış",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={()=>{
                                setModalAnswer(true)
                            }}
                            accessibilityRole="button"
                            style={[styles.topTabButton]}
                        >
                            <MaterialIcons name='format-list-bulleted' size={25} color={CustomColors.primary} />
                        </TouchableOpacity>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => [
                                console.log('asdasd')
                            ]}
                            accessibilityRole="button"
                            style={[styles.topTabButton]}
                        >
                            <Entypo name='share' size={25} color={CustomColors.primary} />
                        </TouchableOpacity>
                    )
                }} name='demand' component={Demand} />
                <Stack.Screen options={{
                    title: "Satış"
                }} name='documentEditModal' component={DocumentEditModal} />
                <Stack.Screen options={{
                    title: "Satış"
                }} name='scanner' component={ProductsScanner} />
                <Stack.Screen options={{
                    title: "Satış"
                }} name='addPS' component={AddProducts} />
                <Stack.Screen options={{
                    title: "Məhsul"
                }} name='productsCreate' component={Product} />
                <Stack.Screen options={{
                    title: "Satış"
                }} name='documentNewModal' component={DocumentNewModal} />
                <Stack.Screen options={{ title: "Qiymet növü" }} name='priceTypes' component={AddPsPriceTypes} />
            </Stack.Navigator>
            <AnswerModal modalVisible={deleteModal} setModalVisible={setDeleteModal} oneButton={'Sil'} twoButton={'Dəvam et'} text={'Silməyə əminsiniz?'} pressContinue={() => { setDeleteModal(false) }} pressExit={deleteDocument} />
            <Payments type={'demands'} setInfo={setDemand} listRender={setDemandListRender} pT={'ins'} save={setSaveButton} info={demand} modalVisible={paymentModal} setModalVisible={setPaymentModal} />
            <MoreCohices modalVisible={modalAnswer} setModalVisible={setModalAnswer}>
                <CustomDangerButton text={'Sil'} width={'100%'} onPress={getDeleteDocument}/>
                <View style={{margin:10}}/>
                <CustomSuccessButton text={"Ödəniş"} width={'100%'} onPress={()=>{
                    setPaymentModal(true)
                }}/>
            </MoreCohices>
        </>
    )
}

export default DemandsStack

const styles = StyleSheet.create({})