import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CustomColors from '../../../../../Global/Colors/CustomColors';
import Accounts from './Accounts';
import Account from './Account';

const AccountsStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerTintColor: CustomColors.connectedPrimary
        }}>
            <Stack.Screen options={{
                title: 'Hesablar',
            }} name='accounts' component={Accounts} />
            <Stack.Screen options={{
                title: 'Hesablar'
            }} name='account' component={Account} />
        </Stack.Navigator>
    )
}

export default AccountsStack

const styles = StyleSheet.create({})