import { ActivityIndicator, Animated, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CustomColors from '../../../../../../Global/Colors/CustomColors';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import BackModal from '../../../../../../Global/Components/Modals/BackModal';
import CustomSuccessSaveButton from '../../../../../../Global/UI/CustomSuccessSaveButton';
import DocumentAmmount from '../../../../../../Global/Components/DocumentAmmount';
import { ConvertFixedTable } from '../../../../../../Global/Components/ConvertFixedTable';
import { ProductionsGlobalContext } from '../ProductionsGlobalState';
import ProductionsAppointment from './ProductionsAppointment/ProductionsAppointment';
import ProductionsProduct from './ProductionsProduct/ProductionsProduct';
import ProductionsComposition from './ProductionsComposition/ProductionsComposition';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../../../../../Global/Components/Api';
import getStockName from './../../../../../../Global/Components/getStockName';
import getOwnerName from '../../../../../../Global/Components/getOwnerName';
import getDepartmentName from './../../../../../../Global/Components/getDepartmentName';
import { CustomToLowerCase } from '../../../../../../Global/Components/CustomToLowerCase';

function MyTabBar({ state, descriptors, navigation, position }) {

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };


          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={[styles.topTabButton, isFocused && { borderBottomWidth: 2, borderColor: CustomColors.primary }]}
            >
              <Text style={{ color: 'black' }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}

      </View>
    </>
  );
}
const Tab = createMaterialTopTabNavigator();

const Production = ({ route, navigation }) => {

  const { id } = route.params
  const {
    production,
    setProduction,
    saveButton,
    setSaveButton,
    productionListRender,
    setProductionListRender,
    compositions,
    setCompositions
  } = useContext(ProductionsGlobalContext);

  const [isLoading, setIsLoading] = useState(false);
  const [dontBackModal, setDontBackModal] = useState(false);

  const getProduction = async (documentId) => {
    if (production != null) {
      setProduction(null)
    }
    let obj = {
      id: documentId,
      token: await AsyncStorage.getItem("token")
    }

    const result = await Api('productions/get.php', obj);
    console.log(result);

    const data = { ...result.data.Body.List[0] };
    if (await getStockName(data.StockFromId) !== null) {
      data.StockFromName = await getStockName(data.StockFromId);
      data.StockToName = await getStockName(data.StockToId);
      data.OwnerName = (await getOwnerName(data.OwnerId))
      data.DepartmentName = await getDepartmentName(data.DepartmentId);
    }
    data.ProductAnswer = true;
    setProduction(data);
    if (result.data.Body.Positions[0]) {
      setCompositions([...result.data.Body.Positions]);
    }
  }

  const getSaveProsessing = async () => {
    setIsLoading(true);
    let pd = { ...production }
    let cm = [...compositions]
    pd.positions = cm;
    let newPd = CustomToLowerCase(pd);
    newPd.token = await AsyncStorage.getItem("token");
    newPd.consumption = parseFloat(newPd.consumption);
    newPd.status = newPd.status == 1 ? true : false
    newPd.isarch = newPd.isarch == 1 ? true : false
    newPd.productquantity = Number(newPd.productquantity);
    newPd.amount = parseFloat(newPd.amount);
    newPd.outsourceservices = [];
    newPd.pieceworks = [];
    if (newPd.productanswer == false) {
      const result = await Api('productions/put.php', newPd);
      console.log(result);
      if (result.data.Headers.ResponseStatus == 0) {
        successAlert();
        setSaveButton(false);
        getProduction(result.data.Body.ResponseService);
      }
    }else{
      alert("Məhsul mütləq əlavə edilməlidir!")
    }
    setIsLoading(false)
  }

  const successAlert = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Əməliyyat uğurla icra olundu!',
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      ToastAndroid.SHORT,
      200,
      50
    )
  }

  const getExit = () => {
    setProduction(null);
    setSaveButton(false);
    navigation.goBack();
  }

  useEffect(() => {
    getProduction(id);
  }, [id])

  useFocusEffect(

    useCallback(() => {
      const onBackPress = async () => {
        navigation.setParams({ shouldGoToSpecificPage: false });
        saveButton ? setDontBackModal(true) : (navigation.goBack(), setProduction(null));
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [saveButton]))

  return (
    production == null ?
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={50} color={CustomColors.primary} />
      </View>
      :
      <>
        <Tab.Navigator initialRouteName='sDocument' key={id} tabBar={props => <MyTabBar {...props} />}>
          <Tab.Screen options={{
            tabBarLabel: "Təyinat"
          }} name='sAppointment' component={ProductionsAppointment} />
          <Tab.Screen options={{
            tabBarLabel: "Məhsul"
          }} name='sDocument' component={ProductionsProduct} />
          <Tab.Screen name='sGetPayment' options={{
            tabBarLabel: "Tərkiblər"
          }} component={ProductionsComposition} />
        </Tab.Navigator>
        {
          saveButton &&
          <View style={{ flex: 1, position: "absolute", bottom: 40, left: 15, right: 15 }}>
            <CustomSuccessSaveButton setIsLoading={setIsLoading} onPress={getSaveProsessing} isLoading={isLoading} disabled={isLoading} width={'100%'} text={'Yadda Saxla'} />
          </View>
        }
        <BackModal modalVisible={dontBackModal} setModalVisible={setDontBackModal} pressExit={getExit} pressContinue={() => { setDontBackModal(false) }} />
      </>
  )
}

export default Production

const styles = StyleSheet.create({
  topTabButton: {
    flex: 1,
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})