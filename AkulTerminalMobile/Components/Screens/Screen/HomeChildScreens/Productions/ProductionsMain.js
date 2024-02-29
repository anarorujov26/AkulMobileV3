import { StyleSheet } from 'react-native'
import React from 'react'
import { ProductionsGlobalProvider } from './ProductionsGlobalState'
import ProductionsStack from './ProductionsStack'

const ProductionsMain = () => {
  return (
    <ProductionsGlobalProvider>
      <ProductionsStack/>
    </ProductionsGlobalProvider>
  )
}

export default ProductionsMain

const styles = StyleSheet.create({})