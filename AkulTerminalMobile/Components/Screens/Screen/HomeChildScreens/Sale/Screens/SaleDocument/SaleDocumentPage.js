import { FlatList, StyleSheet, TouchableOpacity, TurboModuleRegistry, View } from 'react-native'
import React, { useContext, useState } from 'react'
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomPrimaryButton from '../../../../../../../Global/UI/CustomPrimaryButton'
import PositionsList from '../../../../../../../Global/UI/PositionsList';
import { ConvertFixedTable } from '../../../../../../../Global/Components/ConvertFixedTable'
import StockModal from '../../../../../../../Global/Components/Modals/StockModal';
import { SalesGlobalContext } from '../../SalesGlobalState'

const SaleDocumentPage = ({ navigation }) => {
    const [saveButton, setSaveButton] = useState(false);
    const { sale, setSale } = useContext(SalesGlobalContext)
    const [customer, setCustomer] = useState(false);
    const [stock, setStock] = useState(false);

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity disabled={true} onPress={() => { setCustomer(true) }}>
                <CustomTextInput editable={false} text={'Qarşı-Tərəf'} width={'100%'} value={sale.CustomerName} end={true} endText={<AntDesign name='right' size={15} />} />
            </TouchableOpacity>
            <TouchableOpacity disabled={true} onPress={() => { setStock(true) }}>
                <CustomTextInput editable={false} text={'Anbara'} width={'100%'} value={sale.StockName} end={true} endText={<AntDesign name='right' size={15} />} />
            </TouchableOpacity>
            <View style={{ flex: 1, width: '100%' }}>
                <FlatList data={sale.Positions} renderItem={({ item, index }) => (
                    <PositionsList ds={true} type={'Sale'} key={item.Id} pageName={'Demand'} location={"documentEditModal"} setButton={setSaveButton} element={item} setState={setSale} state={sale} index={index} name={item.Name} barcode={`${item.BarCode}`} totalPrice={ConvertFixedTable(Number(ConvertFixedTable(item.Price)) * Number(ConvertFixedTable(item.Quantity)))} priceandquantity={`${ConvertFixedTable(Number(item.Quantity))} əd x ${ConvertFixedTable(Number(item.Price))}`} navigation={navigation} />
                )} />
            </View>
        </View>
    )
}

export default SaleDocumentPage

const styles = StyleSheet.create({})