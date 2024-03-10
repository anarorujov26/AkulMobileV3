import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Products from './Products';
import Product from './Product';
import ProductSearchScan from './ProductSearchScan';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import ProductsHome from './ProductsHome';
import ShareComponents from '../../../../../Global/Components/Modals/ShareComponents';
import PhotosData from '../../../../../Global/Components/PhotosData';

const ProductsStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerTintColor: CustomColors.greyV2
        }}>
            <Stack.Screen options={{
                title: 'Məhsullar',
            }} name='products' component={Products} />
            <Stack.Screen options={{
                title: 'Məhsullar'
            }} name='product' component={Product} />
            <Stack.Screen options={{
                title: 'Məhsullar'
            }} name='productSearchScan' component={ProductSearchScan} />
            <Stack.Screen options={{
                title: "Share",
            }} name='share' component={ShareComponents} />
            <Stack.Screen options={{
                title:"Galery"
            }} name='galery' component={PhotosData}/>
        </Stack.Navigator>
    )
}

export default ProductsStack

const styles = StyleSheet.create({})