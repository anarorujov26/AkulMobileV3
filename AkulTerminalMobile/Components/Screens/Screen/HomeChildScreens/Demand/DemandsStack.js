import { FlatList, Linking, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Demands from './Screens/Demands';
import Demand from './Screens/Demand';
import DocumentEditModal from '../../../../../Global/Components/Modals/DocumentEditModal';
import ProductsScanner from '../../../../../Global/UI/ProductsScanner';
import AddProducts from '../../../../../Global/Components/AddProducts';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import AnswerModal from '../../../../../Global/Components/Modals/AnswerModal';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
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
import ShareComponents from './../../../../../Global/Components/Modals/ShareComponents';
import axios from 'axios';
import TmpModal from '../../../../../Global/Components/Modals/TmpModal';
import CustomPrimaryButton from '../../../../../Global/UI/CustomPrimaryButton';
import getTemplates from '../../../../../Global/Components/getTemplates';
import CustomTextInput from '../../../../../Global/UI/CustomTextInput';
import EnteredDiscount from '../../../../../Global/Components/EnteredDiscount';
import { ConvertFixedTable } from '../../../../../Global/Components/ConvertFixedTable';
import getAmountDiscount from '../../../../../Global/Components/getAmountDiscount';

const Stack = createNativeStackNavigator();

const DemandsStack = () => {

    const [modalAnswer, setModalAnswer] = useState(false)
    const [tmps, setTmps] = useState([]);
    const [tmpModal, setTmpModal] = useState(false);

    const [discount, setDiscount] = useState(0);

    const [discountModalAnswer, setDiscountModalAnswer] = useState(false);

    let navigation = useNavigation();

    const [paymentModal, setPaymentModal] = useState(false);
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

    const getShare = async () => {
        let data = await getTemplates('demands');
        if (data[0]) {
            setTmps(data);
        }
        setTmpModal(true);
    }

    const getPrintTMP = async (tId) => {
        let obj = {
            Id: demand.Id,
            TemplateId: tId,
            token: await AsyncStorage.getItem("token")
        }
        const result = await axios.post('https://api.akul.az/1.0/dev/controllers/demands/print.php', obj);
        navigation.navigate("share", {
            html: result.data,
            id: demand.Id
        })
    }

    const getDiscount = async () => {

        if (demand.Positions[0]) {
            let amount = 0
            let dmnd = { ...demand };
            let positions = [...demand.Positions];
            for (let index = 0; index < positions.length; index++) {
                positions[index].Price = EnteredDiscount(ConvertFixedTable(Number(positions[index].BasicPrice)), ConvertFixedTable(Number(discount)))
            }

            for (let index = 0; index < positions.length; index++) {
                amount += Number(positions[index].Price) * Number(positions[index].Quantity);
            }

            dmnd.Positions = positions;
            dmnd.Amount = amount;

            let documentBasicAmount = 0;
            let amnt = Number(dmnd.Amount);
            let ps = [...dmnd.Positions];
            for (let i = 0; i < ps.length; i++) {
                documentBasicAmount += Number(ps[i].BasicPrice) * Number(ps[i].Quantity);
            }
             
            dmnd.Discount = documentBasicAmount - amnt;
            dmnd.AmountDiscount = await getAmountDiscount(dmnd)

            setDemand(dmnd);
            setDiscountModalAnswer(false)
            setDiscount(0);
            setSaveButton(true)
        } else {
            alert("Məhsul yoxdur!")
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
                    title: "Satış"
                }} name='demands' component={Demands} />
                <Stack.Screen options={{
                    title: "Satış",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {
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
                            onPress={getShare}
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
                <Stack.Screen options={{
                    title: "Paylaş"
                }} name='share' component={ShareComponents} />
                <Stack.Screen options={{ title: "Qiymet növü" }} name='priceTypes' component={AddPsPriceTypes} />
            </Stack.Navigator>
            <AnswerModal modalVisible={deleteModal} setModalVisible={setDeleteModal} oneButton={'Sil'} twoButton={'Dəvam et'} text={'Silməyə əminsiniz?'} pressContinue={() => { setDeleteModal(false) }} pressExit={deleteDocument} />
            <Payments type={'demands'} setInfo={setDemand} listRender={setDemandListRender} pT={'ins'} save={setSaveButton} info={demand} modalVisible={paymentModal} setModalVisible={setPaymentModal} />
            <MoreCohices modalVisible={modalAnswer} setModalVisible={setModalAnswer}>
                <CustomDangerButton text={'Sil'} width={'100%'} onPress={getDeleteDocument} />
                <View style={{ margin: 10 }} />
                <CustomSuccessButton text={"Ödəniş"} width={'100%'} onPress={() => {
                    setPaymentModal(true)
                }} />
                <View style={{ margin: 10 }} />
                <CustomPrimaryButton text={"%"} width={'100%'} onPress={() => {
                    setDiscountModalAnswer(true)
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={discountModalAnswer}
                onRequestClose={() => {
                    setDiscountModalAnswer(!discountModalAnswer);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <CustomTextInput keyboardType="numeric" value={String(discount)} onChangeText={(e) => {
                            setDiscount(e.replace(',', '.'));
                        }} addStyle={{
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: "#bccbcb"
                        }} text={'Endirim'} width={'100%'} />
                        <CustomPrimaryButton onPress={getDiscount} text={'Hesabla'} addStyle={{
                            width: '100%',
                            marginTop: 10,
                        }} />
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default DemandsStack

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '95%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})