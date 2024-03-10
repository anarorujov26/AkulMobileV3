import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomColors from '../Colors/CustomColors'

const DocumentAmmount = ({ amount, basicamount }) => {
  return (
    <View>
      {
        basicamount &&
        <View style={styles.amountContainer}>
          <View style={styles.firstBlock}>
            <Text style={{ fontSize: 14, color: '#bcbcbc' }}>Ümumi məbləğ:</Text>
          </View>
          <View style={styles.endBlock}>
            <Text style={{ fontSize: 14, color: '#bcbcbc' }}>{basicamount} ₼</Text>
          </View>
        </View>
      }
      <View style={styles.amountContainerr}>
        <View style={styles.firstBlock}>
          <Text style={{ fontSize: 16, color: 'black', padding: 0 }}>Yekun məbləğ:</Text>
        </View>
        <View style={styles.endBlock}>
          <Text style={{ fontSize: 16, color: 'black', padding: 0 }}>{amount} ₼</Text>
        </View>
      </View>

    </View>
  )
}

export default DocumentAmmount

const styles = StyleSheet.create({
  amountContainerr: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2
  },
  amountContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2
  },
  firstBlock: {
  },
  endBlock: {
  }
})