import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomColors from '../../Colors/CustomColors'

const PayTypeModal = ({ modalVisible, setModalVisible, setState }) => {

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
                        setState(rel => ({ ...rel, ['paytype']: "p" })),
                        setModalVisible(false)
                    }} style={styles.button}>
                        <Text style={styles.buttonText}>Nağd</Text>
                    </TouchableOpacity>
                    <View style={{ margin: 20 }} />
                    <TouchableOpacity onPress={() => {
                        setState(rel => ({ ...rel, ['paytype']: "i" })),
                        setModalVisible(false)
                    }} style={styles.button}>
                        <Text style={styles.buttonText}>Köçürmə</Text>
                    </TouchableOpacity>
                    <View style={{ margin: 20 }} />
                    <TouchableOpacity onPress={() => {
                        setState(rel => ({ ...rel, ['paytype']: "" })),
                        setModalVisible(false)
                    }} style={styles.button}>
                        <Text style={styles.buttonText}>Hamısı</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default PayTypeModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    button: {
        width: '50%',
        borderRadius: 10,
        backgroundColor: CustomColors("dark").primary,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    }
})
