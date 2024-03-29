import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomColors from '../Colors/CustomColors'
import { TouchableOpacity } from 'react-native'

const NewFab = ({press}) => {
  return (
    <TouchableOpacity onPress={press} style={styles.fabContainer}>
      <Ionicons size={30} name='add' color={'white'}/>
    </TouchableOpacity>
  )
}

export default NewFab

const styles = StyleSheet.create({
  fabContainer:{
    position:'absolute',
    right:20,
    bottom:50,
    width:65,
    height:65,
    borderRadius:65,
    backgroundColor:CustomColors("dark").danger,
    justifyContent:'center',
    alignItems:'center',
    shadowColor:CustomColors("dark").danger,
    elevation:10
  }
})