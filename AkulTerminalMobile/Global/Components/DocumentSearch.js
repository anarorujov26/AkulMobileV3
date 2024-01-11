import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import SearchBar from '../UI/SearchBar'
import { useEffect } from 'react'
import Api from './Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useState } from 'react'
import FilterModal from '../FilterModal'

const DocumentSearch = ({ placeholder, getData, search, setSearch, setData, apiAdress, apiObject }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const getSearchData = async () => {
        let obj = {
            dr: 1,
            pg: 0,
            lm: 100,
            docNumber: search,
            token: await AsyncStorage.getItem("token")
        }
        const result = await Api(apiAdress, obj);
        if (result.data.Body.List[0]) {
            setData(result.data.Body.List);
        } else {
            setData(null)
        }
    }


    useEffect(() => {
        let time;
        setData([]);
        if (search == "") {
            getData();
        } else {
            time = setTimeout(() => {
                getSearchData();
            }, 400);
        }

        return () => clearTimeout(time);
    }, [search])

    return (
        <>
            {/* <View style={{ width: '100%', flexDirection: 'row' }}>
                <SearchBar text={placeholder} width={'85%'} vl={search} setVL={setSearch} onChangeText={(e) => {
                    setSearch(e)
                }}
                />
                
            </View> */}
            <TouchableOpacity onPress={() => {
                setModalVisible(true)
            }} style={{ width: "100%", backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name={'filter'} color={'black'} size={25} />
            </TouchableOpacity>
            <FilterModal obj={{
                dr: 1,
                pg: 0,
                lm: 100,
            }} modalVisible={modalVisible} setModalVisible={setModalVisible} setState={setData} {...apiObject} />
        </>
    )
}

export default DocumentSearch

const styles = StyleSheet.create({})