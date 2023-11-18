import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Api from './../Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import CustomPrimarySaveButton from './CustomPrimarySaveButton';

const SubmitButton = ({ id,missing }) => {

  const [isLoading, setIsLoading] = useState(false);

  const getPressDocumentSubmitProcess = async () => {
    setIsLoading(true)
    let obj = {
      id: id,
      token: await AsyncStorage.getItem("token"),
      missing: missing,
    }
    const result = await Api('inventories/implement.php',obj)

    if (result.data.Headers.ResponseStatus == "0") {
      successAlert();
    } else {
      alert(result.data.Body)
    }
    setIsLoading(false)
  }

  const successAlert = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Sənəd uğurla təstiqləndi!',
      ToastAndroid.CENTER,
      ToastAndroid.BOTTOM,
      ToastAndroid.SHORT,
      200,
      50
    )
  }

  return (
    <CustomPrimarySaveButton onPress={getPressDocumentSubmitProcess} text={'Təstiqlə'} width={'98%'} isLoading={isLoading} setIsLoading={setIsLoading} />
  )
}

export default SubmitButton

const styles = StyleSheet.create({})