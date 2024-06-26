import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import CustomColors from '../Colors/CustomColors'

const CustomTextInput = ({ text, width, end, endText, addStyle, addStyleInput, press, ...props }) => {
    return (
        <View style={[{ width: width }, styles.container, addStyle]}>
            <View style={styles.firsContainer}>
                <Text style={{ color: CustomColors("dark").black }}>{text}</Text>
            </View>
            <View style={end != true ? styles.inputContainerEnd : styles.inputContainer}>
                <TextInput {...props} style={[styles.input, addStyleInput]} />
            </View>
            {
                end == true &&
                <View style={styles.endContainer}>
                    <TouchableOpacity onPress={press}>
                        <Text>{endText}</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    firsContainer: {
        width: '22%',
        justifyContent: 'center',
        marginLeft: 5
    },
    inputContainer: {
        width: '64%',
    },
    inputContainerEnd: {
        width: '75%',
    },
    input: {
        paddingLeft: 20,
        color: CustomColors("dark").black
    },
    endContainer: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
})