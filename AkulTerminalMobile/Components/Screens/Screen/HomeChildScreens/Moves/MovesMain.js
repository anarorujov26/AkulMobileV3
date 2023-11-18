import { StyleSheet } from 'react-native'
import React from 'react'
import { MovesGlobalProvider } from './MovesGlobalState';
import MovesStack from './MovesStack';

const MovesMain = () => {
    return (
        <MovesGlobalProvider>
            <MovesStack />
        </MovesGlobalProvider>
    )
}

export default MovesMain

const styles = StyleSheet.create({})