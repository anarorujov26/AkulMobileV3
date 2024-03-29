import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Api from '../Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomColors from '../../Colors/CustomColors'
import { FlatList } from 'react-native'

const AccountsModal = ({ modalVisible, setModalVisible, idType, nameType, state, save }) => {

    const [group, setGroup] = useState([]);

    const getGroups = async () => {
        const result = await Api('cashes/get.php', { token: await AsyncStorage.getItem('token') })
        setGroup(result.data.Body.List)
    }

    useEffect(() => {
        if (modalVisible) {
            getGroups();
        }
    }, [modalVisible])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ margin: 10 }} />
                    <View style={{ width: '100%', height: '90%' }}>
                        <FlatList data={group} renderItem={({ item, index }) => (
                            <TouchableOpacity key={item.Id} style={styles.listContainer} onPress={() => {
                                state(rel => ({ ...rel, [idType]: item.Id }))
                                state(rel => ({ ...rel, [nameType]: item.Name }))
                                if (save) {
                                    save(true);
                                }
                                setModalVisible(false);

                            }}>
                                <View style={styles.listFirs}>
                                    <View style={styles.listFirsContainer}>
                                        <View style={styles.avatar}>
                                            <Text style={styles.avatarName}>{item.Name[0] + item.Name[1]}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.listCenterContiner}>
                                        <Text style={styles.name}>{item.Name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AccountsModal

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
        height: '100%'
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
