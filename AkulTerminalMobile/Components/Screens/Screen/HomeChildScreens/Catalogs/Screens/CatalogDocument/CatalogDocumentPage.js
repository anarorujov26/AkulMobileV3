import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomPrimaryButton from '../../../../../../../Global/UI/CustomPrimaryButton'
import PositionsList from '../../../../../../../Global/UI/PositionsList';
import { ConvertFixedTable } from '../../../../../../../Global/Components/ConvertFixedTable'
import { CatalogsGlobalContext } from '../../CatalogsGlobalState'
import DepratmentModal from './../../../../../../../Global/Components/Modals/DepratmentModal';
import OwnerModal from './../../../../../../../Global/Components/Modals/OwnerModal';
import { FlatList } from 'react-native'
import { GlobalContext } from '../../../../../../../Global/Components/GlobalState'

const CatalogDocumentPage = ({ navigation }) => {

  const { listType } = useContext(GlobalContext);

  const { catalog, setCatalog, saveButton, setSaveButton } = useContext(CatalogsGlobalContext)
  const [customer, setCustomer] = useState(false);
  const [stock, setStock] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity onPress={() => { setCustomer(true) }}>
        <CustomTextInput editable={false} text={'Şöbə'} width={'100%'} value={catalog.DepartmentName} end={true} endText={<AntDesign name='right' size={15} />} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { setStock(true) }}>
        <CustomTextInput editable={false} text={'Cavabdeh'} width={'100%'} value={catalog.OwnerName} end={true} endText={<AntDesign name='right' size={15} />} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', marginTop: 10, marginBottom: 10 }}>
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("scanner", {
            location: "documentNewModal",
            state: catalog,
            setState: setCatalog,
            setButton: setSaveButton,
            type: 'ct'
          })
        }} width={'10%'} text={<AntDesign name='scan1' size={20} />} />
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("addPS", {
            location: "documentNewModal",
            state: catalog,
            setState: setCatalog,
            setButton: setSaveButton,
            type: 'ct'
          })
        }} width={'70%'} text={'Məhsul əlavə et'} />
        <CustomPrimaryButton onPress={() => {
          navigation.navigate("productsCreate", {
            id: null
          })
        }} width={'10%'} text={<AntDesign name='plus' size={20} />} />
      </View>
      <View style={{flex:1,width:'100%'}}>
        <FlatList
          data={catalog.Positions}
          renderItem={({ item, index }) => (
            <PositionsList type={'ct'} key={item.Id} location={"documentEditModal"} setButton={setSaveButton} element={item} setState={setCatalog} state={catalog} index={index} name={item.Name} barcode={`${item.BarCode}`} totalPrice={ConvertFixedTable(Number(ConvertFixedTable(item.Price)) * Number(ConvertFixedTable(item.Quantity)))} priceandquantity={`${ConvertFixedTable(Number(item.Quantity))} əd x ${ConvertFixedTable(Number(item.Price))}`} navigation={navigation} />
          )}
        />
      </View>

      {saveButton &&
        <View style={{ margin: 30 }} />
      }

      <OwnerModal save={setSaveButton} modalVisible={stock} setModalVisible={setStock} state={setCatalog} nameType={'OwnerName'} idType={'OwnerId'} />
      <DepratmentModal save={setSaveButton} modalVisible={customer} setModalVisible={setCustomer} state={setCatalog} nameType={'DepartmentName'} idType={'DepartmentId'} />
    </View>
  )
}

export default CatalogDocumentPage

const styles = StyleSheet.create({})