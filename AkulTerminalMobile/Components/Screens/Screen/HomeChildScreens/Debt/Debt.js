import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Api from '../../../../../Global/Components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import { ConvertFixedTable } from '../../../../../Global/Components/ConvertFixedTable';

const Debt = ({ route, navigation }) => {

    const { id } = route.params;
    const [debt, setDebt] = useState(null);

    const getInfo = async () => {
        const result = await Api('documents/get.php', {
            cus: id,
            moment: "",
            pg: 0,
            token: await AsyncStorage.getItem('token')
        })

        if (result.data.Headers.ResponseStatus !== "0") {
            alert(result.data.Body)
        } else {
            setDebt(result.data.Body.List);
        }
    }

    useEffect(() => {
        getInfo();
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <FlatList data={debt} renderItem={({ item, index }) => (

                <View style={styles.listContainer}>
                    <View style={styles.listFirs}>
                        <View style={styles.listFirsContainer}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarName}>{index + 1}</Text>
                            </View>
                        </View>
                        <View style={styles.listCenterContiner}>
                            {
                                item.CustomerName &&
                                <Text style={styles.name}>{item.DocType == "InvoiceIn" ? "Mədaxil nağdsız" : item.DocType == "InvoiceOut" ? 'Məxaric nağdsız' : item.DocType == "PaymentIn" ? 'Mədaxil nağd' : 'Məxaric nağdsız'}</Text>

                            }
                        </View>
                    </View>
                    <View style={styles.listEndContainer}>
                        <Text style={styles.price}>{ConvertFixedTable(item.Amount)}₼</Text>
                    </View>
                </View>

            )} />
        </View>
    )
}

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
        backgroundColor: CustomColors.greyV1,
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


export default Debt
