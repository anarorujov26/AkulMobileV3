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
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DocumentorderList from '../../../Global/UI/DocumentOrderList';

const Orders = ({ navigation }) => {
    const { ordersListRender } = useContext(OrdersGlobalContext);
    const [orders, setOrders] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const getOrders = async () => {
        let obj = {
            token: await AsyncStorage.getItem("token")
        }
        const result = await Api("tmpsales/get.php", obj);
        console.log(result);
        if (result.data.Headers.ResponseStatus == "0") {
            if (result.data.Body.List[0]) {
                setOrders(result.data.Body.List);
            } else {
                setOrders(null);
            }
        } else {
            alert(result.data.Body);
            setOrders(null)
        }
        if (isRefresh) {
            setIsRefresh(false);
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
                        <CustomPrimaryButton text={'Yeniləyin'} width={'80%'} onPress={getOrders} />
                    </View>
                    :
                    !orders[0] ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={50} color={CustomColors.primary} />
                        </View>
                        :
                        <FlatList refreshing={isRefresh} onRefresh={getOrders} data={orders} renderItem={({ item, index }) => (
                            <DocumentorderList key={item.Id} index={<FontAwesome name={item.Accept == 1 ? 'circle' : 'circle-o'} color={item.Accept == 1 ? CustomColors.success : CustomColors.danger} size={25}/>} customername={item.CustomerName} moment={item.Moment} name={item.Name} navigation={navigation} location={'order'} id={item.Id} amount={ConvertFixedTable(Number(item.Amount))} />
                        )} />
            }
            <NewFab press={() => {
                navigation.navigate('order', { id: null })
            }} />
        </View>
    )
}
export default Orders
const styles = StyleSheet.create({})