import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomColors from '../Colors/CustomColors'

const CustomSuccessButton = ({ width, text, addStyle, isLoading, ...props }) => {
    return (
        <TouchableOpacity style={[{ width: width }, styles.container, addStyle]} {...props}>
            {
                isLoading ?
                    <ActivityIndicator size={17} color={'white'} />
                    :
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 19 }}>{text}</Text>

            }
        </TouchableOpacity>
    )
}

export default CustomSuccessButton

const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors.success,
        borderRadius: 5
    }
})