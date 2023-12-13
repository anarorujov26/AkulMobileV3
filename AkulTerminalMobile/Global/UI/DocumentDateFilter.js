import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomColors from '../Colors/CustomColors'
import moment from 'moment'

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
    name: "30 gün",
    type: "30day",
  },
  {
    name: "Müddətsiz",
    type: "indefinetly"
  }
]

const DocumentDateFilter = ({ info, api, obj }) => {

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
        apiO.momb = moment(new Date()).format("YYYY-MM-DD 0:00:00")
        apiO.mome = moment(new Date()).format("YYYY-MM-DD 23:59:59")
        break;
      case 'yesterday':
        apiO.momb = moment(new Date()).format(`YYYY-MM-${new Date().getDate() - 1} 0:00:00`)
        apiO.mome = moment(new Date()).format(`YYYY-MM-${new Date().getDate() - 1} 23:59:59`)
        break;
      case 'thismonth':
        break;
      case '30day':
        break;
      case 'indefinetly':
        break;
    }

    console.log(apiO)
  }

  return (
    <View style={{ backgroundColor: 'white', width: '100%', height: 50, marginBottom: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5 }}>
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