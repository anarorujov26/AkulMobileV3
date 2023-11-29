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
import CustomSuccessButton from '../../../../../../Global/UI/CustomSuccessButton';
import moment from 'moment';
import CustomSuccessSaveButton from '../../../../../../Global/UI/CustomSuccessSaveButton';
import { ConvertFixedTable } from '../../../../../../Global/Components/ConvertFixedTable';
import DocumentAmmount from '../../../../../../Global/Components/DocumentAmmount';
import { MovesGlobalContext } from '../MovesGlobalState';
import MoveDocumentPage from './MoveDocument/MoveDocumentPage';
import MoveAppointmentPage from './MoveAppointment/MoveAppointmentPage';
import modificationsGroup from '../../../../../../Global/Components/modificationsGroup';

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

const Move = ({ route, navigation }) => {

    const { id } = route.params
    const { saveButton, move, setMove, setSaveButton, setMoveListRender } = useContext(MovesGlobalContext)
    const [isLoading, setIsLoading] = useState(false);
    const [dontBackModal, setDontBackModal] = useState(false);

    const getMove = async (productId) => {
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
            setMove(obj);
        } else {
            let obj = {
                id: productId,
                token: await AsyncStorage.getItem('token')
            }
            const result = await Api('moves/get.php', obj);
            if (result.data.Headers.ResponseStatus !== "0") {
                navigation.goBack();
            }
            let data = { ...result.data.Body.List[0] }
            data.Modifications = await modificationsGroup(result.data.Body.List[0], 'move');
            setMove(data);
        }
    }

    const getSaveProsessing = async () => {
        if (move.CustomerId == "" || move.StockId == "") {
            alert("Müştəri və Anbar mütləq seçilməlidir!");
        } else {
            setIsLoading(true);
            let obj = CustomToLowerCase({ ...move });
            if (obj.name == "") {
                const result = await Api('moves/newname.php', {
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

            const result = await Api('moves/put.php', obj);

            if (result.data.Headers.ResponseStatus == "0") {
                setMove(null)
                setSaveButton(false)
                successAlert();
                getMove(result.data.Body.ResponseService);
                setMoveListRender(rel => rel + 1);
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
        setMove(null);
        setSaveButton(false);
        navigation.goBack();
    }

    useEffect(() => {
        getMove(id);
    }, [id])

    useFocusEffect(

        useCallback(() => {
            const onBackPress = async () => {
                navigation.setParams({ shouldGoToSpecificPage: false });
                saveButton ? setDontBackModal(true) : (navigation.goBack(), setMove(null));
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [saveButton]))

    return (
        move == null ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color={CustomColors.primary} />
            </View>
            :
            <>
                <Tab.Navigator key={id} tabBar={props => <MyTabBar {...props} />}>
                    <Tab.Screen options={{
                        tabBarLabel: "Sənəd"
                    }} name='sDocument' component={MoveDocumentPage} />
                    <Tab.Screen options={{
                        tabBarLabel: "Təyinat"
                    }} name='sAppointment' component={MoveAppointmentPage} />
                </Tab.Navigator>
                {
                    saveButton &&
                    <View style={{ flex: 1, position: "absolute", bottom: 40, left: 15, right: 15 }}>
                        <CustomSuccessSaveButton setIsLoading={setIsLoading} onPress={getSaveProsessing} isLoading={isLoading} disabled={isLoading} width={'100%'} text={'Yadda Saxla'} />
                    </View>
                }
                <BackModal modalVisible={dontBackModal} setModalVisible={setDontBackModal} pressExit={getExit} pressContinue={() => { setDontBackModal(false) }} />
                {
                    move.Id &&
                    <DocumentAmmount amount={ConvertFixedTable(move.Amount)} />
                }
            </>
    )
}

export default Move

const styles = StyleSheet.create({
    topTabButton: {
        flex: 1,
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})