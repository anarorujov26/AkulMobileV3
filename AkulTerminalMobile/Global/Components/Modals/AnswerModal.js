import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomDangerButton from '../../UI/CustomDangerButton';
import CustomPrimaryButton from '../../UI/CustomPrimaryButton';

const AnswerModal = ({ modalVisible, setModalVisible, pressExit, pressContinue, text, oneButton, twoButton }) => {
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
                    <Text style={{ fontSize: 18, color: 'black', textAlign: 'center' }}>{text}</Text>
                    <View style={{ width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'space-evenly', marginTop: 10 }}>
                        <CustomDangerButton width={'30%'} text={oneButton} onPress={pressExit} />
                        <CustomPrimaryButton width={'30%'} text={twoButton} onPress={pressContinue} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AnswerModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
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
        width: '95%'
    },
})