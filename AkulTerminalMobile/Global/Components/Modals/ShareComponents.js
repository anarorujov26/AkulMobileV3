import { FlatList, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ViewShot from 'react-native-view-shot';
import WebView from 'react-native-webview';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomColors from '../../Colors/CustomColors';
import Share from 'react-native-share'
import RNPrint from 'react-native-print';

const ShareComponents = ({ navigation, route }) => {

  const width = useWindowDimensions();
  const { html } = route.params;

  const ref = useRef();

  const getShare = () => {
    ref.current.capture().then(async (uri) => {
      const shareOptions = {
        title: "Share PNG",
        url: `file://${uri}`,
        type: 'application/png',
      }
      const result = await Share.open(shareOptions);
    })
  }

  const getPrint = async () => {
    await RNPrint.print({
      html: html,
      fileName: 'PrintDocument',
    });

  }

  return (
    <View style={{ flex: 1, }}>
      <ViewShot style={{ flex: 1 }} ref={ref} options={{ fileName: 'screen', format: 'png', quality: 0.9 }}>
        <WebView source={{ html }} style={{ flex: 1 }} />
      </ViewShot>
      <TouchableOpacity onPress={getShare} style={styles.button}>
        <Entypo name='share' size={25} color={'white'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={getPrint} style={styles.buttonPrint}>
        <Entypo name='print' size={25} color={'white'} />
      </TouchableOpacity>
      
    </View>
  )
}

export default ShareComponents

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CustomColors("dark").primary,
    shadowColor: CustomColors("dark").primary,
    elevation: 10
  },
  buttonPrint: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CustomColors("dark").primary,
    shadowColor: CustomColors("dark").primary,
    elevation: 10
  }
})