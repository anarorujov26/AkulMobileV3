import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const ProductSC = ({ navigation, route }) => {

  const { setVL } = route.params;

  const getProduct = async (data) => {
    setVL(data);
    navigation.goBack();
  }

  return (
    <QRCodeScanner
      onRead={({ type, data, rawData }) => {
        getProduct(data);
      }}
      cameraStyle={{
        height: '100%'
      }}
      markerStyle={{
        width: 350,
        height: 200,
        borderWidth: 2,
        borderStyle: "dashed",
        borderRadius: 2
      }}
      showMarker={true}
      flashMode={RNCamera.Constants.FlashMode.torch}
    />
  )
}

export default ProductSC

const styles = StyleSheet.create({})