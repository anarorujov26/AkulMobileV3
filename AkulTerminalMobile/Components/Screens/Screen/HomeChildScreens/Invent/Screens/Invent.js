import { ActivityIndicator, Animated, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CustomColors from '../../../../../../Global/Colors/CustomColors';
import InventDocumentPage from './InventDocument/InventDocumentPage';
import InventAppointmentPage from './InventAppointment/InventAppointmentPage';
import { InventGlobalContext } from './../InventGlobalState';
import Api from '../../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentStockBalanceControl from './../../../../../../Global/Components/DocumentStockBalanceControl';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import BackModal from '../../../../../../Global/Components/Modals/BackModal';
import { CustomToLowerCase } from './../../../../../../Global/Components/CustomToLowerCase';
import moment from 'moment';
import CustomSuccessSaveButton from '../../../../../../Global/UI/CustomSuccessSaveButton';
import SubmitButton from './../../../../../../Global/UI/SubmitButton';
import { ConvertFixedTable } from '../../../../../../Global/Components/ConvertFixedTable';
import DocumentAmmount from '../../../../../../Global/Components/DocumentAmmount';
import modificationsGroup from './../../../../../../Global/Components/modificationsGroup';

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

const Invent = ({ route, navigation }) => {

  const { id } = route.params;
  const { invent, setInvent, saveButton, setSaveButton, setInventListRender, missing, setMissing } = useContext(InventGlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [dontBackModal, setDontBackModal] = useState(false);

  const getInvent_Data = async (productId) => {

    if (productId == null) {
      let obj = {
        Name: "",
        Moment: moment(new Date()).format("YYYY-MM-DD h:mm:ss"),
        StockId: null,
        Modifications: [],
        Positions: [],
        Description: "",
        Consumption: 0,
        Status: 0
      }

      setInvent(obj);
    } else {
      let obj = {
        id: productId,
        token: await AsyncStorage.getItem("token"),
      }
      const result = await Api("inventories/get.php", obj);
      if (result.data.Headers.ResponseStatus !== "0") {
        navigation.goBack();
      }

      let product = { ...result.data.Body.List[0] };

      product.Modifications = await modificationsGroup(result.data.Body.List[0].Modifications[0],'inventory');

      const answer = await DocumentStockBalanceControl(product)
      setInvent(answer);
    }


  }

  const getExit = () => {
    setMissing(false);
    navigation.goBack();
    setInvent(null);
    setSaveButton(false)
  }

  const getSaveProsessing = async () => {
    if (invent.StockId == "") {
      alert("Anbar mütləq seçilməlidir!");
    } else {
      setIsLoading(true);
      let obj = CustomToLowerCase({ ...invent });
      if (obj.name == "") {
        const result = await Api('inventories/newname.php', {
          n: "",
          token: await AsyncStorage.getItem("token")
        })
        if (result.data.Headers.ResponseStatus == "0") {
          obj.name = result.data.Body.ResponseService;
        } else {
          alert(result.data.Body);
        }
      }
      obj.token = await AsyncStorage.getItem("token");

      const result = await Api('inventories/put.php', obj);
      if (result.data.Headers.ResponseStatus == "0") {
        setInvent(null)
        setSaveButton(false)
        successAlert();
        getInvent_Data(result.data.Body.ResponseService);
        setInventListRender(rel => rel + 1);
      } else {
        alert(result.data.Body)
      }
      setIsLoading(false)
    }
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

  useEffect(() => {
    getInvent_Data(id)
  }, [id])


  useFocusEffect(

    useCallback(() => {
      const onBackPress = async () => {
        navigation.setParams({ shouldGoToSpecificPage: false });
        saveButton ? setDontBackModal(true) : (navigation.goBack(), setInvent(null), setMissing(false));
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [saveButton]))

  return (
    invent == null ?
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={50} color={CustomColors.primary} />
      </View>
      :
      <>
        <Tab.Navigator key={id} tabBar={props => <MyTabBar {...props} />}>
          <Tab.Screen options={{
            tabBarLabel: "Sənəd"
          }} name='sDocument' component={InventDocumentPage} />
          <Tab.Screen options={{
            tabBarLabel: "Təyinat"
          }} name='sAppointment' component={InventAppointmentPage} />
        </Tab.Navigator>
        {
          saveButton &&
          <View style={invent.Id == null ? { flex: 1, position: "absolute", bottom: 40, left: 15, right: 15 } : { flex: 1, position: "absolute", bottom: 110, left: 15, right: 15 }}>
            <CustomSuccessSaveButton setIsLoading={setIsLoading} onPress={getSaveProsessing} isLoading={isLoading} disabled={isLoading} width={'100%'} text={'Yadda Saxla'} />
          </View>
        }
        {
          invent.Id &&
          <View style={{ alignItems: 'center', width: '100%', padding: 10 }}>
            <SubmitButton id={invent.Id} missing={missing} />
          </View>
        }
        <BackModal modalVisible={dontBackModal} setModalVisible={setDontBackModal} pressExit={getExit} pressContinue={() => { setDontBackModal(false) }} />
        {
          invent.Id &&
          <DocumentAmmount amount={ConvertFixedTable(invent.Amount)} />
        }
      </>
  )
}

export default Invent

const styles = StyleSheet.create({
  topTabButton: {
    flex: 1,
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})