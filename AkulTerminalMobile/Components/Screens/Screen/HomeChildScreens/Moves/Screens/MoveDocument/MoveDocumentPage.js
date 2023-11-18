import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomPrimaryButton from '../../../../../../../Global/UI/CustomPrimaryButton'
import PositionsList from '../../../../../../../Global/UI/PositionsList';
import { ConvertFixedTable } from '../../../../../../../Global/Components/ConvertFixedTable'
import StockModal from '../../../../../../../Global/Components/Modals/StockModal';
import { MovesGlobalContext } from '../../MovesGlobalState'

const MoveDocumentPage = ({ navigation }) => {
  const { move, setMove, saveButton, setSaveButton } = useContext(MovesGlobalContext)
  const [customer, setCustomer] = useState(false);
  const [stock, setStock] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity onPress={() => { setCustomer(true) }}>
        <CustomTextInput editable={false} text={'Anbardan'} width={'100%'} value={move.StockFromName} end={true} endText={<AntDesign name='right' size={15} />} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { setStock(true) }}>
        <CustomTextInput editable={false} text={'Anbara'} width={'100%'} value={move.StockToName} end={true} endText={<AntDesign name='right' size={15} />} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', marginTop: 10, marginBottom: 10 }}>
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("scanner", {
            location: "documentNewModal",
            state: move,
            setState: setMove,
            setButton: setSaveButton,
            type: 'Sale',
            pageName: "Demand"
          })
        }} width={'10%'} text={<AntDesign name='scan1' size={20} />} />
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("addPS", {
            location: "documentNewModal",
            state: move,
            setState: setMove,
            setButton: setSaveButton,
            type: 'Sale',
            pageName: "Demand"
          })
        }} width={'70%'} text={'Məhsul əlavə et'} />
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("productsCreate", {
            id: null
          })
        }} width={'10%'} text={<AntDesign name='plus' size={20} />} />
      </View>
      <View style={{ flex: 1, width: '100%' }}>
        <FlatList data={move.Positions} renderItem={({ item, index }) => (
          <PositionsList type={'Sale'} key={item.Id} pageName={'Demand'} location={"documentEditModal"} setButton={setSaveButton} element={item} setState={setMove} state={move} index={index} name={item.Name} barcode={`${item.BarCode}`} totalPrice={ConvertFixedTable(Number(ConvertFixedTable(item.Price)) * Number(ConvertFixedTable(item.Quantity)))} priceandquantity={`${ConvertFixedTable(Number(item.Quantity))} əd x ${ConvertFixedTable(Number(item.Price))}`} navigation={navigation} />
        )} />
      </View>
      {saveButton &&
        <View style={{ margin: 30 }} />
      }

      <StockModal save={setSaveButton} modalVisible={customer} setModalVisible={setCustomer} state={setMove} nameType={'StockFromId'} idType={'StockFromId'}/>
      <StockModal data={move} save={setSaveButton} modalVisible={stock} setModalVisible={setStock} state={setMove} idType={'StockToId'} nameType={'StockToName'} />
    </View>
  )
}

export default MoveDocumentPage

const styles = StyleSheet.create({})