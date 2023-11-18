import { Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput';
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment/moment';
import CustomTextare from '../../../../../../../Global/UI/CustomTextare';
import { SalesGlobalContext } from '../../SalesGlobalState';

const SaleAppointmentPage = () => {

    const { sale } = useContext(SalesGlobalContext);

    return (
        <View>
            <CustomTextInput editable={false} placeholder="..." text={'№'} width={'100%'} value={sale.Name} addStyle={{ borderRadius: 0 }}/>
            <Pressable disabled={true}>
                <CustomTextInput placeholder="..." editable={false} text={'Tarix'} width={'100%'} value={moment(sale.Moment).format("YYYY-MM-DD")} end={true} endText={<AntDesign name='right' size={15} />} />
            </Pressable>
            <CustomTextInput placeholder="..." editable={false} text={'Keçirilib'} width={'100%'} addStyle={{ borderRadius: 0 }} end={true} endText={
                <Switch
                    disabled={true}
                    value={sale.Status == 1 ? true : false}
                />} />
            <CustomTextare editable={false} placeholder="..." multiline={true} numberOfLines={4} text={"Şərh"} width={'100%'} value={sale.Description} onChangeText={(e) => {
            }} addStyle={{ borderRadius: 0 }} />
        </View>
    )
}

export default SaleAppointmentPage

const styles = StyleSheet.create({})