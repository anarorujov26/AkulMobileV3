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
import Entypo from 'react-native-vector-icons/Entypo';
import MoreCohices from '../../../../../Global/Components/Modals/MoreCohices';
import CustomDangerButton from '../../../../../Global/UI/CustomDangerButton';
import TmpModal from '../../../../../Global/Components/Modals/TmpModal';
import CustomSuccessButton from '../../../../../Global/UI/CustomSuccessButton';

const Stack = createNativeStackNavigator();

const DemandsStack = () => {

    let navigation = useNavigation();

    const [modalAnswer, setModalAnswer] = useState(false)
    const [tmps, setTmps] = useState([]);
    const [tmpModal, setTmpModal] = useState(false);

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
                headerTintColor: CustomColors.greyV2
            }}>
                <Stack.Screen options={{
                    title: "Satış iadə"
                }} name='demands' component={Demands} />
                <Stack.Screen options={{
                    title: "Satış iadə",
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
            <MoreCohices modalVisible={modalAnswer} setModalVisible={setModalAnswer}>
                <CustomDangerButton text={'Sil'} width={'100%'} onPress={getDeleteDocument} />
                <View style={{ margin: 10 }} />
                <CustomSuccessButton text={"Ödəniş"} width={'100%'} onPress={() => {
                    setPaymentModal(true)
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
        </>
    )
}

export default DemandsStack

const styles = StyleSheet.create({})