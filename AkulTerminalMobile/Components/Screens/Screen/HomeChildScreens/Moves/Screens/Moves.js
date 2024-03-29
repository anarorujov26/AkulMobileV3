import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Api from '../../../../../../Global/Components/Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomColors from '../../../../../../Global/Colors/CustomColors'
import DocumentList from '../../../../../../Global/UI/DocumentList';
import { ConvertFixedTable } from '../../../../../../Global/Components/ConvertFixedTable'
import NewFab from '../../../../../../Global/Components/NewFab';
import CustomPrimaryButton from '../../../../../../Global/UI/CustomPrimaryButton'
import DocumentSearch from '../../../../../../Global/Components/DocumentSearch'
import { FlatList } from 'react-native'
import { MovesGlobalContext } from '../MovesGlobalState'
import DocumentDateFilter from '../../../../../../Global/UI/DocumentDateFilter'
import GetRowProsessing from '../../../../../../Global/Components/GetRowProsessing'

const Moves = ({ navigation }) => {

    const { movesListRender } = useContext(MovesGlobalContext);
    const [moves, setMoves] = useState([]);
    const [search, setSearch] = useState("");

    const getMoves = async () => {
        let obj = {
            dr: 1,
            sr: "Moment",
            pg: 0,
            lm: 100,
            token: await AsyncStorage.getItem("token")
        }
        const result = await Api("moves/get.php", obj);
        if (result.data.Headers.ResponseStatus !== "0") {
            navigation.goBack();
        }
        if (result.data.Body.List[0]) {
            setMoves(result.data.Body.List);
        } else {
            setMoves(null);
        }
    }

    useEffect(() => {
        getMoves();
    }, [])

    useEffect(() => {
        if (movesListRender > 0) {
            getMoves();
        }
    }, [movesListRender])

    return (

        <View style={{ flex: 1, alignItems: 'center' }}>
            <GetRowProsessing
                firstWidth={'90%'}
                firstContent={
                    <DocumentDateFilter info={setMoves} api={'moves/get.php'} obj={{
                        dr: 1,
                        sr: "Moment",
                        pg: 0,
                        lm: 100,
                    }} />

                } endWidth={'10%'} endContent={<DocumentSearch
                    apiObject={{
                        products: true,
                        api: 'moves/get.php',
                        stockFrom: true,
                        stockTo: true,
                        momentFirst: true,
                        momentEnd: true
                    }} getData={getMoves} placeholder={'Sənəd nömrəsi ilə axtarış...'} search={search} setSearch={setSearch} setData={setMoves} apiAdress={'moves/get.php'} />}
            />
            {
                moves == null ?
                    <View style={{ alignItems: 'center', marginTop: 20, width: '100%' }}>
                        <CustomPrimaryButton text={'Yeniləyin'} width={'80%'} onPress={getMoves} />
                    </View>
                    :
                    !moves[0] ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={50} color={CustomColors("dark").primary} />
                        </View>
                        :
                        <FlatList data={moves} renderItem={({ item, index }) => (
                            <DocumentList key={item.Id} index={index} customername={item.CustomerName} moment={item.Moment} name={item.Name} navigation={navigation} location={'demand'} id={item.Id} amount={ConvertFixedTable(Number(item.Amount))} />
                        )} />

            }
            <NewFab press={() => {
                navigation.navigate('demand', { id: null })
            }} />
        </View>
    )
}

export default Moves

const styles = StyleSheet.create({})