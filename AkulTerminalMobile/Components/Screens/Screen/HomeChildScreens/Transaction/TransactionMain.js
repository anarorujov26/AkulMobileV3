import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TransactionGlobalProvider } from './TransactionGlobalState'
import TransactionStack from './TransactionStack'

const TransactionMain = () => {
  return (
    <TransactionGlobalProvider>
        <TransactionStack/>
    </TransactionGlobalProvider>
  )
}

export default TransactionMain

const styles = StyleSheet.create({})