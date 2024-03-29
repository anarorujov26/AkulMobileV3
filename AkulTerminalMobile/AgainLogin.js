import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import CustomTextInput from './Global/UI/CustomTextInput';
import CustomColors from './Global/Colors/CustomColors';
import { GlobalContext } from './Global/Components/GlobalState';
import Api from './Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AgainLogin = ({ showModal, setShowModal }) => {

    const { loginTYPE, setPrefix, } = useContext(GlobalContext)
    const [isLoading, setIsLoading] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const getPress = () => {
        if (loginTYPE) {
            getLoginOrder();
        } else {
            getLogin();
        }
    }

    const getLoginOrder = async () => {

        setIsLoading(true)

        const result = await Api('pos/pos_getlogin.php', {
            login: login,
            password: password
        })
        
        if (result.data.Headers.ResponseStatus == "0") {
            await AsyncStorage.setItem("apiLocation", result.data.Body.PublicMode)
            await AsyncStorage.setItem("login", login);
            await AsyncStorage.setItem('token', result.data.Body.Token);
            await AsyncStorage.setItem("pricesType", JSON.stringify({
                priceName: "Satış qiyməti",
                priceId: null
            }))
            await AsyncStorage.setItem("sli", result.data.Body.RetailStoreId);
            setShowModal(false);
            successAlert();
        } else {
            alert(result.data.Body)
        }
        setIsLoading(false);
    }

    const getLogin = async () => {

        setIsLoading(true)

        const result = await axios.post('https://api.akul.az/1.0/online/login/send.php', {
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
            await AsyncStorage.setItem('token', result.data.Body.Token);
            await AsyncStorage.setItem("pricesType", JSON.stringify({
                priceName: "Satış qiyməti",
                priceId: null
            }))
            setShowModal(false);
            successAlert();
        } else {
            alert(result.data.Body)
        }
        setIsLoading(false);
    }

    const successAlert = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Əməliyyat uğurla icra olundu!',
            ToastAndroid.CENTER,
            ToastAndroid.BOTTOM,
            ToastAndroid.SHORT,
            200,
            50
        )
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
                setShowModal(!showModal);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTextt}>Sessia bitmişdir!</Text>
                    <Text style={styles.modalText}>Zəhmət olmasa xanaları dolduraraq təkrar daxil olun!</Text>
                    <CustomTextInput value={login} onChangeText={(e) => { setLogin(e) }} text={'Login'} width={'80%'} placeholder={'login...'} addStyle={{ shadowColor: "black", elevation: 5 }} />
                    <View style={{ margin: 10 }} />
                    <CustomTextInput value={password} onChangeText={(e) => { setPassword(e) }} text={'Şifrə'} width={'80%'} placeholder={'şifrə...'} addStyle={{ shadowColor: "black", elevation: 5 }} />
                    <View style={{ margin: 20 }} />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={getPress}>
                        {
                            isLoading ?
                                <ActivityIndicator size={16} color={'white'} />
                                :
                                <Text style={styles.textStyle}>Daxil ol</Text>

                        }
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default AgainLogin

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        width: '100%',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        width: 100,
        alignItems: 'center'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '80%'
    },
    modalText: {
        marginBottom: 30,
        textAlign: 'center',
        color: "black"
    },
    modalTextt: {
        color: 'orange',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
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
        borderColor: CustomColors("dark").primary
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