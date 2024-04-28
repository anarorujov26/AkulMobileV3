import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DocumentAmmount = ({ amount, basicamount }) => {
  return (
    <View>
      {
        basicamount ?
        <View style={styles.amountContainer}>
          <View style={styles.firstBlock}>
            <Text style={{ fontSize: 14, color: '#bcbcbc' }}>Ümumi məbləğ:</Text>
          </View>
          <View style={styles.endBlock}>
            <Text style={{ fontSize: 14, color: '#bcbcbc' }}>{String(basicamount)} ₼</Text>
          </View>
        </View>
        :
        ''
      }
      <View style={styles.amountContainerr}>
        <View style={styles.firstBlock}>
          <Text style={{ fontSize: 16, color: 'black', padding: 0 }}>Yekun məbləğ:</Text>
        </View>
        <View style={styles.endBlock}>
          <Text style={{ fontSize: 16, color: 'black', padding: 0 }}>{String(amount)} ₼</Text>
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
    paddingLeft: 10,
    paddingRight: 10
  },
  amountContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  firstBlock: {
  },
  endBlock: {
  }
})