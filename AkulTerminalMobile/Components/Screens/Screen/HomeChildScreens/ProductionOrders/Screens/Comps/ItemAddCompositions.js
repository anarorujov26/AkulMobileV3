import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {  useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import Api from '../../../../../../../Global/Components/Api';
import SearchBar from '../../../../../../../Global/UI/SearchBar';
import CustomColors from '../../../../../../../Global/Colors/CustomColors';
import CustomTextInput from '../../../../../../../Global/UI/CustomTextInput';
import Item from './Item';
import { ProductionOrdersGlobalContext } from '../../ProductionOrdersGlobalState';

const windowWidth = Dimensions.get('window').width;
const cardWidth = windowWidth / 2 - 20;

const ItemAddCompositions = ({ route, navigation }) => {

    const {
        production,
        setProduction,
        saveButton,
        setSaveButton,
        productionListRender,
        setProductionListRender,
        compositions,
        setCompositions
      } = useContext(ProductionOrdersGlobalContext);


    const [search_value, setSearch_value] = useState();
    const [products, setProducts] = useState(null);
    const [maxPG, setMaxPG] = useState(null);
    const [pg, setPg] = useState(1)

    const getProductsSearch = async () => {

        let obj = {
            ar: 0,
            dr: 1,
            fast: search_value,
            gp: "",
            lm: 30,
            pg: pg - 1,
            token: await AsyncStorage.getItem('token')
        }

        const result = await Api('products/getfast.php', obj);

        if (result.data.Body.List[0]) {
            setProducts(result.data.Body.List);
            let count = result.data.Body.Count;
            let totalPGCount = Math.ceil(count / 30);
            setMaxPG(totalPGCount);
        } else {
            setProducts(null)
        }
    }


    useEffect(() => {
        getProductsSearch();
    }, [])

    useEffect(() => {
        setPg(1);
        let timer = setTimeout(() => {
            getProductsSearch();
        }, 500);
        return () => clearTimeout(timer);
    }, [search_value])

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <SearchBar width={'100%'} text={'Axtarış'} onChangeText={(e) => { setSearch_value(e) }} placeholder={'...'} vl={search_value} setVL={setSearch_value} />
            {
                products == null ?
                    <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={50} color={CustomColors("dark").primary} />
                    </View>
                    :
                    products[0] ?
                        <View style={{ flex: 1, width: '100%' }}>
                            <FlatList data={products} renderItem={({ item, index }) => (
                                <Item navigation={navigation} location="itemEditableComNew" data={compositions} setData={setCompositions} item={item} name={item.Name} barcode={item.BarCode} />
                            )} />

                            <CustomTextInput keyboardType={"numeric"} text={`${maxPG}/${pg}`} width={'100%'} value={String(pg)} onSubmitEditing={() => {
                                if (maxPG < pg || 1 > pg) {
                                    alert('Yazdığınız hissə mövcut deyil!')
                                } else {
                                    getProductsSearch();
                                }
                            }} onChangeText={(e) => {
                                setPg(e);
                            }} placeholder={'...'} addStyle={{ borderRadius: 0 }} />
                        </View>
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={50} color={CustomColors("dark").primary} />
                        </View>
            }
        </View>
    )
}

export default ItemAddCompositions

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dcdcdc',
    },
    listContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        marginTop: 3
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
        color: 'white',
    },
    name: {
        color: 'black',
        fontWeight: '600',
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
    container: {
        paddingTop: 50,
        paddingHorizontal: 10,
    },
    card: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    image: {
        width: cardWidth,
        height: cardWidth,
        resizeMode: 'cover',
    },
    text: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        bottom: 0,
        paddingLeft: 5
    }
})