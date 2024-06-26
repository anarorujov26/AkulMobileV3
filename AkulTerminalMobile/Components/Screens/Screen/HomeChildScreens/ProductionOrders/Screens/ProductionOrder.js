import { ActivityIndicator, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CustomColors from '../../../../../../Global/Colors/CustomColors';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import BackModal from '../../../../../../Global/Components/Modals/BackModal';
import CustomSuccessSaveButton from '../../../../../../Global/UI/CustomSuccessSaveButton';
import ProductionsAppointment from './ProductionOrdersAppointment/ProductionOrdersAppointment';
import ProductionsProduct from './ProductionOrdersProduct/ProductionOrdersProduct';
import ProductionsComposition from './ProductionOrdersComposition/ProductionOrdersAppointment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../../../../../Global/Components/Api';
import getStockName from './../../../../../../Global/Components/getStockName';
import getOwnerName from '../../../../../../Global/Components/getOwnerName';
import getDepartmentName from './../../../../../../Global/Components/getDepartmentName';
import { CustomToLowerCase } from '../../../../../../Global/Components/CustomToLowerCase';
import moment from 'moment';
import { ProductionOrdersGlobalContext } from '../ProductionOrdersGlobalState';
import CustomPrimaryButton from '../../../../../../Global/UI/CustomPrimaryButton';

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
              style={[styles.topTabButton, isFocused && { borderBottomWidth: 2, borderColor: CustomColors("dark").primary }]}
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

const ProductionOrder = ({ route, navigation }) => {

  const {
    production,
    setProduction,
    saveButton,
    setSaveButton,
    setProductionListRender,
    compositions,
    setCompositions,
    po_id,
    set_po_id
  } = useContext(ProductionOrdersGlobalContext);

  const { id } = route.params
  const [poId, setPoId] = useState(id);

  const [isLoading, setIsLoading] = useState(false);
  const [dontBackModal, setDontBackModal] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const getProduction = async (documentId) => {
    if (documentId == null) {
      let obj = {
        Amount: 0,
        Name: "",
        StockFromId: "",
        StockFromName: "",
        OwnerId: "",
        OwnerName: "",
        Moment: moment().format("YYYY-MM-DD hh:mm:ss"),
        StockToId: "",
        StockToName: "",
        DepartmentId: "",
        DepartmentName: "",
        Status: 0,
        ProductAnswer: false,
        ProductId: 0,
        ProductQuantity: 1,
        IsArch: 0,
        Pieceworks: [],
        Outsourceservices: [],
        Consumption: 0
      }
      let owner = (await getOwnerName(null));
      let depratment = (await getDepartmentName(null));
      obj.OwnerId = owner.Id;
      obj.OwnerName = owner.Name;
      obj.DepartmentId = depratment.Id;
      obj.DepartmentName = depratment.Name
      setProduction(obj);
      setCompositions([]);
    } else {
      if (production != null) {
        setProduction(null)
      }
      let obj = {
        id: documentId,
        token: await AsyncStorage.getItem("token")
      }

      const result = await Api('productionorders/get.php', obj);

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
    if (!Boolean(newPd.productanswer)) {
      alert("Məhsul mütləq olmalıdır!");
    } else {
      if (newPd.stockfromid !== "" && newPd.stocktoid !== "") {
        if (newPd.name == "") {
          const result = await Api('productionorders/newname.php', {
            n: "",
            token: await AsyncStorage.getItem("token")
          })

          newPd.name = result.data.Body.ResponseService
        }

        const result = await Api('productionorders/put.php', newPd);

        if (result.data.Headers.ResponseStatus == 0) {

          successAlert();
          setProductionListRender(rel => rel + 1);
          setSaveButton(false);
          getProduction(result.data.Body.ResponseService);
          setPoId(result.data.Body.ResponseService);
          set_po_id(result.data.Body.ResponseService);
        } else {
          alert(result.data.Body);
        }
      } else {
        alert("Anbarlar əlavə edilməlidir!");
      }

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

  const getProductionProsess = async () => {
    setIsLoading2(true);
    let obj = {
      id: poId,
      token: await AsyncStorage.getItem("token")
    }

    const result = await Api('productionorders/toproduction.php', obj);
    if (result.data.Headers.ResponseStatus == 0) {
      getProduction(poId);
    }

    setIsLoading2(false);
  }

  useEffect(() => {
    getProduction(poId);
    set_po_id(poId);
  }, [poId])


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
        <ActivityIndicator size={50} color={CustomColors("dark").primary} />
      </View>
      :
      <>
        <Tab.Navigator initialRouteName='sDocument' key={poId} tabBar={props => <MyTabBar {...props} />}>
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
          <View style={{ flex: 1, position: "absolute", bottom: 60, left: 15, right: 15 }}>
            <CustomSuccessSaveButton setIsLoading={setIsLoading} onPress={getSaveProsessing} isLoading={isLoading} disabled={isLoading} width={'100%'} text={'Yadda Saxla'} />
          </View>
        }
        {
          po_id !== null && production.OrderStatus !== 4 &&
          <View style={{ flex: 1, position: "absolute", bottom: 10, left: 10, right: 10 }}>
            <CustomPrimaryButton setIsLoading={setIsLoading2} onPress={getProductionProsess} isLoading={isLoading2} disabled={isLoading} width={'100%'} text={'İstehsal'} />
          </View>
        }
        <BackModal modalVisible={dontBackModal} setModalVisible={setDontBackModal} pressExit={getExit} pressContinue={() => { setDontBackModal(false) }} />
      </>
  )
}

export default ProductionOrder

const styles = StyleSheet.create({
  topTabButton: {
    flex: 1,
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})