import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomColors from '../../Global/Colors/CustomColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomPrimaryButton from '../../Global/UI/CustomPrimaryButton';
import CustomTextInput from '../../Global/UI/CustomTextInput';
import RetioDiscount from '../../Global/Components/RetioDiscount';
import EnteredDiscount from '../../Global/Components/EnteredDiscount';
import InspectionPositions from '../../Global/Components/InspectionPositions';
import { ConvertFixedTable } from '../../Global/Components/ConvertFixedTable';
import { ToastAndroid } from 'react-native';
import Api from '../../Global/Components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PricePermission from '../../Global/Components/PricePermission';

const OrderNewModal = ({ route, navigation }) => {

    const [pricePermission, setPricePermission] = useState(true);

    const { data, setState, state, type, setButton, pageName } = route.params;
    const [isLoading, setIsLoading] = useState(false)

    const [product, setProduct] = useState(null);

    const getInfo = async () => {
        setPricePermission(await PricePermission());
        let stateData = [...state.Positions]
        let productOBJ = { ...data };

        const answer = InspectionPositions(stateData, productOBJ.ProductId || productOBJ.Id);

        if (answer.result) {
            productOBJ = state.Positions[answer.index]
            productOBJ.Price = ConvertFixedTable(Number(productOBJ.Price))
            productOBJ.Quantity = ConvertFixedTable(Number(productOBJ.Quantity))
            if (type !== "ct") {
                productOBJ.Discount = ConvertFixedTable(Number(RetioDiscount(productOBJ.BasicPrice, productOBJ.Price)));
            }
        } else {
            productOBJ.ProductId = productOBJ.Id
            productOBJ.Quantity = 0;
            productOBJ.ProductName = productOBJ.Name
            if (type !== "ct") {
                productOBJ.Discount = 0;
            }
            if (type == "Buy" || type == "BuySupply") {
                productOBJ.BasicPrice = ConvertFixedTable(Number(productOBJ.BuyPrice));
                if (type == "BuySupply") {
                    productOBJ.SalePrice = ConvertFixedTable(Number(productOBJ.Price));
                }
                productOBJ.Price = ConvertFixedTable(Number(productOBJ.BuyPrice));
            } else {
                if (type !== "ct") {
                    productOBJ.BasicPrice = ConvertFixedTable(Number(productOBJ.Price));
                }
                productOBJ.Price = ConvertFixedTable(Number(productOBJ.Price));
            }
        }

        productOBJ.NewQuantity = 1

        setProduct(productOBJ);
    }

    const getSaveInfo = async () => {
        let amount = 0;
        setIsLoading(true);
        let data = { ...state }
        let productOBJ = { ...product };
        if (pageName == "Demand" && ConvertFixedTable(productOBJ.MinPrice) > ConvertFixedTable(productOBJ.Price)) {
            alert("Qiymət Minimal Qiymətdən aşağı ola bilməz!")
            setIsLoading(false)
            return null;
        }
        productOBJ.Quantity = Number(productOBJ.Quantity) + Number(productOBJ.NewQuantity)
        const answer = InspectionPositions(state.Positions, productOBJ.Id || productOBJ.ProductId);
        if (answer.result) {
            data.Positions[answer.index] = { ...productOBJ };
        } else {
            data.Positions.push(productOBJ);
        }
        data.Positions.forEach(element => {
            amount += (ConvertFixedTable(Number(element.Price)) * ConvertFixedTable(Number(element.Quantity)));
        });
        data.Amount = amount;
        setIsLoading(false);
        setButton(true)
        setState(data);
        navigation.goBack();
    }

    const getPriceDIS = () => {
        setProduct(rel => ({ ...rel, ['Discount']: RetioDiscount(ConvertFixedTable(Number(product.BasicPrice)), ConvertFixedTable(Number(product.Price))) }))
    }

    const getDisPRI = () => {
        setProduct(rel => ({ ...rel, ['Price']: EnteredDiscount(ConvertFixedTable(Number(product.BasicPrice)), ConvertFixedTable(Number(product.Discount))) }))
    }

    const getBash = async () => {
        let productData = { ...product };
        let postOBJ = {
            sendObj: [
                {
                    ProductId: productData.ProductId,
                    SellPrice: productData.SalePrice,
                    BuyPrice: productData.BasicPrice
                }
            ],
            token: await AsyncStorage.getItem("token")
        }
        const result = await Api("products/bashpositions.php", postOBJ)
        if (result.data.Headers.ResponseStatus == "0") {
            successAlert();
        } else {
            alert(result.data.Body);
        }
    }

    const successAlert = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Satış qiyməti dəyişdirildi!',
            ToastAndroid.CENTER,
            ToastAndroid.BOTTOM,
            ToastAndroid.SHORT,
            200,
            50
        )
    }


    useEffect(() => {
        getInfo();
    }, [])


    return (
        product == null ?

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={50} color={CustomColors.primary} />
            </View>
            :

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.container}>
                    <Text style={styles.name}>{product.Name || product.ProductName}</Text>
                    <Text style={{ color: 'black', fontSize: 16 }}>{product.BarCode}</Text>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ width: '100%', height: 1, backgroundColor: 'grey', borderRadius: 10 }} />
                    </View>
                    {
                        type !== "ct" &&
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <Text style={{ color: 'black', fontSize: 16 }}>{'Anbar qalığı'}</Text>
                            <Text style={{ color: 'black', fontSize: 16 }}>{ConvertFixedTable(product.StockQuantity)}</Text>
                        </View>
                    }
                    {
                        type !== "Buy" && type !== "BuyPrice" && type !== "ct" &&
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                            <Text style={{ color: 'black', fontSize: 16 }}>{'Minimal qiymət'}</Text>
                            <Text style={{ color: 'black', fontSize: 16 }}>{ConvertFixedTable(product.MinPrice)}</Text>
                        </View>
                    }
                    <View style={{ margin: 20 }} />
                    {
                        type == "BuySupply" &&
                        <CustomTextInput editable={pricePermission} onSubmitEditing={getBash} addStyleInput={{ fontSize: 20, color: CustomColors.connectedPrimary }} keyboardType={"numeric"} value={String(product.SalePrice)} text={'Satış qiyməti'} width={'100%'} onChangeText={(e) => { setProduct(rel => ({ ...rel, ['SalePrice']: e.replace(',', '.') })) }} addStyle={{ borderRadius: 0, borderBottomWidth: 1 }} />
                    }
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        {
                            type !== "ct" &&
                            <CustomTextInput editable={pricePermission} addStyleInput={{ fontSize: 20, color: CustomColors.connectedPrimary }} keyboardType={"numeric"} value={String(product.Discount)} onBlur={getDisPRI} text={'Endirim%'} width={'100%'} onChangeText={(e) => { setProduct(rel => ({ ...rel, ['Discount']: e.replace(',', '.') })) }} addStyle={{ borderRadius: 0, borderBottomWidth: 1 }} />
                        }
                        <CustomTextInput editable={type != "Buy" || type != "BuySupply" && pricePermission} addStyleInput={{ fontSize: 20, color: CustomColors.connectedPrimary }} keyboardType={"numeric"} value={String(product.Price)} onBlur={getPriceDIS} text={type == "Buy" || type == "BuySupply" ? 'Alış Qiyməti' : 'Satış Qiymət'} width={'100%'} addStyle={{ borderRadius: 0, borderBottomWidth: 1 }} onChangeText={(e) => { setProduct(rel => ({ ...rel, ['Price']: e.replace(',', '.') })) }} />
                        <View style={{ margin: 10 }} ></View>
                        <Text style={{ color: 'grey', fontSize: 15, textAlign: 'center' }}>{'Əlavə miqdar'}</Text>
                        <View style={styles.bottomContainerItem}>
                            <TouchableOpacity onPress={() => { setProduct(rel => ({ ...rel, ['NewQuantity']: ConvertFixedTable(Number(product.NewQuantity)) - 1 })); }}>
                                <AntDesign color={CustomColors.primary} size={70} name='minussquare' />
                            </TouchableOpacity>
                            <TextInput keyboardType='numeric' value={String(product.NewQuantity)} style={[styles.input, { textAlign: 'center', width: '50%' }]} onChangeText={(e) => {
                                setProduct(rel => ({ ...rel, ['NewQuantity']: e.replace(',', '.') }));
                            }} />
                            <TouchableOpacity onPress={() => { setProduct(rel => ({ ...rel, ['NewQuantity']: ConvertFixedTable(Number(product.NewQuantity)) + 1 })); }}>
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

export default OrderNewModal

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        height: '100%',
        padding: 10,
    },
    name: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold'
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