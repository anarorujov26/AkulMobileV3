import { ActivityIndicator, BackHandler, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Api from '../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import CustomTextInput from '../../../../../Global/UI/CustomTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomerModal from '../../../../../Global/Components/Modals/CustomerModal';
import CustomTextare from '../../../../../Global/UI/CustomTextare';
import SpendModal from './../../../../../Global/Components/Modals/SpendModal';
import { ConvertFixedTable } from '../../../../../Global/Components/ConvertFixedTable';
import { CustomToLowerCase } from '../../../../../Global/Components/CustomToLowerCase';
import CustomSuccessSaveButton from '../../../../../Global/UI/CustomSuccessSaveButton';
import CashesModal from './../../../../../Global/Components/Modals/CashesModal';
import { useFocusEffect } from '@react-navigation/native';
import BackModal from '../../../../../Global/Components/Modals/BackModal';
import { TransactionGlobalContext } from './TransactionGlobalState';
import OrderModal from '../../../../../Global/Components/Modals/OrderModal';
import modificationsGroup from '../../../../../Global/Components/modificationsGroup';
import DocumentInItems from '../../../../../Global/Components/DocumentInItems';

const Transaction = ({ route, navigation }) => {

    const { setTransactionListRender } = useContext(TransactionGlobalContext);

    const { id, type, link } = route.params;
    const [api, setApi] = useState(link == null ? 'payment' : link);
    const [tran, setTran] = useState(null);
    const [customer, setCustomer] = useState(false);
    const [saveButton, setSaveButton] = useState(false);
    const [spend, setSpend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cash, setCash] = useState(false);
    const [dontBackModal, setDontBackModal] = useState(false);
    const [orderType, setOrderType] = useState(false);

    const getInfo = async (id) => {
        if (id == null) {
            let obj = {
                Payment: "",
                Status: true,
                SpendName: "",
                SpendItem: "",
                CustomerName: "",
                CustomerId: "",
                Amount: "",
                Name: "",
            }
            if (String(type).split(' ')[0] == "Nağdsız") {
                obj.CashId = "";
                obj.CashName = "";
            }
            setTran(obj);
        } else {

            let obj = {
                id: id,
                token: await AsyncStorage.getItem("token"),
            }

            const result = await Api('transactions/get.php', obj);
            if (result.data.Headers.ResponseStatus !== "0") {

            } else {
                let obj = { ...result.data.Body.List[0] }
                obj.Amount = ConvertFixedTable(obj.Amount);
                let tp = type == 'outs' ? 'out' : 'in'
                let location = api + tp;
                obj.Modifications = await modificationsGroup(result.data.Body.List[0], location);
                setTran(obj);
            }
        }
    }

    const getSave = async () => {
        setIsLoading(true);
        const obj = CustomToLowerCase({ ...tran });
        obj.token = await AsyncStorage.getItem('token');
        if (obj.spenditem == "" || obj.customerid == "" || obj.cashid == "" || obj.amount== "") {
            alert("Lazımlı xanaları doldurun!")
        } else {
            if (obj.name == "") {
                const result = await Api(`${api + type}/newname.php`, {
                    name: "",
                    token: await AsyncStorage.getItem("token"),
                })

                if (result.data.Headers.ResponseStatus != "0") {
                    alert(result.data.Body)
                } else {
                    obj.name = result.data.Body.ResponseService;
                }
            }
            let ap = `${api + type}/put.php`
            const result = await Api(ap, obj);
            if (result.data.Headers.ResponseStatus !== "0") {
                alert(result.data.Body);
            } else {
                successAlert(false);
                setTransactionListRender(rel => rel + 1);
                navigation.goBack();
            }
        }
        setIsLoading(false);
    }

    const successAlert = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Əməliyyat uğurla icra olundu!',
            ToastAndroid.CENTER,
            ToastAndroid.BOTTOM,
            ToastAndroid.SHORT,
            200,
            50
        )
    }

    const getExit = () => {
        navigation.goBack();
        setTran(null);
    }

    useEffect(() => {
        getInfo(id);
    }, [])

    useFocusEffect(

        useCallback(() => {
            const onBackPress = async () => {
                navigation.setParams({ shouldGoToSpecificPage: false });
                saveButton ? setDontBackModal(true) : (navigation.goBack(), setTran(null));
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [saveButton]))

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            {
                tran == null ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={50} color={CustomColors.primary} />
                    </View>
                    :
                    <>
                        <Text style={{ fontSize: 20, backgroundColor: 'white', padding: 5, width: '100%', color: 'black', textAlign: 'center', marginBottom: 1 }}>{type == "outs" ? "Məxaric" : 'Mədaxil'} - {api == "payment" ? 'Nağd' : "Nağdsız"}</Text>
                        <CustomTextInput editable={true} text={tran.type == "ins" ? "Mədaxil" : 'Məxaric'} placeholder={'....'} width={'100%'} value={tran.Name} end={true} endText={<AntDesign name='right' size={15} />} onChangeText={(e) => {
                            setTran(item => ({ ...item, ['Name']: e }));
                            if (!saveButton) setSaveButton(true)
                        }} />
                        <CustomTextare placeholder="..." multiline={true} numberOfLines={4} text={"Şərh"} width={'100%'} value={tran.Description} onChangeText={(e) => {
                            setTran(rel => ({ ...rel, ['Description']: e }));
                            if (!saveButton) setSaveButton(true)
                        }} addStyle={{ borderRadius: 0 }} />

                        {
                            id == null &&
                            <TouchableOpacity style={{ width: '100%' }} onPress={() => {
                                setOrderType(true)
                            }}>
                                <CustomTextInput placeholder="..." editable={false} text={'Satış növü'} width={'100%'} value={api == "payment" ? 'Nağd' : 'Köçürmə' == "cash" ? "Nağd" : "Köçürmə"} end={true} endText={<AntDesign name='right' size={15} />} />
                            </TouchableOpacity>
                        }
                        <TouchableOpacity style={{ width: '100%' }} onPress={() => { setSpend(true) }}>
                            <CustomTextInput editable={false} text={'Xərc-maddəsi'} placeholder={'....'} width={'100%'} value={tran.SpendName} end={true} endText={<AntDesign name='right' size={15} />} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '100%' }} onPress={() => { setCustomer(true) }}>
                            <CustomTextInput editable={false} text={'Tərəf-müqabil'} placeholder={'....'} width={'100%'} value={tran.CustomerName} end={true} endText={<AntDesign name='right' size={15} />} />
                        </TouchableOpacity>
                        <CustomTextInput keyboardType={'numeric'} editable={true} text={"Məbləğ"} placeholder={'....'} width={'100%'} value={String(tran.Amount)} end={true} endText={<AntDesign name='right' size={15} />} onChangeText={(e) => {
                            setTran(item => ({ ...item, ['Amount']: e.replace(',', '.') }))
                            if (!saveButton) setSaveButton(true)
                        }} />
                        <TouchableOpacity style={{ width: '100%' }} onPress={() => { setCash(true) }}>
                            <CustomTextInput editable={false} text={'Hesab'} placeholder={'....'} width={'100%'} value={tran.CashName} end={true} endText={<AntDesign name='right' size={15} />} />
                        </TouchableOpacity>
                        <DocumentInItems data={tran} itemOne={'title'} itemTwo={'value'} />
                    </>
            }
            {
                saveButton &&
                <>
                    <View style={{ width: '100%', alignItems: 'center', position: 'absolute', bottom: 10 }}>
                        <CustomSuccessSaveButton disabled={isLoading} isLoading={isLoading} setIsLoading={setIsLoading} onPress={getSave} text={'Yadda Saxla'} width={'95%'} />
                    </View>
                </>
            }
            <CustomerModal save={setSaveButton} modalVisible={customer} setModalVisible={setCustomer} state={setTran} nameType={'CustomerName'} idType={'CustomerId'} />
            <SpendModal save={setSaveButton} modalVisible={spend} setModalVisible={setSpend} state={setTran} nameType={'SpendName'} idType={'SpendItem'} />
            <CashesModal api={api} save={setSaveButton} modalVisible={cash} setModalVisible={setCash} state={setTran} nameType={'CashName'} idType={'CashId'} />
            <BackModal modalVisible={dontBackModal} setModalVisible={setDontBackModal} pressExit={getExit} pressContinue={() => { setDontBackModal(false) }} />
            <OrderModal setButton={setSaveButton} setData={setApi} modalVisible={orderType} setModalVisible={setOrderType} />
        </View>
    )
}

export default Transaction

const styles = StyleSheet.create({})