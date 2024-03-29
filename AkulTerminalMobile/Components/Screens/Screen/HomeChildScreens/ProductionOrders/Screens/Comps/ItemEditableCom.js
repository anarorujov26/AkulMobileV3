import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ToastAndroid } from 'react-native';
import { ConvertFixedTable } from '../../../../../../../Global/Components/ConvertFixedTable';
import CustomPrimaryButton from '../../../../../../../Global/UI/CustomPrimaryButton';
import CustomColors from '../../../../../../../Global/Colors/CustomColors';
import { ProductionOrdersGlobalContext } from '../../ProductionOrdersGlobalState';

const ItemEditableCom = ({ route, navigation }) => {

  const { data, setData, item } = route.params;

  const { setSaveButton } = useContext(ProductionOrdersGlobalContext);

  const [isLoading, setIsLoading] = useState(false)

  const [product, setProduct] = useState(null);

  const getInfo = async () => {
    let objectData = { ...item };
    objectData.Quantity = ConvertFixedTable(objectData.Quantity);
    setProduct(objectData);
  }

  const getSaveInfo = async () => {
    let coms = [...data];
    coms.forEach((element, index) => {
      if (element.ProductId == product.ProductId) {
        element.Quantity = product.Quantity
      }
    })
    setSaveButton(true)
    setData(coms);
    navigation.goBack();
    successAlert();
  }
  const getDelete = () => {
    let deletedIndex = [...data].findIndex(element => element.ProductId == item.ProductId);
    let coms = [...data];
    coms.splice(deletedIndex, 1);
    setData(coms);
    navigation.goBack();
    successAlert();
    setSaveButton(true);
  }

  useEffect(() => {
    getInfo();
  }, [])

  const successAlert = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Əməliyyat uğurla icra olundu!',
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      ToastAndroid.SHORT,
      200,
      50
    )
  }


  return (
    product == null ?

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={50} color={CustomColors("dark").primary} />
      </View>
      :

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.container}>


          <View>
            <View style={{ width: '100%', flexDirection: 'row' }}>
              <Text style={styles.name}>{product.Name || product.Name}</Text>
              <TouchableOpacity onPress={getDelete} style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                <MaterialIcons name='delete-outline' size={25} color={CustomColors("dark").danger} />
              </TouchableOpacity>
            </View>


            <Text style={{ color: 'black', fontSize: 16 }}>{product.BarCode}</Text>


            <View style={{ alignItems: 'center' }}>
              <View style={{ width: '100%', height: 1, backgroundColor: 'grey', borderRadius: 10 }} />
            </View>
          </View>

          <View>
            <Text style={{ color: 'grey', fontSize: 15, textAlign: 'center' }}>{'Miqdar'}</Text>
            <View style={styles.bottomContainerItem}>
              <TouchableOpacity onPress={() => { setProduct(rel => ({ ...rel, ['Quantity']: ConvertFixedTable(Number(product.Quantity)) - 1 })); }}>
                <AntDesign color={CustomColors("dark").primary} size={70} name='minussquare' />
              </TouchableOpacity>
              <TextInput keyboardType='numeric' value={String(product.Quantity)} style={[styles.input, { textAlign: 'center', width: '50%' }]} onChangeText={(e) => {
                setProduct(rel => ({ ...rel, ['Quantity']: e.replace(',', '.') }));
              }} />
              <TouchableOpacity onPress={() => { setProduct(rel => ({ ...rel, ['Quantity']: ConvertFixedTable(Number(product.Quantity)) + 1 })); }}>
                <AntDesign color={CustomColors("dark").primary} size={70} name='plussquare' />
              </TouchableOpacity>
            </View>

            <View style={{ margin: 15 }} />
            <CustomPrimaryButton disabled={isLoading} isLoading={isLoading} onPress={getSaveInfo} text={'Təsdiq et'} width={'100%'} addStyle={{ borderRadius: 5 }} />
            <View style={{ margin: 5 }} />
          </View>
        </View>
      </View>
  )
}

export default ItemEditableCom

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    height: '100%',
    padding: 10,
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    width: '90%',
  },
  bottomContainerItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'white',
    width: 100,
    justifyContent: 'center',
    fontSize: 20,
    height: 60, marginTop: 4,
    borderBottomWidth: 1,
    color: CustomColors("dark").primary
  }
})