import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from './Api';
import SearchBar from '../UI/SearchBar';
import CustomPrimaryButton from '../UI/CustomPrimaryButton';
import CustomTextInput from '../UI/CustomTextInput';
import { ConvertFixedTable } from './ConvertFixedTable';
import CustomColors from '../Colors/CustomColors';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import { GlobalContext } from './GlobalState';
import PriceTypeProses from './PriceTypeProses';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import ImageModal from './ImageModal';

const windowWidth = Dimensions.get('window').width;
const cardWidth = windowWidth / 2 - 20;

const InventAddProducts = ({ route, navigation }) => {

    const { location, state, setState, setButton, type } = route.params
    const { prices, listType } = useContext(GlobalContext);
    const [maxPG, setMaxPG] = useState(null);
    const [pg, setPg] = useState(1);
    const [imageModal, setImageModal] = useState(false);
    const [pItem, setPItem] = useState({});

    const [search_value, setSearch_value] = useState("");
    const [products, setProducts] = useState([]);

    const getProductsSearch = async () => {
        let obj = {
            token: await AsyncStorage.getItem("token"),
            fast: search_value,
            stockid: state.StockId,
            moment: moment(state.Moment).format('YYYY-MM-DD HH:mm:ss')

        }
        if (prices.priceId) {
            obj.pricetype = prices.priceId;
        }
        const result = await Api('products/getfast.php', obj)
        if (result.data.Body.List[0]) {
            setProducts(result.data.Body.List);
            let count = result.data.Body.Count;
            let totalPGCount = Math.ceil(count / 30);
            setMaxPG(totalPGCount);
        } else {
            setProducts(null)
        }
    }

    let getModal = (item) => {

        let d = { ...item };
        if (prices.priceId !== null) {
            d.Price = d[PriceTypeProses(prices.priceId)];
        }
        navigation.navigate(location, { data: d, setState, state, type, setButton })
    }

    useEffect(() => {
        getProductsSearch();
    }, [])

    useEffect(() => {
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
                    <Text style={{ marginTop: 50, textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: CustomColors.primary }}>Məhsul axtarın</Text>
                    :
                    products[0] ?
                        <View style={{ flex: 1, width: '100%' }}>
                            <FlatList data={products} renderItem={({ item, index }) => (
                                <TouchableOpacity onLongPress={() => {
                                    item.Pic ?
                                        (
                                            setImageModal(true),
                                            setPItem(item))
                                        :
                                        alert("Bu məhsulda şəkil yoxdur!")
                                }} key={item.Id} style={styles.listContainer} onPress={() => { getModal(item) }}>
                                    <View style={styles.listFirs}>
                                        <View style={styles.listFirsContainer}>
                                            {
                                                item.Pic ?
                                                    <Image style={styles.avatar} source={{ uri: item.Pic }} />
                                                    :
                                                    <View style={[styles.avatar, { backgroundColor: CustomColors.primary }]}>
                                                        <Text style={styles.avatarName}>{item.Name.slice(0, 2)}</Text>
                                                    </View>
                                            }
                                        </View>
                                        <View style={styles.listCenterContiner}>
                                            <Text style={styles.name}>{item.Name}</Text>
                                            <Text style={styles.barcode}>{item.BarCode}</Text>
                                            <Text style={styles.customerName}>{item.CustomerName}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.listEndContainer}>
                                        <Text style={styles.price}>{ConvertFixedTable(Number(type == "Buy" ? item.BuyPrice : prices.priceId == null ? item.Price : item[PriceTypeProses(prices.priceId)]))}₼</Text>
                                        {
                                            item.StockBalance !== null &&
                                            <Text style={styles.stock}>{ConvertFixedTable(Number(item.StockBalance))}</Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                            )}  />
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
                            <ActivityIndicator size={50} color={CustomColors.primary} />
                        </View>
            }
            <ImageModal imageModal={imageModal} setImageModal={setImageModal} name={pItem.Name} price={pItem.Price} pic={pItem.Pic} />
        </View>
    )
}

export default InventAddProducts

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
        color: 'black',
    },
    name: {
        color: 'black',
        fontWeight: '600'
    },
    barcode: {
        fontSize: 13,
    },
    customerName: {
        color: CustomColors.primary
    },
    price: {
        color: 'black'
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