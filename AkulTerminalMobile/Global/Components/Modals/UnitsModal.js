import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import CustomTextInput from '../../UI/CustomTextInput';
import GetUnits from '../../UI/GetUnits';
import CustomColors from '../../Colors/CustomColors';

const UnitsModal = ({ data, type, product, setProduct }) => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <TouchableOpacity onPress={() => {
                setModalVisible(true)
            }}>
                <CustomTextInput editable={false} addStyleInput={{ fontSize: 20, color: CustomColors.connectedPrimary }} keyboardType={"numeric"} text={'Vahid'} value={data.UnitName} width={'100%'} addStyle={{ borderRadius: 0, borderBottomWidth: 1 }} />
            </TouchableOpacity>

            <GetUnits type={type} data={product} setData={setProduct} units={data.units} modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    )
}

export default UnitsModal

const styles = StyleSheet.create({})