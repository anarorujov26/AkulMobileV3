import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CustomColors from '../../../Global/Colors/CustomColors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import Api from '../../../Global/Components/Api';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Version from '../../../Version.js'
import CustomTextInput from '../../../Global/UI/CustomTextInput';
import { GlobalContext } from '../../../Global/Components/GlobalState';
import CustomPrimarySaveButton from '../../../Global/UI/CustomPrimarySaveButton';

const Profile = () => {

  const { listType, setListType } = useContext(GlobalContext);
  const [saveButton, setSaveButton] = useState(false)
  const [measurement, setMeasurement] = useState(0);

  const [infoData, setInfoData] = useState(null);
  const [login, setLogin] = useState("");

  const getEXIT = async () => {
    await AsyncStorage.removeItem('token');
    RNRestart.Restart();
  }

  const getProfileInfo = async () => {
    setMeasurement(listType)
    if (await AsyncStorage.getItem("login") !== null) {
      setLogin(await AsyncStorage.getItem("login"))
    }
    const result = await Api('company/get.php', {
      token: await AsyncStorage.getItem('token')
    })
    let obj = result.data.Body
    const resultCash = await Api('notifications/get.php', {
      token: await AsyncStorage.getItem('token')
    })
    obj.CashBalance = resultCash.data.Body.AccountBalance;
    setInfoData(obj);
  }

  const getListClick = async () => {
    if (listType == 1) {
      setListType(2);
      await AsyncStorage.setItem("lt", '2');
    } else {
      setListType(1);
      await AsyncStorage.setItem("lt", '1');
    }
  }

  const getListInput = async (e) => {
    setMeasurement(e);
    setSaveButton(true)
  }

  const getSave = async () => {
    if (measurement < 1) {
      alert("Bu sayda ölçü yoxdur!")
    } else {
      setListType(measurement);
      setSaveButton(false);
      await AsyncStorage.setItem("lt", measurement);
    }
  }

  useEffect(() => {
    getProfileInfo();
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={styles.container}>
        {
          infoData === null ?
            <View style={{ padding: 10 }}>
              <ActivityIndicator color={CustomColors.primary} size={30} />
            </View>
            :
            <View style={styles.containerr}>
              <View style={styles.profileFirst}>
                <View style={styles.profileAvatar}>
                  <FontAwesome6 size={25} color={'white'} name='user-large' />
                </View>
              </View>
              <View style={styles.profileEnd}>
                <Text style={{ fontWeight: 'bold', color: 'black' }}>{infoData.CompanyName}</Text>
                <Text>{login}</Text>
              </View>
              <TouchableOpacity onPress={getEXIT} style={styles.profileExit}>
                <Ionicons name='exit-outline' size={20} color={CustomColors.danger} />
              </TouchableOpacity>

            </View>
        }
        {
          infoData !== null &&
          <Text style={{ padding: 10 }}>Balans: {infoData.CashBalance}</Text>
        }
        <TouchableOpacity onPress={getListClick}>
          <CustomTextInput placeholder="..." text={'List tipi'} width={'100%'} value={listType > 1 ? 'Kart' : 'List'} addStyle={{ borderRadius: 5, borderWidth: 1, borderColor: CustomColors.primary }} editable={false} />
        </TouchableOpacity>
        <View style={{ margin: 10 }} />
        {
          listType > 1 &&
          <CustomTextInput placeholder="..." text={'Sıra ölçüsü'} width={'100%'} value={String(measurement)} addStyle={{ borderRadius: 5, borderWidth: 1, borderColor: CustomColors.primary }} onChangeText={getListInput} />
        }
        {
          saveButton &&
          <>
            <View style={{ margin: 20 }} />
            <CustomPrimarySaveButton text={'Yadda Saxla'} width={'100%'} onPress={getSave} />
          </>
        }
      </View>

      <View style={{
        flex: 1,
        justifyContent: 'flex-end',
      }}>
        <Text style={{ fontSize: 20, color: CustomColors.primary, marginBottom: 10 }}>{Version}</Text>
      </View>

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
    shadowColor: "black",
    marginTop: 10,
    padding: 10
  },
  containerr: {
    padding: 10,
    flexDirection: 'row'
  },
  profileAvatar: {
    width: 50,
    height: 50,
    backgroundColor: CustomColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  profileFirst: {
    width: '13%'
  },
  profileEnd: {
    width: '80%',
    justifyContent: 'center',
    marginLeft: 10
  },
  profileExit: {
    width: '7%',
    justifyContent: 'center'
  }
})