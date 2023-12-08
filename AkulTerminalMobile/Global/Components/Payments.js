import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomColors from '../Colors/CustomColors';
import CustomTextInput from '../UI/CustomTextInput';
import { ConvertFixedTable } from './ConvertFixedTable';
import moment from 'moment';
import Api from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Payments = ({ navigation, route }) => {

  const { data } = route.params

  const [paymentType, setPaymentType] = useState(false);

  const getData = async () => {
    let obj = {
      doctype: '',
      id: data.Id,
      token: await AsyncStorage.getItem("token")
    }
    const result = await Api('https://api.akul.az/1.0/online/controllers/links/get.php')

  }

  useEffect(() => {
    getData();
  }, [])

  return (
    data !== null
    &&
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: "white" }}>
      <View style={{ width: '100%', backgroundColor: "#E8E8E8", height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ color: "#B0B0B0", fontSize: 15, fontWeight: 'bold' }}>Mədaxil {paymentType ? 'nağd' : 'nağdsız'}</Text>
        <Switch
          trackColor={{ false: '#767577', true: CustomColors.primary }}
          thumbColor={paymentType ? CustomColors.primaryV2 : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(e) => {
            setPaymentType(e);
          }}
          value={paymentType}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, width: '100%', height: 50, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: "#bcbcbc" }}>
        <Text style={{ color: "#606060", fontWeight: 'bold' }}>Tam ödəniş</Text>
        <Switch
          trackColor={{ false: '#767577', true: CustomColors.primary }}
          thumbColor={paymentType ? CustomColors.primaryV2 : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(e) => {
          }}
          value={false}
        />
      </View>

      <CustomTextInput addStyle={{ marginTop: 1, borderBottomWidth: 0.5, borderColor: "#bcbcbc" }} onChangeText={(e) => { setInput('Name', e) }} value={'600'} text={"Məbləğ"} width={'100%'} />


      <View style={{ marginTop: 40 }}>
        <Text style={{ fontSize: 20, color: '#dcdcdc', fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Əlaqəli sənədlər</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: "black", fontWeight: 'bold' }}>Ad</Text>
          </View>
          <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: "black", fontWeight: 'bold' }}>Məbləğ</Text>
          </View>
          <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: "black", fontWeight: 'bold' }}>Tarix</Text>
          </View>
        </View>
        {
          Data.map((element, index) => (
            <View key={element.Id} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 13 }}>
              <View style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: "black" }}>{element.Name}</Text>
              </View>
              <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: "black" }}>{ConvertFixedTable(element.Amount)}</Text>
              </View>
              <View style={{ width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: "black" }}>{moment(element.Moment).format("YYYY-MM-DD")}</Text>
              </View>
            </View>
          ))
        }
      </View>
    </View>
  )
}

export default Payments

const styles = StyleSheet.create({})