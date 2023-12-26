import { StyleSheet } from 'react-native'
import React from 'react'
import { OrdersGlobalProvider } from './OrdersGlobalState';
import OrdersStack from './OrdersStack';

const OrdersMain = () => {
    return (
        <OrdersGlobalProvider>
                <OrdersStack />
        </OrdersGlobalProvider>
    )
}

export default OrdersMain

const styles = StyleSheet.create({})