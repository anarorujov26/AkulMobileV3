import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomDangerButton from './../../UI/CustomDangerButton';
import CustomPrimaryButton from '../../UI/CustomPrimaryButton';

const BackModal = ({ modalVisible, setModalVisible, pressExit, pressContinue }) => {
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
                    <Text style={{ fontSize: 18, color: 'orange', textAlign: 'center' }}>Diqqət!</Text>
                    <Text style={{ fontSize: 15, color: 'black', textAlign: 'center' }}>Dəyişikliklər yadda saxlanılmayacaq!</Text>
                    <View style={{ width:'100%',flexDirection: 'row', display: 'flex', justifyContent: 'space-evenly',marginTop:10}}>
                        <CustomDangerButton width={'30%'} text={'Çıx'} onPress={pressExit} />
                        <CustomPrimaryButton width={'30%'} text={"Geri qayıt"} onPress={pressContinue} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default BackModal

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