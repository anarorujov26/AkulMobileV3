import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomColors from '../../../../../../Global/Colors/CustomColors'

const DocumentProductsList = (props) => {
  return (
    <TouchableOpacity style={styles.listContainer} onPress={()=>{props.navigation.navigate(props.location)}}>
      <View style={styles.listFirs}>
        <View style={styles.listFirsContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarName}>{props.index+1}</Text>
          </View>
        </View>
        <View style={styles.listCenterContiner}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.barcode}>{props.barcode}</Text>
          <Text style={styles.customerName}>{props.customername}</Text>
        </View>
      </View>
      <View style={styles.listEndContainer}>
        <Text style={styles.price}>{props.price}₼</Text>
        {
          props.stock !== null &&
          <Text style={styles.stock}>{props.stock}</Text>
        }
      </View>
    </TouchableOpacity>
  )
}

export default DocumentProductsList

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CustomColors.primary,
  },
  listContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    marginTop:5
  },
  listFirs: {
    flexDirection: 'row',
    width: '80%',
  },
  listFirsContainer: {
    justifyContent: 'center',
    marginRight: 10
  },
  listCenterContiner: {
    justifyContent: 'center'
  },
  listEndContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10
  },
  avatarName: {
    fontSize: 20,
    color: 'white',
  },
  name: {
    color: 'black'
  },
  barcode: {
    fontSize: 13,
  },
  customerName: {
    color: CustomColors.primary
  }
})