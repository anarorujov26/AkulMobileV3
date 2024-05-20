import { ActivityIndicator, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CustomColors from '../../../../../../Global/Colors/CustomColors';
import Api from '../../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomToLowerCase } from '../../../../../../Global/Components/CustomToLowerCase';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import BackModal from '../../../../../../Global/Components/Modals/BackModal';
import { DemandsGlobalContext } from '../DemandsGlobalState';
import DemandDocumentPage from './DemandDocument/DemandDocumentPage';
import DemandAppointmentPage from './DemandAppointment/DemandAppointmentPage';
import moment from 'moment';
import CustomSuccessSaveButton from '../../../../../../Global/UI/CustomSuccessSaveButton';
import { ConvertFixedTable } from '../../../../../../Global/Components/ConvertFixedTable';
import DocumentAmmount from '../../../../../../Global/Components/DocumentAmmount';
import modificationsGroup from './../../../../../../Global/Components/modificationsGroup';
import GetAddUnits from '../../../../../../Global/UI/GetAddUnits';
import GetPayments from './../../../../../../Global/Components/GetPayments';
import getAmountDiscount from '../../../../../../Global/Components/getAmountDiscount';
import getBasicAmount from './../../../../../../Global/Components/getBasicAmount';

function MyTabBar({ state, descriptors, navigation, position }) {

    return (
        <>
            <View style={{ flexDirection: 'row' }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate({ name: route.name, merge: true });
                        }
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            style={[styles.topTabButton, isFocused && { borderBottomWidth: 2, borderColor: CustomColors("dark").primary }]}
                        >
                            <Text style={{ color: 'black' }}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </>
    );
}
const Tab = createMaterialTopTabNavigator();

const Demand = ({ route, navigation }) => {

    const { id } = route.params
    const { saveButton, demand, setDemand, setSaveButton, setDemandListRender, setDebtQuantity,setCustomerInfo } = useContext(DemandsGlobalContext)
    const [isLoading, setIsLoading] = useState(false);
    const [dontBackModal, setDontBackModal] = useState(false);

    const getDemand = async (productId) => {
        if (productId == null) {
            
            let obj = {
                Name: "",
                CustomerId: "",
                Moment: moment(new Date()).format("YYYY-MM-DD h:mm:ss"),
                StockId: "",
                Modifications: [],
                Positions: [],
                Description: "",
                Consumption: 0,
                Status: 0
            }
            setDemand(obj);

        } else {
            let obj = {
                id: productId,
                token: await AsyncStorage.getItem('token')
            }
            const result = await Api('demands/get.php', obj);
            if (result.data.Headers.ResponseStatus !== "0") {
                navigation.goBack();
            }
            
            let data = { ...result.data.Body.List[0] }

            let customerInfoApiSendObj = {
                id:data.CustomerId,
                token:await AsyncStorage.getItem('token')
            }

            const postCustomerInfo = await Api('customers/getdata.php',customerInfoApiSendObj);

            setCustomerInfo({...postCustomerInfo.data.Body.CustomerData});

            let ob = {
                id: data.CustomerId,
                token: await AsyncStorage.getItem('token')
            }
            const debt = await Api("customers/getdata.php", ob);
            setDebtQuantity(ConvertFixedTable(debt.data.Body.Debt));
            data.Modifications = await modificationsGroup(result.data.Body.List[0], 'demand');
            data.Positions = GetAddUnits(result)
            data.AmountDiscount = await getAmountDiscount(data)
            data.BasicAmount = await getBasicAmount(data);
            setDemand(data);
        }
    }

    const getSaveProsessing = async () => {
        if (demand.CustomerId == "" || demand.StockId == "") {
            alert("Müştəri və Anbar mütləq seçilməlidir!");
        } else {
            setIsLoading(true);
            let obj = CustomToLowerCase({ ...demand });
            if (obj.name == "") {
                const result = await Api('demands/newname.php', {
                    n: "",
                    token: await AsyncStorage.getItem("token")
                })
                if (result.data.Headers.ResponseStatus == "0") {
                    obj.name = result.data.Body.ResponseService;
                } else {
                    alert(result.data.Body);
                }
            }
            obj.token = await AsyncStorage.getItem("token");

            const result = await Api('demands/put.php', obj);

            if (result.data.Headers.ResponseStatus == "0") {
                setDemand(null)
                setSaveButton(false)
                successAlert();
                getDemand(result.data.Body.ResponseService);
                setDemandListRender(rel => rel + 1);
            } else {
                alert(result.data.Body)
            }
            setIsLoading(false)
        }
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
        setDemand(null);
        setSaveButton(false);
        navigation.goBack();
    }

    useEffect(() => {
        getDemand(id);
    }, [id])

    useFocusEffect(

        useCallback(() => {
            const onBackPress = async () => {
                navigation.setParams({ shouldGoToSpecificPage: false });
                saveButton ? setDontBackModal(true) : (navigation.goBack(), setDemand(null));
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [saveButton]))

    return (
        demand == null ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color={CustomColors("dark").primary} />
            </View>
            :
            <>
                <Tab.Navigator initialRouteName='sDocument' key={id} tabBar={props => <MyTabBar {...props} />}>
                    <Tab.Screen options={{
                        tabBarLabel: "Təyinat"
                    }} name='sAppointment' component={DemandAppointmentPage} />
                    <Tab.Screen options={{
                        tabBarLabel: "Sənəd"
                    }} name='sDocument' component={DemandDocumentPage} />
                    <Tab.Screen name='sGetPayment' initialParams={{
                        id: id,
                        type: "demands"
                    }} options={{
                        tabBarLabel: "Ödəmələr"
                    }} component={GetPayments} />
                </Tab.Navigator>
                {
                    saveButton &&
                    <View style={{ flex: 1, position: "absolute", bottom: 55, left: 15, right: 15 }}>
                        <CustomSuccessSaveButton setIsLoading={setIsLoading} onPress={getSaveProsessing} isLoading={isLoading} disabled={isLoading} width={'100%'} text={'Yadda Saxla'} />
                    </View>
                }
                <BackModal modalVisible={dontBackModal} setModalVisible={setDontBackModal} pressExit={getExit} pressContinue={() => { setDontBackModal(false) }} />
                {
                    demand.Id &&
                    <DocumentAmmount basicamount={ConvertFixedTable(demand.BasicAmount)} amount={""+`${ConvertFixedTable(demand.Amount)} (${demand.AmountDiscount}%)`} />
                }
            </>
    )
}

export default Demand

const styles = StyleSheet.create({
    topTabButton: {
        flex: 1,
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})