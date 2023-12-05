import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList } from 'react-native'
import { TransactionGlobalContext } from './TransactionGlobalState'
import NewFab from '../../../../../Global/Components/NewFab'
import CustomPrimaryButton from '../../../../../Global/UI/CustomPrimaryButton'
import DocumentSearch from '../../../../../Global/Components/DocumentSearch'
import Api from '../../../../../Global/Components/Api'
import CustomColors from '../../../../../Global/Colors/CustomColors'
import { ConvertFixedTable } from '../../../../../Global/Components/ConvertFixedTable'

const data = [
    {
        name: "Mədaxil",
        apiLC: 'ins'
    },
    {
        name: "Məxaric",
        apiLC: "outs"
    }
]

const Transactions = ({ navigation }) => {

    const { transactionListRender } = useContext(TransactionGlobalContext);
    const [transaction, setTransaction] = useState([]);
    const [search, setSearch] = useState("");
    const [newModal, setNewModal] = useState(false);

    const getTransactions = async () => {
        let obj = {
            dr: 1,
            sr: "Moment",
            pg: 0,
            lm: 100,
            token: await AsyncStorage.getItem("token")
        }
        const result = await Api("transactions/get.php", obj);
        if (result.data.Headers.ResponseStatus !== "0") {
            navigation.goBack();
        }
        if (result.data.Body.List[0]) {
            setTransaction(result.data.Body.List);
        } else {
            setTransaction(null);
        }
    }

    useEffect(() => {
        getTransactions();
    }, [])

    useEffect(() => {
        if (transactionListRender > 0) {
            getTransactions();
        }
    }, [transactionListRender])

    return (

        <View style={{ flex: 1, alignItems: 'center' }}>
            <DocumentSearch
            apiObject={{
                api:"transactions/get.php",
                spendItem:true,
                accounts:true,
                momentFirst:true,
                momentEnd:true,
                customer:true,
                customerName:"Qarşı-tərəf",
                pay:true,
                paydir:true
            }}
                getData={getTransactions} placeholder={'Sənəd nömrəsi ilə axtarış...'} search={search} setSearch={setSearch} setData={setTransaction} apiAdress={'transactions/get.php'} />
            {
                transaction == null ?
                    <View style={{ alignItems: 'center', marginTop: 20, width: '100%' }}>
                        <CustomPrimaryButton text={'Yeniləyin'} width={'80%'} onPress={getTransactions} />
                    </View>
                    :
                    !transaction[0] ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={50} color={CustomColors.primary} />
                        </View>
                        :
                        <FlatList data={transaction} renderItem={({ item, index }) => (

                            <TouchableOpacity style={styles.listContainer} onPress={() => { navigation.navigate('transaction', { id: item.Id, type: item.Direct == "i" ? "ins" : 'outs', link: item.Type == "i" ? 'invoice' : 'payment' }) }}>
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
                                        <Text style={styles.barcode}>{item.Moment}</Text>
                                        <Text style={styles.customerName}>{item.Name}</Text>
                                    </View>
                                </View>
                                <View style={styles.listEndContainer}>
                                    <Text style={styles.price}>{ConvertFixedTable(item.Amount)}₼</Text>
                                </View>
                            </TouchableOpacity>

                        )} />

            }
            <NewFab press={() => {
                setNewModal(true)
            }} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={newModal}
                onRequestClose={() => {
                    setNewModal(!newModal);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.center}>
                            <View style={styles.header}>
                                <Text style={{ fontSize: 30, color: "white", fontWeight: 'bold', textAlign: 'center' }}>{'Ödəniş tipi'}</Text>
                            </View>
                            <FlatList data={data} renderItem={({ item, index }) => (
                                <>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('transaction', { id: null, type: item.apiLC, link: null })
                                        setNewModal(false);
                                    }} style={styles.listItem}>
                                        <Text style={styles.itemText}>{item.name}</Text>
                                    </TouchableOpacity>
                                    <View style={{ alignItems: 'center' }}>
                                        <View style={styles.straight} />
                                    </View>
                                </>
                            )} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Transactions

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