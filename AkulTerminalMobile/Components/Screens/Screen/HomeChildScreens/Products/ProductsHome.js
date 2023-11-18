import { StyleSheet } from 'react-native'
import React from 'react'
import { ProductsGlobalProvider } from './ProductsGlobalState'
import ProductsStack from './ProductsStack';

const ProductsHome = () => {
    return (
        <ProductsGlobalProvider>
            <ProductsStack />
        </ProductsGlobalProvider>
    )
}

export default ProductsHome

const styles = StyleSheet.create({})