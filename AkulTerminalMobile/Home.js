import { View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Login from './Components/Security/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackScreens from './Components/Screens/StackScreens';
import Api from './Global/Components/Api';
import { GlobalContext } from './Global/Components/GlobalState';
import OrdersMain from './Components/Orders/OrdersMain';
import eventEmitter from './eventEmitter';
import AgainLogin from './AgainLogin';
import { NavigationContainer } from '@react-navigation/native';

const Home = () => {

    const { setPrefix, loginTYPE } = useContext(GlobalContext);
    const [showModal, setShowModal] = useState(false);
    const [token, setToken] = useState("");

    const getToken = async () => {
        let tkn = await AsyncStorage.getItem("token");
        setToken(tkn)
        if (tkn != null) {
            const result = await Api('constants/get.php', {
                token: tkn
            })
            setPrefix(Number(result.data.Body.WeightPrefix));
        }
    }

    useEffect(() => {
        getToken();
    }, [])

    useEffect(() => {
        eventEmitter.on('showModalEvent', () => {
            setShowModal(true);
        });
        return () => {
            eventEmitter.removeListener('showModalEvent');
        };
    }, []);


    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer>
                {
                    token == "" ? "" : token == null ? <Login /> : loginTYPE == null ? '' : loginTYPE ? <OrdersMain /> :

                        <StackScreens />

                }
                {
                    showModal && <AgainLogin showModal={showModal} setShowModal={setShowModal} />
                }
            </NavigationContainer>
        </View>
    )
}

export default Home