import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomColors from '../Colors/CustomColors'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import { Modal } from 'react-native'
import ImageModal from './ImageModal';

const windowWidth = Dimensions.get('window').width;
const cardWidth = windowWidth / 2 - 20;

const AddCardProducts = ({ name, price, pic, press, ...props }) => {

    const [imageModal, setImageModal] = useState(false);
    return (
        <>
            <TouchableOpacity onLongPress={() => {
                pic ?
                    setImageModal(true)
                    :
                    alert("Bu məhsulda şəkil yoxdur!")
            }} onPress={press} style={[styles.card]}>
                {
                    pic ?

                        <Image source={{ uri: pic }} style={styles.image} />
                        :
                        <View style={[styles.image, {
                            backgroundColor: CustomColors.primary,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }]}>
                            <Text style={{ fontSize: 40 }}>{name.slice(0, 2)}</Text>
                        </View>
                }
                <View style={styles.text}>
                    <Text style={{ color: "white", fontSize: 15 }}>{name}</Text>
                    <Text style={{ color: "white", fontSize: 15 }}>{price}₼</Text>
                </View>
            </TouchableOpacity>
                <ImageModal setImageModal={setImageModal} imageModal={imageModal} name={name} price={price} pic={pic} />
        </>
    )
}

export default AddCardProducts

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        width: cardWidth,
        height: cardWidth
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageModal: {
        width: '100%',
        height: 300,
        borderRadius: 10
    },
    text: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        bottom: 0,
        paddingLeft: 5
    },
})