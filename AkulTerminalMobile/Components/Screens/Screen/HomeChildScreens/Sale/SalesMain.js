import { StyleSheet } from 'react-native'
import React from 'react'
import SalesStack from './SalesStack';
import { SalesGlobalProvider } from './SalesGlobalState';

const SalesMain = () => {
    return (
        <SalesGlobalProvider>
            <SalesStack />
        </SalesGlobalProvider>
    )
}

export default SalesMain

const styles = StyleSheet.create({})