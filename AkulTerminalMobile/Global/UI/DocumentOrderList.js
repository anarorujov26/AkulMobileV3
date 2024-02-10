import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomColors from '../Colors/CustomColors'

const DocumentorderList = (props) => {
    return (
        <TouchableOpacity style={styles.listContainer} onPress={() => { props.navigation.navigate(props.location, { id: props.id }) }}>
            <View style={styles.listFirs}>
                <View style={styles.listFirsContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarName}>{props.index}</Text>
                    </View>
                </View>
                <View style={styles.listCenterContiner}>
                    {
                        props.customername &&
                            <Text style={styles.name}>{props.customername}</Text>

                    }
                    <Text style={styles.barcode}>{props.moment}</Text>
                    {
                        props.name &&
                    <Text style={styles.customerName}>{props.name}</Text>
                    }
                </View>
            </View>
            <View style={styles.listEndContainer}>
                <Text style={styles.price}>{props.amount}{!props.pIcon && '₼'}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default DocumentorderList

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CustomColors.greyV1,
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
        color: 'white',
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
    }
})