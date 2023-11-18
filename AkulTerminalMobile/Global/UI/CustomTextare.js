import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'

const CustomTextare = ({ text, width, end, endText, addStyle, press, ...props }) => {
    return (
        <View style={[{ width: width }, styles.container, addStyle]}>
            <View style={styles.firsContainer}>
                <Text>{text}</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput   {...props} style={[styles.input]} />
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

export default CustomTextare

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 5
    },
    firsContainer: {
        width: '22%',
        justifyContent: 'center',
        marginLeft: 5
    },
    inputContainer: {
        width: '65%',
    },
    input: {
        paddingLeft: 20,
        color: "black",
        height:100
    },
    endContainer: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
})