import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DashBoardComponents from './../../../../../Global/Components/Modals/DashBoardComponents';
import Api from '../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomColors from '../../../../../Global/Colors/CustomColors';

const Dashboard = () => {

  const [info, setInfo] = useState(null);

  const getInfo = async () => {
    const result = await Api('dashboard/get.php', {
      token: await AsyncStorage.getItem("token")
    });
    if (result.data.Headers.ResponseStatus === "0") {
      setInfo(result.data.Body);
    }
  }

  useEffect(() => {
    getInfo();
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      {
        info === null ? 
        <View style={{flex:1,width:'100%',justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size={50} color={CustomColors("dark").primary}/>
        </View>
        :
          <ScrollView style={{ width: '100%' }} >
            <View style={{ width: '100%', alignItems: 'center' }}>
              <View style={{ margin: 10 }} />
              <DashBoardComponents headerText={'SATIŞLAR'} firstInfo={info.Sales.CurrAmount} endInfo={info.Sales.PrevAmount} />
              <View style={{ margin: 10 }} />
              <DashBoardComponents headerText={'MƏNFƏƏT'} firstInfo={info.Profits.CurrAmount} endInfo={info.Profits.PrevAmount} />
              <View style={{ margin: 10 }} />
              <DashBoardComponents headerText={'BORCLAR'} firstInfo={info.Settlements.Credit} firstText={'Borc (Alacaq):'} endText={'Borc (Verəcək):'} endInfo={info.Settlements.Debt} />
              <View style={{ margin: 10 }} />
              <DashBoardComponents headerText={'ÖDƏNİŞLƏR'} firstInfo={info.Payments.Payins} firstText={'Mədaxil:'} endText={'Məxaric:'}  endInfo={info.Payments.Payouts} />
              <View style={{ margin: 10 }} />
              <DashBoardComponents headerText={'ANBAR QALIĞI'} firstInfo={info.StockedBalance.Amount} firstText={'Maya:'} end={true} />
              <View style={{ margin: 10 }} />
              <DashBoardComponents headerText={'KOMİSYON SATIŞ'} firstInfo={info.Comission.CurrAmount} endInfo={info.Comission.PrevAmount} />
              <View style={{ margin: 10 }} />
              <DashBoardComponents headerText={'SİFARİŞLƏR'} firstText={'Rezerv:'} endText={'Hazırlanıb:'} firstInfo={info.Orders.Reserved} endInfo={info.Orders.Prepared} />
              <View style={{ margin: 10 }} />
              <DashBoardComponents headerText={'KAPİTAL'} firstInfo={info.Capital.Amount} firstText={'Məbləğ:'} end={true} />
              <View style={{ margin: 10 }} />
            </View>
          </ScrollView>
      }
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})