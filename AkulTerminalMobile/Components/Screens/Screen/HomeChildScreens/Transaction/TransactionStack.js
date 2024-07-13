import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Platform } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CustomColors from '../../../../../Global/Colors/CustomColors';
import Transaction from './Transaction';
import Transactions from './Transactions';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RNFS from 'react-native-fs';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import Share from 'react-native-share';

const TransactionStack = () => {

    const Stack = createNativeStackNavigator();

    const [isLoading, setIsLoading] = useState(false);

    const handleExcelFileDownload = async () => {
        const permission = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        if (permission == RESULTS.GRANTED) {
            setIsLoading(true);
            let obj = {
                printtype: "xlsx",
                requesttype: 1,
                token: await AsyncStorage.getItem("token")
            }

            const publicMode = await AsyncStorage.getItem("apiLocation");
            
            const result = await axios({
                url: `https://api.akul.az/1.0/${publicMode}/controllers/transactions/get.php`,
                data:obj,
                method: 'POST',
            });

            if (result.status == 200) {
                console.log(result);
                let path = RNFS.DocumentDirectoryPath + `/${new Date().getTime()}.xlsx`
                RNFS.writeFile(path, result.data, 'base64').then(async () => {
                    const shareOptions = {
                        title: "Share PNG",
                        url: `file://${path}`,
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    }
                    const result = await Share.open(shareOptions);
                    console.log(result);
                    setIsLoading(false);
                }).catch((err) => {
                    console.log(err)
                    setIsLoading(false);

                })
            }
        } else {
            console.log('Android deposuna icaze verilmedi')
        }


    }

    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerTintColor: CustomColors("dark").greyV2
        }}>
            <Stack.Screen options={{
                title: 'Ödənişlər',
                headerRight: () => (
                    isLoading ?
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={30} color={CustomColors("light").primary} />
                        </View>
                        :
                        <TouchableOpacity onPress={handleExcelFileDownload}>
                            <MaterialCommunityIcon name='microsoft-excel' color={'#107C41'} size={30} />
                        </TouchableOpacity>
                )
            }} name='transactions' component={Transactions} />
            <Stack.Screen options={{
                title: 'Ödəniş'
            }} name='transaction' component={Transaction} />
        </Stack.Navigator >
    )
}

export default TransactionStack

const styles = StyleSheet.create({})