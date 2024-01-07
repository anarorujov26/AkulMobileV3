import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment'
import Api from '../Components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'

let data = [
  {
    name: "Bu gün",
    type: "today"
  },
  {
    name: "Dünən",
    type: "yesterday"
  },
  {
    name: "Bu ay",
    type: "thismonth",
  },
  {
    name: "Müddətsiz",
    type: "indefinetly"
  }
]

const DocumentDateFilter = ({ info, api, obj, body, setBody }) => {

  const [active, setActive] = useState(() => {
    let newData = [...data]
    newData.forEach((element, index) => {
      element.answer = false;
    })
    return newData
  });

  const getInfo = async (type) => {

    let apiO = { ...obj };

    switch (type) {
      case 'today':
        apiO.momb = moment().startOf('day').format("YYYY-MM-DD H:mm:ss")
        apiO.mome = moment().endOf('day').format("YYYY-MM-DD H:mm:ss")
        break;
      case 'yesterday':
        apiO.momb = moment(new Date()).format(`YYYY-MM-${new Date().getDate() - 1} 0:00:00`)
        apiO.mome = moment(new Date()).format(`YYYY-MM-${new Date().getDate() - 1} 23:59:59`)
        break;
      case 'thismonth':
        apiO.momb = moment().startOf('month').format('YYYY-MM-DD H:mm:ss');
        apiO.mome = moment().endOf('month').format('YYYY-MM-DD H:mm:ss');
        break;
      case 'indefinetly':
        delete apiO.momb
        delete apiO.mome
        break;
    }

    apiO.token = await AsyncStorage.getItem('token')
    info([]);
    let infoApi = await Api(api, apiO);
    if (body) {
      setBody(infoApi.data.Body)
    }
    if (infoApi.data.Headers.ResponseStatus == '0') {
      if (infoApi.data.Body.List[0]) {
        info(infoApi.data.Body.List);
      } else {
        info(null);
      }
    } else {
      alert(infoApi.data.Body);
    }

  }

  return (
    <View style={{ backgroundColor: 'white', width: '100%', height: 50, marginBottom: 2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 5 }}>
      {
        active.map((element, index) => (
          <TouchableOpacity onPress={() => {
            let newData = [...active];
            newData.forEach((element, index) => (
              newData[index].answer = false
            ))

            newData[index].answer = true;
            getInfo(newData[index].type);
            setActive(newData);
          }} key={index + 1} style={element.answer ? styles.activebutton : styles.button}>
            <Text style={element.answer ? styles.activeText : styles.text}>{element.name}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

export default DocumentDateFilter

const styles = StyleSheet.create({
  button: {
    width: 62,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#1677ff',
    backgroundColor: 'white',
  },
  activebutton: {
    width: 62,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#1677ff',
    backgroundColor: '#1677ff',
  },
  text: {
    fontSize: 12,
    color: '#1677ff'
  },
  activeText: {
    fontSize: 12,
    color: 'white'
  }
})