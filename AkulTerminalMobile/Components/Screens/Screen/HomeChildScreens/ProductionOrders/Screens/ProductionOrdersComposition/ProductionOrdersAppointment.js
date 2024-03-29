import { FlatList, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import CustomPrimaryButton from '../../../../../../../Global/UI/CustomPrimaryButton';
import Item from './../Comps/Item';
import { ProductionOrdersGlobalContext } from '../../ProductionOrdersGlobalState';

const ProductionOrdersComposition = ({ navigation }) => {

  const { compositions, setCompositions, production, setProduction, setSaveButton, comEdit,
    setComEdit, po_id } = useContext(ProductionOrdersGlobalContext);

  const renderCompositions = ({ item, index }) => (
    <Item d={!comEdit || production.OrderStatus && production.OrderStatus === 4} item={item} data={compositions} setData={setCompositions} location="itemEditableCom" navigation={navigation} name={item.Name} barcode={item.BarCode} quantity={item.Quantity} />
  )

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <CustomPrimaryButton disabled={!comEdit || production.OrderStatus && production.OrderStatus === 4} onPress={() => {
        navigation.navigate("addComposition", {
          location: "documentNewModal",
          state: production,
          setState: setProduction,
          setButton: setSaveButton,
          type: 'BuySupply'
        })
      }} width={'95%'} addStyle={{
        margin: 10
      }} text={'Tərkib əlavə et'} />
      <FlatList data={compositions} renderItem={renderCompositions} />

    </View>
  )
}

export default ProductionOrdersComposition

const styles = StyleSheet.create({})