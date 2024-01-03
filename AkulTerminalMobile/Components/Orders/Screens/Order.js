import { ActivityIndicator, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import OrderDocumentPage from './OrderDocument/OrderDocumentPage';
import OrderAppointmentPage from './OrderAppointment/OrderAppointmentPage';
import { CustomToLowerCase } from '../../../Global/Components/CustomToLowerCase';
import { ConvertFixedTable } from '../../../Global/Components/ConvertFixedTable';
import BackModal from '../../../Global/Components/Modals/BackModal';
import CustomSuccessSaveButton from '../../../Global/UI/CustomSuccessSaveButton';
import Api from '../../../Global/Components/Api';
import CustomColors from '../../../Global/Colors/CustomColors';
import { OrdersGlobalContext } from '../OrdersGlobalState';
import moment from 'moment';
import DocumentAmmount from '../../../Global/Components/DocumentAmmount';

function MyTabBar({ state, descriptors, navigation }) {

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
                            style={[styles.topTabButton, isFocused && { borderBottomWidth: 2, borderColor: CustomColors.primary }]}
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

const Order = ({ route, navigation }) => {

    const { id } = route.params
    const { saveButton, order, setOrder, setSaveButton, setOrdersListRender } = useContext(OrdersGlobalContext)
    const [isLoading, setIsLoading] = useState(false);
    const [dontBackModal, setDontBackModal] = useState(false);

    const getOrder = async (productId) => {
        if (productId == null) {

            const newDate = new Date();

            const dateMilliSecond = String(newDate.getTime()) + (Math.floor(Math.random() * 999) + 100);

            let obj = {
                Amount: 0,
                Name: String(dateMilliSecond),
                SalePointId: await AsyncStorage.getItem("sli"),
                CustomerId: "00000000-0000-0000-0000-000000000000",
                Positions: [],
                Moment: moment(new Date()).format("YYYY-MM-DD h:mm:ss"),
            }
            setOrder(obj);

        } else {
            let obj = {
                id: productId,
                token: await AsyncStorage.getItem('token')
            }
            const result = await Api('tmpsales/get.php', obj);
            if (result.data.Headers.ResponseStatus !== "0") {
                navigation.goBack();
            }
            setOrder(result.data.Body.List[0]);
        }
    }

    const getSaveProsessing = async () => {
        if (order.CustomerId == "" || !order.Positions[0]) {
            alert("Müştəri vəya Məhsul mütləq əlavə edilməlidir!");
        } else {
            setIsLoading(true);
            let obj = CustomToLowerCase({ ...order });
            obj.amount = obj.amount ? Number(obj.amount) : 0;
            obj.token = await AsyncStorage.getItem("token");
            if (await AsyncStorage.getItem("emp") != null) {
                obj.employeeid = JSON.parse(await AsyncStorage.getItem("emp")).empId
            }
            const result = await Api('tmpsales/put.php', obj);
            if (result.data.Headers.ResponseStatus == "0") {
                setOrder(null)
                setSaveButton(false)
                successAlert();
                getOrder(result.data.Body.ResponseService);
                setOrdersListRender(rel => rel + 1);
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
        setOrder(null);
        setSaveButton(false);
        navigation.goBack();
    }

    useEffect(() => {
        getOrder(id);
    }, [id])

    useFocusEffect(

        useCallback(() => {
            const onBackPress = async () => {
                navigation.setParams({ shouldGoToSpecificPage: false });
                saveButton ? setDontBackModal(true) : (navigation.goBack(), setOrder(null));
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [saveButton]))

    return (
        order == null ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color={CustomColors.primary} />
            </View>
            :
            <>
                <Tab.Navigator key={id} tabBar={props => <MyTabBar {...props} />}>
                    <Tab.Screen options={{
                        tabBarLabel: "Sənəd"
                    }} name='cDocument' component={OrderDocumentPage} />
                    <Tab.Screen options={{
                        tabBarLabel: "Təyinat"
                    }} name='cAppointment' component={OrderAppointmentPage} />
                </Tab.Navigator>
                {
                    saveButton &&
                    <View style={{ flex: 1, position: "absolute", bottom: 40, left: 15, right: 15 }}>
                        <CustomSuccessSaveButton setIsLoading={setIsLoading} onPress={getSaveProsessing} isLoading={isLoading} disabled={isLoading} width={'100%'} text={'Yadda Saxla'} />
                    </View>
                }
                <BackModal modalVisible={dontBackModal} setModalVisible={setDontBackModal} pressExit={getExit} pressContinue={() => { setDontBackModal(false) }} />
                {
                    order.Id &&
                    <DocumentAmmount amount={ConvertFixedTable(order.Amount)} />
                }
            </>
    )
}

export default Order

const styles = StyleSheet.create({
    topTabButton: {
        flex: 1,
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})