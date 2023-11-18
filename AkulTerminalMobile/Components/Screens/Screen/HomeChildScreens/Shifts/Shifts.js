import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList } from 'react-native'
import { ShiftsGlobalContext } from './ShiftsGlobalState'
import Api from '../../../../../Global/Components/Api'
import CustomPrimaryButton from '../../../../../Global/UI/CustomPrimaryButton'
import DocumentList from '../../../../../Global/UI/DocumentList'
import CustomColors from '../../../../../Global/Colors/CustomColors'

const Shifts = ({ navigation }) => {

  const { shiftsListRender } = useContext(ShiftsGlobalContext);
  const [shifts, setShifts] = useState([]);

  const getShifts = async () => {
    let obj = {
      dr: 1,
      sr: "Moment",
      pg: 0,
      lm: 100,
      token: await AsyncStorage.getItem("token")
    }
    const result = await Api("shifts/get.php", obj);
    if (result.data.Headers.ResponseStatus !== "0") {
      navigation.goBack();
    }
    if (result.data.Body.List[0]) {
      setShifts(result.data.Body.List);
    } else {
      setShifts(null);
    }
  }

  useEffect(() => {
    getShifts();
  }, [])

  useEffect(() => {
    if (shiftsListRender > 0) {
      getShifts();
    }
  }, [shiftsListRender])

  return (

    <View style={{ flex: 1, alignItems: 'center' }}>
      {
        shifts == null ?
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <CustomPrimaryButton text={'Yeniləyin'} width={'80%'} onPress={getShifts} />
          </View>
          :
          !shifts[0] ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={50} color={CustomColors.primary} />
            </View>
            :
            <FlatList data={shifts} renderItem={({ item, index }) => (
              <DocumentList key={item.Id} index={index} customername={item.SalePointName} pIcon={true} moment={item.OpenMoment} name={item.OpenOwnerName} navigation={navigation} location={'shift'} id={item.Id} amount={item.Status == 1 ? 'Açıqdır' : "Bağlıdır"} />
            )} />
      }
    </View>
  )
}

export default Shifts

const styles = StyleSheet.create({})