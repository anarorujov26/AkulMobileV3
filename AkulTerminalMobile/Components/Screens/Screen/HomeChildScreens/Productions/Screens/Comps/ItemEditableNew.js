import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ToastAndroid } from 'react-native';
import { ConvertFixedTable } from '../../../../../../../Global/Components/ConvertFixedTable';
import CustomPrimaryButton from '../../../../../../../Global/UI/CustomPrimaryButton';
import CustomColors from '../../../../../../../Global/Colors/CustomColors';
import Api from '../../../../../../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductionsGlobalContext } from '../../ProductionsGlobalState';

const ItemEditableNew = ({ route, navigation }) => {

    const { data, setData, item } = route.params;
    const { compositions, setCompositions,
        comEdit,
        setComEdit,
        comClose,
        setComClose,setSaveButton } = useContext(ProductionsGlobalContext);

    const [isLoading, setIsLoading] = useState(false);

    const [product, setProduct] = useState(null);

    const getInfo = async () => {
        let objectData = { ...item };
        objectData.Quantity = 0;
        setProduct(objectData)
    }

    const getSaveInfo = async () => {
        let objectData = data;
        objectData.ProductId = product.Id;
        objectData.ProductName = product.Name;
        objectData.ProductBarCode = product.BarCode;
        objectData.ArtCode = product.ArtCode;
        objectData.Price = product.Price;
        objectData.ProductQuantity = product.Quantity == 0 ? 1 : product.Quantity;
        objectData.ProductAnswer = true;


        if (comClose) {
            const result = await Api('recipes/get.php', {
                productid: objectData.ProductId,
                token: await AsyncStorage.getItem("token")
            })

            if (result.data.Body.List[0]) {
                let getResultObject = { ...result.data.Body.List[0] };

                const getCompositions = await Api('recipes/get.php', {
                    id: getResultObject.Id,
                    token: await AsyncStorage.getItem("token")
                })

                if (getCompositions.data.Body.List[0].Positions[0]) {
                    let positions = [...getCompositions.data.Body.List[0].Positions];
                    let coms = [...compositions];

                    for (let i = 0; i < positions.length; i++) {
                        let index = coms.findIndex(rel => rel.ProductId == positions[i].CompositionId);
                        if (index == -1) {
                            let item = { ...positions[i] };
                            item.ProductId = item.CompositionId;
                            delete item.CompositionId;
                            coms.push(item);
                            setCompositions(coms);
                        } else {
                            coms[index].Quantity = ConvertFixedTable(positions[i].Quantity);
                        }
                    }
                }
            }
        }
        setSaveButton(true);
        setData(objectData);
        navigation.goBack();
        successAlert();
    }

    useEffect(() => {
        getInfo();
    }, [])

    const successAlert = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Əməliyyat uğurla icra olundu!',
            ToastAndroid.CENTER,
            ToastAndroid.BOTTOM,
            ToastAndroid.SHORT,
            200,
            50
        )
    }


    return (
        product == null ?

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color={CustomColors.primary} />
            </View>
            :

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.container}>


                    <View>
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <Text style={styles.name}>{product.Name || product.Name}</Text>
                        </View>


                        <Text style={{ color: 'black', fontSize: 16 }}>{product.BarCode}</Text>


                        <View style={{ alignItems: 'center' }}>
                            <View style={{ width: '100%', height: 1, backgroundColor: 'grey', borderRadius: 10 }} />
                        </View>
                    </View>

                    <View>
                        <Text style={{ color: 'grey', fontSize: 15, textAlign: 'center' }}>{'Miqdar'}</Text>
                        <View style={styles.bottomContainerItem}>
                            <TouchableOpacity onPress={() => { setProduct(rel => ({ ...rel, ['Quantity']: ConvertFixedTable(Number(product.Quantity)) - 1 })); }}>
                                <AntDesign color={CustomColors.primary} size={70} name='minussquare' />
                            </TouchableOpacity>
                            <TextInput keyboardType='numeric' value={String(product.Quantity)} style={[styles.input, { textAlign: 'center', width: '50%' }]} onChangeText={(e) => {
                                setProduct(rel => ({ ...rel, ['Quantity']: e.replace(',', '.') }));
                            }} />
                            <TouchableOpacity onPress={() => { setProduct(rel => ({ ...rel, ['Quantity']: ConvertFixedTable(Number(product.Quantity)) + 1 })); }}>
                                <AntDesign color={CustomColors.primary} size={70} name='plussquare' />
                            </TouchableOpacity>
                        </View>

                        <View style={{ margin: 15 }} />
                        <CustomPrimaryButton disabled={isLoading} isLoading={isLoading} onPress={getSaveInfo} text={'Təsdiq et'} width={'100%'} addStyle={{ borderRadius: 5 }} />
                        <View style={{ margin: 5 }} />
                    </View>
                </View>
            </View>
    )
}

export default ItemEditableNew

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        height: '100%',
        padding: 10,
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        width: '90%',
    },
    bottomContainerItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        backgroundColor: 'white',
        width: 100,
        justifyContent: 'center',
        fontSize: 20,
        height: 60, marginTop: 4,
        borderBottomWidth: 1,
        color: CustomColors.primary
    }
})