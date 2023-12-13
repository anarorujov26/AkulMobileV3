import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomColors from '../../Colors/CustomColors';

const SelectionModal = ({ modalVisible, setModalVisible, getDelete, getPayment }) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.listItem} onPress={getDelete}>
            <Text style={{ color: CustomColors.primary }}>Sil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem} onPress={getPayment}>
            <Text style={{ color: CustomColors.primary }}>Ödəmə</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default SelectionModal

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginTop: 22,
  },
  modalView: {
    marginTop: '10%',
    marginRight: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  listItem: {
    padding: 10,
    width: 100,
  }
})