import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CustomColors from '../../../../../Global/Colors/CustomColors';
import SalesP from './SalesP';
import SaleP from './SaleP';

const SalePStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerTintColor: CustomColors("dark").greyV2
        }}>
            <Stack.Screen options={{
                title: 'Mənfəət',
            }} name='salesP' component={SalesP} />
            <Stack.Screen options={{
                title: 'Mənfəət'
            }} name='saleP' component={SaleP} />
        </Stack.Navigator>
    )
}

export default SalePStack

const styles = StyleSheet.create({})