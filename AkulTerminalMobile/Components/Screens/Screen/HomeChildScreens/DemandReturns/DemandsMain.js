import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DemandsGlobalProvider } from './DemandsGlobalState';
import DemandsStack from './DemandsStack';

const DemandsMain = () => {
    return (
        <DemandsGlobalProvider>
            <DemandsStack />
        </DemandsGlobalProvider>
    )
}

export default DemandsMain

const styles = StyleSheet.create({})