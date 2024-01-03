import { ActivityIndicator, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CustomColors from '../../../../../../Global/Colors/CustomColors';
import Api from '../../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { ConvertFixedTable } from '../../../../../../Global/Components/ConvertFixedTable';
import DocumentAmmount from '../../../../../../Global/Components/DocumentAmmount';
import { SalesGlobalContext } from '../SalesGlobalState';
import SaleDocumentPage from './SaleDocument/SaleDocumentPage';
import SaleAppointmentPage from './SaleAppointment/SaleAppointmentPage';
import GetAddUnits from '../../../../../../Global/UI/GetAddUnits';
import axios from 'axios';

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

const Sale = ({ route, navigation }) => {

    const { id } = route.params
    const { saveButton, setSale, sale } = useContext(SalesGlobalContext)

    const getSale = async (productId) => {
        let obj = {
            id: productId,
            token: await AsyncStorage.getItem('token')
        }
        const result = await axios.post('https://api.akul.az/1.0/dev/controllers/sales/get.php', obj);
        if (result.data.Headers.ResponseStatus !== "0") {
            navigation.goBack();
        }
        let data = result.data.Body.List[0];
        setSale(data);
    }

    useEffect(() => {
        getSale(id);
    }, [id])

    return (
        sale == null ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color={CustomColors.primary} />
            </View>
            :
            <>
                <Tab.Navigator key={id} tabBar={props => <MyTabBar {...props} />}>
                    <Tab.Screen options={{
                        tabBarLabel: "Sənəd"
                    }} name='sDocument' component={SaleDocumentPage} />
                    <Tab.Screen options={{
                        tabBarLabel: "Təyinat"
                    }} name='sAppointment' component={SaleAppointmentPage} />
                </Tab.Navigator>
                {
                    sale.Id &&
                    <DocumentAmmount amount={ConvertFixedTable(sale.Amount)} />
                }
            </>
    )
}

export default Sale

const styles = StyleSheet.create({
    topTabButton: {
        flex: 1,
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})