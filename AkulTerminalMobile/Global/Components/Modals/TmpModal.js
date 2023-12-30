import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const TmpModal = ({ modalVisible, setModalVisible, ...props }) => {
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <TouchableOpacity activeOpacity={1} onPress={() => {
            }} style={styles.centeredView}>
                <TouchableOpacity disabled={true} style={styles.modalView}>
                    {props.children}
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}

export default TmpModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor:"rgba(0,0,0,0.5)"
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        paddingTop: 0,
        paddingBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "95%"
    },
})