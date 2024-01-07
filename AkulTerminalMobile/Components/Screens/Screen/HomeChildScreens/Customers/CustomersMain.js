import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CustomersGlobalProvider } from './CustomersGlobalState'
import CustomersStack from './CustomersStack'

const CustomersMain = () => {
  return (
    <CustomersGlobalProvider>
      <CustomersStack />
    </CustomersGlobalProvider>
  )
}

export default CustomersMain

const styles = StyleSheet.create({})