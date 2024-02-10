import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Api from './Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ConvertFixedTable } from './ConvertFixedTable';
import moment from 'moment';
import CustomColors from '../Colors/CustomColors';

const GetPayments = ({ route, navigation }) => {

  let { id, type } = route.params;

  const [data, setData] = useState([]);

  const getData = async () => {
    if(id !== null){
      if (data[0]) {
        setData([])
      }
      let obj = {
        doctype: type,
        id: id,
        token: await AsyncStorage.getItem("token")
      }
      const result = await Api('links/get.php', obj)
      if (result.data.Body.List[0]) {
        setData(result.data.Body.List);
      } else {
        setData(null);
      }
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  return (
    id == null ?
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:CustomColors.primary,fontWeight:'bold',fontSize:20,}}>Sənət yaradılmayıb!</Text>
    </View>
    :
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {
        data == null ?
          <Text style={{ textAlign: 'center', color: CustomColors.primary, marginTop: 10, fontWeight: 'bold' }}>Ödəmə yoxdur!</Text>
          :
          data[0] ?

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
                data.map((element, index) => (
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
            :

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={50} color={CustomColors.primary} />
            </View>
      }
    </View>
  )
}

export default GetPayments

const styles = StyleSheet.create({})