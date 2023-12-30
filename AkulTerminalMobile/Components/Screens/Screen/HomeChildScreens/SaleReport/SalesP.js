import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList } from 'react-native'
import CustomPrimaryButton from '../../../../../Global/UI/CustomPrimaryButton'
import Api from '../../../../../Global/Components/Api'
import CustomColors from '../../../../../Global/Colors/CustomColors'
import { ConvertFixedTable } from '../../../../../Global/Components/ConvertFixedTable'
import DocumentList from '../../../../../Global/UI/DocumentList'
import DocumentSearch from '../../../../../Global/Components/DocumentSearch'
import DocumentDateFilter from '../../../../../Global/UI/DocumentDateFilter'

const SalesP = ({ navigation }) => {

    const [sales, setSales] = useState([]);
    const [summa, setSumma] = useState();
    const [search, setSearch] = useState("");

    const getSales = async () => {
        let obj = {
            dr: 0,
            sr: "ProductName",
            pg: 0,
            lm: 100,
            token: await AsyncStorage.getItem('token')
        }
        const result = await Api("salereports/get.php", obj);
        if (result.data.Headers.ResponseStatus !== "0") {
            navigation.goBack();
        }
        setSumma(result.data.Body)
        if (result.data.Body.List[0]) {
            setSales(result.data.Body.List);
        } else {
            setSales(null);
        }
    }

    useEffect(() => {
        getSales();
    }, [])

    return (

        <View style={{ flex: 1}}>
            <DocumentDateFilter body={true} setBody={setSumma} info={setSales} api={'salereports/get.php'} obj={{
                dr: 1,
                sr: "Moment",
                pg: 0,
                lm: 100,
            }} />
            <DocumentSearch 
            apiObject={{
                api:"salereports/get.php",
                products:true,
                group:true,
                customer:true,
                customerName:'Müştəri',
                stock:true,
                salePoints:true,
                spendType:true,
                momentFirst:true,
                momentEnd:true,
                supplierName:"Təchizatçı",
                supplier:true
            }}
            getData={getSales} placeholder={'Sənəd nömrəsi ilə axtarış...'} search={search} setSearch={setSearch} setData={setSales} apiAdress={'salereports/get.php'} />
            {
                sales == null ?
                    <View style={{ alignItems: 'center', marginTop: 20, width: '100%'}}>
                        <CustomPrimaryButton text={'Yeniləyin'} width={'80%'} onPress={getSales} />
                    </View>
                    :
                    !sales[0] ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size={50} color={CustomColors.primary} />
                        </View>
                        :
                        <>
                            {
                                search == "" &&
                                <Text style={{ padding: 5, backgroundColor: 'white', color: "#909090", width: '100%', textAlign: "center" }}>Satış {ConvertFixedTable(summa.AllAmount)}₼   |  Qaytarma {ConvertFixedTable(summa.RetAllAmount)}₼  |   Qazanc {ConvertFixedTable(summa.AllProfit)}₼</Text>
                            }
                            <FlatList data={sales} renderItem={({ item, index }) => (
                                <DocumentList pIcon={true} key={item.ProductId} index={index} customername={item.ProductName} moment={<Text>{item.Quantity} əd x {ConvertFixedTable(Number(Number(item.SumPrice) / Number(item.Quantity)))}</Text>} name={item.Name} navigation={navigation} location={'saleP'} id={item.ProductId} amount={<View>
                                    <Text style={{ fontSize: 16, color: 'black', textAlign: 'right' }}>{ConvertFixedTable(Number(item.SumPrice))}</Text>
                                    <Text style={{ fontSize: 13, color: CustomColors.primary, textAlign: 'right' }}>{ConvertFixedTable(item.Profit)}</Text>
                                </View>} />
                            )} />

                        </>

            }
        </View>
    )
}

export default SalesP

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
        width: '100%',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dcdcdc',
    },
    listContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        marginTop: 2
    },
    listFirs: {
        flexDirection: 'row',
        width: '80%',
    },
    listFirsContainer: {
        justifyContent: 'center',
        marginRight: 10
    },
    listCenterContiner: {
        justifyContent: 'center'
    },
    listEndContainer: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 10
    },
    avatarName: {
        fontSize: 20,
        color: 'black',
    },
    name: {
        color: 'black',
        fontWeight: '600'
    },
    barcode: {
        fontSize: 13,
    },
    customerName: {
        color: CustomColors.connectedPrimary
    },
    price: {
        color: 'black',
    },
    listItem: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        paddingLeft: 20
    },
    straight: {
        width: '90%',
        height: 1,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 20,
        color: 'black',
    },
    center: {
        backgroundColor: 'white'
    },
    header: {
        height: 70, width: '100%',
        backgroundColor: CustomColors.primary,
        borderTopStartRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center',
    },
})