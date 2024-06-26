import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native';
import CustomColors from '../../Global/Colors/CustomColors';
import Version from '../../Version';
import Api from '../../Global/Components/Api';
import CustomTextInput from '../../Global/UI/CustomTextInput';


const Setting = ({ navigation }) => {

  const [infoData, setInfoData] = useState(null);
  const [emp, setEmp] = useState(null);
  const [login, setLogin] = useState("");
  const [empModal, setEmpModal] = useState(false);

  const getEXIT = async () => {
    await AsyncStorage.removeItem('token');
    RNRestart.Restart();
  }

  const getProfileInfo = async () => {

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
    getEmp();

  }

  const getEmp = async () => {
    if (await AsyncStorage.getItem("emp") !== null) {
      const empData = JSON.parse(await AsyncStorage.getItem("emp"));
      setEmp(empData.empName);
    } else {
      setEmp("");
    }
  }

  const getEMPClick = () => {
    navigation.navigate('employee',{
      component:getEmp
    })
  }

  useEffect(() => {
    getProfileInfo();
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ScrollView style={{ width: '100%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={styles.container}>
            {
              infoData === null ?
                <View style={{ padding: 10 }}>
                  <ActivityIndicator color={CustomColors("dark").primary} size={30} />
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
                    <Ionicons name='exit-outline' size={20} color={CustomColors("dark").danger} />
                  </TouchableOpacity>

                </View>
            }
            {
              infoData !== null &&
              <Text style={{ padding: 10 }}>Balans: {infoData.CashBalance}</Text>
            }
          </View>
          {
            emp !== null &&
            <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity onPress={getEMPClick}>
                <CustomTextInput text={'Əməkdaşlar'} value={emp} width={'95%'} addStyle={{ borderRadius: 5, borderWidth: 1, borderColor: CustomColors("dark").primary }} editable={false} />
              </TouchableOpacity>
            </View>
          }

          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
            <Text style={{ fontSize: 20, color: CustomColors("dark").primary, marginBottom: 10 }}>{Version}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
    shadowColor: "black",
    marginTop: 10,
    padding: 10,
  },
  containerr: {
    padding: 10,
    flexDirection: 'row'
  },
  profileAvatar: {
    width: 50,
    height: 50,
    backgroundColor: CustomColors("dark").primary,
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