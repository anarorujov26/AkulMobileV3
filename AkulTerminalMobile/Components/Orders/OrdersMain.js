import { StyleSheet } from 'react-native'
import React from 'react'
import { OrdersGlobalProvider } from './OrdersGlobalState';
import OrdersStack from './OrdersStack';
import { NavigationContainer } from '@react-navigation/native';

const OrdersMain = () => {
    return (
        <OrdersGlobalProvider>
            <NavigationContainer>
                <OrdersStack />
            </NavigationContainer>
        </OrdersGlobalProvider>
    )
}

export default OrdersMain

const styles = StyleSheet.create({})