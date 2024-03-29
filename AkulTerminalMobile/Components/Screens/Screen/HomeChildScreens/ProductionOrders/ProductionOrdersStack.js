import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CustomColors from '../../../../../Global/Colors/CustomColors';
import ItemEditable from './Screens/Comps/ItemEditable';
import ItemScanner from './Screens/Comps/ItemScanner';
import ItemAddProducts from './Screens/Comps/ItemAddProducts';
import ItemEditableCom from './Screens/Comps/ItemEditableCom';
import ItemEditableNew from './Screens/Comps/ItemEditableNew';
import ItemEditableComNew from './Screens/Comps/ItemEditableComNew';
import ItemAddCompositions from './Screens/Comps/ItemAddCompositions';
import ProductionOrders from './Screens/ProductionOrders';
import ProductionOrder from './Screens/ProductionOrder';


const Stack = createNativeStackNavigator();

const ProductionOrdersStack = () => {

    return (
        <>
            <Stack.Navigator screenOptions={{
                headerTitleAlign: 'center',
                headerBackVisible: false,
                headerTintColor: CustomColors("dark").greyV2
            }}>
                <Stack.Screen options={{
                    title: "İstehsalat sifarişləri"
                }} name='productions' component={ProductionOrders} />
                <Stack.Screen options={{
                    title: "İstehsalat sifarişi",
                }} name='production' component={ProductionOrder} />
                <Stack.Screen options={{
                    title: "Məhsul"
                }} name='itemEditable' component={ItemEditable} />
                <Stack.Screen options={{
                    title: "Tərkib"
                }} name='itemEditableCom' component={ItemEditableCom} />
                <Stack.Screen options={{
                    title: "Məhsul"
                }} name='itemEditableNew' component={ItemEditableNew} />
                <Stack.Screen options={{
                    title: "Tərkib"
                }} name='itemEditableComNew' component={ItemEditableComNew} />
                <Stack.Screen options={{
                    title: "İstehsalat"
                }} name='itemScanner' component={ItemScanner} />
                <Stack.Screen options={{
                    title: "Məhsullar"
                }} name='addProduct' component={ItemAddProducts} />
                <Stack.Screen options={{
                    title: "Tərkiblər"
                }} name='addComposition' component={ItemAddCompositions} />
            </Stack.Navigator>
        </>
    )
}

export default ProductionOrdersStack

const styles = StyleSheet.create({})