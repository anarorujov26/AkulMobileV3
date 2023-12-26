import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DashBoardComponents = ({ headerText, firstText, firstInfo, endText, endInfo, end }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <Text style={styles.text}>{headerText}</Text>
      </View>
      <View style={styles.modalLine}>
        <View style={styles.line} />
      </View>
      <View style={styles.modalEnd}>
        <View style={styles.textContainer}>
          <Text style={styles.textLeft}>{firstText ? firstText : 'Bu gün:'}</Text>
          <Text style={styles.textRight}>{firstInfo}</Text>
        </View>
        <View style={{ margin: 4 }}></View>
        {
          end ? '' :
            <View style={styles.textContainer}>
              <Text style={styles.textLeft}>{endText ? endText : 'Dünən:'}</Text>
              <Text style={styles.textRight}>{endInfo}</Text>
            </View>
        }
      </View>
    </View>
  )
}

export default DashBoardComponents

const styles = StyleSheet.create({
  modalContainer: {
    width: '95%',
    backgroundColor: '#ececec',
    padding: 10,
    borderRadius: 10
  },
  modalHeader: {

  },
  modalLine: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#aac3da',
  },
  modalEnd: {

  },
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: '300'
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  textLeft: {
    color: '#1164b1'
  },
  textRight: {
    color: 'black'
  }
})