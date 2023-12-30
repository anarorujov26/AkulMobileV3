import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MoreCohices = ({ modalVisible, setModalVisible, ...props }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <TouchableOpacity activeOpacity={1} onPress={()=>{
        setModalVisible(false)
      }} style={styles.centeredView}>
        <TouchableOpacity disabled={true} style={styles.modalView}>
          {props.children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

export default MoreCohices

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 10,
    paddingTop:20,
    paddingBottom:20,
    marginTop:'9%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:"30%"
  },
})