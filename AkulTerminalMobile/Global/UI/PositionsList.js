import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomColors from '../Colors/CustomColors'
import { ConvertFixedTable } from '../Components/ConvertFixedTable'
import { Image } from 'react-native'
import ImageModal from '../Components/ImageModal'

const PositionsList = ({ state, setState, setButton, pageName,ds, type, ...props }) => {

    const [imageModal, setImageModal] = useState(false);

    return (
        <>
            <TouchableOpacity disabled={ds && true} onLongPress={() => {
                props.element.Pic ?
                    setImageModal(true)
                    :
                    alert("Bu məhsulda şəkil yoxdur!")
            }} key={props.key} style={styles.listContainer} onPress={() => { props.navigation.navigate("documentEditModal", { data: props.element, setState, state, type, setButton, pageName }) }}>
                <View style={styles.listFirs}>
                    <View style={styles.listFirsContainer}>
                        {
                            props.element.Pic ?
                                <Image style={styles.avatar} source={{ uri: props.element.Pic }} />
                                :
                                <View style={[styles.avatar, { backgroundColor: CustomColors.primary }]}>
                                    <Text style={styles.avatarName}>{props.name.slice(0, 2)}</Text>
                                </View>
                        }
                    </View>
                    <View style={styles.listCenterContiner}>
                        <Text style={styles.name}>{props.name}</Text>
                        {
                            props.barcode && <Text style={styles.barcode}>{props.barcode}</Text>
                        }
                    </View>
                </View>
                <View style={styles.listEndContainer}>
                    <Text style={styles.price}>{ConvertFixedTable(Number(props.totalPrice))} ₼</Text>
                    <Text style={styles.stock}>{props.priceandquantity}</Text>
                </View>
            </TouchableOpacity>
            <ImageModal imageModal={imageModal} setImageModal={setImageModal} name={props.element.name} price={ConvertFixedTable(Number(props.totalPrice))} pic={props.element.Pic} />
        </>
    )
}

export default PositionsList

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors.primary,
    },
    listContainer: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        marginTop: 5
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
        color: 'white'
    },
    name: {
        color: 'black'
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
})