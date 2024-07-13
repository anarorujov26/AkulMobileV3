import { StyleSheet,  TouchableOpacity } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import item from './item';
import TransferList from './TransferList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const TransferStack = () => {

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name='Transfers'component={TransferList} />
            <Stack.Screen name='transferitem' component={item} />
        </Stack.Navigator>
    )
}

export default TransferStack

const styles = StyleSheet.create({})