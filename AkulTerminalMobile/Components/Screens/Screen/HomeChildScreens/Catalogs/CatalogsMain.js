import { StyleSheet } from 'react-native'
import React from 'react'
import { CatalogsGlobalProvider } from './CatalogsGlobalState';
import CatalogsStack from './CatalogsStack';

const CatalogsMain = () => {
  return (
    <CatalogsGlobalProvider>
      <CatalogsStack />
    </CatalogsGlobalProvider>
  )
}

export default CatalogsMain

const styles = StyleSheet.create({})