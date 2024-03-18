import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ToastAndroid } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Api from './Api';
import Api2 from './Api2';
import axios from 'axios';
import { ProductsGlobalContext } from '../../Components/Screens/Screen/HomeChildScreens/Products/ProductsGlobalState';
import { CustomToLowerCase } from './CustomToLowerCase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomColors from '../Colors/CustomColors';

const PhotosData = ({ renderItem }) => {

    const { productGlobal, setProductGlobal } = useContext(ProductsGlobalContext);

    const [clickAnswer, setClickAnswer] = useState(false);
    const [answer, setAnswer] = useState(false);

    const pickDocument = async () => {
        let productInfo = { ...productGlobal };
        let file;

        try {
            const res = await DocumentPicker.pick({
                type: DocumentPicker.types.allFiles,
            });
            file = res[0];

            const accessToken = await Api2('login/refresh.php', {
                Refresh: await AsyncStorage.getItem("refresh")
            })

            if (accessToken.data.Headers.ResponseStatus == "0") {

                const acToken = accessToken.data.Body.accessToken;
                

                let newFormData = new FormData();
                newFormData.append("image", file);
                newFormData.append("linkId", "productId_" + productInfo.id);
                newFormData.append("title", "akul");
                newFormData.append("tags[]", "");
                newFormData.append("token", acToken);

                const imageResult = await axios.post('https://1000.az/api/upload.php', newFormData);
                console.log(imageResult);
                console.log(newFormData);

                if (imageResult.data.originalname) {
                    let imageList = {
                        id: productInfo.id,
                        token: await AsyncStorage.getItem("token")
                    }

                    if (productInfo.images[0]) {
                        imageList.images = [...productInfo.images, { ...imageResult.data }];
                    } else {
                        imageList.images = [{ ...imageResult.data }]
                    }


                    setProductGlobal(rel => ({ ...rel, ['images']: imageList.images }));
                    renderItem(4 + 4);

                    console.log(imageList);
                    const imageAddList = await Api('products/images.php', imageList);
                    if (imageAddList.data.Headers.ResponseStatus == "0") {
                        successAlert();
                    } else {
                        alert(imageAddList.data.Body)
                    }
                } else {
                    alert("Şəkil formatı (jpg,png,webp)")
                }
            }

        } catch (err) {
            console.log(err)
        }
    };

    const successAlert = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Şəkil uğurla əlavə edildi!',
            ToastAndroid.CENTER,
            ToastAndroid.BOTTOM,
            ToastAndroid.SHORT,
            200,
            50
        )
    }


    useEffect(() => {
        let newPG = { ...productGlobal };
        if (newPG.images[0]) {
            newPG.images.forEach((element, index) => {
                newPG.images[index] = CustomToLowerCase(newPG.images[index]);
            })
        }
        setProductGlobal(newPG);
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            <TouchableOpacity onPress={() => {
                setAnswer(!answer)
            }} style={[styles.pricesContainer, { width: '100%' }]} >
                <AntDesign name={!answer ? 'down' : 'right'} size={20} color={CustomColors.primary} />
                <Text style={{ color: CustomColors.primary }}>  Şəkillər</Text>
            </TouchableOpacity>

            {
                answer &&
                <>
                    <TouchableOpacity onPress={pickDocument} onPressIn={() => {
                        setClickAnswer(true)
                    }} onPressOut={() => {
                        setClickAnswer(false)
                    }} activeOpacity={1} style={[clickAnswer ? styles.containerClick : styles.container, { marginTop: 40, }]}>
                        <AntDesign name='upload' size={25} color={'black'} />
                        <Text style={{ color: 'black' }}>Şəkil Yüklə</Text>
                    </TouchableOpacity>
                    <View style={{ margin: 10 }} />
                    <FlatList style={{}} data={productGlobal.images} renderItem={({ item, index }) => (
                        <>
                            <TouchableOpacity activeOpacity={0.9} style={styles.imageContainer}>
                                <Image source={{ uri: item.path + item.uniqname + "_small." + item.ext }} style={{ width: 180, height: 190 }} />
                                <View style={styles.bottomContainer}>
                                    <View style={styles.first}>
                                        <MaterialCommunityIcons name='image' size={25} color={'#DB4437'} />
                                    </View>
                                    <View style={styles.end}>
                                        <Text numberOfLines={1} style={{
                                            color: 'black'
                                        }}>{item.originalname}</Text>
                                        <Text style={{
                                            color: "black",
                                            fontSize: 12
                                        }}>{item.uniqname}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </>
                    )} numColumns={2} />
                </>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        width: '90%',
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: "#FAFAFA",
        borderStyle: 'dashed',
        borderColor: "#bcbcbc"

    },
    containerClick: {
        borderWidth: 1,
        width: '95%',
        height: 120,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: "#FAFAFA",
        borderStyle: 'dashed',
        borderColor: "#02a4f2"
    },
    imageContainer: {
        margin: 5,
        marginTop: -5,
        marginBottom: 15,
        shadowColor: 'black',
        elevation: 5,
        borderWidth: 0,
        alignSelf: 'center',
    },
    bottomContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        backgroundColor: 'white',
        width: 180,
    },
    first: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    end: {
        width: '75%',
        height: 50,
        justifyContent: 'center'
    },
    pricesContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10
    }
})

export default PhotosData;