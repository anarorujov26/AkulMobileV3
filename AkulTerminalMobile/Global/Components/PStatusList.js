import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomColors from '../Colors/CustomColors'

const PStatusList = (props) => {
    return (
        <View style={styles.listContainer}>
            <View style={styles.listFirs}>
                <View style={styles.listFirsContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarName}>{props.index + 1}</Text>
                    </View>
                </View>
                <View style={styles.listCenterContiner}>
                    <Text style={styles.name}>{props.item}</Text>
                </View>
            </View>
            <View style={styles.listEndContainer}>
                <Text style={styles.price}>{props.itemTwo}</Text>
            </View>
        </View>
    )
}

export default PStatusList

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
        marginTop: 2
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
        color: CustomColors.connectedPrimary
    },
    price: {
        color: 'black',
    },
    listItem: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        paddingLeft: 20
    },
    straight: {
        width: '90%',
        height: 1,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 20,
        color: 'black',
    },
    center: {
        backgroundColor: 'white'
    },
    header: {
        height: 70, width: '100%',
        backgroundColor: CustomColors.primary,
        borderTopStartRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center',
    },
})