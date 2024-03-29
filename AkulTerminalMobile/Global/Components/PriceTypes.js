import { ActivityIndicator, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Api from './Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomColors from '../Colors/CustomColors'

const PriceTypes = ({ modalVisible, setModalVisible, setState, save }) => {

    const [prices, setPrices] = useState([]);

    const getPrices = async () => {
        let obj = { token: await AsyncStorage.getItem("token") }
        const result = await Api('pricetypes/get.php', obj);
        if (result.data.Headers.ResponseStatus === "0") {
            if (result.data.Body.List[0]) {
                setPrices(result.data.Body.List);
            } else {
                setPrices(null)
            }
        } else {
            alert(result.data.Body);
        }
    }

    useEffect(() => {
        if (modalVisible && !prices[0]) getPrices();
    }, [modalVisible])

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <TouchableOpacity activeOpacity={1} onPress={() => {
            }} style={styles.centeredView}>
                <TouchableOpacity disabled={true} style={styles.modalView}>
                    {
                        prices[0] &&
                        <FlatList data={prices} renderItem={({ item, index }) => (
                            <TouchableOpacity key={item.Id} style={styles.listContainer} onPress={() => {
                                setState(rel => {
                                    let data = { ...rel };
                                    data.PriceTypeId = item.Id;
                                    data.PriceTypeName = item.Name;
                                    return data;
                                })
                                setModalVisible(false);
                                save(true);
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
                    }
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}

export default PriceTypes

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        paddingTop: 0,
        paddingBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
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