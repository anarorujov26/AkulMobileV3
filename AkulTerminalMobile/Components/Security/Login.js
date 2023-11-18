import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GlobalContext } from '../../Global/Components/GlobalState';
import React, { useContext, useEffect, useState } from 'react'
import BackGround from '../../Images/background.png'
import CustomTextInput from './../../Global/UI/CustomTextInput';
import CustomPrimaryButton from './../../Global/UI/CustomPrimaryButton';
import axios from 'axios';
import StackScreens from './../Screens/StackScreens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Global/Components/Api';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import CustomColors from '../../Global/Colors/CustomColors';
import OrdersMain from '../Orders/OrdersMain';

const Login = () => {

  const { setPrefix, loginTYPE, setLoginTYPE } = useContext(GlobalContext);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [answer, setAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getLoginTypeTrue = async () => {

    setIsLoading(true)

    const result = await Api('pos/pos_getlogin.php', {
      login: login,
      password: password
    })

    if (result.data.Headers.ResponseStatus == "0") {
      await AsyncStorage.setItem("apiLocation", result.data.Body.PublicMode)
      await AsyncStorage.setItem("login", login);
      setAnswer(true);
      await AsyncStorage.setItem('token', result.data.Body.Token);
      await AsyncStorage.setItem("pricesType", JSON.stringify({
        priceName: "Satış qiyməti",
        priceId: null
      }))
      await AsyncStorage.setItem("sli", result.data.Body.RetailStoreId);
    } else {
      alert(result.data.Body)
    }
    setIsLoading(false);
  }

  const getLogin = async () => {
    setIsLoading(true)

    const result = await axios.post('https://api.akul.az/1.0/dev/login/send.php', {
      Login: login,
      Password: password
    })

    if (result.data.Headers.ResponseStatus == "0") {
      await AsyncStorage.setItem("apiLocation", result.data.Body.PublicMode)
      await AsyncStorage.setItem("login", login);
      const a = await Api('constants/get.php', {
        token: result.data.Body.Token
      })
      setPrefix(Number(a.data.Body.WeightPrefix));
      setAnswer(true);
      await AsyncStorage.setItem('token', result.data.Body.Token);
      await AsyncStorage.setItem("pricesType", JSON.stringify({
        priceName: "Satış qiyməti",
        priceId: null
      }))
    } else {
      alert(result.data.Body)
    }
    setIsLoading(false);
  }

  const getClick = async () => {
    setLoginTYPE(!loginTYPE)
    await AsyncStorage.setItem('type', JSON.stringify(!loginTYPE))
  }

  const getStartClick = async () => {
    setLoginTYPE(false);
    await AsyncStorage.setItem('type', JSON.stringify(false))
  }

  useEffect(() => {
    getStartClick();
  }, [])

  if (answer) {
    return loginTYPE ? <OrdersMain /> : <StackScreens />
  }

  return (
    <ImageBackground source={BackGround} style={styles.container}>
      <TouchableOpacity onPress={getClick} style={styles.loginTypeContainer}>
        <View style={styles.loginTypeContainerLeft}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: CustomColors.primary
          }}>{loginTYPE ? "Sifariş" : "Terminal"}</Text>
        </View>
        <View style={styles.loginTypeContainerRight}>
          <FontAwesome5 name='exchange-alt' size={20} color={CustomColors.primary} />
        </View>
      </TouchableOpacity>

      <CustomTextInput width={'80%'} text={'Login'} addStyle={{ shadowColor: 'black', elevation: 5 }} value={login} onChangeText={(e) => { setLogin(e) }} />
      <View style={{ margin: 10 }} />
      <CustomTextInput secureTextEntry={true} width={'80%'} text={'Şifrə'} addStyle={{ shadowColor: "black", elevation: 5 }} value={password} onChangeText={(e) => { setPassword(e) }} />
      <View style={{ margin: 10 }} />
      <CustomPrimaryButton disabled={isLoading} isLoading={isLoading} width={'80%'} onPress={() => {
        if (loginTYPE) {
          getLoginTypeTrue();
        } else {
          getLogin();
        }
      }} text={'Daxil ol'} />
    </ImageBackground>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginTypeContainer: {
    flexDirection: "row",
    width: '50%',
    backgroundColor: 'white',
    height: 50,
    borderRadius: 5,
    marginBottom: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: CustomColors.primary
  },
  loginTypeContainerLeft: {
    width: '80%',
    justifyContent: 'center',
    paddingLeft: 5
  },
  loginTypeContainerRight: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
})