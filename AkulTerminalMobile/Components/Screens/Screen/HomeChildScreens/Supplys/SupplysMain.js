import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SupplysGlobalProvider } from './SupplysGlobaState';
import SupplysStack from './SupplysStack';

const SupplysMain = () => {
  return (
    <SupplysGlobalProvider>
      <SupplysStack />
    </SupplysGlobalProvider>
  )
}

export default SupplysMain

const styles = StyleSheet.create({})