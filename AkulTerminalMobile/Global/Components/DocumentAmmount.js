import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomColors from '../Colors/CustomColors'

const DocumentAmmount = ({amount}) => {
  return (
    <View style={styles.amountContainer}>
      <View style={styles.firstBlock}>
        <Text style={{fontSize:16,color:CustomColors.primary}}>Ümumi qiymət:</Text>
      </View>
      <View style={styles.endBlock}>
        <Text style={{fontSize:16,color:CustomColors.primary}}>{amount} ₼</Text>
      </View>
    </View>
  )
}

export default DocumentAmmount

const styles = StyleSheet.create({
  amountContainer: {
    width:'100%',
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:5
  },
  firstBlock: {
  },
  endBlock: {
  }
})