import { Linking, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomPrimaryButton from './Global/UI/CustomPrimaryButton';
import CustomSuccessButton from './Global/UI/CustomSuccessButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const BalanceModal = ({ showModal, setShowModal }) => {

  const getEXIT = async () => {
    await AsyncStorage.removeItem('token');
    RNRestart.Restart();
  }

  const routeWebBalancePage = () => {
    Linking.openURL('https://million.az/services/other/beinaz_yigim').catch(err => console.log(err))
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(!showModal);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>Balansınız bitib!</Text>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <CustomPrimaryButton onPress={getEXIT} text={'Hesabdan çıx'} width={120} isLoading={false} />
            <CustomSuccessButton onPress={routeWebBalancePage} text={'Balansı artır'} width={120} isLoading={false} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default BalanceModal

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
  },
  modalView: {
    width: 300,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-evenly'
  },
})