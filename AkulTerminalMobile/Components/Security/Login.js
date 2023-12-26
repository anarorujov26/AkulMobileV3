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
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const LoginPage = () => {
  const { setPrefix, loginTYPE } = useContext(GlobalContext);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [answer, setAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getLoginTypeTrue = async () => {

    setIsLoading(true)

    let loginInfo = {
      login: login,
      password: password
    }

    const result = await Api('pos/pos_getlogin.php', loginInfo)

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

  const getStartClick = async () => {
    let publicMode = await AsyncStorage.getItem("apiLocation");
    if (publicMode === null) {
      await AsyncStorage.setItem("apiLocation", "dev")
    }
  }

  useEffect(() => {
    getStartClick();
  }, [])

  if (answer) {
    return loginTYPE ? <OrdersMain /> : <StackScreens />
  }

  return (
    <ImageBackground source={BackGround} style={styles.container}>
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

const ScreensPage = ({
  navigation
}) => {

  const {setLoginTYPE} = useContext(GlobalContext)

  const terminalClick = async () => {
    setLoginTYPE(false)
    await AsyncStorage.setItem('type', JSON.stringify(false))
    navigation.navigate("terminal")
  }

  const orderClick = async () => {
    setLoginTYPE(true)
    await AsyncStorage.setItem('type', JSON.stringify(true))
    navigation.navigate("terminal")
  }

  return (
    <ImageBackground source={BackGround} style={{ flex: 1,width:'100%',height:'100%', justifyContent: 'center', alignItems: 'center' }}>
      <CustomPrimaryButton width={'50%'} text={'Terminal'} onPress={terminalClick} />
      <View style={{ margin: 10 }} />
      <CustomPrimaryButton width={'50%'} text={'Sifariş'} onPress={orderClick} />
    </ImageBackground>
  );
}

const Login = () => {

  return (
    <>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='screens' component={ScreensPage} />
        <Stack.Screen name='terminal' component={LoginPage} />
      </Stack.Navigator>
    </>
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