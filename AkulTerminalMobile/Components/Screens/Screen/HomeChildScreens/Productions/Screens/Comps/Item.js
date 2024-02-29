import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ConvertFixedTable } from '../../../../../../../Global/Components/ConvertFixedTable'
import CustomColors from '../../../../../../../Global/Colors/CustomColors'
import Product from './../../../Products/Product';

const Item = ({ data, setData, d, ...props }) => {

  return (
    <>
      <TouchableOpacity disabled={d} style={styles.listContainer} onPress={() => { props.navigation.navigate(props.location, { data, setData, item: props.item }) }}>
        <View style={styles.listFirs}>
          <View style={styles.listFirsContainer}>
            <View style={[styles.avatar, { backgroundColor: CustomColors.greyV1 }]}>
              <Text style={styles.avatarName}>{props.name.slice(0, 2)}</Text>
            </View>
          </View>
          <View style={styles.listCenterContiner}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.barcode}>{props.barcode}</Text>
          </View>
        </View>
        <View style={styles.listEndContainer}>

          {
            props.quantity == null ?
              ''
              :
              <Text style={styles.price}>{ConvertFixedTable(Number(props.quantity))} əd</Text>
          }
        </View>
      </TouchableOpacity>
    </>
  )
}

export default Item

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CustomColors.greyV1,
  },
  listContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    marginTop: 5
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
    color: 'black'
  },
  name: {
    color: 'black'
  },
  barcode: {
    fontSize: 13,
  },
  customerName: {
    color: CustomColors.primary
  },
  price: {
    color: 'black'
  },
})