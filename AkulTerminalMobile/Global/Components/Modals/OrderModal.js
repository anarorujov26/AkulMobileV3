import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomColors from '../../Colors/CustomColors';

const OrderModal = ({ modalVisible, setModalVisible, setData, setButton }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={() => {
                        setData('payment')
                        setModalVisible(false),
                            setButton(true)
                    }} style={styles.button}>
                        <Text style={{ fontSize: 20, color: "white", fontWeight: 'bold' }}>Nağd</Text>
                    </TouchableOpacity>
                    <View style={{ margin: 20 }} />
                    <TouchableOpacity onPress={() => {
                        setData('invoice')
                        setModalVisible(false),
                            setButton(true)
                    }} style={styles.button}>
                        <Text style={{ fontSize: 20, color: "white", fontWeight: 'bold' }}>Köçürmə</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default OrderModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '50%'
    },
    button: {
        width: 100,
        height: 100,
        backgroundColor: CustomColors("dark").primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0
    }
})