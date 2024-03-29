import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../UI/CustomTextInput'
import CustomColors from '../Colors/CustomColors'
import AntDesign from 'react-native-vector-icons/AntDesign'

const DocumentInItems = ({ data, itemOne, itemTwo }) => {

    const [answer, setAnswer] = useState(false)

    return (
        answer ?
            <>
                <TouchableOpacity onPress={() => {
                    setAnswer(false)
                }} style={[styles.pricesContainer, { width: '100%' }]} >
                    <AntDesign name='right' size={20} color={CustomColors("dark").primary} />
                    <Text style={{ color: CustomColors("dark").primary }}>  Modifikasiyalar</Text>
                </TouchableOpacity>
                {
                        data.Modifications.map((element, index) => {
                            return (
                                <>
                                    <View style={{ margin: 0.5 }} />
                                    <CustomTextInput editable={false} keyboardType={'numeric'} value={element[itemTwo]} text={element[itemOne]} width={'100%'} />
                                </>
                            )
                        })
                    }
            </>
            :
            <TouchableOpacity onPress={() => {
                setAnswer(true)
            }} style={[styles.pricesContainer, { width: '100%' }]}>
                <AntDesign name='down' size={20} color={CustomColors("dark").primary} />
                <Text style={{ color: CustomColors("dark").primary }}>  Modifikasiyalar</Text>
            </TouchableOpacity>
    )
}

export default DocumentInItems

const styles = StyleSheet.create({
    pricesContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10
    }
})