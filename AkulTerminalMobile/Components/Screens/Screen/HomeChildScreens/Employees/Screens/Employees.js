import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Api from '../../../../../../Global/Components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomColors from '../../../../../../Global/Colors/CustomColors'
import CustomPrimaryButton from '../../../../../../Global/UI/CustomPrimaryButton'

const Employees = ({ navigation }) => {

    const [emps, setEmps] = useState([]);

    const getEmps = async () => {
        let obj = {
            token: await AsyncStorage.getItem("token"),
            dr: 0,
            gp: "",
            lm: 100,
            pg: 0,
            sr: "GroupName",
        }
        const result = await Api('employees/get.php', obj)
        if (result.data.Headers.ResponseStatus == "0") {
            setEmps(result.data.Body.List);
        }
    }

    useEffect(() => {
        getEmps();
    }, [])

    return (
        <View style={{ flex: 1 }}>
            {
                emps[0] ?
                    <FlatList
                        data={emps}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={styles.listContainer} onPress={() => { navigation.navigate("emp", { id: item.id }) }}>
                                <View style={styles.listFirs}>
                                    <View style={styles.listFirsContainer}>
                                        <View style={styles.avatar}>
                                            <Text style={styles.avatarName}>{index + 1}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.listCenterContiner}>
                                        <Text style={styles.name}>{item.Name}</Text>
                                        {
                                            item.Barcode &&
                                            <Text style={styles.customerName}>{item.Barcode}</Text>
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    :
                    emps == null ?
                        <View style={{ alignItems: 'center', marginTop: 20, width: '100%' }}>
                            <CustomPrimaryButton text={'Yeniləyin'} width={'80%'} onPress={getEmps} />
                        </View>
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={50} color={CustomColors.primary} />
                        </View>
            }
        </View>
    )
}

export default Employees

const styles = StyleSheet.create({
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
        fontWeight: '600',
        fontSize: 16,
    },
    barcode: {
        fontSize: 13,
    },
    customerName: {
        color: CustomColors.connectedPrimary
    },
    price: {
        color: 'black',
    }
})