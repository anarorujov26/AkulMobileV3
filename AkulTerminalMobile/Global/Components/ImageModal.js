import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Modal } from 'react-native';
import { Image } from 'react-native';

const ImageModal = ({ imageModal, setImageModal, pic, name, price }) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={imageModal}
            onRequestClose={() => {
                setImageModal(!imageModal);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image source={{ uri: String(pic).replace('pic', 'big') }} style={styles.imageModal} />
                    <View style={styles.text}>
                        <Text style={{ color: "white", fontSize: 15 }}>{name}</Text>
                        <Text style={{ color: "white", fontSize: 15 }}>{price}₼</Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ImageModal

const styles = StyleSheet.create({
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})