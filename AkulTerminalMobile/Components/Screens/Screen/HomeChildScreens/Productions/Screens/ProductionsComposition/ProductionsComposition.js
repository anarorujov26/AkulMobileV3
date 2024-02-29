import { FlatList, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { ProductionsGlobalContext } from '../../ProductionsGlobalState'
import DocumentList from '../../../../../../../Global/UI/DocumentList';
import { ConvertFixedTable } from '../../../../../../../Global/Components/ConvertFixedTable';
import CustomPrimaryButton from '../../../../../../../Global/UI/CustomPrimaryButton';
import Item from './../Comps/Item';

const ProductionsComposition = ({ navigation }) => {

    const { compositions, setCompositions, production, setProduction, setSaveButton, comEdit,
        setComEdit, } = useContext(ProductionsGlobalContext);

    const renderCompositions = ({ item, index }) => (
        <Item d={!comEdit} item={item} data={compositions} setData={setCompositions} location="itemEditableCom" navigation={navigation} name={item.Name} barcode={item.BarCode} quantity={item.Quantity} />
    )

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <CustomPrimaryButton disabled={!comEdit} onPress={() => {
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

export default ProductionsComposition

const styles = StyleSheet.create({})