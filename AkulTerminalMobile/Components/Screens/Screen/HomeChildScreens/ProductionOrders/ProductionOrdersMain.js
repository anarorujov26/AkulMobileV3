import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ProductionOrdersGlobalProvider } from './ProductionOrdersGlobalState'
import ProductionOrdersStack from './ProductionOrdersStack'

const ProductionOrdersMain = () => {
  return (
    <ProductionOrdersGlobalProvider>
        <ProductionOrdersStack/>
    </ProductionOrdersGlobalProvider>
  )
}

export default ProductionOrdersMain

const styles = StyleSheet.create({})