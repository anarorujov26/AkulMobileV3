import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomDangerButton from './../../UI/CustomDangerButton';
import CustomPrimaryButton from '../../UI/CustomPrimaryButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomColors from '../../Colors/CustomColors';

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
                    {/* <Text style={{ fontSize: 18, color: 'orange', textAlign: 'center' }}>Diqqət!</Text> */}
                    <MaterialCommunityIcons name='alert-circle' size={60} color={CustomColors.orange}/>
                    <Text style={{ fontSize: 15,fontWeight:'bold',marginTop:10,width:'100%', color: 'black', textAlign: 'center' }}>Dəyişikliklər yadda saxlanılmayacaq!</Text>
                    <View style={{margin:10}}></View>
                    <View style={{ width:'100%',flexDirection: 'row', display: 'flex',marginTop:10}}>
                        <CustomPrimaryButton width={'45%'} text={'Çıx'} onPress={pressExit} />
                        <View style={{margin:10}}/>
                        <CustomPrimaryButton width={'45%'} text={"Geri qayıt"} onPress={pressContinue} />
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding:15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:'80%'
    },
})