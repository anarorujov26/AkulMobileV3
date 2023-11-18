import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { InventGlobalProvider } from './InventGlobalState';
import InventStack from './InventStack';

const InventMain = () => {
  return (
    <InventGlobalProvider>
      <InventStack/>
    </InventGlobalProvider>
  )
}

export default InventMain

const styles = StyleSheet.create({})