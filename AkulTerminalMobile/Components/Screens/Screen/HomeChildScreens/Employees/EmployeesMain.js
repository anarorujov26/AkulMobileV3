import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { EmployeesGlobalProvider } from './EmployeesGlobalState'
import EmployeesStack from './EmployeesStack'

const EmployeesMain = () => {
  return (
    <EmployeesGlobalProvider>
      <EmployeesStack />
    </EmployeesGlobalProvider>
  )
}

export default EmployeesMain

const styles = StyleSheet.create({})