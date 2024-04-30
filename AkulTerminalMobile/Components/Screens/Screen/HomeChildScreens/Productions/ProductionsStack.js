import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CustomColors from '../../../../../Global/Colors/CustomColors';
import { TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Productions from './Screens/Productions';
import Production from './Screens/Production';
import DocumentEditModal from '../../../../../Global/Components/Modals/DocumentEditModal';
import ItemEditable from './Screens/Comps/ItemEditable';
import ItemScanner from './Screens/Comps/ItemScanner';
import ItemAddProducts from './Screens/Comps/ItemAddProducts';
import ItemEditableCom from './Screens/Comps/ItemEditableCom';
import ItemEditableNew from './Screens/Comps/ItemEditableNew';
import ItemEditableComNew from './Screens/Comps/ItemEditableComNew';
import ItemAddCompositions from './Screens/Comps/ItemAddCompositions';

const Stack = createNativeStackNavigator();

const ProductionsStack = () => {
  

  return (
    <>
      <Stack.Navigator screenOptions={{
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerTintColor: CustomColors("dark").greyV2

      }}>
        <Stack.Screen options={{
          title: "İstehsalatlar"
        }} name='productions' component={Productions} />
        <Stack.Screen options={{
          title: "İstehsalat",
        }} name='production' component={Production} />
        <Stack.Screen options={{
          title: "Məhsul"
        }} name='itemEditable' component={ItemEditable} />
        <Stack.Screen options={{
          title: "Tərkib"
        }} name='itemEditableCom' component={ItemEditableCom} />
        <Stack.Screen options={{
          title: "Məhsul"
        }} name='itemEditableNew' component={ItemEditableNew} />
        <Stack.Screen options={{
          title: "Tərkib"
        }} name='itemEditableComNew' component={ItemEditableComNew} />
        <Stack.Screen options={{
          title: "İstehsalat"
        }} name='itemScanner' component={ItemScanner} />
        <Stack.Screen options={{
          title: "Məhsullar"
        }} name='addProduct' component={ItemAddProducts} />
        <Stack.Screen options={{
          title: "Tərkiblər"
        }} name='addComposition' component={ItemAddCompositions} />
      </Stack.Navigator>
    </>
  )
}

export default ProductionsStack

const styles = StyleSheet.create({})