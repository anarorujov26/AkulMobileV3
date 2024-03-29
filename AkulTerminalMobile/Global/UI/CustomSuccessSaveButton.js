import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomColors from '../Colors/CustomColors'
import { useEffect } from 'react'

const CustomSuccessSaveButton = ({ width, text, addStyle, isLoading, setIsLoading, ...props }) => {

    useEffect(() => {
        let timer;

        if (isLoading) {
            timer = setTimeout(() => {
                setIsLoading(false);
                alert("Zəhmət olmasa şəbəkəni yoxlayın!");
            }, 10000);
        } else {
            return ()=> null;
        }

        return () => clearTimeout(timer);
    }, [isLoading])

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

export default CustomSuccessSaveButton

const styles = StyleSheet.create({
    container: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors("dark").success,
        borderRadius: 5
    }
})