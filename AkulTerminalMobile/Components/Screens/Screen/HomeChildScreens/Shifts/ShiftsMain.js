import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ShiftsGlobalProvider } from './ShiftsGlobalState'
import ShiftsStack from './ShiftsStack'

const ShiftsMain = () => {
  return (
    <ShiftsGlobalProvider>
        <ShiftsStack/>
    </ShiftsGlobalProvider>
  )
}

export default ShiftsMain
