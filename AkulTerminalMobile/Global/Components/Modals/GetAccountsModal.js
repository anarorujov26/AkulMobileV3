import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import getAccountList from '../getAccountList'
import CustomColors from '../../Colors/CustomColors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const GetAccountsModal = ({ modalVisible, setModalVisible, setLogin, setPassword }) => {

    const [accounts, setAccounts] = useState([]);

    const getData = async () => {
        const accounts = await getAccountList();
        setAccounts(accounts)
    }

    useEffect(() => {
        if (modalVisible) {
            getData();
        }
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
                setModalVisible(false);
            }} style={styles.centeredView}>
                <TouchableOpacity onPress={() => { }} activeOpacity={1} style={styles.modalView}>
                    {
                        accounts[0] ?

                            <ScrollView>
                                <View style={styles.listContainer}>
                                    {
                                        accounts.map((element, index) => (
                                            <TouchableOpacity key={element.password} style={styles.item} onPress={() => {
                                                setLogin(element.login);
                                                setPassword(element.password);
                                                setModalVisible(false)
                                            }}>
                                                <View style={styles.firstItem}>
                                                    <View style={styles.avatar}>
                                                        <AntDesign name='user' size={20} color='black'/>
                                                    </View>
                                                </View>
                                                <View style={styles.endItem}>
                                                    <Text style={styles.text}>{element.login}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    }
                                    <TouchableOpacity onPress={()=>{
                                        setModalVisible(false);
                                    }} style={styles.other}>
                                        <Text style={styles.otherText}>Başqa bir hesaba giriş et</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                            :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size={50} color={CustomColors("dark").primary} />
                            </View>
                    }
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}

export default GetAccountsModal

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
        padding: 10,
        paddingTop: 20,
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
        width: '100%',
        height: '100%',
    },
    listContainer: {
        width:'100%',
        padding:10,
    },
    item: {
        flexDirection:'row',
        width: '100%',
        marginBottom: 10,
        elevation:10,
        backgroundColor:'white',
        padding:10,
        borderRadius:10
    },
    firstItem:{
        width:'20%',
        justifyContent:'center',
        alignItems:'center'
    },
    avatar:{
        backgroundColor:"#ececec",
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50
    },
    endItem:{
        width:'80%',
        justifyContent:'center',
    },
    text:{
        color:"black"
    },
    other:{
        width:"100%",
        borderWidth:1,
        padding:10,
        borderRadius:20,
        alignItems:'center',
        borderColor:CustomColors("dark").greyV2
    },
    otherText:{
        color:CustomColors("dark").grey
    }
})