import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TransferGlobalProvider } from './TransferGlobalState';
import TransferStack from './TransferStack';

const TransferMain = () => {
  return (
    <TransferGlobalProvider>
      <TransferStack/>
    </TransferGlobalProvider>
  )
}

export default TransferMain