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
    const [info, setInfo] = useState(null);

    const purchasedDocTypes = [
        'Return',
        'PaymentIn',
        'Supply',
        'InvoiceIn',
        'CreditPayIn',
        'DemandReturn',
        'Intermediaries',
    ]
    const givenDocTypes = [
        'Demand',
        'Sale',
        'PaymentOut',
        'SupplyReturn',
        'InvoiceOut',
        'CreditPayOut',
        'Mediary',
    ]

    const getInfo = async () => {
        let totalDebtt = 0;
        const result = await Api('documents/get.php', {
            cus: id,
            moment: "",
            pg: 0,
            token: await AsyncStorage.getItem('token')
        })

        const totalDebt = await Api("customers/getdata.php", {
            id: id,
            token: await AsyncStorage.getItem("token")
        })
        if (totalDebt.data.Headers.ResponseStatus !== "0") {
            alert(totalDebt.data.Body);
        } else {
            totalDebtt = ConvertFixedTable(totalDebt.data.Body.Debt);
        }

        if (result.data.Headers.ResponseStatus !== "0") {
            alert(result.data.Body)
        } else {
            calculationDebt(totalDebtt, result.data.Body.List);
            let o = { ...result.data.Body }
            o.TotalDebt = totalDebtt
            setInfo(o);
        }
    }

    const calculationDebt = (totalDebt, debts) => {
        let data = [...debts];
        for (let i = 0; i < data.length; i++) {
            if (purchasedDocTypes.indexOf(data[i].DocType) !== -1) {
                data[i].TYPE = "purchase"
            } else {
                data[i].TYPE = "given"
            }
        }

        data[0].AllDebt = totalDebt;

        data.forEach((element, index) => {
            if (index + 1 < data.length - 1) {
                if (element.TYPE == "purchase" || element.TYPE == "Return") {
                    data[index + 1].AllDebt = element.AllDebt + ConvertFixedTable(element.Amount);
                } else {
                    data[index + 1].AllDebt = element.AllDebt - ConvertFixedTable(element.Amount);
                }
            }

            if (index == data.length - 1) {
                let oldData = data[index - 1];
                if (oldData.TYPE == "purchase" || element.TYPE == "Return") {
                    element.AllDebt = oldData.AllDebt + ConvertFixedTable(oldData.Amount);
                } else {
                    element.AllDebt = oldData.AllDebt - ConvertFixedTable(oldData.Amount);
                }
            }
        })
        setDebt(data)
    }

    useEffect(() => {
        getInfo();
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {
                info !== null &&
                <View style={{ alignItems: 'center', backgroundColor: "white" }}>
                    <Text style={{ color: "black", fontSize: 20 }}>{info.CustomerName}</Text>
                </View>
            }
            {
                info !== null &&
                <View>
                    <Text style={{ padding: 5, backgroundColor: 'white', color: "#909090", width: '100%', textAlign: "center" }}>Alınıb {ConvertFixedTable(info.Debits)}₼   |   Verilib {ConvertFixedTable(info.Credits)}₼   |   Yekun Borc {ConvertFixedTable(info.TotalDebt)}₼</Text>
                </View>
            }
            <FlatList data={debt} renderItem={({ item, index }) => (
                <View style={[styles.listContainer, item.TYPE == "purchase" && { backgroundColor: '#bfd6c5' }]}>
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
                        <Text style={styles.name}>{ConvertFixedTable(item.Amount)}</Text>
                        <Text style={styles.price}>{ConvertFixedTable(item.AllDebt)}₼</Text>
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
        backgroundColor: CustomColors("dark").greyV1,
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
        width: '60%',
    },
    listFirsContainer: {
        justifyContent: 'center',
        marginRight: 10
    },
    listCenterContiner: {
        justifyContent: 'center'
    },
    listEndContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        color: CustomColors("dark").connectedPrimary
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
        backgroundColor: CustomColors("dark").primary,
        borderTopStartRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center',
    },
})


export default Debt
