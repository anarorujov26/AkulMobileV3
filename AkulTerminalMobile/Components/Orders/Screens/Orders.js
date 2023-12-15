import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { OrdersGlobalContext } from '../OrdersGlobalState';
import CustomPrimaryButton from '../../../Global/UI/CustomPrimaryButton';
import NewFab from '../../../Global/Components/NewFab';
import DocumentList from '../../../Global/UI/DocumentList';
import { ConvertFixedTable } from '../../../Global/Components/ConvertFixedTable';
import Api from '../../../Global/Components/Api';
import CustomColors from '../../../Global/Colors/CustomColors';
import { FlatList } from 'react-native';

const Orders = ({ navigation }) => {

    const { ordersListRender } = useContext(OrdersGlobalContext);
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        let obj = {
            token: await AsyncStorage.getItem("token")
        }
        const result = await Api("tmpsales/get.php", obj);
        if (result.data.Body.List[0]) {
            setOrders(result.data.Body.List);
        } else {
            setOrders(null);
        }
    }

    useEffect(() => {
        getOrders();
    }, [])
    
    useEffect(() => {
        if (ordersListRender > 0) {
            getOrders();
        }
    }, [ordersListRender])

    return (

        <View style={{ flex: 1, alignItems: 'center' }}>
                {
                    orders == null ?
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <CustomPrimaryButton text={'Yeniləyin'} width={'80%'} onPress={getCatalogs} />
                        </View>
                        :
                        !orders[0] ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size={50} color={CustomColors.primary} />
                            </View>
                            :
                            <FlatList data={orders} renderItem={({item,index})=>(
                                <DocumentList key={item.Id} index={index} customername={item.CustomerName} moment={item.Moment} name={item.Name} navigation={navigation} location={'order'} id={item.Id} amount={ConvertFixedTable(Number(item.Amount))} />
                            )}/>
                }
            <NewFab press={() => {
                navigation.navigate('order', { id: null })
            }} />
        </View>
    )
}

export default Orders

const styles = StyleSheet.create({})