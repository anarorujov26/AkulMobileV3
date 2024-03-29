import { StyleSheet, Text, TouchableOpacity, TurboModuleRegistry, View } from 'react-native'
import React, { useContext, useEffect, useState, useSyncExternalStore } from 'react'
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput'
import OwnerModal from './../../../../../../../Global/Components/Modals/OwnerModal';
import DepratmentModal from './../../../../../../../Global/Components/Modals/DepratmentModal';
import MyDatePicker from './../../../../../../../Global/UI/MyDatePicker';
import moment from 'moment';
import { Checkbox } from '@ant-design/react-native';
import { ProductionOrdersGlobalContext } from '../../ProductionOrdersGlobalState';

const ProductionsAppointment = () => {

    const {
        production,
        setProduction,
        setSaveButton,
        comEdit,
        setComEdit,
        comClose,
        setComClose,
        po_id
    } = useContext(ProductionOrdersGlobalContext);

    const [ownerModal, setOwnerModal] = useState(false);
    const [departmentModal, setDepartmentModal] = useState(false);
    const [dateModal, setDateModal] = useState(false);



    const setInput = (a, x) => {

    }
    useEffect(() => {
        console.log(production);
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            {
                production !== null &&
                <>
                    <CustomTextInput editable={production.OrderStatus && production.OrderStatus !== 4} onChangeText={(e) => { setProduction(rel => ({ ...rel, ['Name']: e })), setSaveButton(true) }} value={String(production.Name)} text={"İstehsalat №"} width={'100%'} />
                    <TouchableOpacity disabled={production.OrderStatus && production.OrderStatus === 4} onPress={() => {
                        setDateModal(true);
                        setSaveButton(true)
                    }}>
                        <CustomTextInput editable={false} onChangeText={(e) => { setInput('Moment', e) }} value={String(production.Moment)} text={"Tarix"} width={'100%'} />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={production.OrderStatus && production.OrderStatus === 4} onPress={() => {
                        setOwnerModal(true);
                        setSaveButton(true)
                    }}>
                        <CustomTextInput editable={false} onChangeText={(e) => { setInput('OwnerId', e) }} value={String(production.OwnerName)} text={"Cavabdeh"} width={'100%'} />
                    </TouchableOpacity>

                    <TouchableOpacity disabled={production.OrderStatus && production.OrderStatus === 4} onPress={() => {
                        setDepartmentModal(true);
                        setSaveButton(true)
                    }}>
                        <CustomTextInput editable={false} onChangeText={(e) => { setInput('DepartmentId', e) }} value={String(production.DepartmentName)} text={"Şöbə"} width={'100%'} />
                    </TouchableOpacity>

                    <CustomTextInput disabled={production.OrderStatus && production.OrderStatus === 4} placeholder="" editable={false} text={'Keçrilib'} width={'100%'} addStyle={{ borderRadius: 0 }} end={true} endText={
                        <Checkbox
                            disabled={production.OrderStatus && production.OrderStatus === 4}
                            checked={production.Status == 1 ? true : false}
                            onChange={(e) => {
                                setProduction(rel => ({ ...rel, ['Status']: e.target.checked ? 1 : 0 }))
                                setSaveButton(true)
                            }}
                        >
                        </Checkbox>} />

                    <CustomTextInput disabled={production.OrderStatus && production.OrderStatus === 4} placeholder="" editable={false} text={'Tərkibi Müdəxilə'} width={'100%'} addStyle={{ borderRadius: 0 }} end={true} endText={
                        <Checkbox
                            disabled={production.OrderStatus && production.OrderStatus === 4}
                            checked={comEdit}
                            defaultChecked={comEdit}
                            onChange={(e) => {
                                setComEdit(e.target.checked);
                            }}
                        >
                        </Checkbox>} />
                    <CustomTextInput disabled={production.OrderStatus && production.OrderStatus === 4} placeholder="" editable={false} text={'Tərkibi Bağla'} width={'100%'} addStyle={{ borderRadius: 0 }} end={true} endText={
                        <Checkbox
                            disabled={production.OrderStatus && production.OrderStatus === 4}
                            checked={comClose}
                            onChange={(e) => {
                                setComClose(e.target.checked);
                            }}
                        >
                        </Checkbox>} />

                </>
            }

            <OwnerModal modalVisible={ownerModal} setModalVisible={setOwnerModal} idType={'OwnerId'} nameType={"OwnerName"} state={setProduction} save={setSaveButton} />
            <DepratmentModal modalVisible={departmentModal} setModalVisible={setDepartmentModal} idType={'DepartmentId'} nameType={'DepartmentName'} save={setSaveButton} state={setProduction} />
            <MyDatePicker setState={setSaveButton} date={production.Moment == "" ? new Date() : new Date(moment(production.Moment).format('YYYY-MM-DD'))} setDate={setProduction} type={'Moment'} open={dateModal} setOpen={setDateModal} />
        </View>
    )
}

export default ProductionsAppointment

const styles = StyleSheet.create({})