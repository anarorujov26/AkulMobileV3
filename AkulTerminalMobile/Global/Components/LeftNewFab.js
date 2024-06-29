import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native'

const LeftNewFab = ({press}) => {
  return (
    <TouchableOpacity onPress={press} style={styles.fabContainer}>
      <Ionicons size={30} name='scan' color={'white'}/>
    </TouchableOpacity>
  )
}

export default LeftNewFab

const styles = StyleSheet.create({
  fabContainer:{
    position:'absolute',
    left:20,
    bottom:50,
    width:65,
    height:65,
    borderRadius:65,
    backgroundColor:'#1677ff',
    justifyContent:'center',
    alignItems:'center',
    shadowColor:'#1677ff',
    elevation:10
  }
})