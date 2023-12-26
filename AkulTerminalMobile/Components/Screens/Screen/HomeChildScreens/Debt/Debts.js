import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList } from 'react-native'
import CustomPrimaryButton from '../../../../../Global/UI/CustomPrimaryButton'
import Api from '../../../../../Global/Components/Api'
import CustomColors from '../../../../../Global/Colors/CustomColors'
import { ConvertFixedTable } from '../../../../../Global/Components/ConvertFixedTable'
import DocumentSearch from '../../../../../Global/Components/DocumentSearch'
import DocumentDateFilter from '../../../../../Global/UI/DocumentDateFilter'

const Debts = ({ navigation }) => {

    const [debts, setDebts] = useState([]);
    const [summa, setSumma] = useState();
    const [search, setSearch] = useState("");

    const getDebts = async () => {
        let obj = {
            dr: 0,
            sr: "CustomerName",
            pg: 0,
            gp: "",
            lm: 100,
            token: await AsyncStorage.getItem('token')
        }
        const result = await Api("settlements/get.php", obj);
        if (result.data.Headers.ResponseStatus !== "0") {
            navigation.goBack();
        }
        setSumma(result.data.Body)
        if (result.data.Body.List[0]) {
            setDebts(result.data.Body.List);
        } else {
            setDebts(null);
        }
    }

    useEffect(() => {
        getDebts();
    }, [])

    return (

        <View style={{ flex: 1 }}>
            <DocumentDateFilter info={setDebts} api={'settlements/get.php'} obj={{
                dr: 1,
                sr: "Moment",
                pg: 0,
                lm: 100,
            }} />
            <DocumentSearch
            apiObject={{
                api:"settlements/get.php",
                customer:true,
                customerName:"Qarşı-Tərəf",
                group:true,
                owner:true,
                price:true,
                momentFirst:true,
                momentEnd:true,
                zeros:true
            }}
            getData={getDebts} placeholder={'Sənəd nömrəsi ilə axtarış...'} search={search} setSearch={setSearch} setData={setDebts} apiAdress={'settlements/get.php'} />
            {
                debts == null ?
                    <View style={{ alignItems: 'center', marginTop: 20, width: '100%' }}>
                        <CustomPrimaryButton text={'Yeniləyin'} width={'80%'} onPress={getDebts} />
                    </View>
                    :
                    !debts[0] ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={50} color={CustomColors.primary} />
                        </View>
                        :
                        <>
                            {
                                search == "" &&
                                <Text style={{ padding: 5, backgroundColor: 'white', color: "#909090", width: '100%', textAlign: "center" }}>Alacaq {ConvertFixedTable(summa.AllInSum)}₼   |   Verəcək {ConvertFixedTable(summa.AllOutSum)}₼</Text>
                            }
                            <FlatList data={debts} renderItem={({ item, index }) => (

                                <TouchableOpacity style={styles.listContainer} onPress={() => {
                                    navigation.navigate('debt', {
                                        id: item.CustomerId
                                    })
                                }}>
                                    <View style={styles.listFirs}>
                                        <View style={styles.listFirsContainer}>
                                            <View style={styles.avatar}>
                                                <Text style={styles.avatarName}>{index + 1}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.listCenterContiner}>
                                            {
                                                item.CustomerName &&
                                                <Text style={styles.name}>{item.CustomerName}</Text>

                                            }
                                        </View>
                                    </View>
                                    <View style={styles.listEndContainer}>
                                        <Text style={styles.price}>{ConvertFixedTable(item.Amount)}₼</Text>
                                    </View>
                                </TouchableOpacity>

                            )} />
                        </>

            }
        </View>
    )
}

export default Debts

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
        backgroundColor: CustomColors.primary,
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
        color: 'white',
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