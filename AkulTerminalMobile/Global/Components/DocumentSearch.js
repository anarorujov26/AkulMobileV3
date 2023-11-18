import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from '../UI/SearchBar'
import { useEffect } from 'react'
import Api from './Api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DocumentSearch = ({ placeholder, getData, search, setSearch, setData, apiAdress }) => {

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
        <SearchBar text={placeholder} width={'100%'} vl={search} setVL={setSearch} onChangeText={(e) => {
            setSearch(e)
        }}
        />
    )
}

export default DocumentSearch

const styles = StyleSheet.create({})