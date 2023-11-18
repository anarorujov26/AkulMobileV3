import { ActivityIndicator, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import moment from 'moment';
import { CatalogsGlobalContext } from '../CatalogsGlobalState';
import CatalogDocumentPage from './CatalogDocument/CatalogDocumentPage';
import CatalogAppointmentPage from './CatalogAppointment/CatalogAppointmentPage';
import Api from '../../../../../../Global/Components/Api';
import { CustomToLowerCase } from './../../../../../../Global/Components/CustomToLowerCase';
import CustomSuccessSaveButton from './../../../../../../Global/UI/CustomSuccessSaveButton';
import BackModal from './../../../../../../Global/Components/Modals/BackModal';
import DocumentAmmount from './../../../../../../Global/Components/DocumentAmmount';
import CustomColors from '../../../../../../Global/Colors/CustomColors';
import { ConvertFixedTable } from './../../../../../../Global/Components/ConvertFixedTable';

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

const Catalog = ({ route, navigation }) => {

  const { id } = route.params
  const { saveButton, catalog, setCatalog, setSaveButton, setCatalogListRender } = useContext(CatalogsGlobalContext)
  const [isLoading, setIsLoading] = useState(false);
  const [dontBackModal, setDontBackModal] = useState(false);

  const getCatalog = async (productId) => {
    if (productId == null) {
      let obj = {
        Name: "",
        DepartmentId: "",
        Moment: moment(new Date()).format("YYYY-MM-DD h:mm:ss"),
        OwnerId: "",
        Modifications: [],
        Positions: [],
        Description: "",
        Consumption: 0,
        Status: 0
      }
      setCatalog(obj);

    } else {
      let obj = {
        id: productId,
        token: await AsyncStorage.getItem('token')
      }
      const result = await Api('catalogs/get.php', obj);
      if (result.data.Headers.ResponseStatus !== "0") {
        navigation.goBack();
      }
      console.log(result);
      setCatalog(result.data.Body.List[0]);
    }
  }

  const getSaveProsessing = async () => {
    4
    if (catalog.DepartmentId == "" || catalog.OwnerId == "") {
      alert("Şöbə və Cavabdeh mütləq seçilməlidir!");
    } else {
      setIsLoading(true);
      let obj = CustomToLowerCase({ ...catalog });
      obj.amount = obj.amount ? Number(obj.amount) : 0;
      obj.status = obj.status == 0 ? false : true
      if (obj.name == "") {
        const result = await Api('catalogs/newname.php', {
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
      const result = await Api('catalogs/put.php', obj);
      if (result.data.Headers.ResponseStatus == "0") {
        setCatalog(null)
        setSaveButton(false)
        successAlert();
        getCatalog(result.data.Body.ResponseService);
        setCatalogListRender(rel => rel + 1);
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

  const getExit = () => {
    setCatalog(null);
    setSaveButton(false);
    navigation.goBack();
  }

  useEffect(() => {
    getCatalog(id);
  }, [id])

  useFocusEffect(

    useCallback(() => {
      const onBackPress = async () => {
        navigation.setParams({ shouldGoToSpecificPage: false });
        saveButton ? setDontBackModal(true) : (navigation.goBack(), setCatalog(null));
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [saveButton]))

  return (
    catalog == null ?
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={50} color={CustomColors.primary} />
      </View>
      :
      <>
        <Tab.Navigator key={id} tabBar={props => <MyTabBar {...props} />}>
          <Tab.Screen options={{
            tabBarLabel: "Sənəd"
          }} name='cDocument' component={CatalogDocumentPage} />
          <Tab.Screen options={{
            tabBarLabel: "Təyinat"
          }} name='cAppointment' component={CatalogAppointmentPage} />
        </Tab.Navigator>
        {
          saveButton &&
          <View style={{ flex: 1, position: "absolute", bottom: 40, left: 15, right: 15 }}>
            <CustomSuccessSaveButton setIsLoading={setIsLoading} onPress={getSaveProsessing} isLoading={isLoading} disabled={isLoading} width={'100%'} text={'Yadda Saxla'} />
          </View>
        }
        <BackModal modalVisible={dontBackModal} setModalVisible={setDontBackModal} pressExit={getExit} pressContinue={() => { setDontBackModal(false) }} />
        {
          catalog.Id &&
          <DocumentAmmount amount={ConvertFixedTable(catalog.Amount)} />
        }
      </>
  )
}

export default Catalog

const styles = StyleSheet.create({
  topTabButton: {
    flex: 1,
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})