import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Api from '../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomColors from '../../../../../Global/Colors/CustomColors';
import { ConvertFixedTable } from '../../../../../Global/Components/ConvertFixedTable';
import { Card, WingBlank } from '@ant-design/react-native';

const Shift = ({ route, navigation }) => {

    const { id } = route.params;
    const [shift, setShift] = useState(null);

    const getInfo = async () => {
        const result = await Api('shifts/get.php', {
            id: id,
            token: await AsyncStorage.getItem('token')
        })

        setShift(result.data.Body.List[0]);
    }

    useEffect(() => {
        getInfo();
    }, [])
    return (
        <View style={{ flex: 1,backgroundColor:'white',alignItems:'center'}}>
            {

                shift == null ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={50} color={CustomColors("dark").primary} />
                    </View>
                    :

                    <>
                        <View style={styles.firsContainer}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                                <View>
                                    <Text style={styles.bigText}>Satışlar</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.bigText}>{ConvertFixedTable(shift.SalesAmount)}</Text>
                                    <Text style={styles.bigText}>{shift.Sales} əd</Text>
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }} >
                                <View style={styles.line} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', marginTop: 10 }}>
                                <View>
                                    <Text>Nağd</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text>{ConvertFixedTable(shift.SalesCash)}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', marginTop: 10 }}>
                                <View>
                                    <Text>Nağdsız</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text>{ConvertFixedTable(shift.SalesNonCash)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.firsContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                                <View>
                                    <Text style={styles.bigText}>Qaytarmalar</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.bigText}>{ConvertFixedTable(shift.RetsAmount)}</Text>
                                    <Text style={styles.bigText}>{shift.Rets} əd</Text>
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }} >
                                <View style={styles.line} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', marginTop: 10 }}>
                                <View>
                                    <Text>Nağd</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text>{ConvertFixedTable(shift.RetsCash)}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%', marginTop: 10 }}>
                                <View>
                                    <Text>Nağdsız</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text>{ConvertFixedTable(shift.RetsNonCash)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.firsContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                                <View>
                                    <Text style={styles.bigText}>Kassa mədaxilləri</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.bigText}>{ConvertFixedTable(shift.Cashins)}</Text>
                                    <Text style={styles.bigText}>{shift.CashinsCount} əd</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.firsContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                                <View>
                                    <Text style={styles.bigText}>Kassa məxaricləri</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.bigText}>{ConvertFixedTable(shift.Cashouts)}</Text>
                                    <Text style={styles.bigText}>{shift.CashoutsCount} əd</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.firsContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                                <View>
                                    <Text style={styles.bigText}>Borc mədaxil</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.bigText}>{ConvertFixedTable(shift.CreditPayInsAmount)}</Text>
                                    <Text style={styles.bigText}>{shift.CreditPayIns} əd</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.firsContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                                <View>
                                    <Text style={styles.bigText}>Borc məxaric</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={styles.bigText}>{ConvertFixedTable(shift.CreditPayOutsAmount)}</Text>
                                    <Text style={styles.bigText}>{shift.CreditPayOuts} əd</Text>
                                </View>
                            </View>
                        </View>
                    </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    firsContainer: { backgroundColor: "#ececec", width: '95%', padding: 10, borderRadius: 10, marginTop: 10, alignItems: 'center' },
    bigText: { fontSize: 20, color: 'black' },
    line: {
        width: '95%',
        backgroundColor: "#aac3da",
        borderRadius: 10,
        height: 2,
        marginTop: 10
    }

})

export default Shift