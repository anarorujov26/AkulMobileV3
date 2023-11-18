import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CustomColors from '../../../../../Global/Colors/CustomColors';
import Transaction from './Transaction';
import Transactions from './Transactions';

const TransactionStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerTintColor: CustomColors.connectedPrimary
        }}>
            <Stack.Screen options={{
                title: 'Ödənişlər',
            }} name='transactions' component={Transactions} />
            <Stack.Screen options={{
                title: 'Ödəniş'
            }} name='transaction' component={Transaction} />
        </Stack.Navigator>
    )
}

export default TransactionStack

const styles = StyleSheet.create({})