import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CustomColors from '../../../../../Global/Colors/CustomColors';
import Debts from './Debts';
import Debt from './Debt';

const DebtStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerTintColor: CustomColors("dark").greyV2
        }}>
            <Stack.Screen options={{
                title: 'Borclar',
            }} name='debts' component={Debts} />
            <Stack.Screen options={{
                title: 'Borclar'
            }} name='debt' component={Debt} />
        </Stack.Navigator>
    )
}

export default DebtStack

const styles = StyleSheet.create({})