import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import Api from './Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import CustomPrimaryButton from '../UI/CustomPrimaryButton'
import { ActivityIndicator } from 'react-native'
import CustomColors from '../Colors/CustomColors'
import { ConvertFixedTable } from './ConvertFixedTable';
import { GlobalContext } from './GlobalState'
import PricePermission from './PricePermission'
import { FlatList } from 'react-native'

const AddPsPriceTypes = ({ route, navigation }) => {

    const { prices, setPrices } = useContext(GlobalContext)
    const [pricePermission, setPricePermission] = useState(true);
    const { data, setData, setButton,addPermission } = route.params;
    const [priceTypes, setPriceTypes] = useState([]);

    const getPriceTypes = async () => {
        setPricePermission(await PricePermission());
        const priceTypes = await Api('pricetypes/get.php', { token: await AsyncStorage.getItem("token") });
        if (priceTypes.data.Body.List[0]) {
            setPriceTypes(priceTypes.data.Body.List);
        } else {
            setPriceTypes(null)
        }
    }

    const getPrice = async (item) => {
        if (pricePermission || addPermission == true) {

            let documentData = { ...data };
            await AsyncStorage.setItem("pricesType", JSON.stringify({ priceId: item.Id, priceName: item.Name }))
            setPrices({ priceId: item.Id, priceName: item.Name });
            
            if (documentData.Positions[0]) {
                let ids = [];
                documentData.Positions.forEach((item) => {
                    ids.push(item.ProductId);
                });
                let obj = {
                    pricetype: item.Id,
                    products: ids,
                    token: await AsyncStorage.getItem("token"),
                }
                const result = await Api('products/getproductsrate.php', obj);
                let pricecTypes = result.data.Body.List
                documentData.Positions.forEach((item, index) => {
                    documentData.Positions[index].Price = 0
                });
                if (result.data.Body.List[0]) {

                    for (let index = 0; index < documentData.Positions.length; index++) {
                        for (let indexP = 0; indexP < pricecTypes.length; indexP++) {
                            if (documentData.Positions[index].ProductId == pricecTypes[indexP].ProductId) {
                                documentData.Positions[index].Price = ConvertFixedTable(Number(pricecTypes[indexP].Price));
                            }
                        }
                    }
                }



            }
            setData(documentData);
            navigation.goBack();
            setButton(true)
        } else {
            alert("Qiymət dəyişməyə icazəniz yoxdur!")
        }
    }

    useEffect(() => {
        getPriceTypes();
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            {
                priceTypes == null ?
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <CustomPrimaryButton text={'Yeniləyin'} width={'80%'} onPress={getPriceTypes} />
                    </View>
                    :
                    !priceTypes[0] ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={50} color={CustomColors("dark").primary} />
                        </View>
                        :

                        <View style={{ width: '100%' }}>
                            <FlatList data={priceTypes} renderItem={({ item, index }) => (
                                <TouchableOpacity key={item.Id} style={styles.listContainer} onPress={() => {
                                    getPrice(item)
                                }}>
                                    <View style={styles.listFirs}>
                                        <View style={styles.listFirsContainer}>
                                            <View style={styles.avatar}>
                                                <Text style={styles.avatarName}>{index + 1}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.listCenterContiner}>
                                            <Text style={styles.name}>{item.Name}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )} />
                        </View>

            }
        </View>
    )
}

export default AddPsPriceTypes

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '100%',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors("dark").connectedPrimary,
    },
    listContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        marginTop: 5
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
    avatarName: {
        fontSize: 20,
        color: 'white',
    },
    name: {
        color: 'black'
    },
})