import { ActivityIndicator, Animated, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import SupplyDocumentPage from './SupplyDocument/SupplyDocumentPage';
import SupplyAppointmentPage from './SupplyAppointment/SupplyAppointmentPage';
import CustomColors from '../../../../../../Global/Colors/CustomColors';
import { SupplysGlobalContext } from '../SupplysGlobaState';
import Api from '../../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomToLowerCase } from '../../../../../../Global/Components/CustomToLowerCase';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import BackModal from '../../../../../../Global/Components/Modals/BackModal';
import moment from 'moment';
import CustomSuccessSaveButton from '../../../../../../Global/UI/CustomSuccessSaveButton';
import DocumentAmmount from './../../../../../../Global/Components/DocumentAmmount';
import { ConvertFixedTable } from '../../../../../../Global/Components/ConvertFixedTable';
import modificationsGroup from './../../../../../../Global/Components/modificationsGroup';

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

const Supply = ({ route, navigation }) => {

    const { id } = route.params
    const { saveButton, supply, setSupply, setSaveButton, setSupplyListRender } = useContext(SupplysGlobalContext)
    const [isLoading, setIsLoading] = useState(false);
    const [dontBackModal, setDontBackModal] = useState(false);

    const getSupply = async (productId) => {
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
            setSupply(obj);
        } else {
            let obj = {
                id: productId,
                token: await AsyncStorage.getItem('token')
            }
            const result = await Api('supplyreturns/get.php', obj);
            if (result.data.Headers.ResponseStatus !== "0") {
                navigation.goBack();
            }

            let data = { ...result.data.Body.List[0] }
            data.Modifications = await modificationsGroup(result.data.Body.List[0], 'supplyreturn');
            setSupply(data);
        }
    }

    const getSaveProsessing = async () => {
        if (supply.CustomerId == "" || supply.StockId == "") {
            alert("Müştəri və Anbar mütləq seçilməlidir!");
        } else {
            setIsLoading(true);
            let obj = CustomToLowerCase({ ...supply });
            if (obj.name == "") {
                const result = await Api('supplyreturns/newname.php', {
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

            const result = await Api('supplyreturns/put.php', obj);
            if (result.data.Headers.ResponseStatus == "0") {
                setSupply(null)
                setSaveButton(false)
                successAlert();
                getSupply(result.data.Body.ResponseService);
                setSupplyListRender(rel => rel + 1);
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
        setSupply(null);
        setSaveButton(false);
        navigation.goBack();
    }

    useEffect(() => {
        getSupply(id);
    }, [id])

    useFocusEffect(

        useCallback(() => {
            const onBackPress = async () => {
                navigation.setParams({ shouldGoToSpecificPage: false });
                saveButton ? setDontBackModal(true) : (navigation.goBack(), setSupply(null));
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [saveButton]))

    return (
        supply == null ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color={CustomColors.primary} />
            </View>
            :
            <>
                <Tab.Navigator key={id} tabBar={props => <MyTabBar {...props} />}>
                    <Tab.Screen options={{
                        tabBarLabel: "Sənəd"
                    }} name='sDocument' component={SupplyDocumentPage} />
                    <Tab.Screen options={{
                        tabBarLabel: "Təyinat"
                    }} name='sAppointment' component={SupplyAppointmentPage} />
                </Tab.Navigator>
                {
                    saveButton &&
                    <View style={{ flex: 1, position: "absolute", bottom: 40, left: 15, right: 15 }}>
                        <CustomSuccessSaveButton setIsLoading={setIsLoading} onPress={getSaveProsessing} isLoading={isLoading} disabled={isLoading} width={'100%'} text={'Yadda Saxla'} />
                    </View>
                }
                <BackModal modalVisible={dontBackModal} setModalVisible={setDontBackModal} pressExit={getExit} pressContinue={() => { setDontBackModal(false) }} />
                {
                    supply.Id &&
                    <DocumentAmmount amount={ConvertFixedTable(supply.Amount)} />
                }
            </>
    )
}

export default Supply

const styles = StyleSheet.create({
    topTabButton: {
        flex: 1,
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})