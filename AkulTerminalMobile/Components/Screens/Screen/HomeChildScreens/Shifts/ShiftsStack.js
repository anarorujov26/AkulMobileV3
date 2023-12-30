import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Shifts from './Shifts';
import Shift from './Shift';
import CustomColors from '../../../../../Global/Colors/CustomColors';

const ShiftsStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerTintColor: CustomColors.grey
        }}>
            <Stack.Screen options={{
                title: 'Növbələr',
            }} name='shifts' component={Shifts} />
            <Stack.Screen options={{
                title: 'Növbələr'
            }} name='shift' component={Shift} />
        </Stack.Navigator>
    )
}

export default ShiftsStack

const styles = StyleSheet.create({})