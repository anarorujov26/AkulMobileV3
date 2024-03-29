import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import StockModal from '../../../../../../../Global/Components/Modals/StockModal'
import CustomPrimaryButton from '../../../../../../../Global/UI/CustomPrimaryButton'
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput'
import Item from './../Comps/Item';
import { ProductionOrdersGlobalContext } from '../../ProductionOrdersGlobalState'

const ProductionOrdersProduct = ({ navigation }) => {

  const { production, setProduction, saveButton, setSaveButton, comEdit,
    setComEdit, po_id } = useContext(ProductionOrdersGlobalContext);
  const [stockFromModal, setStockFromModal] = useState(false);
  const [stockToModal, setStockToModal] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity disabled={production.OrderStatus && production.OrderStatus === 4} onPress={() => { setStockFromModal(true) }}>
        <CustomTextInput editable={false} text={'İstehsal Anbarı'} width={'100%'} value={production.StockFromName} end={true} endText={<AntDesign name='right' size={15} />} />
      </TouchableOpacity>

      <TouchableOpacity disabled={production.OrderStatus && production.OrderStatus === 4} onPress={() => { setStockToModal(true) }}>
        <CustomTextInput editable={false} text={'Çıxış Anbarı'} width={'100%'} value={production.StockToName} end={true} endText={<AntDesign name='right' size={15} />} />
      </TouchableOpacity>

      {
        production.ProductAnswer ?
          ''
          :
          <CustomPrimaryButton onPress={() => {
            navigation.navigate("addProduct", {
              location: "itemEditable",
              state: production,
              setState: setProduction,
              setButton: setSaveButton,
            })
          }} width={'95%'} text={'Məhsul əlavə et'} />
      }

      {
        production.ProductAnswer ?
          <View style={{ flex: 1, width: '100%' }}>
            <Item d={production.OrderStatus && production.OrderStatus === 4} location={'itemEditable'} data={production} setData={setProduction} navigation={navigation} name={production.ProductName} barcode={production.ProductBarCode} quantity={production.ProductQuantity} />
          </View>
          :
          ''
      }

      {saveButton &&
        <View style={{ margin: 30 }} />
      }
      <StockModal dontControl={true} data={production} save={setSaveButton} modalVisible={stockFromModal} setModalVisible={setStockFromModal} state={setProduction} idType={'StockFromId'} nameType={'StockFromName'} />
      <StockModal dontControl={true} data={production} save={setSaveButton} modalVisible={stockToModal} setModalVisible={setStockToModal} state={setProduction} idType={'StockToId'} nameType={'StockToName'} />
    </View>
  )
}

export default ProductionOrdersProduct

const styles = StyleSheet.create({})